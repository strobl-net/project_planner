from unittest import defaultTestLoader
from django.db import models
from django.utils import timezone


class Seller(models.Model):
    name = models.CharField()
    # physical shop: 'street_name, number, zip_code, city, country'
    # online: 'o: country"
    # geo_pos: 'g: longitude, latitude'
    area = models.CharField(blank=True)
    added = models.DateTimeField(default=timezone.now)
