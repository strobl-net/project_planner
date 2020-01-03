from django.db import models
from django.utils import timezone


class Seller(models.Model):
    name = models.CharField(max_length=100)
    # physical shop: 'street_name, number, zip_code, city, country'
    # online: 'o: country"
    # geo_pos: 'g: longitude, latitude'
    area = models.TextField(blank=True)
    added = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f'{self.name + ": " + self.area}'
