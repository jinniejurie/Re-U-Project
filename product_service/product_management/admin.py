from django.contrib import admin
from product_management.models import Category, Product

# Register your models here.
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description')
    search_fields = ('name',)
    ordering = ('id',)

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'price', 'condition', 'category', 'created_at')
    search_fields = ('name', 'category__name')
    list_filter = ('condition', 'category')
    ordering = ('id',)