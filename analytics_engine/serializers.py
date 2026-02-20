from rest_framework import serializers
from .models import PracticeSession


class PracticeSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PracticeSession
        fields = ['id', 'skill', 'hours', 'date']
        read_only_fields = ['date']


class DashboardSerializer(serializers.Serializer):
    dev_score = serializers.FloatField()
    total_practice_hours = serializers.FloatField()
    total_skills = serializers.IntegerField()
    completed_projects = serializers.IntegerField()
    strongest_skill = serializers.CharField(allow_null=True)
    weakest_skill = serializers.CharField(allow_null=True)
    average_project_difficulty = serializers.FloatField()

class LeaderboardSerializer(serializers.Serializer):
    rank = serializers.IntegerField()
    username = serializers.CharField()
    dev_score = serializers.FloatField()
    experience_years = serializers.IntegerField()

