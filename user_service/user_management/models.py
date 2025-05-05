from django.contrib.auth.models import User
from django.db import models

class Customer(models.Model):
    first_name = models.CharField(max_length=100, blank=True, null=True)
    last_name = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    profile_image = models.ImageField(upload_to='profile_images/', blank=True, null=True)
    is_seller = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)
    password = models.CharField(max_length=128)