from rest_framework import generics
from courses.models import Courses
from courses.serializers import CoursesSerializers
from rest_framework.permissions import AllowAny

# Create your views here.
class CoursesList(generics.ListAPIView):
    queryset = Courses.objects.all()
    serializer_class = CoursesSerializers
    permission_classes = [AllowAny]
    
class CoursesDetail(generics.RetrieveAPIView):
    queryset = Courses.objects.all()
    serializer_class = CoursesSerializers
    permission_classes = [AllowAny]