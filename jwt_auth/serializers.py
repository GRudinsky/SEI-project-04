#pylint: disable = no-member, arguments-differ
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
import django.contrib.auth.password_validation as validations
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError
from django.apps import apps
User = get_user_model()
Search = apps.get_model('flights','Search')


class SearchSerializer(serializers.ModelSerializer):

    class Meta:
        model = Search
        fields = ('id', 'origin', 'destination', 'departureDate', 'returnDate')

class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)
    searches = SearchSerializer(many=True, required=False)


    def validate(self, data):

        password = data.pop('password')
        password_confirmation = data.pop('password_confirmation')

        if password != password_confirmation:
            raise ValidationError({'password_confirmation': 'does not match'})

        try:  #commented out common password validations
            validations.validate_password(password=password)
        except ValidationError as err:
            raise serializers.ValidationError({'password': err.messages})

        data['password'] = make_password(password)
        return data

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password_confirmation', 'country', 'searches')
        extra_kwargs = {'searches': {'required': False}}
