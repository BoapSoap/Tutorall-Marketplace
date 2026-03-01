from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.filters import OrderingFilter, SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, status
from adverts.models import Adverts
from adverts.serializers import AdvertsSerializers
from adverts.filters import AdvertsFilter
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from django.contrib.auth.models import User as AuthUser
from users.models import Users
from courses.models import Courses
from catagories.models import Catagories
from files.models import Files
from users_messages.models import UsersMessages
from users_messages.serializers import MessagesSerializers

# Create your views here.
class AdvertList(generics.ListAPIView):
    queryset = Adverts.objects.all()
    serializer_class = AdvertsSerializers
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    filterset_class = AdvertsFilter
    ordering_fields = ['price_range']
    search_fields = ['courses__professor__name']
    permission_classes = [AllowAny]

class AdvertDetail(generics.RetrieveAPIView):
    queryset = Adverts.objects.all()
    serializer_class = AdvertsSerializers
    permission_classes = [AllowAny]


class AdvertDelete(generics.RetrieveAPIView):
    queryset = Adverts.objects.all()
    serializer_class = AdvertsSerializers
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        advert = self.get_object()
        try:
            advert.delete()
            return Response("Object deleted.")
        except Exception as e:
            raise e

        return Response("Object failed to delete.")

class AdvertCreation(generics.CreateAPIView):
    queryset = Adverts.objects.all()
    serializer_class = AdvertsSerializers
    permission_classes = [AllowAny]


    def post(self, request, *args, **kwargs):
        instance = Adverts(
                users=Users.objects.get(id=request.user.id),
                description=request.data.get("description"),
                location=request.data.get("location"),
                price_range=request.data.get("price_range")
            )

        instance.save()

        for course in request.data.get("courses"):
            instance.courses.add(Courses.objects.get(id=course))

        for catagory in request.data.get("catagories"):
            instance.catagories.add(Catagories.objects.get(id=catagory))

        for file in request.data.get("files"):
            instance.files.add(Files.objects.get(id=file))

        return Response(self.serializer_class(instance).data, status=status.HTTP_201_CREATED)


class MessagesCreate(generics.RetrieveAPIView):
    queryset = Adverts.objects.all()
    serializer_class = AdvertsSerializers
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        advert = self.get_object()
        instance = UsersMessages(
            contents=request.data.get("contents"),
            read=False,
            sender=Users.objects.get(id=request.user.id),
            receiver=advert.users,
            advert=advert
        )

        instance.save()

        return Response(MessagesSerializers(instance).data)
