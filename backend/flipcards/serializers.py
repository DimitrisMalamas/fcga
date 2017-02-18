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

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password' ,'udeck', 'ucards')
        extra_kwargs = {'password': {'write_only': True}}

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
