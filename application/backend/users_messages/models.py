from django.db import models
from django.utils import timezone

from files.models import Files
from users.models import Users
from adverts.models import Adverts

# Create your models here.
class UsersMessages(models.Model):
    contents = models.TextField(null=False, blank=False)
    timestamp = models.DateTimeField(default=timezone.now)
    read = models.BooleanField()
    sender = models.ForeignKey(Users, on_delete=models.CASCADE,related_name='user_message_sender')
    receiver = models.ForeignKey(Users, on_delete=models.CASCADE,related_name='user_message_receiver')
    advert = models.ForeignKey(Adverts, on_delete=models.CASCADE)
