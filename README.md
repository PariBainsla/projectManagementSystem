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

## ⚙️ Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/PariBainsla/projectManagementSystem.git

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

cd projectManagementSystem

