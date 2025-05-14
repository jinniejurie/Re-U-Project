from django.contrib import admin
from product_management.models import Category, Product

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description')
    search_fields = ('name',)
    ordering = ('id',)

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'price', 'condition', 'category', 'created_by', 'created_at')
    search_fields = ('name', 'category__name', 'created_by__username')
    list_filter = ('condition', 'category', 'created_by')
    ordering = ('id',)