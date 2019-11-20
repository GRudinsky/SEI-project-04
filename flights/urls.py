from django.urls import path
from .views import ListView, SearchListView, ImageDetailView
# from . import views

urlpatterns = [
    path('proxyflights/', ListView.as_view()),
    path('proxyimages/', ImageDetailView.as_view()),
    path('searches', SearchListView().as_view())
]