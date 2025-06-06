from django.db.models.signals import post_save, post_delete
from django.contrib.auth.models import User
from django.dispatch import receiver
from .models import UserProfile

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    """
    Signal to create UserProfile when a new User is created
    """
    if created:
        UserProfile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    """
    Signal to save UserProfile when User is updated
    """
    instance.profile.save()

@receiver(post_delete, sender=User)
def delete_user_profile(sender, instance, **kwargs):
    """
    Signal to delete UserProfile when User is deleted
    """
    if hasattr(instance, 'profile'):
        instance.profile.delete()
