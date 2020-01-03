from rest_framework import routers

from .api import SellerViewSet

router = routers.DefaultRouter()
router.register('api/sellers', SellerViewSet, 'sellers')

urlpatterns = router.urls
