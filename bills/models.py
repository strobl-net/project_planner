from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from djmoney.models.fields import MoneyField
from projects.models import Project
from sellers.models import Seller
from products.models import Product


class Bill(models.Model):
    project = models.ForeignKey(Project, on_delete=models.SET_NULL, null=True)
    amount = MoneyField(max_digits=14, decimal_places=4, default_currency='EUR', blank=True)
    intake = models.BooleanField()
    digital = models.BooleanField()
    paid = models.BooleanField(blank=True)
    ordered_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    seller = models.ForeignKey(Seller, on_delete=models.SET_NULL, null=True)
    products = models.ManyToManyField(Product, related_name="products+")
    date_order = models.DateField()
    date_paid = models.DateField(blank=True)
    created = models.DateTimeField(default=timezone.now)
    description = models.TextField(blank=True)
