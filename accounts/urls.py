from django.urls import path
from .views import RegisterView, ProfileView
from .views import DeleteAccountView
from .views import (
    AdminUserListView,
    AdminUserUpdateView,
    AdminUserDeleteView
)


urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('delete/', DeleteAccountView.as_view(), name='delete-account'),
    path('admin/users/', AdminUserListView.as_view()),
    path('admin/users/<int:pk>/', AdminUserUpdateView.as_view()),
    path('admin/users/<int:pk>/delete/', AdminUserDeleteView.as_view()),
]
