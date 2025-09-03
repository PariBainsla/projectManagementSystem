# Mini Project Management System

A simplified multi-tenant project management system built with **Django (GraphQL)** and **React (TypeScript, Apollo, Tailwind)**.

---

## 🚀 Tech Stack
- **Backend:** Django 4.x, Graphene-Django, PostgreSQL
- **Frontend:** React 18+, TypeScript, Apollo Client, TailwindCSS
- **Database:** PostgreSQL

---

## ⚙️ Setup Instructions

### 1. Backend (Django + PostgreSQL)
```bash
cd backend
python -m venv venv
source venv/bin/activate   # (Windows: venv\Scripts\activate)
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start server
python manage.py runserver
