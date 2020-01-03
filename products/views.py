from .models import Product
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, filters

from .models import Product
from .serializers import ProductSerializer


class ProductView(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ['name']
    filterset_fields = ['id', 'name', 'seller__name', 'current_price']

    def get_queryset(self):
        return self.queryset.order_by('id')
