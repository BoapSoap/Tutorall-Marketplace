from django.urls import path
from contributors import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('api/contributors/', views.ContributorList.as_view()),
    path('api/contributors/<int:pk>/', views.ContributorDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)