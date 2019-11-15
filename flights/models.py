from django.db import models

class Search(models.Model):
    user = models.CharField(max_length=50, default='undefined')
    origin = models.CharField(max_length=50)
    destination = models.CharField(max_length=50)
    departureDate = models.CharField(max_length=20)
    returnDate = models.CharField(max_length=20, default='undefined')

    def __str__(self):
        return f'{self.id} to {self.origin} by {self.user} '
