import graphene
from graphene_django import DjangoObjectType
from .models import Organization, Project, Task, TaskComment

# ========================
# GraphQL Types
# ========================
class OrganizationType(DjangoObjectType):
    class Meta:
        model = Organization
        fields = ("id", "name", "description", "created_at")

class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = (
            "id",
            "organization",
            "name",
            "description",
            "status",
            "due_date",
            "created_by",
            "created_at",
            "tasks",   
        )
class TaskType(DjangoObjectType):
    class Meta:
        model = Task
        fields = ("id", "project", "title", "description", "status", "priority", "assigned_to", "due_date", "created_at")

class TaskCommentType(DjangoObjectType):
    class Meta:
        model = TaskComment
        fields = ("id", "task", "author", "content", "created_at")


# ========================
# Queries
# ========================
class Query(graphene.ObjectType):
    all_organizations = graphene.List(OrganizationType)
    all_projects = graphene.List(ProjectType)
    all_tasks = graphene.List(TaskType)
    all_comments = graphene.List(TaskCommentType)

    def resolve_all_organizations(root, info):
        return Organization.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_all_tasks(root, info):
        return Task.objects.all()

    def resolve_all_comments(root, info):
        return TaskComment.objects.all()


# ========================
# Mutations
# ========================
class CreateOrganization(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        description = graphene.String()

    organization = graphene.Field(OrganizationType)

    def mutate(self, info, name, description=None):
        org = Organization.objects.create(name=name, description=description)
        return CreateOrganization(organization=org)


class UpdateOrganization(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        name = graphene.String()
        description = graphene.String()

    organization = graphene.Field(OrganizationType)

    def mutate(self, info, id, name=None, description=None):
        org = Organization.objects.get(id=id)
        if name:
            org.name = name
        if description:
            org.description = description
        org.save()
        return UpdateOrganization(organization=org)


class DeleteOrganization(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)

    ok = graphene.Boolean()

    def mutate(self, info, id):
        org = Organization.objects.get(id=id)
        org.delete()
        return DeleteOrganization(ok=True)


# Repeat same structure for Project, Task, TaskComment

class CreateProject(graphene.Mutation):
    class Arguments:
        organization_id = graphene.Int(required=True)
        name = graphene.String(required=True)
        description = graphene.String()

    project = graphene.Field(ProjectType)

    def mutate(self, info, organization_id, name, description=None):
        organization = Organization.objects.get(id=organization_id)
        project = Project.objects.create(
            organization=organization,
            name=name,
            description=description,
            created_by=info.context.user if info.context.user.is_authenticated else None
        )
        return CreateProject(project=project)


class UpdateProject(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        name = graphene.String()
        description = graphene.String()

    project = graphene.Field(ProjectType)

    def mutate(self, info, id, name=None, description=None):
        project = Project.objects.get(id=id)
        if name:
            project.name = name
        if description:
            project.description = description
        project.save()
        return UpdateProject(project=project)


class DeleteProject(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)

    ok = graphene.Boolean()

    def mutate(self, info, id):
        project = Project.objects.get(id=id)
        project.delete()
        return DeleteProject(ok=True)


class CreateTask(graphene.Mutation):
    class Arguments:
        project_id = graphene.Int(required=True)
        title = graphene.String(required=True)
        description = graphene.String()
        status = graphene.String()
        priority = graphene.String()

    task = graphene.Field(TaskType)

    def mutate(self, info, project_id, title, description=None, status="TODO", priority="MEDIUM"):
        project = Project.objects.get(id=project_id)
        task = Task.objects.create(
            project=project,
            title=title,
            description=description,
            status=status,
            priority=priority,
            assigned_to=info.context.user if info.context.user.is_authenticated else None
        )
        return CreateTask(task=task)


class UpdateTask(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        title = graphene.String()
        description = graphene.String()
        status = graphene.String()
        priority = graphene.String()

    task = graphene.Field(TaskType)

    def mutate(self, info, id, title=None, description=None, status=None, priority=None):
        task = Task.objects.get(id=id)
        if title:
            task.title = title
        if description:
            task.description = description
        if status:
            task.status = status
        if priority:
            task.priority = priority
        task.save()
        return UpdateTask(task=task)


class DeleteTask(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)

    ok = graphene.Boolean()

    def mutate(self, info, id):
        task = Task.objects.get(id=id)
        task.delete()
        return DeleteTask(ok=True)


class CreateTaskComment(graphene.Mutation):
    class Arguments:
        task_id = graphene.Int(required=True)
        content = graphene.String(required=True)

    comment = graphene.Field(TaskCommentType)

    def mutate(self, info, task_id, content):
        task = Task.objects.get(id=task_id)
        comment = TaskComment.objects.create(
            task=task,
            author=info.context.user if info.context.user.is_authenticated else None,
            content=content
        )
        return CreateTaskComment(comment=comment)


class DeleteTaskComment(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)

    ok = graphene.Boolean()

    def mutate(self, info, id):
        comment = TaskComment.objects.get(id=id)
        comment.delete()
        return DeleteTaskComment(ok=True)


class Mutation(graphene.ObjectType):
    create_organization = CreateOrganization.Field()
    update_organization = UpdateOrganization.Field()
    delete_organization = DeleteOrganization.Field()

    create_project = CreateProject.Field()
    update_project = UpdateProject.Field()
    delete_project = DeleteProject.Field()

    create_task = CreateTask.Field()
    update_task = UpdateTask.Field()
    delete_task = DeleteTask.Field()

    create_task_comment = CreateTaskComment.Field()
    delete_task_comment = DeleteTaskComment.Field()
