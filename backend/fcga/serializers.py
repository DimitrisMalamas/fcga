from rest_framework import serializers
from .models import Deck, Cards
from django.utils import timezone
import datetime

class DeckSerializer(serializers.ModelSerializer):
    cards = serializers.PrimaryKeyRelatedField(many=True, queryset = Cards.objects.all())
    class Meta:
        model = Deck
        fields = ('id', 'title', 'category', 'description', 'deck_date', 'cards')

class CardsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Cards
        fields = ('id','question','answer','card_date')
