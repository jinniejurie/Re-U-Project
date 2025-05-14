from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import RegisterSerializer, UserProfileSerializer, UserProfileUpdateSerializer
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from .models import UserProfile
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework import serializers


# Create your views here.

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        try:
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
        except serializers.ValidationError as e:
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class AccountView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        profile, created = UserProfile.objects.get_or_create(user=user)
        
        return Response({
            'user': {
                'username': user.username,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'phone': profile.phone,
                'is_seller': profile.is_seller
            }
        }, status=status.HTTP_200_OK)

    def put(self, request, *args, **kwargs):
        user = request.user
        profile, created = UserProfile.objects.get_or_create(user=user)
        data = request.data

        if 'first_name' in data:
            user.first_name = data['first_name']
        if 'last_name' in data:
            user.last_name = data['last_name']
        
        if 'phone' in data:
            profile.phone = data['phone']
        if 'is_seller' in data:
            profile.is_seller = data['is_seller']
        
        user.save()
        profile.save()

        return Response({
            'user': {
                'username': user.username,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'phone': profile.phone,
                'is_seller': profile.is_seller
            }
        }, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        try:
            user = request.user
            profile, created = UserProfile.objects.get_or_create(user=user)
            profile.is_seller = True
            profile.save()
            
            return Response({
                'message': 'Successfully registered as seller',
                'user': {
                    'username': user.username,
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'phone': profile.phone,
                    'is_seller': profile.is_seller
                }
            })
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)