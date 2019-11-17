#pylint: disable=no-member
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_204_NO_CONTENT
from rest_framework import status
from .models import Search
from .serializers import SearchSerializer, PopulatedSearchSerializer
import requests

class ListView(APIView):

    def post(self, request):
        data = request.data
        origin = data.pop('origin')
        destination = data.pop('destination')
        departure_date = data.pop('departureDate')
        return_date = data.pop('returnDate')
        currency = data.pop('currency')
        print(origin, destination, departure_date, return_date, currency)
        url = f'https://api.skypicker.com/flights?fly_from={origin}&fly_to={destination}&dateFrom={departure_date}&dateTo={return_date}&curr={currency}&partner=picky'
        r = requests.get(url)
        data = r.json()
        return Response(data, status=status.HTTP_200_OK)

class SearchListView(APIView):
   
    def get(self, _request): # method to handle GET requests to the list view, the INDEX
        searches = Search.objects.all() # get all the posts from the DB
        serialized_searches = PopulatedSearchSerializer (searches, many=True) # serialise those posts into JSON, letting it know to expect a list of posts as this is an INDEX route!!!!!
        return Response(serialized_searches.data) # send that serialised list

    def post(self, request): 
        if request.user.id:
            request.data['user'] = request.user.id # adding the id of user that performed the search
        else:
            request.data['user'] = 1 # if search was done without registration, dummy user is attached to search
        search = SearchSerializer(data=request.data) # we pass the data we have been send with the request(the json body of the POST request to '/posts', which should contain a valid object with all the correct fields)
        if search.is_valid(): # we can then use this in built is valid function, to see if your request data was right, and included everything it needed to
            search.save() # If is valid comes back as true, we save the post. This creates it in the database
            return Response(search.data, status=HTTP_201_CREATED) # we then send back the newly created post in the response to client, the data object of the post is the JSON data
        return Response(search.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

class SearchDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Search.objects.all()
    serializer_class = SearchSerializer