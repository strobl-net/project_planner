# Generated by Django 2.2.5 on 2019-09-07 17:43

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0003_project_members'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='members2',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(), null=True, size=None),
        ),
    ]