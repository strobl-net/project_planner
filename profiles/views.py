from rest_framework import viewsets, permissions

from .models import Profile
from .serializers import ProfileSerializer


class ProfileView(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def get_queryset(self):
        return self.request.user.project.all()

    def perform_create(self, serializer):
        serializer.save(lead=self.request.user)
