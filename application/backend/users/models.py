from django.db import models
from django.contrib.auth.models import User as AuthUser
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

# Create your models here.
class Users(models.Model):
    account = models.OneToOneField(AuthUser, on_delete=models.CASCADE)
    bio = models.TextField(max_length=255, blank=True,null=True, default='')
    education = models.CharField(max_length=255,blank=True,null=True, default='')
    location = models.CharField(max_length=255,blank=True,null=True, default='')
    profile_picture = models.ImageField(upload_to='users/images/',blank=True,null=True, default='')
    links = models.JSONField(blank=True,null=True,default=dict)

    def __str__(self):
        return self.account.username

@receiver(post_save, sender=AuthUser)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
