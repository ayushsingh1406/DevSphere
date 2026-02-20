from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PracticeSessionViewSet
from .views import DashboardView
from .views import LeaderboardView



router = DefaultRouter()
router.register(r'practice', PracticeSessionViewSet, basename='practice')

urlpatterns = [
    path('', include(router.urls)),
    path('dashboard/', DashboardView.as_view(), name='dashboard'),
    path('leaderboard/', LeaderboardView.as_view(), name='leaderboard'),
]


