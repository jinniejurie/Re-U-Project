from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
from .models import UserProfile

class UserProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = False
    verbose_name_plural = 'Profile'
    fields = ('phone', 'is_seller')

class UserProfileAdmin(UserAdmin):
    inlines = (UserProfileInline,)
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff')
    search_fields = ('username', 'email', 'first_name', 'last_name')
    ordering = ('username',)

admin.site.unregister(User)
admin.site.register(User, UserProfileAdmin)

@admin.register(UserProfile)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ['user', 'username', 'email', 'first_name', 'last_name', 'phone', 'is_seller']
    search_fields = ['user__username', 'user__email', 'user__first_name', 'user__last_name', 'phone']
    ordering = ['user__username']