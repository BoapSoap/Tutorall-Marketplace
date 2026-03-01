from django.urls import path
from courses import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('api/courses/', views.CoursesList.as_view()),
    path('api/courses/<int:pk>/', views.CoursesDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)