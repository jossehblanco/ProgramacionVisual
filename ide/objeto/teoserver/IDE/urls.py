from django.urls import path
from . import views

app_name = "IDE"

urlpatterns= [
    path("", views.index, name="index"), 
]