from django.shortcuts import render

from django.shortcuts import get_object_or_404

from django.http import HttpResponseRedirect, HttpResponse, HttpResponseForbidden

from .models import Deck, Cards

from django.urls import reverse

from django.utils import timezone

from .serializers import DeckSerializer, CardsSerializer

from rest_framework import generics

from rest_framework.response import Response

from django.contrib.staticfiles import views

#views for serializers
def index(request, path=''):
    if (path.endswith('.js')):
        return views.serve(request, path)
    else:
        return views.serve(request, 'index.html')

class DeckList(generics.ListAPIView):
    queryset = Deck.objects.all()
    serializer_class = DeckSerializer

    def get_queryset(self):
        queryset = Deck.objects.all()
        title = self.request.query_params.get('title', None)
        if title is not None:
            queryset = queryset.filter(title__contains=title)
        return queryset

class DeckDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Deck.objects.all()
    serializer_class = DeckSerializer

class CardsList(generics.ListCreateAPIView):
    queryset = Cards.objects.all()
    serializer_class = CardsSerializer

    def get_queryset(self):
        queryset = Cards.objects.all()
        deck_id = self.kwargs.get('deck_id', None)
        if deck_id:
            queryset = queryset.filter(deck_id=deck_id)
        return queryset

class CardsDetail(generics.RetrieveAPIView):
    queryset = Cards.objects.all()
    serializer_class = CardsSerializer
