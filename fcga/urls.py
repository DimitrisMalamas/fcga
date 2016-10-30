from django.conf.urls import url

from . import views

app_name = 'fcga'

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^cdeck/$', views.cdeck, name='cdeck'),
    url(r'^deck/(?P<deck_id>[0-9]+)/$', views.deck, name='deck'),
    url(r'^play/(?P<deck_id>[0-9]+)/$', views.play, name='play'),
    url(r'^user/(?P<user_id>[0-9]+)/$', views.profile, name='profile'),
    url(r'^user/$', views.profile, name='profile'),
    url(r'^login/$', views.login_view, name='login'),
    url(r'^logout/$', views.logout_view, name='logout'),
]
