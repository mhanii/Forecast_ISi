from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.contrib import auth
from rest_framework.views import APIView
from rest_framework  import permissions
from .serializers import UserSerializer
from users.models import User
from rest_framework.response import Response
from django.views.decorators.csrf import ensure_csrf_cookie , csrf_protect
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.permissions import IsAuthenticated
from django.middleware.csrf import get_token


@method_decorator(csrf_protect,name='dispatch')
class CheckAuthenticatedView(APIView):
    def post(self,request,format=None):
        user = request.user
        print(user)
        print(request)
        try:
            isAuthenticated = user.is_authenticated
            if isAuthenticated:
                return Response({'isAuthenticated':'success'})
            else:
                return Response({'isAuthenticated':'error'})
        except:
            return Response({'error':'Something went wrong'})

@method_decorator(csrf_protect, name='dispatch')
class SignupView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        print("CSRF token in cookie:", request.COOKIES.get('csrftoken'))
        print("CSRF token in header:", request.META.get('HTTP_X_CSRFTOKEN'))
        print("Generated CSRF token:", get_token(request))
        
        # Log tokens for debugging
        # print("Request CSRF Token:", request_csrf_token)
        # print("Session CSRF Token:", session_csrf_token)
        
        # # Manually compare tokens
        # if request_csrf_token != session_csrf_token:
        #     return Response({'error': 'CSRF token mismatch'}, status=403)
        
        data = self.request.data
        email = data['email']
        password = data['password']
        plan = data['plan']
        if len(password) >= 8:
            try:
                if User.objects.filter(username=email).exists():
                    if User.objects.get(username=email).is_active:
                        return Response({'error': 'Email already registered'})
                else:
                    user = User.objects.create_user(username=email, password=password,user_type=plan, is_active=True)
                    return Response({'success': 'User created successfully'})
            except Exception as err:
                return Response({'error': f'Something went wrong: {err}'})
        else:
            return Response({'error': 'Password too short (must be at least 8 characters)'})


@method_decorator(csrf_protect,name='dispatch')
class LoginView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request,format=None):
        data = self.request.data

        try:
            email = data['email']
            password = data['password']

            print(email,password)

            user  = auth.authenticate(username=email,password= password)
            print(user)
            if user is not None:
                auth.login(request,user)
                return Response({'success':'User logged in','email':email,})
            else:
                return Response({'error':'Email or password is incorrect'})
        except:
            return Response({'error':'Something went wrong'})

class LogoutView(APIView):
    def post(self,request,format=None):
        try:
            auth.logout(request)
            return Response({'success':'Logged out'})
        except:
            return Response({'error':'Something went wrong'})


@method_decorator(ensure_csrf_cookie,name='dispatch')    
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self,request,format=None):
        print("This should work")

        return Response({'success':'CSRF cookie set'})


@method_decorator(ensure_csrf_cookie,name='dispatch')    
class GetUserTypeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        user = request.user
        return Response({'user_type': user.user_type})
    
class DeleteAccountView(APIView):
    def delete(self,request,format=None):

        try:
            user = request.user
            print(user)
            User.objects.get(id = user.id).delete()

            return Response({'sucess','User deleted'})
        except Exception as e:
            print(e)
            return Response({'error':'Something went wrong'})




class GetUsersView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self,request):
        users = User.objects.all()
        users = UserSerializer(users,many=True)

        return Response(users.data)
    
