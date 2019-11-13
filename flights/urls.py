from django.urls import path
from .views import ListView
# from . import views

urlpatterns = [
    path('proxyflights', ListView.as_view())
]

# urlpatterns = [
#     path('proxyflights', views.get_flights)
# ]