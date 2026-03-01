from django.db import models
from rest_framework import serializers
# Create your models here.
class Contributors(models.Model):
    name = models.CharField(max_length=255,blank=False)
    role = models.CharField(max_length=255,blank=False)
    image = models.ImageField(upload_to='contributors/images/',blank=True)
    bio = models.TextField(max_length=255, blank=False)
    links = models.JSONField()
