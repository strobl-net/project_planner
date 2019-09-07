from unittest import defaultTestLoader
from django.db import models
from django.utils import timezone


class Seller(models.Model):
    name = models.CharField(unique=True)
    area = models
    added = models.DateTimeField(default=timezone.now)
