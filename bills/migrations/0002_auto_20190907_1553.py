# Generated by Django 2.2.5 on 2019-09-07 15:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bills', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='bill',
            name='bill_image',
            field=models.ImageField(blank=True, upload_to=''),
        ),
        migrations.AddField(
            model_name='bill',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='images/bills'),
        ),
    ]
