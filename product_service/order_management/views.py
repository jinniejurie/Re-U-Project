from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.views import View
from .serializers import OrderSerializer, CartSerializer, CartItemSerializer
from .models import Order, Cart, CartItem, OrderItem
from rest_framework.views import APIView
from rest_framework import status
from product_management.models import Product  # Import the Product model

# Create your views here.
class OrderCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            order = serializer.save(user=request.user)
            items_data = request.data.get('items', [])
            for item_data in items_data:
                product_id = item_data.get('product_id')
                product = Product.objects.get(id=product_id)
                quantity = item_data.get('quantity', 1)
                order_item, created = OrderItem.objects.get_or_create(
                    order=order,
                    product=product,
                    defaults={
                        'product_name': product.name,
                        'price': product.price,
                        'quantity': quantity,
                    }
                )
                if not created:
                    order_item.quantity += quantity
                    order_item.save()
            return Response({'message': 'Order created successfully!', 'order_id': order.id}, status=201)
        else:
            return Response({'errors': serializer.errors}, status=400)
            
class CartView(View):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        cart, created = Cart.objects.get_or_create(user=request.user)
        serializer = CartSerializer(cart)
        return JsonResponse(serializer.data, safe=False)

    def post(self, request):
        cart, created = Cart.objects.get_or_create(user=request.user)
        
        product_id = request.data.get('product_id')
        existing_item = cart.items.filter(product_id=product_id).first()
        
        if existing_item:
            existing_item.quantity += int(request.data.get('quantity', 1))
            existing_item.save()
            serializer = CartItemSerializer(existing_item)
        else:
            serializer = CartItemSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(cart=cart)
            else:
                return JsonResponse({'errors': serializer.errors}, status=400)

        return JsonResponse(serializer.data, status=200)

class CartItemView(View):
    permission_classes = [IsAuthenticated]

    def delete(self, request, item_id):
        try:
            cart = Cart.objects.get(user=request.user)
            item = cart.items.get(id=item_id)
            item.delete()
            return JsonResponse({'message': 'Item deleted successfully'}, status=204)
        except (Cart.DoesNotExist, CartItem.DoesNotExist):
            return JsonResponse({'error': 'Cart or Item not found'}, status=404)

    def patch(self, request, item_id):
        try:
            cart = Cart.objects.get(user=request.user)
            item = cart.items.get(id=item_id)
            serializer = CartItemSerializer(item, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, status=200)
            return JsonResponse({'errors': serializer.errors}, status=400)
        except (Cart.DoesNotExist, CartItem.DoesNotExist):
            return JsonResponse({'error': 'Cart or Item not found'}, status=404)