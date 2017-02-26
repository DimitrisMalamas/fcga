from django.shortcuts import render

from django.shortcuts import get_object_or_404

from django.http import HttpResponseRedirect, HttpResponse, HttpResponseForbidden

from .models import Deck, Cards

from django.urls import reverse

from django.utils import timezone

from django.contrib.auth.models import User

from django.contrib.auth import authenticate, login, logout

from django.contrib.auth.decorators import login_required

from .serializers import DeckSerializer, CardsSerializer, UserSerializer, CreateUserSerializer

from rest_framework import generics

from rest_framework.response import Response

from django.contrib.auth.models import User

from rest_framework import permissions

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
        category = self.request.query_params.get('category', None)
        if title is not None:
            queryset = queryset.filter(title__contains=title)
        if category is not None:
            queryset = queryset.filter(category__contains=category)
        return queryset

class DeckDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Deck.objects.all()
    serializer_class = DeckSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def perform_update(self, serializer):
        instance = self.get_object()
        print("***inside update", self.request.user.id, instance.owner.id)
        if self.request.user.id == instance.owner.id:
            print("inside if")
            serializer.save()

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if request.user.id == instance.owner.id:
            self.perform_destroy(instance)
        return Response()

class UserDeckList(generics.ListCreateAPIView):
    queryset = Deck.objects.all()
    serializer_class = DeckSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        queryset = Deck.objects.all()
        owner = self.request.user
        queryset = queryset.filter(owner=owner)
        return queryset

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class CardsList(generics.ListCreateAPIView):
    queryset = Cards.objects.all()
    serializer_class = CardsSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    def get_queryset(self):
        queryset = Cards.objects.all()
        deck_id = self.kwargs.get('deck_id', None)
        if deck_id:
            queryset = queryset.filter(deck_id = deck_id)
        return queryset

    def perform_create(self, serializer):
        deck_id = self.kwargs['deck_id']
        deck = Deck.objects.get(pk = deck_id)
        if self.request.user.id == deck.owner.id:
            serializer.save(deck_id=deck_id, owner=self.request.user)

class CardsDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Cards.objects.all()
    serializer_class = CardsSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def perform_update(self, serializer):
        instance = self.get_object()
        print("***inside update", self.request.user.id, instance.owner.id)
        if self.request.user.id == instance.owner.id:
            print("inside if")
            serializer.save()


    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if request.user.id == instance.owner.id:
            self.perform_destroy(instance)
        return Response()

class UserList(generics.ListCreateAPIView):

    queryset = User.objects.all()
    serializer_class = CreateUserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = CreateUserSerializer
