# pylint: disable=no-member,arguments-differ
from rest_framework.authentication import BasicAuthentication
from rest_framework.exceptions import PermissionDenied #for errors
from django.contrib.auth import get_user_model
from django.conf import settings # secret_key is already prepoppulated in setings
import jwt
User = get_user_model()

class JWTAuthentication(BasicAuthentication):

    def authenticate(self, request):
        header = request.headers.get('Authorization')

        if not header:
            return None

        if not header.startswith('Bearer'):
            raise PermissionDenied({'message': 'Invalid Authorization Header'})

        token = header.replace('Bearer ', '')

        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            user = User.objects.get(pk=payload.get('sub'))
        except jwt.exceptions.InvalidTokenError:
            raise PermissionDenied({'message': 'Invalid Token'})
        except User.DoesNotExist:
            raise PermissionDenied({'message': 'User not found'})

        return (user, token)  # user by default gets stored on request.user, token stored on request.auth
