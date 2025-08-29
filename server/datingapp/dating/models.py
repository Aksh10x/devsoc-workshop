from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError

User = settings.AUTH_USER_MODEL

class Swipe(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="swipes_made")
    target = models.ForeignKey(User, on_delete=models.CASCADE, related_name="swipes_received")
    is_like = models.BooleanField()  # True=like, False=pass
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user","target")

    def clean(self):
        if self.user_id == self.target_id:
            raise ValidationError("Cannot swipe on yourself.")

class Match(models.Model):
    user1 = models.ForeignKey(User, on_delete=models.CASCADE, related_name="matches_as_user1")
    user2 = models.ForeignKey(User, on_delete=models.CASCADE, related_name="matches_as_user2")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user1","user2")

    @staticmethod
    def create_sorted(a, b):
        if a.id == b.id: raise ValidationError("Cannot match with yourself.")
        u1, u2 = (a, b) if a.id < b.id else (b, a)
        obj, _ = Match.objects.get_or_create(user1=u1, user2=u2)
        return obj
