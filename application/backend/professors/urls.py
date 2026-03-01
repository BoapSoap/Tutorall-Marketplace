from django.urls import path
from professors import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('api/professors/', views.ProfessorsList.as_view()),
    path('api/professors/<int:pk>/', views.ProfessorsDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)