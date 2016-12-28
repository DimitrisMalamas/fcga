# -*- coding: utf-8 -*-
# Generated by Django 1.10.2 on 2016-11-22 19:06
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('fcga', '0003_auto_20161109_1400'),
    ]

    operations = [
        migrations.AddField(
            model_name='cards',
            name='owner',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]
