from django.shortcuts import render
from django.views import View
import requests
from django.http import JsonResponse

class AccuCastView(View):
    def get(self, request):
        ip = request.GET.get('ip')
        print(ip)
        if not ip:
            return JsonResponse({'error': 'No ip provided'}, status=400)
        
        api_key = '8LZSTn2UGwi0WIxz6dYqd4Q4WfBpLHS8'  # Replace with your actual API key
        location_search_url = 'http://dataservice.accuweather.com/locations/v1/cities/search'
        forecast_url = 'http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/'

        # Step 1: Get location key based on the ip
        location_params = {
            'apikey': api_key,
            'q': ip
        }
        try:
            location_response = requests.get(location_search_url, params=location_params)
            if location_response.status_code != 200:
                return JsonResponse({'error': 'Error fetching location data'}, status=501)
            
            location_data = location_response.json()
            if not location_data:
                return JsonResponse({'error': 'No location data found'}, status=404)
            
            location_key = location_data[0]['Key']
            print(location_key)
        except Exception as e:
            return JsonResponse({'error': 'Error fetching location data'}, status=502)

        # Step 2: Get 15-day forecast data based on the location key
        forecast_params = {
            'apikey': api_key,
            'details': 'true'
        }
        try:
            forecast_response = requests.get(f'{forecast_url}{location_key}', params=forecast_params)
            if forecast_response.status_code != 200:
                print(forecast_response.status_code)
                return JsonResponse({'error': 'Error fetching forecast data'}, status=504)
            
            forecast_data = forecast_response.json()
            if not forecast_data:
                return JsonResponse({'error': 'No forecast data found'}, status=404)

        except Exception as e:
            return JsonResponse({'error': 'Error fetching forecast data'}, status=503)

        # Step 3: Return the forecast data
        return JsonResponse(forecast_data, safe=False)
    

class OpenCastView(View):
    def get(self, request):
        pass


class ScrapperView(View):
    def get(self, request):
        pass

class YahooWeatherView(View):
    def get(self, request):
        city = request.GET.get('city', 'ceuta')  # Default to 'ceuta' if no city is provided
        headers = {
            'x-rapidapi-key': "45b5e876cdmsh23734b3e6651b57p1f574ajsn9a38f48b860d",
            'x-rapidapi-host': "yahoo-weather5.p.rapidapi.com"
        }
        url = f"https://yahoo-weather5.p.rapidapi.com/weather?location={city}&format=json&u=f"
        
        try:
            response = requests.get(url, headers=headers)
            if response.status_code != 200:
                return JsonResponse({'error': 'Error fetching weather data'}, status=response.status_code)
            
            weather_data = response.json()
        except Exception as e:
            return JsonResponse({'error': 'Error fetching weather data'}, status=500)

        return JsonResponse(weather_data, safe=False)