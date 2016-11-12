from django.conf.urls import url

from . import views

app_name = 'fcga'

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^change_cards/(?P<cards_id>[0-9]+)/$', views.change_cards, name='change_cards'),
    url(r'^change_deck/(?P<deck_id>[0-9]+)/$', views.change_deck, name='change_deck'),
    url(r'^del_card/(?P<cards_id>[0-9]+)/$', views.del_card, name='del_card'),
    url(r'^del_deck/(?P<deck_id>[0-9]+)/$', views.del_deck, name='del_deck'),
    url(r'^pdecks/(?P<user_id>[0-9]+)/$', views.pdecks, name='pdecks'),
    url(r'^ccards/(?P<deck_id>[0-9]+)/$', views.ccards, name='ccards'),
    url(r'^ccards/(?P<deck_id>[0-9]+)/(?P<cards_id>[0-9]+)/$', views.ccards, name='ccards'),
    url(r'^cdeck/$', views.cdeck, name='cdeck'),
    url(r'^cdeck/(?P<deck_id>[0-9]+)/$', views.cdeck, name='cdeck'),
    url(r'^deck/(?P<deck_id>[0-9]+)/$', views.deck, name='deck'),
    url(r'^play/(?P<deck_id>[0-9]+)/$', views.play, name='play'),
    url(r'^user/(?P<user_id>[0-9]+)/$', views.profile, name='profile'),
    url(r'^user/$', views.profile, name='profile'),
    url(r'^login/$', views.login_view, name='login'),
    url(r'^logout/$', views.logout_view, name='logout'),
]
