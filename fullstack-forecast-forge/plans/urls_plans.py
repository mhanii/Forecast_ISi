from django.urls import path
from .views import GetPlansView, AddPlanView, DeletePlanView

urlpatterns = [
    path('get_plans', GetPlansView.as_view(), name='get_plans'),
    path('add_plan', AddPlanView.as_view(), name='add_plan'),
    path('delete_plan', DeletePlanView.as_view(), name='delete_plan'),
]
