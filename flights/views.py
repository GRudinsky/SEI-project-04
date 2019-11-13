from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status 
import requests

class ListView(APIView):

    def get(self, request):
    #    to make your request to the external api
        # request.data
        # params = {
        #     title: req
        #     fly_from: VNO
        #     url: 'https://api.skypicker.com/flights?fly_from=VNO&fly_to=JP&dateFrom=18/11/2019&dateTo=19/11/2019&partner=picky'
        # }
        url = 'https://api.skypicker.com/flights?fly_from=VNO&fly_to=JP&dateFrom=18/11/2019&dateTo=19/11/2019&partner=picky'
        r = requests.get(url)
        data = r.json()
        return Response(data, status=status.HTTP_200_OK)