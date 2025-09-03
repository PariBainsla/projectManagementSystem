# Mini Project Management System

A simplified **multi-tenant project management system** built with **Django (GraphQL)** for the backend and **React (TypeScript + Apollo + TailwindCSS)** for the frontend.  

This project was built as part of the **Software Engineer Screening Task**.  

---

## ✨ Features

### Backend (Django + GraphQL)
- Core data models:
  - **Organization** → multi-tenant support
  - **Project** → tied to organizations
  - **Task** → tied to projects
  - **TaskComment** → tied to tasks
- GraphQL API:
  - CRUD for projects and tasks  
  - Comment system for tasks  
  - Project statistics (task counts, completion rates)  
- Multi-tenancy:
  - All queries/mutations scoped by `organizationId`

### Frontend (React + TypeScript)
- Project Dashboard:
  - List projects with status indicators  
  - Create/edit project form with validation  
- Task Management:
  - Task list view / board  
  - Add/edit tasks and update status  
  - Comment system for tasks  
- GraphQL Integration:
  - Apollo Client setup  
  - Optimistic updates for smooth UX  
  - Cache management and error handling  
- UI:
  - TailwindCSS for styling  
  - TypeScript interfaces  
  - Loading/error states  
  - Responsive design  

---

## 🧱 Tech Stack

- **Backend:** Django 5, Graphene-Django, psycopg, Django Admin  
- **Frontend:** React 18, TypeScript, Apollo Client, TailwindCSS  
- **Database:** PostgreSQL (local or Docker)

---

## Project Structure

projectManagementSystem/
├─ backend/
│  ├─ backend/        # Django settings, urls, schema
│  ├─ core/           # models, schema, admin
│  ├─ manage.py
│
├─ frontend/          # React app 
├─ screenshots/       
├─ README.md

---

## Screenshots

---

## Backend Setup

cd backend

# Create and activate virtual environment
python -m venv venv
# Windows
venv\Scripts\activate
# Mac/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

---

## Configure PostgreSQL in backend/settings.py:

DATABASES = {
  "default": {
    "ENGINE": "django.db.backends.postgresql",
    "NAME": "project_db",
    "USER": "postgres",
    "PASSWORD": "postsql",
    "HOST": "localhost",
    "PORT": "5432",
  }
}

---

## Terminal Code

# Run migrations
python manage.py makemigrations

python manage.py migrate

GraphQL Playground → http://127.0.0.1:8000/graphql/

Django Admin → http://127.0.0.1:8000/admin/

# Create superuser
python manage.py createsuperuser

# Start development server
python manage.py runserver

---

## Example GraphQL Queries

# List all projects

query {
  allProjects {
    id
    name
    status
    organization { id name }
  }
}

# Create a project

mutation {
  createProject(organizationId: 1, name: "Test Project", description: "Demo") {
    project {
      id
      name
      description
      createdAt
    }
  }
}

# Add a task

mutation {
  createTask(projectId: 1, title: "First Task", status: "TODO") {
    task {
      id
      title
      status
    }
  }
}

# Comment on a task

mutation {
  createTaskComment(taskId: 1, content: "Finish by EOD") {
    comment {
      id
      content
      createdAt
    }
  }
}


cd projectManagementSystem

