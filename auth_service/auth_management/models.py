from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.validators import RegexValidator
from django.core.exceptions import ValidationError

class User(AbstractUser):
    # Custom email validator for TU email domain
    def validate_tu_email(value):
        if not value.endswith('@dome.tu.ac.th'):
            raise ValidationError('Email must be a TU email address (@dome.tu.ac.th)')

    # Phone number validator (Thai format)
    phone_regex = RegexValidator(
        regex=r'^\+?1?\d{9,15}$',
        message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed."
    )

    email = models.EmailField(unique=True, validators=[validate_tu_email])
    phone_number = models.CharField(max_length=15, validators=[phone_regex], blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    postcode = models.CharField(max_length=5, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    class Meta:
        db_table = 'auth_management_user'

    def __str__(self):
        return self.email 