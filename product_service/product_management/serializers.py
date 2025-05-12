from rest_framework import serializers
from .models import Product, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description']

class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    created_by_username = serializers.CharField(source='created_by.username', read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'condition', 'category', 'category_name', 
                 'created_by', 'created_by_username', 'created_at', 'image']
        read_only_fields = ['created_by', 'created_at']