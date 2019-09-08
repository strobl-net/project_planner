from django.contrib import admin
from django.urls import path, re_path, include
from django.conf import settings
from django.conf.urls.static import static
from frontend.views import FrontendRenderView

urlpatterns = [
    path('', include('frontend.urls')),
    path('admin/', admin.site.urls),
    path('', include('projects.urls')),
    path('', include('bills.urls')),
    path('', include('sellers.urls')),
    path('', include('products.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [
    re_path(r'(?P<path>.*)', FrontendRenderView.as_view()),
]