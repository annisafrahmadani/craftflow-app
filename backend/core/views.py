from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import (
    Project,
    Task,
    JobApplication
)

from .serializers import (
    ProjectSerializer,
    TaskSerializer,
    JobApplicationSerializer
)

@api_view(['GET'])
def dashboard(request):
    projects = Project.objects.all()
    tasks = Task.objects.all()
    jobs = JobApplication.objects.all()

    return Response({
        "projects": ProjectSerializer(projects, many=True).data,
        "tasks": TaskSerializer(tasks, many=True).data,
        "jobs": JobApplicationSerializer(jobs, many=True).data,
        "activities": []  # nanti kita bikin tabel activity
    })

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class JobApplicationViewSet(viewsets.ModelViewSet):
    queryset = JobApplication.objects.all()
    serializer_class = JobApplicationSerializer
    