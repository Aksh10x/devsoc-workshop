from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Swipe, Match
from accounts.serializers import PublicUserSerializer

User = get_user_model()

class SwipeCreateSerializer(serializers.Serializer):
    target_id = serializers.IntegerField()
    action = serializers.ChoiceField(choices=["like","pass"])

class MatchSerializer(serializers.ModelSerializer):
    other_user = serializers.SerializerMethodField()
    class Meta:
        model = Match
        fields = ["id","other_user","created_at"]
    def get_other_user(self, obj):
        me = self.context["request"].user
        other = obj.user2 if obj.user1_id == me.id else obj.user1
        return PublicUserSerializer(other).data

class FeedUserSerializer(PublicUserSerializer):
    pass
