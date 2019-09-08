from django.urls import path
from . import views

urlpatterns = [
    path(r'^(?P<path>.*)/$', views.index)
]
