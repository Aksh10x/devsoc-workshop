from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView, MeView, UploadView

urlpatterns = [
    path("auth/register/", RegisterView.as_view(), name="register"),   # now full-profile registration endpoint
    path("auth/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("users/me/", MeView.as_view(), name="me"),
    path("upload/", UploadView.as_view(), name="upload"),  # optional file upload endpoint (auth required)
]

