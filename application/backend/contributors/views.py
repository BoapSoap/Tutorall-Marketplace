from rest_framework import generics
from contributors.models import Contributors
from contributors.serializers import ContributorsSerializers
from rest_framework.permissions import AllowAny

# Create your views here.
class ContributorList(generics.ListAPIView):
    queryset = Contributors.objects.all()
    serializer_class = ContributorsSerializers
    permission_classes = [AllowAny]
    
class ContributorDetail(generics.RetrieveAPIView):
    queryset = Contributors.objects.all()
    serializer_class = ContributorsSerializers
    permission_classes = [AllowAny]