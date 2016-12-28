from django.conf.urls import url, include
from django.contrib import admin

from django.contrib.staticfiles import views

urlpatterns = [
    url(r'^fcga/', include('fcga.urls')),
    url(r'^admin/', admin.site.urls),
]


urlpatterns += url(r'^(?P<path>.*)$', views.serve),
