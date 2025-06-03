from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Item, Review
from django.contrib.auth import get_user_model
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password= serializers.CharField(write_only=True, validators=[validate_password])
    password2= serializers.CharField(write_only=True, )

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'email', 'password', 'phone_number']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
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
        fields = ['price', 'title', 'category', 'location', 'is_available', 'detail', 'user_id' ]

    def create(self, validated_data):
        item = Item.objects.create(**validated_data)
        return item
