from django.contrib import admin
from .models import Customer

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ('email', 'first_name', 'last_name', 'is_seller', 'date_joined')
    list_filter = ('is_seller', 'date_joined')
    search_fields = ('email', 'first_name', 'last_name', 'phone_number')
    ordering = ('-date_joined',)