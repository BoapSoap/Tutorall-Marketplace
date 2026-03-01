from django.db import models

from courses.models import Courses

# Create your models here.
class Catagories(models.Model):
    name = models.CharField(max_length=255,blank=False)
    courses = models.ForeignKey(Courses,on_delete=models.CASCADE)
