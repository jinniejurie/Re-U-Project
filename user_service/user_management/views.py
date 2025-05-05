from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .serializers import RegisterSerializer, LoginSerializer
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token

# Create your views here.

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email
            },
            "message": "User created successfully"
        }, status=status.HTTP_201_CREATED)

class LoginView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        # Optionally, create or get a token for the user
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email
            },
            "token": token.key,
            "message": "Login successful"
        }, status=status.HTTP_200_OK)
