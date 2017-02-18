from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Deck(models.Model):
    sc = 'Science'
    geo = 'Geography'
    hst = 'History'
    ltr = 'Literature'
    blg = 'Biology'
    chms = 'Chemistry'
    fun = 'Fun'
    otr = 'Other'
    catergory_choices = (
        (sc, 'Science'),
        (geo, 'Geography'),
        (hst, 'History'),
        (ltr, 'Literature'),
        (blg, 'Biology'),
        (chms, 'Chemistry'),
        (fun, 'Fun'),
        (otr, 'Other'),
    )
    owner = models.ForeignKey('auth.User', related_name='udeck', on_delete=models.CASCADE)
    title = models.CharField(max_length=200, unique=True)
    category = models.CharField(max_length=200, choices = catergory_choices, default = otr)
    description = models.CharField(max_length=1000)



class Cards(models.Model):
    deck = models.ForeignKey(Deck,related_name='cards', on_delete=models.CASCADE)
    owner = models.ForeignKey('auth.User', related_name='ucards', on_delete=models.CASCADE)
    question = models.CharField(max_length=500)
    answer = models.CharField(max_length=800)
