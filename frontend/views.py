from django.shortcuts import render

def admin_panel(request):
    return render(request, "admin_panel.html")

def login_view(request):
    return render(request, "login.html")


def dashboard_view(request):
    return render(request, "dashboard.html")

def leaderboard_view(request):
    return render(request, "leaderboard.html")

def register_view(request):
    return render(request, "register.html")

def profile_view(request):
    return render(request, "profile.html")

def skills_view(request):
    return render(request, "skills.html")

def projects_view(request):
    return render(request, "projects.html")