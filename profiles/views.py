from rest_framework import viewsets, permissions
from .serializers import ProfileSerializer
from .models import Profile


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
