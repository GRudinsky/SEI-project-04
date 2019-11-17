from django.db import models
from django.db import models
from django.contrib.auth.models import AbstractUser
# from flights.models import Search

class User(AbstractUser):

    country = models.CharField(max_length=50, blank=True)
