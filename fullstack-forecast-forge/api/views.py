from django.shortcuts import render
from django.views import View
import requests
from django.http import JsonResponse
from .utils import serialize_openweather_to_yahoo_format,map_weather_code_scrapper,fahrenheit_to_celsius
from .variables import ACCU_HTML,ACCUWEATHER_API_KEY,OPENWEATHER_API_KEY,IPINFO_TOKEN,OPEN_RESPONSE, YAHOO_RESPONSE,RAPID_API_KEY,OPENWEATHER_API_KEY

from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth import get_user_model
from bs4 import BeautifulSoup
import datetime

User = get_user_model()

class AccuCastView(View):
    def get(self, request):
        ip = request.GET.get('ip')
        #print(ip)
        if not ip:
            return JsonResponse({'error': 'No ip provided'}, status=400)
        
        location_search_url = 'http://dataservice.accuweather.com/locations/v1/cities/search'
        forecast_url = 'http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/'

        # Step 1: Get location key based on the ip
        location_params = {
            'apikey': ACCUWEATHER_API_KEY,
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
            #print(location_key)
        except Exception as e:
            return JsonResponse({'error': 'Error fetching location data'}, status=502)

        # Step 2: Get 15-day forecast data based on the location key
        forecast_params = {
            'apikey': ACCUWEATHER_API_KEY,
            'details': 'true'
        }
        try:
            forecast_response = requests.get(f'{forecast_url}{location_key}', params=forecast_params)
            if forecast_response.status_code != 200:
                #print(forecast_response.status_code)
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


    

class WeatherView(View):
    def get(self, request):
        isAuthenticted = request.user.is_authenticated
        #print(isAuthenticted)
        user = request.user
        ip = request.GET.get('ip')
        city = request.GET.get('city', 'ceuta')

        if not ip:
            return JsonResponse({'error': 'No ip provided'}, status=400)


        if not isAuthenticted:
            #print(f"Will be directed to openweather: {ip}, {city}")
             return self.get_openweather(ip, city)
        user                        = request.user
        user                        = User.objects.get(id=user.id)
        print(user.user_type)


        if user.user_type == 'premium':
            return self.get_scraper_weather(ip, city)
        elif user.user_type == 'standard':
            return self.get_yahoo_weather(city)
        else:  # Free user
            return self.get_openweather(ip, city)

    def get_accuweather(self, ip):
        
        location_search_url = 'http://dataservice.accuweather.com/locations/v1/cities/search'
        forecast_url = 'http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/'

        # Step 1: Get location key based on the ip
        location_params = {
            'apikey': ACCUWEATHER_API_KEY,
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
        except Exception as e:
            return JsonResponse({'error': 'Error fetching location data'}, status=502)

        # Step 2: Get 12-hour forecast data based on the location key
        forecast_params = {
            'apikey': ACCUWEATHER_API_KEY,
            'details': 'true'
        }
        try:
            forecast_response = requests.get(f'{forecast_url}{location_key}', params=forecast_params)
            if forecast_response.status_code != 200:
                return JsonResponse({'error': 'Error fetching forecast data'}, status=504)
            
            forecast_data = forecast_response.json()
            if not forecast_data:
                return JsonResponse({'error': 'No forecast data found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': 'Error fetching forecast data'}, status=503)

        # Step 3: Return the forecast data
        return JsonResponse(forecast_data, safe=False)


    
    def get_openweather(self, ip, city):
        token = '221a3aa5f9a16c'  # Replace with your ipstack API key
        url = f"https://ipinfo.io/{ip}?token={token}"

        response = requests.get(url).json()

        if 'loc' in response:
            lat, lon = response['loc'].split(',')
            timezone = response.get('timezone', 'Timezone data not available')
        else:
            lat, lon = None, None
            timezone = 'Location data not available'
        # #print(lat, lon)
        # Replace with your OpenWeatherMap API key


        # Construct the correct URL for OpenWeatherMap API
        base_url = "https://api.openweathermap.org/data/2.5/forecast"

        params = {
            'lat': lat,
            'lon': lon,
            'appid': OPENWEATHER_API_KEY,
            'units': 'metric',  # This will give you temperatures in Celsius
            'exclude': 'current,minutely,hourly,alerts'
        }
        # Make the request to OpenWeatherMap API
        try:

            response = requests.get(base_url, params=params)
            if response.status_code != 200:
                serialized_response = serialize_openweather_to_yahoo_format(response.json())
            else:
                serialized_response = OPEN_RESPONSE
        except:
            return JsonResponse({'error': 'Error fetching weather data'}, status=500)

        # print(serialized_response)
        return JsonResponse(serialized_response, safe=False)

    def get_yahoo_weather(self, city):
        headers = {
            'x-rapidapi-key': RAPID_API_KEY,
            'x-rapidapi-host': "yahoo-weather5.p.rapidapi.com"
        }
        url = f"https://yahoo-weather5.p.rapidapi.com/weather?location={city}&format=json&u=f"
        
        try:
            response = requests.get(url, headers=headers)
            if response.status_code != 200:
                weather_data = YAHOO_RESPONSE
            else:
                weather_data = response.json()
            
            # Convert temperatures to Celsius
            weather_data['current_observation']['condition']['temperature'] = fahrenheit_to_celsius(weather_data['current_observation']['condition']['temperature'])
            for forecast in weather_data['forecasts']:
                forecast['high'] = fahrenheit_to_celsius(forecast['high'])
                forecast['low'] = fahrenheit_to_celsius(forecast['low'])
        except Exception as e:
            return JsonResponse({'error': 'Error fetching weather data'}, status=500)
        return JsonResponse(weather_data, safe=False)





    def get_scraper_weather(self, ip, city):

        # try:
        #     location_search_url = 'http://dataservice.accuweather.com/locations/v1/cities/search'

        #     # Step 1: Get location key based on the ip
        #     location_params = {
        #         'apikey': ACCUWEATHER_API_KEY,
        #         'q': ip
        #     }
        #     try:
        #         location_response = requests.get(location_search_url, params=location_params)
        #         if location_response.status_code != 200:
        #             print("Something Went Wrong")

        #         location_data = location_response.json()
        #         if not location_data:
        #             print("Doesn't exist")

        #         location_key = location_data[0]['Key']
        #         country_Name = location_data[0]['EnglishName']
        #         print(location_data)
        #     except Exception as e:
        #         location_key = 242320
        #         country_Name = "Spain"
        location_key = 242320
        country_Name = "Spain"

        #     headers = {
        #         "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        #     }

        #     # url = f'https://www.accuweather.com/en/es/{country_Name}/{location_key}/daily-weather-forecast/{location_key}'
        #     url = 'https://www.accuweather.com/en/es/ceuta/242320/daily-weather-forecast/242320'


            
        #     # response = requests.get(url, headers=headers)

        # except Exception as e:
        #     mock_html = ACCU_HTML
        


 
        mock_html = ACCU_HTML

        soup = BeautifulSoup(mock_html, 'html.parser')

        # Find the container for the 10-day forecast
        forecast_containers = soup.find_all('div', class_='daily-wrapper')

        # print(forecast_containers)
        forecasts = []
        current_observation = {}
        if forecast_containers:
                for index, container in enumerate(forecast_containers):
                    date = container.find('span', class_='date').text.strip()
                    date_num = container.find('span', class_='module-header sub date').text.strip()
                    temp_high = container.find('span', class_='high').text.strip('°')
                    temp_low = container.find('span', class_='low').text.strip('°')
                    precip = container.find('div', class_='precip').text.strip()

                    body = container.find('div', class_='half-day-card-content')
                    phrase = body.find('div', class_='phrase').text.strip()

                    panels = body.find('div', class_='panels')
                    right_panel = panels.find('div', class_='right')
                    left_panel = panels.find('div', class_='left')

                    items_right = right_panel.find_all('p')
                    items_left = left_panel.find_all('p')

                    UV_index = items_right[0].contents[1].text.strip()
                    Wind = items_right[1].contents[1].text.strip()
                    Feels_like = items_left[0].contents[1].text.strip()

                    forecast_date = datetime.datetime.strptime(f"{date} {date_num}", "%a %m/%d")
                    
                    wind_direction, wind_speed, wind_unit = Wind.split()

                    forecast_data = {
                        "day": forecast_date.strftime("%a"),
                        "date": int(forecast_date.replace(year=datetime.datetime.now().year).timestamp()),
                        "high": int(temp_high),
                        "low": int(temp_low.strip('/')),
                        "text": phrase,
                        "precip": precip,
                        "uv": UV_index,
                        "wind": {
                            "speed": wind_speed,
                            "direction": wind_direction,
                            "chill": int(Feels_like.split('°')[0])
                        },
                        "code": map_weather_code_scrapper(phrase)
                    }
                    
                    forecasts.append(forecast_data)

                    if index == 0:
                        current_observation = {
                            "pubDate": int(datetime.datetime.now().timestamp()),
                            "wind": forecast_data["wind"],
                            "atmosphere": {
                                "humidity": int(precip.strip('%')) if precip.strip('%').isdigit() else 0,
                                "visibility": 8.02,
                                "pressure": 1010.8
                            },
                            "astronomy": {
                                "sunrise": "6:00 AM",  # Placeholder
                                "sunset": "8:00 PM"  # Placeholder
                            },
                            "condition": {
                                "temperature": int(temp_high),
                                "text": phrase,
                                "code": forecast_data["code"]
                            }
                        }               
        
        url = f"https://ipinfo.io/{ip}?token={IPINFO_TOKEN}"

        response = requests.get(url).json()

        if 'loc' in response:
            lat, lon = response['loc'].split(',')
            timezone = response.get('timezone', 'Timezone data not available')
        else:
            lat, lon = None, None
            timezone = 'Location data not available'


        serialized_data = {
            "location": {
                "city": city,  # Using country_Name as city since city is not available
                "woeid": location_key,
                "country": country_Name,  # Assuming 'es' in the URL stands for Spain
                "lat": lat,
                "long": lon,
                "timezone_id": timezone  # Placeholder for Spain
            },
            "current_observation": current_observation,
            "forecasts": forecasts
        }

        return JsonResponse(serialized_data)
    
class YahooWeatherView(View):
    def get(self, request):
        city = request.GET.get('city', 'ceuta')  # Default to 'ceuta' if no city is provided
        headers = {
            'x-rapidapi-key': RAPID_API_KEY,
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