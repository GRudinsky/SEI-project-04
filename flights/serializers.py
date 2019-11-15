# pylint: disable=no-member,arguments-differ
from rest_framework import serializers
from .models import Search

class SearchSerializer(serializers.ModelSerializer):

    class Meta:
        model = Search
        fields = ('id', 'user', 'origin', 'destination', 'departureDate', 'returnDate')