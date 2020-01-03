from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from phonenumber_field.modelfields import PhoneNumberField


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(default='no_profile_img', upload_to='images/profiles')
    email = models.EmailField(null=True, blank=True)
    first_name = models.CharField(max_length=50, blank=True, null=True)
    last_name = models.CharField(max_length=50, blank=True, null=True)
    phone_number = PhoneNumberField(blank=True)
    additional_info = models.TextField(blank=True)
    created = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f'{self.user.username}'


def post_create_user(sender, instance, **kwargs):
    if kwargs['created']:
        new_profile = Profile()
        new_profile.user = instance
        new_profile.first_name = instance.first_name
        new_profile.last_name = instance.last_name
        new_profile.email = instance.email
        new_profile.created = instance.date_joined
        new_profile.save()


post_save.connect(post_create_user, sender=User)
