from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Item, Review, Wishlist, WishlistItem
from django.contrib.auth import get_user_model
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password= serializers.CharField(write_only=True, validators=[validate_password])

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'email', 'password', 'phone_number']

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError(f"User with that {value} already exists")
        return value

    def create(self, validated_data):
        password = validated_data['password']

        validated_data.pop('password')
        user = User.objects.create_user(**validated_data)
        user.set_password(password)
        user.save()
        return user

class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    def validate(self, attrs):
        self.token = attrs['refresh']
        return attrs

    def save(self, **kwargs):
        try:
            token = RefreshToken(self.token)
            token.blacklist()
        except Exception as e:
            self.fail(f"{e}: bad_token")

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['price', 'title', 'category', 'location', 'is_available', 'detail', 'user' ]

    def create(self, validated_data):
        item = Item.objects.create(**validated_data)
        return item

class ReviewSerializer(serializers.ModelSerializer):
    class meta:
        model = Review
        fields = ['item', 'user', 'rating', 'comment']

    def create(self, validated_data):
        review = Review.objects.create(**validated_data)
        return review

class WishlistItemSerializer(serializers.ModelSerializer):
    class Mete:
        model = WishlistItem
        fields = ['wishlist', 'item']

    def create(self, validated_data):
        wishlist_item = WishlistItem.objects.create(**validated_data)
        return wishlist_item