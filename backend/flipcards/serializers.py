from rest_framework import serializers
from .models import Deck, Cards
from django.contrib.auth.models import User
from django.utils import timezone
import datetime



class DeckSerializer(serializers.ModelSerializer):
    cards = serializers.PrimaryKeyRelatedField(many=True, queryset=Cards.objects.all())


    class Meta:
        model = Deck
        fields = ('id', 'title', 'category', 'description', 'cards')

class CardsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Cards
        fields = ('id','question','answer')

class UserSerializer(serializers.ModelSerializer):
    udeck = serializers.PrimaryKeyRelatedField(many=True, queryset=Deck.objects.all())
    ucards = serializers.PrimaryKeyRelatedField(many=True, queryset=Cards.objects.all())

    class Model:
        model = User
        fields = ('id', 'username', 'udeck', 'ucards')
