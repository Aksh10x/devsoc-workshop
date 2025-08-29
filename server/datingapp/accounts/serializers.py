# accounts/serializers.py
import re, json
from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()
TOKEN_RE = re.compile(r"^[A-Za-z0-9_]+$")   # tokens without spaces

def _normalize_likes(value):
    """
    Accept list OR string:
      - list: ["food","songs","gym"]
      - JSON string: '["food","songs"]'
      - comma string: "food,songs,gym"
    Returns lowercase, deduped list (max 5).
    """
    if value in (None, "", []):
        return []
    if isinstance(value, list):
        arr = value
    elif isinstance(value, str):
        # try JSON first; else treat as comma-separated
        try:
            parsed = json.loads(value)
            if isinstance(parsed, list):
                arr = parsed
            else:
                arr = [s.strip() for s in value.split(",") if s.strip()]
        except Exception:
            arr = [s.strip() for s in value.split(",") if s.strip()]
    else:
        raise serializers.ValidationError("likes must be list / comma string / JSON list")

    if len(arr) > 5:
        raise serializers.ValidationError("at most 5 likes")

    out = []
    for s in arr:
        if not isinstance(s, str) or not TOKEN_RE.fullmatch(s):
            raise serializers.ValidationError(
                "likes must be tokens without spaces (e.g. 'food','songs','gym')"
            )
        out.append(s.lower())
    # dedupe preserving order
    return list(dict.fromkeys(out))

class PublicUserSerializer(serializers.ModelSerializer):
    age = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ["id","username","first_name","last_name","bio","gender","age","birth_date","cover_image_url","likes"]
        read_only_fields = ["id","username","age"]
    def get_age(self, obj): return obj.age

class MeSerializer(serializers.ModelSerializer):
    age = serializers.SerializerMethodField(read_only=True)
    likes = serializers.ListField(child=serializers.CharField(), required=False)
    class Meta:
        model = User
        fields = ["id","username","email","first_name","last_name",
                  "bio","gender","birth_date","cover_image_url","likes","age"]
        read_only_fields = ["id","username","email","age"]
    def validate_likes(self, value): return _normalize_likes(value)
    def get_age(self, obj): return obj.age

class RegisterFullSerializer(serializers.ModelSerializer):
    # Auth
    password = serializers.CharField(write_only=True, min_length=8)

    # Required profile fields at signup
    bio = serializers.CharField(max_length=160, required=True, allow_blank=False)
    gender = serializers.ChoiceField(choices=[("male","Male"),("female","Female"),("other","Other")], required=True)
    birth_date = serializers.DateField(required=True)
    likes = serializers.ListField(
        child=serializers.CharField(),
        required=False,                # <-- now optional
        allow_empty=True               # <-- allow empty list
    )

    # Optional (keep optional)
    cover_image_url = serializers.URLField(required=False, allow_blank=True)
    first_name = serializers.CharField(required=False, allow_blank=True)
    last_name  = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = User
        fields = [
            "username","email","password",
            "first_name","last_name",
            "bio","gender","birth_date",
            "likes","cover_image_url",
        ]

    def validate_likes(self, value):
        # normalize + enforce rules
        return _normalize_likes(value)

    def create(self, validated_data):
        pwd = validated_data.pop("password")
        return User.objects.create_user(password=pwd, **validated_data)
