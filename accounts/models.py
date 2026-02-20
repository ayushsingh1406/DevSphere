from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    experience_years = models.PositiveIntegerField(default=0)
    github_username = models.CharField(max_length=150, blank=True, null=True)
    dev_score = models.FloatField(default=0.0)

    def __str__(self):
        return self.username
