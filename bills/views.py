from rest_framework import viewsets, permissions
from .models import Bill
from .serializers import BillSerializer


class BillView(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAdminUser,
    ]
    queryset = Bill.objects.all()
    serializer_class = BillSerializer
