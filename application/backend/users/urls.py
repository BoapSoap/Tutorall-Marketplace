from django.urls import path
from users import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('api/users/', views.UsersList.as_view()),
    path('api/users/<int:pk>/', views.UsersDetail.as_view()),
    path('api/users/<int:pk>/adverts/', views.UserAdverts.as_view()),
    path('api/users/<int:pk>/messages/', views.UserMessages.as_view()),
    path('api/users/register/', views.UserCreation.as_view()),
    path('api/users/dashboard/', views.ExampleView.as_view()),
    path('api/users/profile/create/',views.UserProfileCreation.as_view()),
    path('api/token-auth/', views.CustomAuthToken.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
