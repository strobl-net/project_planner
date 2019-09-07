from django.db import models
from django.utils import timezone
from djmoney.models.fields import MoneyField
from django.contrib.postgres.fields import ArrayField
from sellers.models import Seller


class Product(models.Model):
    name = models.CharField(max_length=100)
    seller = models.ForeignKey(Seller, on_delete=models.SET_NULL, null=True)
    current_price = MoneyField(max_digits=14, decimal_places=4, default_currency='EUR', blank=True)
    price_history = ArrayField(MoneyField(max_digits=14, decimal_places=4, default_currency='EUR', blank=True), size=32)
    added = models.DateTimeField(default=timezone.now)