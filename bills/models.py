from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from djmoney.models.fields import MoneyField
from projects.models import Project
from sellers.models import Seller
from products.models import Product
from django.contrib.postgres.fields import ArrayField


class Bill(models.Model):
    project = models.ForeignKey(Project, on_delete=models.SET_NULL, null=True)
    amount = MoneyField(max_digits=14, decimal_places=4, default_currency='EUR', blank=True)
    intake = models.BooleanField()
    digital = models.BooleanField()
    paid = models.BooleanField(default=False, blank=True)
    ordered_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    seller = models.ForeignKey(Seller, on_delete=models.SET_NULL, null=True)
    products = ArrayField(models.IntegerField(), default=None, null=False, blank=True)
    date_order = models.DateField()
    date_paid = models.DateField(blank=True)
    created = models.DateTimeField(default=timezone.now)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='images/bills', null=True, blank=True)

    def __str__(self):
        return f'{self.project, self.amount, self.intake}'
