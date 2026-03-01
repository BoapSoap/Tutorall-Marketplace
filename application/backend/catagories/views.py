from rest_framework import generics
from catagories.models import Catagories
from catagories.serializers import CatagoriesSerializers
from rest_framework.permissions import AllowAny

# Create your views here.
class CatagoriesList(generics.ListAPIView):
    queryset = Catagories.objects.all()
    serializer_class = CatagoriesSerializers
    permission_classes = [AllowAny]
    
class CatagoriesDetail(generics.RetrieveAPIView):
    queryset = Catagories.objects.all()
    serializer_class = CatagoriesSerializers
    permission_classes = [AllowAny]