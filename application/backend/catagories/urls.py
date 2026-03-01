from django.urls import path
from catagories import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('api/catagories/', views.CatagoriesList.as_view()),
    path('api/catagories/<int:pk>/', views.CatagoriesDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)