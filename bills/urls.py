from rest_framework import routers
from .api import BillViewSet

router = routers.DefaultRouter()
router.register('api/bills', BillViewSet, 'bills')

urlpatterns = router.urls
