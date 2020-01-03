from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField
from django.db import models
from django.utils import timezone
from djmoney.models.fields import MoneyField

from products.models import Product
from projects.models import Project
from sellers.models import Seller


class Bill(models.Model):
    project = models.ForeignKey(Project, related_name='bills', on_delete=models.SET_NULL, null=True)
    amount = MoneyField(max_digits=14, decimal_places=4, default_currency='EUR', blank=True)
    intake = models.BooleanField()
    digital = models.BooleanField()
    paid = models.BooleanField(default=False, blank=True)
    ordered_by = models.ForeignKey(User, related_name='bills', on_delete=models.SET_NULL, null=True)
    seller = models.ForeignKey(Seller, related_name='bills', on_delete=models.SET_NULL, null=True)
    products = ArrayField(models.IntegerField(), default=None, null=False, blank=True)
    date_order = models.DateField()
    date_paid = models.DateField(blank=True, null=True)
    created = models.DateTimeField(default=timezone.now)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='images/bills', null=True, blank=True)

    def __str__(self):
        return f'{self.project, self.amount, self.intake}'

    @property
    def seller_name(self):
        return self.seller.name

    @property
    def ordered_by_name(self):
        return self.ordered_by.username

    @property
    def project_name(self):
        return self.project.name
