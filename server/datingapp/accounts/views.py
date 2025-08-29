# accounts/views.py
import os, uuid, json
from django.conf import settings
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from django.contrib.auth import get_user_model

from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import (
    RegisterFullSerializer,
    MeSerializer,
    _normalize_likes,
)

User = get_user_model()

class RegisterView(APIView):
    """
    Full-profile registration in one step.
    Accepts JSON OR multipart form-data (with optional file key 'cover').
    Returns { user, access, refresh }.
    """
    permission_classes = [permissions.AllowAny]
    parser_classes = [JSONParser, MultiPartParser, FormParser]

    def post(self, request):
        data = request.data.copy()

        # Normalize likes if it came as a string (multipart)
        if "likes" in data and not isinstance(data.get("likes"), list):
            try:
                data["likes"] = _normalize_likes(data.get("likes"))
            except Exception as e:
                return Response({"likes": [str(e)]}, status=400)

        cover_file = request.FILES.get("cover")

        ser = RegisterFullSerializer(data=data)
        ser.is_valid(raise_exception=True)
        user = ser.save()

        # Save cover if provided
        if cover_file:
            if cover_file.size > 5 * 1024 * 1024:
                user.delete()
                return Response({"detail": "cover too large (max 5MB)"}, status=400)
            folder = f"uploads/{user.id}/"
            name = f"{uuid.uuid4().hex}_{cover_file.name}"
            path = default_storage.save(os.path.join(folder, name), ContentFile(cover_file.read()))
            rel_url = settings.MEDIA_URL + path
            abs_url = request.build_absolute_uri(rel_url)
            user.cover_image_url = abs_url
            user.save(update_fields=["cover_image_url"])

        # Issue tokens on signup
        refresh = RefreshToken.for_user(user)
        return Response(
            {"user": MeSerializer(user).data, "access": str(refresh.access_token), "refresh": str(refresh)},
            status=status.HTTP_201_CREATED,
        )

class MeView(generics.RetrieveUpdateAPIView):
    """
    Get/Update the authenticated user's profile.
    """
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = MeSerializer

    def get_object(self):
        return self.request.user

class UploadView(APIView):
    """
    Standalone upload endpoint (multipart). Field name: 'file'
    Optional: ?set_as_cover=true to also set cover_image_url.
    Returns { "url": "<absolute url>" }.
    """
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        f = request.FILES.get("file")
        if not f:
            return Response({"detail": "file missing"}, status=400)
        if f.size > 5 * 1024 * 1024:
            return Response({"detail": "file too large (max 5MB)"}, status=400)

        folder = f"uploads/{request.user.id}/"
        name = f"{uuid.uuid4().hex}_{f.name}"
        path = default_storage.save(os.path.join(folder, name), ContentFile(f.read()))
        rel_url = settings.MEDIA_URL + path
        abs_url = request.build_absolute_uri(rel_url)

        if request.query_params.get("set_as_cover") == "true":
            request.user.cover_image_url = abs_url
            request.user.save(update_fields=["cover_image_url"])

        return Response({"url": abs_url}, status=status.HTTP_201_CREATED)
