from django.contrib import admin
from django.conf.urls import url, include
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from rest_framework import routers
from frontend.views import FrontendRenderView
from projects import views as project_views
from bills import views as bill_views

router = routers.DefaultRouter()
router.register('api/projects', project_views.ProjectView)
router.register('api/bills', bill_views.BillView)

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    path(r'', include(router.urls)),
    # url('', include('sellers.urls')),
    # url('', include('products.urls')),
    url(r'^(?P<path>.*)/$', FrontendRenderView.as_view()),
]

urlpatterns += [

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)



