from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone
from chats.models import Chat


class ChatMessage(models.Model):
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE)
    text = models.TextField()
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    created = models.DateTimeField(default=timezone.now)
    last_edited = models.DateTimeField(null=True, blank=True)
    edited = models.BooleanField(null=True, blank=True)
