from django.http import JsonResponse
from django.views import View
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.utils.decorators import method_decorator

from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth import get_user_model
from .models import Plan
from django.utils.dateparse import parse_datetime
User = get_user_model()


class GetPlansView(View):
    def get(self, request):
        print("Yeah it is auth: ",request.user.is_authenticated)

        if request.user.is_authenticated:
            plans = Plan.objects.filter(user=request.user)
            plans_list = list(plans.values('name', 'type', 'location', 'date'))
            return JsonResponse({'plans': plans_list})
        else:
            return JsonResponse({'plans': []})

import json
from django.http import JsonResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.mixins import LoginRequiredMixin
from .models import Plan
from django.utils.dateparse import parse_datetime

@method_decorator(csrf_protect, name='dispatch')
class AddPlanView(LoginRequiredMixin, View):
    def post(self, request):

        if request.user.is_authenticated:
            try:
                data = json.loads(request.body)
                name = data.get('name')
                plan_type = data.get('type')
                location = data.get('location')
                date_str = data.get('date')

                try:
                    date = parse_datetime(date_str)
                except ValueError:
                    return JsonResponse({'success': False, 'errors': 'Invalid date format'}, status=400)

                if name and plan_type and location and date:
                    plan = Plan(
                        user=request.user,
                        name=name,
                        type=plan_type,
                        location=location,
                        date=date
                    )
                    plan.save()
                    return JsonResponse({'success': True})
                else:
                    return JsonResponse({'success': False, 'errors': 'All fields are required'}, status=400)
            except json.JSONDecodeError:
                return JsonResponse({'success': False, 'errors': 'Invalid JSON'}, status=400)
        return JsonResponse({'success': False, 'errors': 'User not authenticated'}, status=401)

@method_decorator(csrf_protect, name='dispatch')
class DeletePlanView(LoginRequiredMixin, View):
    def post(self, request):
        plan_id = request.POST.get('plan_id')
        plan = Plan.objects.get(id=plan_id)
        if plan.user == request.user:
            plan.delete()
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False})