import datetime





class MockResponse:
    def __init__(self, content, status_code):
        self.content = content
        self.status_code = status_code

    def json(self):
        import json
        return json.loads(self.content)
    
def serialize_openweather_to_yahoo_format(openweather_data):
    # Extract relevant data
    current = openweather_data['list'][0]  # Current weather is the first item in the list
    location = openweather_data['city']

    # Convert timestamp to datetime
    current_date = datetime.datetime.fromtimestamp(current['dt'])

    # Create the serialized data structure
    serialized_data = {
        "location": {
            "city": location['name'],
            "woeid": location['id'],
            "country": location['country'],
            "lat": location['coord']['lat'],
            "long": location['coord']['lon'],
            "timezone_id": f"Etc/GMT{-location['timezone']//3600:+d}"  # Approximate timezone
        },
        "current_observation": {
            "pubDate": current['dt'],
            "wind": {
                "chill": round(current['main']['feels_like']),
                "direction": current['wind']['deg'],
                "speed": round(current['wind']['speed'])  # Speed in m/s
            },
            "atmosphere": {
                "humidity": current['main']['humidity'],
                "visibility": round(current['visibility'] / 1000, 2),  # Visibility in km
                "pressure": current['main']['pressure']
            },
            "astronomy": {
                "sunrise": datetime.datetime.fromtimestamp(location['sunrise']).strftime("%I:%M %p"),
                "sunset": datetime.datetime.fromtimestamp(location['sunset']).strftime("%I:%M %p")
            },
            "condition": {
                "temperature": round(current['main']['temp']),
                "text": current['weather'][0]['main'],
                "code": map_weather_code(current['weather'][0]['id'])
            }
        },
        "forecasts": []
    }
    
    # Process forecasts
    for forecast in openweather_data['list'][::8]:  # Every 8th item for daily forecast
        forecast_date = datetime.datetime.fromtimestamp(forecast['dt'])
        serialized_data['forecasts'].append({
            "day": forecast_date.strftime("%a"),
            "date": forecast['dt'],
            "high": round(forecast['main']['temp_max']),
            "low": round(forecast['main']['temp_min']),
            "text": forecast['weather'][0]['main'],
            "code": map_weather_code(forecast['weather'][0]['id'])
        })
    
    print(serialized_data)
    return serialized_data

def map_weather_code(openweather_code):
    # This is a simplified mapping. You might want to create a more comprehensive one.
    code_mapping = {
        800: 32,  # Clear sky
        801: 34,  # Few clouds
        802: 30,  # Scattered clouds
        803: 28,  # Broken clouds
        804: 26,  # Overcast clouds
        500: 11,  # Light rain
        501: 12,  # Moderate rain
        # Add more mappings as needed
    }
    return code_mapping.get(openweather_code, 3)  # Default to 3 (not available) if no mapping found

def map_weather_code_scrapper(condition):
    code_mapping = {
        "Sunny": 32,
        "Partly cloudy": 30,
        "Cloudy": 26,
        "Light rain": 11,
        "Rain": 12,
        "Mostly sunny": 34,
        "Partly to mostly sunny and pleasant": 34,
        "Plenty of sun": 32,
        "Windy with plenty of sunshine": 32,
        "Plenty of sunshine": 32,
        "Sunshine and beautiful":32,
        "Less humid with plenty of sunshine": 32,
        "A couple of morning showers; otherwise, humid with a blend of sun and clouds": 11,
        "Humid with intervals of clouds and sunshine":30,
        "Mostly sunny and humid":34,
        "Abundant sunshine": 32,
        "Partly sunny":30,
        "Sunny to partly cloudy": 30,
        "More sun than clouds":34,
        "Humid with clouds and sun":30,
        "Humid with partial sunshine":34,
        "Sunny to partly cloudy and humid":34,
        "Times of clouds and sun":30,
        "Sunshine and patchy clouds":28,
        "Brilliant sunshine":32,
        "Cloudy to partly sunny":30,
        "Cloudy to partly cloudy":30,
        "Cloudy to partly cloudy and sunny":30,
        "Cloudy to partly cloudy and sunny and pleasant":30,
        "Sun and some clouds":30,
        "Sunshine and some clouds":30,
        "Humid with more sun than clouds":34,
        "Intervals of clouds and sunshine":30,
        "Mainly cloudy":26,
        "Cloudy":26,
        "Partly cloudy":30,


        # Add more mappings as needed
    }
    return code_mapping.get(condition, 3)

def fahrenheit_to_celsius(fahrenheit):
    return round((fahrenheit - 32) * 5.0 / 9.0)
