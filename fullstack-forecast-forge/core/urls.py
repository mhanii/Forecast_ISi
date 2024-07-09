from django.contrib import admin
from django.urls import path, include, re_path
from core.views import FrontendAppView
from api import urls as api_urls
from users import urls_auth as auth_urls
from plans import urls_plans as plans_urls

admin.site.site_header = "ForecastForge Admin"
admin.site.site_title = "ForecastForge Admin Portal"
admin.site.index_title = "Welcome to ForecastForge Admin Portal!"

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include(auth_urls)),
    path('api/', include(api_urls)),
    path('plans/', include(plans_urls)),
    # Catch-all pattern for the frontend
    re_path(r'^(?!api/)(?!auth/)(?!admin/).*$', FrontendAppView.as_view(), name='frontend'),
]