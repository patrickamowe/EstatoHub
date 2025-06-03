from django.contrib import admin
from .models import CustomUser, Item, Review

# Register your models here.

@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'first_name', 'last_name', 'username', 'email', 'phone_number', 'profile_image', 'updated_at')

@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'price', 'category', 'is_available', 'location', 'user_id')

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('id', 'user_id', 'item_id', 'rating')