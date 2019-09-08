from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from phonenumber_field.modelfields import PhoneNumberField


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    email = models.EmailField(blank=True)
    phone_number = PhoneNumberField(blank=True)
    additional_info = models.TextField(blank=True)


def post_create_user(sender, instance, **kwargs):
    if kwargs['created']:
        new_profile = Profile.objects.create(user=instance)


post_save.connect(post_create_user, sender=User)
