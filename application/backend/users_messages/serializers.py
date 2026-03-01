from rest_framework import serializers
from users_messages.models import UsersMessages
from adverts.serializers import AdvertsSerializers
from users.serializers import UsersSerializers

class MessagesSerializers(serializers.ModelSerializer):
    advert = AdvertsSerializers(read_only=True,fields={'id'})
    sender = UsersSerializers(read_only=True,fields={'account'})

    class Meta:
        model = UsersMessages
        fields = ('id','contents','timestamp','read','sender','receiver', 'advert')
