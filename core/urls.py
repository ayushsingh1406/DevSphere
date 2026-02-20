from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('frontend.urls')),

    # JWT Auth
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # App Routes
    path('api/accounts/', include('accounts.urls')),
    path('api/skills/', include('skills.urls')),
    path('api/projects/', include('projects.urls')),
    path('api/analytics/', include('analytics_engine.urls')),
]
