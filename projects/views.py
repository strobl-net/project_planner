from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, permissions, filters
from .serializers import ProjectSerializer
from .models import Project


class ProjectView(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['lead']
    search_fields = ['name', 'description']

    def get_queryset(self):
        return self.queryset

    def perform_create(self, serializer):
        serializer.save(lead=self.request.user)
