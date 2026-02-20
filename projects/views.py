from rest_framework import viewsets, permissions
from .models import Project
from .serializers import ProjectSerializer
from analytics_engine.services import update_user_dev_score


class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Project.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        project = serializer.save(user=self.request.user)
        update_user_dev_score(self.request.user)

    def perform_update(self, serializer):
        project = serializer.save()
        update_user_dev_score(self.request.user)
