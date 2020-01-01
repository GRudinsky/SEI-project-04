# pylint: disable=no-member,arguments-differ
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Search, Proxy_Search
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username')


class SearchSerializer(serializers.ModelSerializer):

    class Meta:
        model = Search
        fields = ('id', 'user', 'origin', 'destination', 'departureDate', 'returnDate')
        extra_kwargs = {'user': {'required': False}}

class ProxySearchSerializer(serializers.ModelSerializer):

    class Meta:
        model = Proxy_Search
        fields = ('origin', 'destination', 'departure_date', 'return_date', 'currency')

class PopulatedSearchSerializer(SearchSerializer):

    user = UserSerializer()
    