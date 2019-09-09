from rest_framework import viewsets, permissions
from .serializers import ProjectSerializer
from .models import Project


class ProjectView(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
