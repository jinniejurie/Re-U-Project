from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from .models import Product, Category
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import ProductSerializer, CategorySerializer
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

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
    response = JsonResponse(data, safe=False)
    response["Access-Control-Allow-Origin"] = "*"
    return response

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
        response = JsonResponse(data, safe=False)
        response["Access-Control-Allow-Origin"] = "*"
        return response
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
            'image': request.build_absolute_uri(product.image.url) if product.image else None,
            'seller': {
                'username': product.created_by.username if product.created_by else None,
                'first_name': product.created_by.first_name if product.created_by else None,
                'last_name': product.created_by.last_name if product.created_by else None
            }
        }
        response = JsonResponse(data)
        response["Access-Control-Allow-Origin"] = "*"
        return response
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

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def create(self, request, *args, **kwargs):
        try:
            print('DEBUG: request.FILES =', request.FILES)
            print('DEBUG: request.data =', request.data)
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        except Exception as e:
            print('DEBUG: Exception in create:', e)
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class SellerProductsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        products = Product.objects.filter(created_by=request.user)
        serializer = ProductSerializer(products, many=True, context={'request': request})
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
