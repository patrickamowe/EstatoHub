from django.urls import path

from .views import UserView, LogoutView, ItemView, ItemDetailView, WishListView, ReviewView
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView,)

urlpatterns = [
    path('api/signup', UserView.as_view(), name='signup' ),
    path('api/logout', LogoutView.as_view(), name='logout' ),
    path('api/token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/listing', ItemView.as_view(), name='listing'),
    path('api/listing/<int:pk>', ItemDetailView.as_view(), name='listing_detail'),
    path('api/wishlist', WishListView.as_view(), name='wishlist' ),
    path('api/review', ReviewView.as_view(), name='review')
    
    
]
