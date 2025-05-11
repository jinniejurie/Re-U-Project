from django.db import models
from django.contrib.auth.models import User

from django.db import models

class Order(models.Model):
    email = models.EmailField(max_length=255, default='')
    first_name = models.CharField(max_length=100, default='')
    last_name = models.CharField(max_length=100, default='')
    phone_number = models.CharField(max_length=10, blank=True, null=True)
    delivery_type = models.CharField(
        max_length=50,
        choices=[('pickup','รับเองที่จุดนัดพบ'),('delivery','Delivery')],
       default='pickup'
    )   
    meeting_location = models.CharField(max_length=255, null=True, blank=True)
    preferred_date = models.DateField(null=True, blank=True)
    preferred_time = models.TimeField(null=True, blank=True)
    notes = models.TextField(null=True, blank=True)
    status = models.CharField(max_length=50, default='pending', choices=[('pending', 'Pending'), ('confirmed', 'Confirmed'), ('shipped', 'Shipped')])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Order {self.id} - {self.first_name} {self.last_name}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product_name = models.CharField(max_length=255, default='')
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.product_name} - {self.price}"
