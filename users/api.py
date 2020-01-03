from django.contrib.auth.models import User
from rest_framework import viewsets, permissions

from .serializers import UserSerializer


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]
    serializer_class = UserSerializer
