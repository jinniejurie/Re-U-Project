# Generated by Django 4.2 on 2025-05-13 08:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('order_management', '0005_orderitem_product'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='orderitem',
            name='product',
        ),
    ]
