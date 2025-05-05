from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(null=True, blank=True)

class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    condition = models.CharField(max_length=50, choices=[('new', 'New'), ('used', 'Used')])
    category = models.ForeignKey(Category, related_name="products", on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='product_images/', null=True, blank=True)  # รูปภาพของสินค้า

