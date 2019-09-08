from django.db import models
from django.utils import timezone
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import User


class Project(models.Model):
    name = models.CharField(max_length=32)
    description = models.TextField()
    created = models.DateTimeField(default=timezone.now)
    lead = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    member_ids = ArrayField(models.IntegerField(), null=True, blank=True)

    def __str__(self):
        mem_or_mems = ""
        if self.member_ids.__len__() <= 1:
            mem_or_mems = "member"
        else:
            mem_or_mems = "members"

        return f'{self.name + " with "+ str(self.member_ids.__len__()) + " " + mem_or_mems}'

    def get_lead(self):
        return self.lead_id
