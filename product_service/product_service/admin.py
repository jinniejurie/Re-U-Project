from django.contrib import admin
from .models import Product

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'category', 'created_by', 'created_at', 'is_sold', 'condition')
    list_filter = ('category', 'is_sold', 'created_at')
    search_fields = ('name', 'description', 'created_by__email')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'price', 'category', 'description', 'condition')
        }),
        ('Images', {
            'fields': ('image',)
        }),
        ('Status', {
            'fields': ('is_sold',)
        }),
        ('Metadata', {
            'fields': ('created_by', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        })
    ) 