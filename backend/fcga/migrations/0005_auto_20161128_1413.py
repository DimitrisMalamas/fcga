# -*- coding: utf-8 -*-
# Generated by Django 1.10.2 on 2016-11-28 12:13
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('fcga', '0004_cards_owner'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cards',
            name='deck',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cards', to='fcga.Deck'),
        ),
        migrations.AlterField(
            model_name='cards',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ucards', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='deck',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='udeck', to=settings.AUTH_USER_MODEL),
        ),
    ]
