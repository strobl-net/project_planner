# Generated by Django 2.2.5 on 2019-09-08 23:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bills', '0004_remove_bill_bill_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bill',
            name='paid',
            field=models.BooleanField(blank=True, default=False),
        ),
    ]