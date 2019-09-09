from rest_framework import viewsets, permissions
from .serializers import ProjectSerializer
from .models import Project


class ProjectView(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def get_queryset(self):
        return self.queryset

    def perform_create(self, serializer):
        serializer.save(lead=self.request.user)
