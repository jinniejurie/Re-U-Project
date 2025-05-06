from django.shortcuts import render
from django.http import JsonResponse
from .models import Product, Category

# Create your views here.
def get_all_products(request):
    products = Product.objects.all()
    data = [
        {
            'id': p.id,
            'name': p.name,
            'description': p.description,
            'price': p.price,
            'category': p.category.name,
            'image': request.build_absolute_uri(p.image.url) if p.image else None
        } for p in products
    ]
    return JsonResponse(data, safe=False)

def get_products_by_category(request, category_name):
    try:
        category = Category.objects.get(name=category_name)
        products = Product.objects.filter(category=category)
        data = [
            {
                'id': p.id,
                'name': p.name,
                'description': p.description,
                'price': p.price,
                'category': p.category.name,
                'image': request.build_absolute_uri(p.image.url) if p.image else None
            } for p in products
        ]
        return JsonResponse(data, safe=False)
    except Category.DoesNotExist:
        return JsonResponse({'error': 'Category not found'}, status=404)

def get_product_by_id(request, category_name, product_id):
    try:
        category = Category.objects.get(name=category_name)
        product = Product.objects.get(id=product_id, category__name=category_name)
        data = {
            'id': product.id,
            'name': product.name,
            'description': product.description,
            'price': product.price,
            'category': product.category.name,
            'image': request.build_absolute_uri(product.image.url) if product.image else None
        } 
        return JsonResponse(data)
    except Product.DoesNotExist:
        return JsonResponse({'error': 'Product not found'}, status=404)
