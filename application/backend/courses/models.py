from django.db import models

# Create your models here.
class Courses(models.Model):
    name = models.CharField(max_length=255,null=False,blank=False)
    professor = models.ManyToManyField('professors.professor', related_name='professors_courses')
