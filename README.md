# 🚀 DevSphere — Developer Growth Tracking Platform

## 📌 Overview

**DevSphere** is a full-stack developer productivity and growth tracking platform built using **Django** and **Django REST Framework (DRF)**.

It allows developers to:

- Track skills and practice hours
- Manage development projects
- Calculate a dynamic DevScore
- View leaderboard rankings
- Experience gamified progression (levels & score system)
- Enable admin-level user control with impersonation

The platform follows a modular architecture with clear separation between apps and responsibilities.

---

## 🏗️ Tech Stack

### Backend
- Django 5.x
- Django REST Framework
- SimpleJWT Authentication
- SQLite (development)
- Django Filters
- DRF-YASG (Swagger API docs)

### Frontend
- Django Templates
- Vanilla JavaScript (modular structure)
- Bootstrap 5
- Chart.js (data visualization)

---

## ✨ Core Features

### 👤 User System
- JWT Authentication
- Custom User model
- Experience tracking
- GitHub username integration
- Dynamic DevScore calculation

---

### 🧠 Skills Management
- Create global skills
- Assign skills to users
- Track proficiency level
- Track practice hours
- Auto-update DevScore

---

### 📦 Projects Management
- Create projects
- Set difficulty (1–5 scale)
- Track status (Planned / In Progress / Completed)
- Dynamic DevScore updates
- Inline status editing
- Color-coded project states

---

### 📊 Analytics Engine
- Total practice hours
- Total skills
- Completed projects
- Strongest skill
- Weakest skill
- Average project difficulty
- Dev Level system
- Progress bar visualization
- Leaderboard ranking

---

### 🏆 Gamification
- DevScore system
- Level progression
- Practice-based growth model
- Leaderboard competition

---

### 🛡️ Admin Control Panel
- View all users
- Edit user experience & GitHub username
- Delete users (except self-protection)
- Impersonate users securely
- Full system visibility

---

## 🗂️ Project Structure

# 🚀 DevSphere — Developer Growth Tracking Platform

## 📌 Overview

**DevSphere** is a full-stack developer productivity and growth tracking platform built using **Django** and **Django REST Framework (DRF)**.

It allows developers to:

- Track skills and practice hours
- Manage development projects
- Calculate a dynamic DevScore
- View leaderboard rankings
- Experience gamified progression (levels & score system)
- Enable admin-level user control with impersonation

The platform follows a modular architecture with clear separation between apps and responsibilities.

---

## 🏗️ Tech Stack

### Backend
- Django 5.x
- Django REST Framework
- SimpleJWT Authentication
- SQLite (development)
- Django Filters
- DRF-YASG (Swagger API docs)

### Frontend
- Django Templates
- Vanilla JavaScript (modular structure)
- Bootstrap 5
- Chart.js (data visualization)

---

## ✨ Core Features

### 👤 User System
- JWT Authentication
- Custom User model
- Experience tracking
- GitHub username integration
- Dynamic DevScore calculation

---

### 🧠 Skills Management
- Create global skills
- Assign skills to users
- Track proficiency level
- Track practice hours
- Auto-update DevScore

---

### 📦 Projects Management
- Create projects
- Set difficulty (1–5 scale)
- Track status (Planned / In Progress / Completed)
- Dynamic DevScore updates
- Inline status editing
- Color-coded project states

---

### 📊 Analytics Engine
- Total practice hours
- Total skills
- Completed projects
- Strongest skill
- Weakest skill
- Average project difficulty
- Dev Level system
- Progress bar visualization
- Leaderboard ranking

---

### 🏆 Gamification
- DevScore system
- Level progression
- Practice-based growth model
- Leaderboard competition

---

### 🛡️ Admin Control Panel
- View all users
- Edit user experience & GitHub username
- Delete users (except self-protection)
- Impersonate users securely
- Full system visibility

---

## 🗂️ Project Structure

devsphere/
│
├── core/ # Django project configuration
├── accounts/ # Custom user & admin control
├── skills/ # Skill management
├── projects/ # Project management
├── analytics_engine/ # DevScore & analytics logic
├── frontend/ # Templates + static files
├── manage.py
└── db.sqlite3


---

## 🔐 Role-Based Access

| Role        | Capabilities |
|------------|-------------|
| User       | Manage skills, projects, practice |
| Admin      | Full user management |
| Superuser  | Complete system control |

---

## 🧮 DevScore Logic (High-Level)

DevScore is calculated dynamically based on:

- Total practice hours
- Skill proficiency
- Project difficulty
- Completed projects

It updates automatically whenever:
- A practice session is added
- A project is completed
- Skill data changes






