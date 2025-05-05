from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Customer
from .serializers import CustomerSerializer
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.models import User
from rest_framework.parsers import JSONParser

@csrf_exempt
def RegisterView(request):
    if request.method == "POST":
        data = JSONParser().parse(request)

        if User.objects.filter(email=data['email']).exists():
            return JsonResponse({"error": "Email already used."}, status=400)

        if User.objects.filter(username=data['username']).exists():
            return JsonResponse({"error": "Username already used."}, status=400)

        try:
            new_user = User.objects.create_user(
                username=data['username'],
                email=data['email'],
                password=data['password']
            )
        except:
            return JsonResponse({"error": "Failed to create user."}, status=500)

        data['user'] = new_user.id
        customer_serializer = CustomerSerializer(data=data)
        if customer_serializer.is_valid():
            customer_serializer.save()
            return JsonResponse(customer_serializer.data, status=201)
        else:
            return JsonResponse({"error": "Customer data not valid."}, status=400)

    return JsonResponse({"error": "Method not allowed."}, status=405)


class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(request, username=email, password=password)
        if user is not None:
            login(request, user)
            return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid email or password"}, status=status.HTTP_400_BAD_REQUEST)
