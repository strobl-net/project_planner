from django.urls import path
from . import views

urlpatterns = [
    path('', views.FrontendRenderView.as_view()),
]
