# pylint: disable=no-member,arguments-differ
from rest_framework import serializers
from .models import Search
from django.contrib.auth import get_user_model
User = get_user_model()
 
class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id','username')


class SearchSerializer(serializers.ModelSerializer):

    class Meta:
        model = Search
        fields = ('id', 'user', 'origin', 'destination', 'departureDate', 'returnDate')
        extra_kwargs = {'user': {'required': False}}

class PopulatedSearchSerializer(SearchSerializer):

    user = UserSerializer()