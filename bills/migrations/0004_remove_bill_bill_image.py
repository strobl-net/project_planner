# Generated by Django 2.2.5 on 2019-09-07 18:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bills', '0003_auto_20190907_1826'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='bill',
            name='bill_image',
        ),
    ]