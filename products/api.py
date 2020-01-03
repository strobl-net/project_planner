from rest_framework import viewsets, permissions

from projects.models import Project
from .serializers import ProductSerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ProductSerializer
