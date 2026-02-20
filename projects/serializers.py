from rest_framework import serializers
from .models import Project
from skills.models import Skill


class ProjectSerializer(serializers.ModelSerializer):
    skills = serializers.PrimaryKeyRelatedField(
        queryset=Skill.objects.all(),
        many=True,
        required=False
    )

    class Meta:
        model = Project
        fields = [
            'id',
            'name',
            'description',
            'difficulty',
            'status',
            'skills',
            'created_at'
        ]
        read_only_fields = ['created_at']
        extra_kwargs = {
            'description': {'required': False}
        }