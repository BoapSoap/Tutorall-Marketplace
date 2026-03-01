from django.db import models

# Create your models here.
class Professor(models.Model):
    name = models.CharField(max_length=255,null=True,blank=True)
