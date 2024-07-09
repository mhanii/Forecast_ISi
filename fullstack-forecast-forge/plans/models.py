from django.db import models
from django.conf import settings

class Plan(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=50)
    location = models.CharField(max_length=50)
    date = models.DateTimeField()

    def __str__(self):
        return self.name
