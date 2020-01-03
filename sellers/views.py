from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, filters

from .models import Seller
from .serializers import SellerSerializer


class SellerView(viewsets.ModelViewSet):
    queryset = Seller.objects.all()
    serializer_class = SellerSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['id', 'name', 'area', 'added']
    search_fields = ['name', 'area']

    def get_queryset(self):
        return self.queryset.order_by('id')

    def perform_create(self, serializer):
        serializer.save(lead=self.request.user)
