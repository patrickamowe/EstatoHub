from django.shortcuts import get_object_or_404
from pymysql import IntegrityError
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Item, Review, Wishlist, WishlistItem
from .serializers import UserSerializer, LogoutSerializer, ItemSerializer, ReviewSerializer, WishlistItemSerializer


class UserView(APIView):
    def post(self, request):
        try:
            serializer = UserSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
            return Response({"error": "User with that username already exits"}, status=status.HTTP_400_BAD_REQUEST)
        except IntegrityError as e:
            return Response({"error": "Invalid data: " + str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(e)
            return Response({"error": "Server error: " + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = LogoutSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_205_RESET_CONTENT)


class ItemView(APIView):

    @permission_classes([IsAuthenticated])
    def post(self, request):
        try:
            user = request.user
            request.data['user'] = user.id
            serializer = ItemSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({"message": "Item listed successfully"}, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except IntegrityError as e:
            return Response({"error": "Invalid data: " + str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": "Server error: " + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def get(self, request):
        try:
            items = Item.objects.all()
            data = ItemSerializer(items, many=True).data
            return Response(data, status=status.HTTP_200_OK)
        except IntegrityError as e:
            return Response({"error": "Invalid data: " + str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": "Server error: " + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class ItemDetailView(APIView):
    def get(self, request, pk):
        try:
            item = get_object_or_404(Item, pk=pk)
            data = ItemSerializer(item).data
            return Response(data, status=status.HTTP_200_OK)
        except IntegrityError as e:
            return Response({"error": "Invalid id: " + str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": "Server error: " + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    @permission_classes([IsAuthenticated])
    def put(self, request, pk):
        try:
            item = get_object_or_404(Item, pk=pk)
            serializer = ItemSerializer(item, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({"message": "Item updated successfully"}, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except IntegrityError as e:
            return Response({"error": "Invalid data: " + str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": "Server error: " + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @permission_classes([IsAuthenticated])    
    def delete(self, pk):
        try:
            item = get_object_or_404(Item, pk=pk)
            item.delete()
            return Response({"message": "Item deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except IntegrityError as e:
            return Response({"error": "Invalid id: " + str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": "Server error: " + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class WishListItemView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            user = request.user
            wishlist, created = Wishlist.objects.get_or_create(user=user)
            request.data['wishlist'] = wishlist.id
            serializer = WishlistItemSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(wishlist=wishlist)
                return Response({"message": "Item added to wishlist"}, status=status.HTTP_201_CREATED)
            return Response({"error": "Item already in wishlist"}, status=status.HTTP_400_BAD_REQUEST)
        except IntegrityError as e:
            return Response({"error": "Invalid data: " + str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": "Server error: " + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def get(self, request):
        try:
            user = request.user
            wishlist = get_object_or_404(Wishlist, user=user)
            items = WishlistItem.objects.filter(wishlist=wishlist)
            if not items:
                return Response({"message": "No items in wishlist"}, status=status.HTTP_404_NOT_FOUND)
            data = WishlistItemSerializer(items, many=True).data
            return Response(data, status=status.HTTP_200_OK)
        except IntegrityError as e:
            return Response({"error": "Invalid data: " + str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": "Server error: " + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ReviewView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            user = request.user
            request.data['user'] = user.id
            serializer = ReviewSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({"message": "Review added successfully"}, status=status.HTTP_201_CREATED)
            return Response({"error": "User already rate the item"}, status=status.HTTP_400_BAD_REQUEST)
        except IntegrityError as e:
            return Response({"error": "Invalid data: " + str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": "Server error: " + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def get(self, request):
        item = request.data['item']
        try:
            reviews = Review.objects.filter(item=item)
            if not reviews:
                return Response({"message": "No reviews found for this item"}, status=status.HTTP_404_NOT_FOUND)
            data = ReviewSerializer(reviews, many=True).data
            return Response(data, status=status.HTTP_200_OK)
        except IntegrityError as e:
            return Response({"error": "Invalid data: " + str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": "Server error: " + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    
    
class ReviewDetailView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, review_id):
        try:
            review = get_object_or_404(Review, pk=review_id)
            data = ReviewSerializer(review).data
            return Response(data, status=status.HTTP_200_OK)
        except IntegrityError as e:
            return Response({"error": "Invalid id: " + str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": "Server error: " + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def put(self, request, review_id):
        try:
            review = get_object_or_404(Review, pk=review_id)
            serializer = ReviewSerializer(review, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({"message": "Review updated successfully"}, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except IntegrityError as e:
            return Response({"error": "Invalid data: " + str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": "Server error: " + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

