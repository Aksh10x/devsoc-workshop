from django.contrib.auth.models import AbstractUser
from django.db import models
from datetime import date

GENDER_CHOICES = [("male","Male"),("female","Female"),("other","Other")]

class User(AbstractUser):
    bio = models.CharField(max_length=160, blank=False)         # short description
    gender = models.CharField(max_length=16, choices=GENDER_CHOICES, blank=False)
    birth_date = models.DateField(null=True, blank=False)        # age is computed
    cover_image_url = models.URLField(blank=False)               # store URL (from upload endpoint)
    likes = models.JSONField(default=list, blank=True)          # array of tokens, e.g. ["food","songs","gym"]

    # Convenience: a symmetric M2M "matches" via dating.Match
    matches = models.ManyToManyField(
        "self",
        through="dating.Match",
        through_fields=("user1", "user2"),
        symmetrical=True,
        related_name="matched_with",
        blank=True,
    )

    def __str__(self): return self.username

    @property
    def age(self):
        if not self.birth_date: return None
        today = date.today()
        years = today.year - self.birth_date.year
        if (today.month, today.day) < (self.birth_date.month, self.birth_date.day):
            years -= 1
        return years

