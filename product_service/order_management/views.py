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
                OrderItem.objects.get_or_create(
                    order=order,
                    product=product,
                    defaults={
                        'product_name': product.name,
                        'price': product.price,
                    }
                )
            return Response({'message': 'Order created successfully!', 'order_id': order.id}, status=201)
        else:
            return Response({'errors': serializer.errors}, status=400)

class SellerOrdersView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Get all orders where the products were created by the seller
        seller_products = Product.objects.filter(created_by=request.user)
        orders = Order.objects.filter(items__product__in=seller_products).distinct()
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)

class BuyerOrdersView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Get all orders created by the buyer
        orders = Order.objects.filter(user=request.user)
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)

class CartView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        cart, created = Cart.objects.get_or_create(user=request.user)
        serializer = CartSerializer(cart, context={'request': request})
        return JsonResponse(serializer.data, safe=False)

    def post(self, request):
        cart, created = Cart.objects.get_or_create(user=request.user)
        product_id = request.data.get('product_id')
        existing_item = cart.items.filter(product_id=product_id).first()
        if existing_item:
            return JsonResponse({'error': 'Product already in cart'}, status=400)
        serializer = CartItemSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(cart=cart)
        else:
            return JsonResponse({'errors': serializer.errors}, status=400)
        return JsonResponse(serializer.data, status=200)

class CartItemView(APIView):
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
        return JsonResponse({'error': 'Quantity update not supported'}, status=400)

class CartClearView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        cart, created = Cart.objects.get_or_create(user=request.user)
        cart.items.all().delete()
        return JsonResponse({'message': 'Cart cleared successfully'}, status=200)
    