from django.db import models
from django.contrib.auth.models import User

class Order(models.Model):
    PENDING = 'P'
    SHIPPED = 'S'
    DELIVERED = 'D'
    CANCELLED = 'C'
    STATUS_CHOICES = [
        (PENDING, 'Pending'),
        (SHIPPED, 'Shipped'),
        (DELIVERED, 'Delivered'),
        (CANCELLED, 'Cancelled'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.CharField(max_length=1, choices=STATUS_CHOICES, default=PENDING)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    shipping_status = models.CharField(max_length=50, default='Pending')
    shipping_address = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='order_items', on_delete=models.CASCADE)
    product = models.ForeignKey('product_management.Product', on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)

class Shipping(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE)
    shipping_address = models.TextField()
    tracking_number = models.CharField(max_length=100, null=True, blank=True)
    shipping_status = models.CharField(max_length=50, choices=[('In Progress', 'In Progress'), ('Shipped', 'Shipped'), ('Delivered', 'Delivered')], default='In Progress')
    shipped_date = models.DateTimeField(null=True, blank=True)
    delivery_date = models.DateTimeField(null=True, blank=True)