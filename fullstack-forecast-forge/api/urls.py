# urls.py
from django.urls import path
from api.views import AccuCastView,WeatherView

urlpatterns = [
    path('hourly/', AccuCastView.as_view(), name='forecast'),
    path('weather_forecast/', WeatherView.as_view(), name='daily_normal'),
]
