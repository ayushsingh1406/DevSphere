from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SkillViewSet, UserSkillViewSet

router = DefaultRouter()
router.register(r'skills', SkillViewSet)
router.register(r'user-skills', UserSkillViewSet, basename='user-skills')

urlpatterns = [
    path('', include(router.urls)),
]
