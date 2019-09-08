from django.db import models
from django.db.models.signals import post_save, post_delete
from projects.models import Project
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField


class Chat(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    owner = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    member_ids = ArrayField(models.IntegerField(), null=True, blank=True)


def post_create_project(sender, instance, **kwargs):
    print(instance)
    print('created')
    new_chat = Chat()
    new_chat.project = instance
    new_chat.member_ids = instance.member_ids
    new_chat.owner = instance.lead
    new_chat.save()


def post_delete_project(sender, instance, **kwargs):
    print("something")


post_save.connect(post_create_project, sender=Project)
post_delete.connect(post_delete_project, sender=Project)

