from django.urls import path
from .views import ListView, SearchListView, ImageDetailView, CityDetailView, LocationSuggestionsListView, FlightSuggestionsListView

urlpatterns = [
    path('proxy/flightSearch/', ListView.as_view()),
    path('proxy/imageSearch/', ImageDetailView.as_view()),
    path('proxy/citySearch/', CityDetailView.as_view()),
    path('proxy/locationSuggestions/', LocationSuggestionsListView.as_view()),
    path('proxy/flightSuggestions/', FlightSuggestionsListView.as_view()),
    path('searches', SearchListView().as_view())
]
