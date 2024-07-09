from django.urls import path
from .views import (
    CheckAuthenticatedView, SignupView, LoginView, LogoutView, 
    GetCSRFToken, DeleteAccountView, GetUsersView, GetUserTypeView
)

urlpatterns = [
    path('signup', SignupView.as_view(), name='signup'),
    path('login', LoginView.as_view(), name='login'),
    path('logout', LogoutView.as_view(), name='logout'),
    path('csrf_cookie', GetCSRFToken.as_view(), name='csrf_token'),
    path('delete_account', DeleteAccountView.as_view(), name='delete_account'),
    path('check_auth', CheckAuthenticatedView.as_view(), name='check_auth'),
    path('get_users', GetUsersView.as_view(), name='get_users'),
    path('get_user_type', GetUserTypeView.as_view(), name='get_user_type'),
]
