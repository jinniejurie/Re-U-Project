from django.shortcuts import render
from django.http import JsonResponse
from django.views import View
from .serializers import OrderSerializer
from .models import Order

# Create your views here.
class OrderCreateView(View):
    def post(self, request):
        serializer = OrderSerializer(data=request.POST)
        
        if serializer.is_valid():
            order = serializer.save()
            return JsonResponse({
                'message': 'Order created successfully!',
                'order_id': order.id
            }, status=201)
        else:
            # ส่งข้อผิดพลาดกลับ
            return JsonResponse({
                'errors': serializer.errors
            }, status=400)