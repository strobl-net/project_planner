from django.contrib.auth.models import User
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, permissions, filters
from .serializers import UserSerializer


class UserView(viewsets.ReadOnlyModelViewSet):
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['id']
    search_fields = ['username', 'first_name', 'last_name', 'email', 'is_staff', 'is_active']

    def get_queryset(self):
        return self.queryset
