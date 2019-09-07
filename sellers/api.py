from projects.models import Project
from rest_framework import viewsets, permissions
from .serializers import SellerSerializer


class SellerViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = SellerSerializer
