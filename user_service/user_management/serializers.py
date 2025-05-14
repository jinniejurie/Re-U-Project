from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    phone = serializers.CharField(source='profile.phone', required=False)

    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'phone']

class UserProfileUpdateSerializer(serializers.ModelSerializer):
    phone = serializers.CharField(required=False)
    
    class Meta:
        model = UserProfile
        fields = ['phone', 'is_seller']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'password2')
        extra_kwargs = {
            'password': {'write_only': True},
            'password2': {'write_only': True}
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        
        try:
            validate_password(attrs['password'])
        except serializers.ValidationError as e:
            raise serializers.ValidationError({"password": list(e.messages)})
        
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')  
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

class LoginSerializer(serializers.Serializer):
    username_or_email = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        username_or_email = attrs.get('username_or_email')
        password = attrs.get('password')
        user = None
        user = authenticate(username=username_or_email, password=password)
        if not user:
            try:
                user_obj = User.objects.get(email=username_or_email)
                user = authenticate(username=user_obj.username, password=password)
            except User.DoesNotExist:
                pass
        if not user:
            raise serializers.ValidationError('Invalid credentials')
        attrs['user'] = user
        return attrs