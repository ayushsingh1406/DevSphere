from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login_view),
    path('dashboard/', views.dashboard_view),
    path('leaderboard/', views.leaderboard_view),
    path('register/', views.register_view),
    path('profile/', views.profile_view),
    path('skills/', views.skills_view),
    path('projects/', views.projects_view),
    path('admin-panel/', views.admin_panel, name='admin-panel'),
]
