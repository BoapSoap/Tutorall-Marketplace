from rest_framework import generics
from professors.models import Professor
from professors.serializers import ProfessorsSerializers
from rest_framework.permissions import AllowAny

# Create your views here.
class ProfessorsList(generics.ListAPIView):
    queryset = Professor.objects.all()
    serializer_class = ProfessorsSerializers
    permission_classes = [AllowAny]
    
class ProfessorsDetail(generics.RetrieveAPIView):
    queryset = Professor.objects.all()
    serializer_class = ProfessorsSerializers
    permission_classes = [AllowAny]