from django.db import models
from django.conf import settings

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(null=True, blank=True)
    
    def __str__(self):
        return self.name  

class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.PositiveIntegerField()
    condition = models.CharField(max_length=50, choices=[('new', 'New'), ('used', 'Used')])
    category = models.ForeignKey(Category, related_name="products", on_delete=models.SET_NULL, null=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='products', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='product_images/', null=True, blank=True)  

    def __str__(self):
        return self.name