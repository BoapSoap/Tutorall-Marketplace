from django.urls import path
from adverts import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('api/adverts/', views.AdvertList.as_view()),
    path('api/adverts/<int:pk>/', views.AdvertDetail.as_view()),
    path('api/adverts/<int:pk>/remove_advert/', views.AdvertDelete.as_view()),
    path('api/adverts/<int:pk>/message/', views.MessagesCreate.as_view()),
    path('api/adverts/create/', views.AdvertCreation.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
