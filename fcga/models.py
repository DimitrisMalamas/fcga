from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Deck(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=200)
    description = models.CharField(max_length=1000)
    deck_date = models.DateTimeField('review date')

    def __str__(self):
        return "%s, %s, %s, %s" % (self.title, self.category, self.description, self.deck_date)

class Cards(models.Model):
    deck = models.ForeignKey(Deck, on_delete=models.CASCADE)
    question = models.CharField(max_length=500)
    answer = models.CharField(max_length=800)
    card_date = models.DateTimeField('review date')

    def __str__(self):
        return "%s, %s, %s" % (self.question, self.answer, self.card_date)
