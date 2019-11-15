#pylint: disable=no-member
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework import status
from .models import Search
from .serializers import SearchSerializer
import requests

class ListView(APIView):

    def post(self, request):
        data = request.data
        origin = data.pop('origin')
        destination = data.pop('destination')
        departure_date = data.pop('departureDate')
        return_date = data.pop('returnDate')
        print(origin, destination, departure_date, return_date)
        url = f'https://api.skypicker.com/flights?fly_from={origin}&fly_to={destination}&dateFrom={departure_date}&dateTo={return_date}&partner=picky'
        r = requests.get(url)
        data = r.json()
        return Response(data, status=status.HTTP_200_OK)

class SearchListView(ListCreateAPIView):
    # permission_classes=(IsAuthenticatedOrReadOnly, )
    queryset = Search.objects.all()
    serializer_class = SearchSerializer

class SearchDetailView(RetrieveUpdateDestroyAPIView):
    # permission_classes=(IsAuthenticatedOrReadOnly, )
    queryset = Search.objects.all()
    serializer_class = SearchSerializer