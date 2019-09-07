from projects.models import Project
from rest_framework import viewsets, permissions
from .serializers import ProductSerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ProductSerializer
