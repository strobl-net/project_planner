from django.contrib import admin
from django.conf.urls import url, include
from django.shortcuts import render
from django.conf.urls.static import static
from django.conf import settings
from rest_framework import routers
from projects import views as project_views
from bills import views as bill_views
from profiles import views as profile_views
from products import views as product_views
from sellers import views as seller_views
from accounts import views as account_views
from knox import views as knox_views
from django.urls import path

router = routers.DefaultRouter()
router.register('api/projects', project_views.ProjectView)
router.register('api/bills', bill_views.BillView)
router.register('api/profiles', profile_views.ProfileView)
router.register('api/products', product_views.BillView)
router.register('api/sellers', seller_views.SellerView)


def index(request):
    return render(request, 'frontend/index.html')


urlpatterns = [
                  path('admin/', admin.site.urls),
                  path('', include(router.urls)),
                  path('api/auth/register/', account_views.RegisterAPI.as_view()),
                  path('api/auth/login/', account_views.LoginAPI.as_view()),
                  path('api/auth/user/', account_views.UserAPI.as_view()),
                  path('api/auth/', include('knox.urls')),
                  path('api/auth/logout/', knox_views.LogoutView.as_view(), name='knox_logout'),

              ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
