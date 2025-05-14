from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth.models import User
from .models import UserProfile

class UserProfileModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123',
            first_name='Test',
            last_name='User'
        )
        self.profile = UserProfile.objects.get(user=self.user)
        self.profile.phone = '1234567890'
        self.profile.is_seller = True
        self.profile.save()

    def test_user_profile_creation(self):
        """Test that a user profile can be created"""
        self.assertEqual(self.profile.user.username, 'testuser')
        self.assertEqual(self.profile.phone, '1234567890')
        self.assertTrue(self.profile.is_seller)

    def test_user_profile_properties(self):
        """Test the property methods of UserProfile"""
        self.assertEqual(self.profile.username, 'testuser')
        self.assertEqual(self.profile.email, 'test@example.com')
        self.assertEqual(self.profile.first_name, 'Test')
        self.assertEqual(self.profile.last_name, 'User')

    def test_user_profile_str_method(self):
        """Test the string representation of UserProfile"""
        self.assertEqual(str(self.profile), 'testuser')

class UserViewsTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.register_url = reverse('register')
        self.account_url = reverse('account')
        
        # Test user data
        self.user_data = {
            'username': 'testuser',
            'email': 'test@example.com',
            'password': 'testpass123',
            'first_name': 'Test',
            'last_name': 'User'
        }
        
        # Create a test user
        self.user = User.objects.create_user(
            username='existinguser',
            email='existing@example.com',
            password='testpass123'
        )
        self.profile = UserProfile.objects.get(user=self.user)
        self.profile.phone = '1234567890'
        self.profile.is_seller = True
        self.profile.save()

    def test_register_user(self):
        """Test user registration"""
        response = self.client.post(self.register_url, self.user_data, format='json')
        print("Registration response data:", response.data)  # Debug output
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['user']['username'], 'testuser')
        self.assertEqual(response.data['user']['email'], 'test@example.com')

    def test_get_account_info(self):
        """Test getting account information"""
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.account_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['user']['username'], 'existinguser')
        self.assertEqual(response.data['user']['phone'], '1234567890')
        self.assertTrue(response.data['user']['is_seller'])

    def test_update_account_info(self):
        """Test updating account information"""
        self.client.force_authenticate(user=self.user)
        update_data = {
            'first_name': 'Updated',
            'last_name': 'Name',
            'phone': '9876543210'
        }
        response = self.client.put(self.account_url, update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['user']['first_name'], 'Updated')
        self.assertEqual(response.data['user']['last_name'], 'Name')
        self.assertEqual(response.data['user']['phone'], '9876543210')

    def test_register_as_seller(self):
        """Test registering as a seller"""
        self.client.force_authenticate(user=self.user)
        response = self.client.post(self.account_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['user']['is_seller'])
