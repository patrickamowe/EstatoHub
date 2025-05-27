from django.shortcuts import get_object_or_404
from pymysql import IntegrityError
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Listing
from .serializers import SignupSerializer, LogoutSerializer, ListingSerializer


class SignupView(APIView):
    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = LogoutSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_205_RESET_CONTENT)


class ProductListingView(APIView):
    def post(self, request):
        print(request.data)
        try:
            serializer = ListingSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({"message": "Listed successfully"}, status=status.HTTP_201_CREATED)
        except IntegrityError as e:
            return Response({"error": "Invalid data: " + str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": "Server error: " + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def get(self, request):
        try:
            listings = Listing.objects.all()
            data = ListingSerializer(listings, many=True).data
            return Response(data, status=status.HTTP_200_OK)
        except IntegrityError as e:
            return Response({"error": "Invalid data: " + str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": "Server error: " + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class ProductDetailView(APIView):
    def get(self, request, pk):
        try:
            listing = get_object_or_404(Listing, pk=pk)
            data = ListingSerializer(listing).data
            return Response(data, status=status.HTTP_200_OK)
        except IntegrityError as e:
            return Response({"error": "Invalid id: " + str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": "Server error: " + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
