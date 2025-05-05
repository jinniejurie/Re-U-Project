from django.db import models
from django.utils import timezone

class Product(models.Model):
    CATEGORY_CHOICES = [
        ('CLOTHING', 'Clothing'),
        ('ACCESSORIES', 'Accessories'),
        ('BOOKS', 'Books'),
        ('ELECTRONICS', 'Electronics'),
        ('SPORT_EQUIPMENT', 'Sport Equipment'),
        ('STATIONARY_ART', 'Stationary & Art Supplies'),
        ('HEALTH_BEAUTY', 'Health & Beauty'),
        ('OTHER', 'Other'),
    ]
    
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='OTHER')
    created_by = models.CharField(max_length=100, help_text="User ID of the creator", default='system')
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    is_sold = models.BooleanField(default=False)
    condition = models.CharField(max_length=100, help_text="Describe the condition of the item", default='Used - Good')
    image = models.ImageField(upload_to='product_images/', null=True, blank=True)

    def __str__(self):
        return f"{self.name} - {self.price}THB"
