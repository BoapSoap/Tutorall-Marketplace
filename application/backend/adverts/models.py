from django.db import models
from users.models import Users
from courses.models import Courses
from files.models import Files

# Create your models here.
class Adverts(models.Model):
    users = models.ForeignKey(Users,on_delete=models.CASCADE)
    description = models.TextField(null=True,blank=False)
    courses = models.ManyToManyField(Courses)
    catagories = models.ManyToManyField('catagories.catagories', related_name='course_catagory')
    location = models.CharField(max_length=255)
    price_range = models.DecimalField(null=False,blank=False,decimal_places=2,max_digits=65)
    files = models.ManyToManyField(Files)
    verified = models.BooleanField(default=False)
