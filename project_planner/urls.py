from django.contrib import admin
from django.conf.urls import url, include
from django.shortcuts import render
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from rest_framework import routers
from projects import views as project_views
from bills import views as bill_views
from profiles import views as profile_views
from products import views as product_views
from sellers import views as seller_views


router = routers.DefaultRouter()
router.register('api/projects', project_views.ProjectView)
router.register('api/bills', bill_views.BillView)
router.register('api/profiles', profile_views.ProfileView)
router.register('api/products', product_views.BillView)
router.register('api/sellers', seller_views.SellerView)


def index(request):
    return render(request, 'frontend/index.html')


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^', include(router.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)




