from django.shortcuts import render
from django.http import JsonResponse
from .models import Product, Category
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import ProductSerializer, CategorySerializer
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404

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

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class SellerProductsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        products = Product.objects.filter(created_by=request.user)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

class ProductDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        product = get_object_or_404(Product, pk=pk)
        serializer = ProductSerializer(product)
        return Response(serializer.data)

    def put(self, request, pk):
        product = get_object_or_404(Product, pk=pk)
        if product.created_by != request.user:
            return Response({"detail": "Not authorized"}, status=status.HTTP_403_FORBIDDEN)
        
        serializer = ProductSerializer(product, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        product = get_object_or_404(Product, pk=pk)
        if product.created_by != request.user:
            return Response({"detail": "Not authorized"}, status=status.HTTP_403_FORBIDDEN)
        
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
