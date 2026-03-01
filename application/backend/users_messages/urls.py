from django.urls import path
from users_messages import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('api/messages/', views.MessagesList.as_view()),
    path('api/messages/<int:pk>/', views.MessagesDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)