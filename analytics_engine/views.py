from rest_framework import viewsets, permissions
from django.utils.timezone import now
from .models import PracticeSession
from .serializers import PracticeSessionSerializer
from skills.models import UserSkill
from .services import update_user_dev_score
from django.db.models import Sum, Count, Avg
from rest_framework.views import APIView
from rest_framework.response import Response
from skills.models import UserSkill
from projects.models import Project
from .serializers import DashboardSerializer
from accounts.models import User
from analytics_engine.services import get_level_data


class PracticeSessionViewSet(viewsets.ModelViewSet):
    serializer_class = PracticeSessionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return PracticeSession.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        skill = serializer.validated_data['skill']
        hours = serializer.validated_data['hours']

        # Save PracticeSession
        practice_session = serializer.save(user=self.request.user)

        # Update or create UserSkill
        user_skill, created = UserSkill.objects.get_or_create(
            user=self.request.user,
            skill=skill,
            defaults={
                'proficiency': 'beginner',
                'practice_hours': 0
            }
        )

        # Update skill stats
        user_skill.practice_hours += hours
        user_skill.last_practiced = now().date()
        user_skill.save()

        # Update DevScore
        update_user_dev_score(self.request.user)


class DashboardView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user

        user_skills = UserSkill.objects.filter(user=user)

        completed_projects = Project.objects.filter(
            user=user,
            status='completed'
        )

        # =============================
        # Skill Stats
        # =============================
        skill_stats = user_skills.aggregate(
            total_hours=Sum('practice_hours'),
            total_skills=Count('id')
        )

        total_hours = skill_stats['total_hours'] or 0
        total_skills = skill_stats['total_skills'] or 0

        # =============================
        # Project Stats
        # =============================
        project_stats = completed_projects.aggregate(
            completed_count=Count('id'),
            avg_difficulty=Avg('difficulty')
        )

        completed_count = project_stats['completed_count'] or 0
        avg_difficulty = project_stats['avg_difficulty'] or 0

        # =============================
        # Strongest & Weakest Skill
        # =============================
        skills_list = list(user_skills)

        if skills_list:
            strongest_skill = max(
                skills_list, key=lambda s: s.practice_hours
            ).skill.name

            weakest_skill = min(
                skills_list, key=lambda s: s.practice_hours
            ).skill.name
        else:
            strongest_skill = None
            weakest_skill = None

        # =============================
        # GAMIFICATION — LEVEL SYSTEM
        # =============================
        level_data = get_level_data(user.dev_score)

        # =============================
        # Response Data
        # =============================
        data = {
            "dev_score": user.dev_score,
            "total_practice_hours": total_hours,
            "total_skills": total_skills,
            "completed_projects": completed_count,
            "strongest_skill": strongest_skill,
            "weakest_skill": weakest_skill,
            "average_project_difficulty": round(avg_difficulty, 2),

            # Gamification Fields
            "level": level_data["level"],
            "level_progress": level_data["progress"],
            "next_threshold": level_data["next_threshold"],
        }

        return Response(data)


class LeaderboardView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        top_n = int(request.query_params.get('top', 10))

        users = User.objects.order_by('-dev_score')[:top_n]

        leaderboard_data = []
        rank = 1

        for user in users:
            leaderboard_data.append({
                "rank": rank,
                "username": user.username,
                "dev_score": user.dev_score,
                "experience_years": user.experience_years,
            })
            rank += 1

        return Response(leaderboard_data)
