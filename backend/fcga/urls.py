from django.conf.urls import url

from django.conf.urls import include

from . import views

app_name = 'fcga'

urlpatterns = [

    url(r'^decks/?$', views.DeckList.as_view()),

    url(r'^decks/(?P<pk>[0-9]+)/?$', views.DeckDetail.as_view()),

    url(r'^decks/(?P<deck_id>[0-9]+)/cards/$', views.CardsList.as_view()),

    url(r'^decks/(?P<deck_id>[0-9]+)/cards/(?P<pk>[0-9]+)$',
        views.CardsDetail.as_view()),

]
