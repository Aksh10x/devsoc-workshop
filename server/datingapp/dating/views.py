# dating/views.py
from django.db.models import Q
from django.contrib.auth import get_user_model
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Swipe, Match
from .serializers import SwipeCreateSerializer, MatchSerializer, FeedUserSerializer

User = get_user_model()

def _opposite_gender_qs(me):
    """
    Returns a base queryset of candidates filtered by opposite gender:
      - male  -> gender='female'
      - female-> gender='male'
      - other/blank -> no gender filter (show everyone)
    (You already require gender at signup; this just keeps workshops safe.)
    """
    desired = None
    if getattr(me, "gender", None) == "male":
        desired = "female"
    elif getattr(me, "gender", None) == "female":
        desired = "male"

    qs = User.objects.exclude(id=me.id)
    if desired:
        qs = qs.filter(gender=desired)
    return qs
    # helper: return candidate users filtered by opposite gender preference

class FeedView(generics.ListAPIView):
    """Batch feed: call again after you swipe through 20."""
    serializer_class = FeedUserSerializer
    def get_queryset(self):
        me = self.request.user
        swiped_ids = Swipe.objects.filter(user=me).values_list("target_id", flat=True)
        return (
            _opposite_gender_qs(me)
            .exclude(id__in=swiped_ids)
            .order_by("id")[:20]
        )
    # Returns a short page of candidates for the swipe feed

class SwipeView(APIView):
    """POST { target_id, action: 'like'|'pass' } → { matched: bool, match_id, next }"""
    def post(self, request):
        ser = SwipeCreateSerializer(data=request.data)
        ser.is_valid(raise_exception=True)
        target_id = ser.validated_data["target_id"]
        action = ser.validated_data["action"]

        if target_id == request.user.id:
            return Response({"detail":"Cannot swipe yourself."}, status=400)

        try:
            target = User.objects.get(id=target_id)
        except User.DoesNotExist:
            return Response({"detail":"Target not found."}, status=404)

        swipe, _ = Swipe.objects.update_or_create(
            user=request.user, target=target,
            defaults={"is_like": action == "like"},
        )

        matched = False
        match_id = None
        if swipe.is_like and Swipe.objects.filter(user=target, target=request.user, is_like=True).exists():
            match = Match.create_sorted(request.user, target)
            matched = True
            match_id = match.id

        # next suggestion uses same opposite-gender filter
        next_user = (
            _opposite_gender_qs(request.user)
            .exclude(id__in=Swipe.objects.filter(user=request.user).values_list("target_id", flat=True))
            .order_by("id")
            .first()
        )
        next_payload = FeedUserSerializer(next_user).data if next_user else None

        return Response({"matched": matched, "match_id": match_id, "next": next_payload}, status=status.HTTP_200_OK)
    # Record a swipe, create a Match if mutual like, and return next suggestion

class MatchesListView(generics.ListAPIView):
    serializer_class = MatchSerializer
    def get_queryset(self):
        me = self.request.user
        return Match.objects.filter(Q(user1=me) | Q(user2=me)).order_by("-created_at")
    # List all matches for the authenticated user
