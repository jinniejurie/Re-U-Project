from django.contrib import admin
from .models import Order, OrderItem, Cart, CartItem

# Register your models here.
@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'first_name', 'last_name', 'status', 'created_at')

@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'order', 'get_product_name', 'product_name', 'price')

    def get_product_name(self, obj):
        return obj.product.name if obj.product else '-'
    get_product_name.short_description = 'Product'

admin.site.register(Cart)
admin.site.register(CartItem)