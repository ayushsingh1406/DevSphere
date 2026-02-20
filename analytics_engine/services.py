from skills.models import UserSkill
from accounts.models import User
from projects.models import Project

PROFICIENCY_WEIGHTS = {
    'beginner': 10,
    'intermediate': 25,
    'advanced': 50,
}


def calculate_dev_score(user):
    user_skills = UserSkill.objects.filter(user=user)
    user_projects = Project.objects.filter(user=user, status='completed')

    total_score = 0

    # Skill contribution
    for user_skill in user_skills:
        proficiency_weight = PROFICIENCY_WEIGHTS.get(
            user_skill.proficiency, 0
        )

        skill_score = (user_skill.practice_hours * 1.5) + proficiency_weight
        total_score += skill_score

    # Project contribution
    for project in user_projects:
        project_score = project.difficulty * 10
        total_score += project_score

    # Diversity bonus
    diversity_bonus = user_skills.count() * 5
    total_score += diversity_bonus
    total_score/=10

    return round(total_score, 2)



def update_user_dev_score(user):
    new_score = calculate_dev_score(user)
    user.dev_score = new_score
    user.save(update_fields=['dev_score'])

def get_level_data(dev_score):

    if dev_score <= 25:
        level = "Beginner"
        next_threshold = 25
    elif dev_score <= 50:
        level = "Builder"
        next_threshold = 50
    elif dev_score <= 75:
        level = "Architect"
        next_threshold = 75
    elif dev_score <= 100:
        level = "Engineer"
        next_threshold = 100
    else:
        level = "Master"
        next_threshold = None

    if next_threshold:
        progress = (dev_score / next_threshold) * 100
    else:
        progress = 100

    return {
        "level": level,
        "progress": round(progress, 2),
        "next_threshold": next_threshold
    }
