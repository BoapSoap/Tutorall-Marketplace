from rest_framework import generics
from users_messages.models import UsersMessages
from users_messages.serializers import MessagesSerializers

# Create your views here.
class MessagesList(generics.ListAPIView):
    queryset = UsersMessages.objects.all()
    serializer_class = MessagesSerializers

class MessagesDetail(generics.RetrieveAPIView):
    queryset = UsersMessages.objects.all()
    serializer_class = MessagesSerializers
