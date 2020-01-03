from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, permissions, filters

from .models import Project
from .serializers import ProjectSerializer


class ProjectView(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['name', 'lead']
    search_fields = ['name']

    def get_queryset(self):
        return self.queryset.order_by('id')

    def perform_create(self, serializer):
        serializer.save(lead=self.request.user)
