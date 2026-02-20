from rest_framework import generics, permissions
from .models import User
from .serializers import UserSerializer, RegisterSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAdminUser
from django.shortcuts import get_object_or_404


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


class ProfileView(generics.RetrieveAPIView):
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
    
class DeleteAccountView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request):

        if request.user.is_superuser:
            return Response(
                {"error": "Superuser accounts cannot be deleted via UI."},
                status=403
            )

        request.user.delete()
        return Response(
            {"message": "Account deleted successfully"},
            status=204
        )


class AdminUserListView(generics.ListAPIView):
    queryset = User.objects.all().order_by('-dev_score')
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]

class AdminUserUpdateView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]

class AdminUserDeleteView(APIView):
    permission_classes = [IsAdminUser]

    def delete(self, request, pk):

        user = get_object_or_404(User, pk=pk)

        if user == request.user:
            return Response(
                {"error": "Admin cannot delete itself."},
                status=status.HTTP_403_FORBIDDEN
            )

        user.delete()
        return Response(
            {"message": "User deleted successfully."},
            status=status.HTTP_204_NO_CONTENT
        )