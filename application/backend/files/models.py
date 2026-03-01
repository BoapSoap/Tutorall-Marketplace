from django.db import models
from django.core.validators import FileExtensionValidator
from django.utils import timezone

from users.models import Users

# Create your models here.
class Files(models.Model):
    name = models.CharField(null=False, blank=False, max_length=255)
    file_type = models.FileField(blank=True, validators=[FileExtensionValidator(['pdf','png','jpeg'])],upload_to='files/')
    uploader = models.ForeignKey(Users, on_delete=models.CASCADE)
    upload_date = models.DateTimeField(default=timezone.now)
