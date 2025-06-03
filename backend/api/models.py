from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class CustomUser(AbstractUser):
    phone_number = models.CharField(max_length=15, blank=True)
    updated_at = models.DateTimeField(auto_now=True)
    profile_image = models.ImageField(upload_to='profile_images/', blank=True, null=True)


class Item(models.Model):
    class Category(models.TextChoices):
        LAND = 'LAD', 'Land'
        HOUSE = 'HSE', 'House'
        STORE = 'STE', 'Store'
        CAR = 'CAR', 'Car'

    category = models.CharField(
        max_length=4,
        choices=Category.choices,
        default=Category.HOUSE,
    )
    title = models.CharField(max_length=50, null=False, blank=False)
    price = models.IntegerField(null=False, blank=False)
    detail = models.TextField(null=True, blank=True)
    user_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    location = models.CharField(max_length=50, null=False, blank=False)
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    item_image = models.ImageField(upload_to='item_images/')
    video_file = models.FileField(upload_to='videos/')


class Review(models.Model):
    user_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    item_id = models.ForeignKey(Item, on_delete=models.CASCADE)
    rating = models.IntegerField(choices=[(i, str(i)) for i in range(1, 6)])
    comment_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

