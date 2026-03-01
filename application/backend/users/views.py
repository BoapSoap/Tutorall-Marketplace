from rest_framework.response import Response
from rest_framework import generics, status
from users.models import Users
from users.serializers import UsersSerializers, AuthUserSerializer
from adverts.models import Adverts
from adverts.serializers import AdvertsSerializers
from users_messages.models import UsersMessages
from users_messages.serializers import MessagesSerializers
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth.models import User as AuthUser
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken

# Create your views here.
class UsersList(generics.ListAPIView):
    queryset = Users.objects.all()
    serializer_class = UsersSerializers
    permission_classes = [AllowAny]

class UsersDetail(generics.RetrieveAPIView):
    queryset = Users.objects.all()
    serializer_class = UsersSerializers
    permission_classes = [AllowAny]

class UserAdverts(generics.RetrieveAPIView):
    queryset = Users.objects.all()
    serializer_class = UsersSerializers
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = self.get_object()
        adverts = Adverts.objects.filter(users = user.id).order_by('-id')
        serializer = AdvertsSerializers(adverts, many=True)

        return Response(serializer.data)

class UserMessages(generics.RetrieveAPIView):
    queryset = Users.objects.all()
    serializer_class = UsersSerializers
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = self.get_object()
        adverts = UsersMessages.objects.filter(receiver = user.id).order_by('-id')
        serializer = MessagesSerializers(adverts, many=True)

        return Response(serializer.data)

class UserCreation(generics.CreateAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [AllowAny]
    queryset = AuthUser.objects.all()
    serializer_class = AuthUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        auth_user_bool = self.queryset.filter(email=email).exists()
        if auth_user_bool:
            return Response({'error': 'Account already exists.'}, status=status.HTTP_400_BAD_REQUEST)
        user = serializer.save()
        profile = Users.objects.create(account=user)
        token, created = Token.objects.get_or_create(user=user)
        profile_data = UsersSerializers(profile, many=False)
        content = {
            **profile_data.data,
            'token': token.key,
            'id': token.user_id
        }
        return Response(content,status=status.HTTP_200_OK)

class UserProfileCreation(generics.CreateAPIView):
    queryset = Users.objects.all()
    serializer_class = UsersSerializers
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.save(account=request.user)
        user_serializer = self.serializer_class(user, context={'request': request})
        return Response(user_serializer.data)

class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        profile = Users.objects.get(pk=user.pk)
        profile_data = UsersSerializers(profile, many=False)
        content = {
            **profile_data.data,
            'token': token.key,
        }
        return Response(content)


class ExampleView(generics.RetrieveAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        # This is a sample json to test the auth
        content = {
            'user': str(request.user),  # `django.contrib.auth.User` instance.
            'auth': str(request.auth),  # None
            'hello': str(request.user)
        }
        return Response(content)
