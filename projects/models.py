from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User


class Project(models.Model):
    name = models.CharField(max_length=32)
    description = models.TextField()
    created = models.DateTimeField(default=timezone.now)
    lead = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    members = models.ManyToManyField(User)
