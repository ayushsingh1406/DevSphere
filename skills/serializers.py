from rest_framework import serializers
from .models import Skill, UserSkill


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name', 'category']


class UserSkillSerializer(serializers.ModelSerializer):
    skill_detail = SkillSerializer(source='skill', read_only=True)

    class Meta:
        model = UserSkill
        fields = [
            'id',
            'skill',
            'skill_detail',
            'proficiency',
            'practice_hours',
            'last_practiced',
        ]
        read_only_fields = ['last_practiced']
