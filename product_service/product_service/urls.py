"""
URL configuration for product_service project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from product_management import views as product_views  
from order_management import views as order_views
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    path('products/', product_views.get_all_products, name='get_all_products'),
    path('products/<str:category_name>/', product_views.get_products_by_category, name='get_products_by_category'),
    path('products/<str:category_name>/<int:product_id>/', product_views.get_product_by_id, name='get_product_by_id'),
    path('api/orders/', order_views.OrderCreateView.as_view(), name='order-create'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
