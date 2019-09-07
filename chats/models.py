from django.db import models
from projects.models import Project
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField


class Chat(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    owner = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    member_ids = ArrayField(models.IntegerField(), null=True, blank=True)
