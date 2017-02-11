from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Deck(models.Model):
    owner = models.ForeignKey('auth.User', related_name='udeck', on_delete=models.CASCADE)
    title = models.CharField(max_length=200, unique=True)
    category = models.CharField(max_length=200)
    description = models.CharField(max_length=1000)



class Cards(models.Model):
    deck = models.ForeignKey(Deck,related_name='cards', on_delete=models.CASCADE)
    owner = models.ForeignKey('auth.User', related_name='ucards', on_delete=models.CASCADE)
    question = models.CharField(max_length=500)
    answer = models.CharField(max_length=800)
