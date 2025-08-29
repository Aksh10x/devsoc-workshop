from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Swipe, Match
from accounts.serializers import PublicUserSerializer

User = get_user_model()

class SwipeCreateSerializer(serializers.Serializer):
    target_id = serializers.IntegerField()
    action = serializers.ChoiceField(choices=["like","pass"])

class MatchSerializer(serializers.ModelSerializer):
    user1 = PublicUserSerializer(read_only=True)
    user2 = PublicUserSerializer(read_only=True)
    
    class Meta:
        model = Match
        fields = ["id", "user1", "user2", "created_at"]

class FeedUserSerializer(PublicUserSerializer):
    pass
