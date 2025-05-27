from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Listing, Review
from django.contrib.auth import get_user_model
User = get_user_model()

class SignupSerializer(serializers.ModelSerializer):
    password= serializers.CharField(write_only=True, validators=[validate_password])
    password2= serializers.CharField(write_only=True, )

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'email', 'password', 'password2', 'phone_number']

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError("Passwords must match")
        return data

    def create(self, validated_data):
        validated_data.pop('password2')
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

class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = ['price', 'title', 'category', 'location', 'is_available', 'detail', 'user_id' ]

    def create(self, validated_data):
        listing = Listing.objects.create(**validated_data)
        return listing