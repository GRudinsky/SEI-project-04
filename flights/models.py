# pylint: disable=no-member
from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()

class Search(models.Model):

    origin = models.CharField(max_length=50)
    destination = models.CharField(max_length=50)
    departureDate = models.CharField(max_length=20)
    returnDate = models.CharField(max_length=20, blank=True)
    user = models.ForeignKey(
        User,
        related_name='searches',
        on_delete=models.DO_NOTHING,
        blank=True,
        default=0
    )

    def __str__(self):
        return f'{self.id} to {self.origin} by {self.user} '
