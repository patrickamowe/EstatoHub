from django.urls import path

from .views import SignupView, LogoutView
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView,)

urlpatterns = [
    path('api/signup', SignupView.as_view(), name='signup' ),
    path('api/logout', LogoutView.as_view(), name='logout' ),
    path('api/token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
]
