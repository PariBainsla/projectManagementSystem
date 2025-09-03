from django.contrib import admin
from .models import Organization, Project, Task, TaskComment

@admin.register(Organization)
class OrganizationAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "created_at")
    search_fields = ("name",)

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "organization", "created_by", "created_at")
    list_filter = ("organization", "created_by")
    search_fields = ("name", "description")

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "project", "assigned_to", "status", "due_date")
    list_filter = ("status", "priority") if "priority" in [f.name for f in Task._meta.fields] else ("status",)
    search_fields = ("title", "description")

@admin.register(TaskComment)
class TaskCommentAdmin(admin.ModelAdmin):
    list_display = ("id", "task", "author", "created_at")
    search_fields = ("content",)
