from django.urls import path

from .views import ParamsView


app_name = "api"

urlpatterns = [
    path('parametros/', ParamsView.as_view()),
]