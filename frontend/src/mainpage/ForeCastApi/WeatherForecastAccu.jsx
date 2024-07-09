import React, { useEffect, useState } from 'react';
import { useIP } from '../../common/Context';
import './css/accu.css'
import axios from 'axios';

const WeatherForecast = () => {
  const [ip, setip] = useState('');
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);
  const { IP } = useIP();
  const fetchForecast = async () => {
    try {

      try{
        const response = await axios.get(`https://fullstack-forecast-forge-03fcfb305bcd.herokuapp.com/api/hourly/?ip=${IP}`);
        setForecast(response.data);
        setError(null);
      } catch (err) {
        setForecast([
          {
            "DateTime": "2024-07-06T16:00:00+03:00",
            "EpochDateTime": 1720270800,
            "WeatherIcon": 4,
            "IconPhrase": "Intermittent clouds",
            "HasPrecipitation": false,
            "IsDaylight": true,
            "Temperature": {
              "Value": 83,
              "Unit": "F",
              "UnitType": 18
            },
            "RealFeelTemperature": {
              "Value": 84,
              "Unit": "F",
              "UnitType": 18,
              "Phrase": "Very Warm"
            },
            "RealFeelTemperatureShade": {
              "Value": 82,
              "Unit": "F",
              "UnitType": 18,
              "Phrase": "Very Warm"
            },
            "WetBulbTemperature": {
              "Value": 72,
              "Unit": "F",
              "UnitType": 18
            },
            "WetBulbGlobeTemperature": {
              "Value": 78,
              "Unit": "F",
              "UnitType": 18
            },
            "DewPoint": {
              "Value": 66,
              "Unit": "F",
              "UnitType": 18
            },
            "Wind": {
              "Speed": {
                "Value": 11.5,
                "Unit": "mi/h",
                "UnitType": 9
              },
              "Direction": {
                "Degrees": 24,
                "Localized": "NNE",
                "English": "NNE"
              }
            },
            "WindGust": {
              "Speed": {
                "Value": 25.3,
                "Unit": "mi/h",
                "UnitType": 9
              }
            },
            "RelativeHumidity": 54,
            "IndoorRelativeHumidity": 54,
            "Visibility": {
              "Value": 10,
              "Unit": "mi",
              "UnitType": 2
            },
            "Ceiling": {
              "Value": 20000,
              "Unit": "ft",
              "UnitType": 0
            },
            "UVIndex": 3,
            "UVIndexText": "Moderate",
            "PrecipitationProbability": 38,
            "ThunderstormProbability": 7,
            "RainProbability": 38,
            "SnowProbability": 0,
            "IceProbability": 0,
            "TotalLiquid": {
              "Value": 0,
              "Unit": "in",
              "UnitType": 1
            },
            "Rain": {
              "Value": 0,
              "Unit": "in",
              "UnitType": 1
            },
            "Snow": {
              "Value": 0,
              "Unit": "in",
              "UnitType": 1
            },
            "Ice": {
              "Value": 0,
              "Unit": "in",
              "UnitType": 1
            },
            "CloudCover": 65,
            "Evapotranspiration": {
              "Value": 0.02,
              "Unit": "in",
              "UnitType": 1
            },
            "SolarIrradiance": {
              "Value": 512.7,
              "Unit": "W/m²",
              "UnitType": 33
            },
            "MobileLink": "http://www.accuweather.com/en/tr/izmit/318719/hourly-weather-forecast/318719?day=1&hbhhour=16&lang=en-us",
            "Link": "http://www.accuweather.com/en/tr/izmit/318719/hourly-weather-forecast/318719?day=1&hbhhour=16&lang=en-us"
          },
          {
            "DateTime": "2024-07-06T17:00:00+03:00",
            "EpochDateTime": 1720274400,
            "WeatherIcon": 2,
            "IconPhrase": "Mostly sunny",
            "HasPrecipitation": false,
            "IsDaylight": true,
            "Temperature": {
              "Value": 82,
              "Unit": "F",
              "UnitType": 18
            },
            "RealFeelTemperature": {
              "Value": 83,
              "Unit": "F",
              "UnitType": 18,
              "Phrase": "Very Warm"
            },
            "RealFeelTemperatureShade": {
              "Value": 80,
              "Unit": "F",
              "UnitType": 18,
              "Phrase": "Pleasant"
            },
            "WetBulbTemperature": {
              "Value": 71,
              "Unit": "F",
              "UnitType": 18
            },
            "WetBulbGlobeTemperature": {
              "Value": 78,
              "Unit": "F",
              "UnitType": 18
            },
            "DewPoint": {
              "Value": 66,
              "Unit": "F",
              "UnitType": 18
            },
            "Wind": {
              "Speed": {
                "Value": 11.5,
                "Unit": "mi/h",
                "UnitType": 9
              },
              "Direction": {
                "Degrees": 31,
                "Localized": "NNE",
                "English": "NNE"
              }
            },
            "WindGust": {
              "Speed": {
                "Value": 23,
                "Unit": "mi/h",
                "UnitType": 9
              }
            },
            "RelativeHumidity": 58,
            "IndoorRelativeHumidity": 58,
            "Visibility": {
              "Value": 10,
              "Unit": "mi",
              "UnitType": 2
            },
            "Ceiling": {
              "Value": 30000,
              "Unit": "ft",
              "UnitType": 0
            },
            "UVIndex": 2,
            "UVIndexText": "Low",
            "PrecipitationProbability": 32,
            "ThunderstormProbability": 6,
            "RainProbability": 32,
            "SnowProbability": 0,
            "IceProbability": 0,
            "TotalLiquid": {
              "Value": 0,
              "Unit": "in",
              "UnitType": 1
            },
            "Rain": {
              "Value": 0,
              "Unit": "in",
              "UnitType": 1
            },
            "Snow": {
              "Value": 0,
              "Unit": "in",
              "UnitType": 1
            },
            "Ice": {
              "Value": 0,
              "Unit": "in",
              "UnitType": 1
            },
            "CloudCover": 23,
            "Evapotranspiration": {
              "Value": 0.02,
              "Unit": "in",
              "UnitType": 1
            },
            "SolarIrradiance": {
              "Value": 469.7,
              "Unit": "W/m²",
              "UnitType": 33
            },
            "MobileLink": "http://www.accuweather.com/en/tr/izmit/318719/hourly-weather-forecast/318719?day=1&hbhhour=17&lang=en-us",
            "Link": "http://www.accuweather.com/en/tr/izmit/318719/hourly-weather-forecast/318719?day=1&hbhhour=17&lang=en-us"
          },
          {
            "DateTime": "2024-07-06T18:00:00+03:00",
            "EpochDateTime": 1720278000,
            "WeatherIcon": 2,
            "IconPhrase": "Mostly sunny",
            "HasPrecipitation": false,
            "IsDaylight": true,
            "Temperature": {
              "Value": 80,
              "Unit": "F",
              "UnitType": 18
            },
            "RealFeelTemperature": {
              "Value": 80,
              "Unit": "F",
              "UnitType": 18,
              "Phrase": "Pleasant"
            },
            "RealFeelTemperatureShade": {
              "Value": 79,
              "Unit": "F",
              "UnitType": 18,
              "Phrase": "Pleasant"
            },
            "WetBulbTemperature": {
              "Value": 71,
              "Unit": "F",
              "UnitType": 18
            },
            "WetBulbGlobeTemperature": {
              "Value": 77,
              "Unit": "F",
              "UnitType": 18
            },
            "DewPoint": {
              "Value": 66,
              "Unit": "F",
              "UnitType": 18
            },
            "Wind": {
              "Speed": {
                "Value": 10.4,
                "Unit": "mi/h",
                "UnitType": 9
              },
              "Direction": {
                "Degrees": 36,
                "Localized": "NE",
                "English": "NE"
              }
            },
            "WindGust": {
              "Speed": {
                "Value": 23,
                "Unit": "mi/h",
                "UnitType": 9
              }
            },
            "RelativeHumidity": 62,
            "IndoorRelativeHumidity": 62,
            "Visibility": {
              "Value": 10,
              "Unit": "mi",
              "UnitType": 2
            },
            "Ceiling": {
              "Value": 30000,
              "Unit": "ft",
              "UnitType": 0
            },
            "UVIndex": 1,
            "UVIndexText": "Low",
            "PrecipitationProbability": 22,
            "ThunderstormProbability": 4,
            "RainProbability": 22,
            "SnowProbability": 0,
            "IceProbability": 0,
            "TotalLiquid": {
              "Value": 0,
              "Unit": "in",
              "UnitType": 1
            },
            "Rain": {
              "Value": 0,
              "Unit": "in",
              "UnitType": 1
            },
            "Snow": {
              "Value": 0,
              "Unit": "in",
              "UnitType": 1
            },
            "Ice": {
              "Value": 0,
              "Unit": "in",
              "UnitType": 1
            },
            "CloudCover": 12,
            "Evapotranspiration": {
              "Value": 0.01,
              "Unit": "in",
              "UnitType": 1
            },
            "SolarIrradiance": {
              "Value": 275,
              "Unit": "W/m²",
              "UnitType": 33
            },
            "MobileLink": "http://www.accuweather.com/en/tr/izmit/318719/hourly-weather-forecast/318719?day=1&hbhhour=18&lang=en-us",
            "Link": "http://www.accuweather.com/en/tr/izmit/318719/hourly-weather-forecast/318719?day=1&hbhhour=18&lang=en-us"
          },
          {
            "DateTime": "2024-07-06T19:00:00+03:00",
            "EpochDateTime": 1720281600,
            "WeatherIcon": 2,
            "IconPhrase": "Mostly sunny",
            "HasPrecipitation": false,
            "IsDaylight": true,
            "Temperature": {
              "Value": 79,
              "Unit": "F",
              "UnitType": 18
            },
            "RealFeelTemperature": {
              "Value": 79,
              "Unit": "F",
              "UnitType": 18,
              "Phrase": "Pleasant"
            },
            "RealFeelTemperatureShade": {
              "Value": 79,
              "Unit": "F",
              "UnitType": 18,
              "Phrase": "Pleasant"
            },
            "WetBulbTemperature": {
              "Value": 71,
              "Unit": "F",
              "UnitType": 18
            },
            "WetBulbGlobeTemperature": {
              "Value": 77,
              "Unit": "F",
              "UnitType": 18
            },
            "DewPoint": {
              "Value": 67,
              "Unit": "F",
              "UnitType": 18
            },
            "Wind": {
              "Speed": {
                "Value": 9.2,
                "Unit": "mi/h",
                "UnitType": 9
              },
              "Direction": {
                "Degrees": 40,
                "Localized": "NE",
                "English": "NE"
              }
            },
            "WindGust": {
              "Speed": {
                "Value": 18.4,
                "Unit": "mi/h",
                "UnitType": 9
              }
            },
            "RelativeHumidity": 65,
            "IndoorRelativeHumidity": 65,
            "Visibility": {
              "Value": 10,
              "Unit": "mi",
              "UnitType": 2
            },
            "Ceiling": {
              "Value": 30000,
              "Unit": "ft",
              "UnitType": 0
            },
            "UVIndex": 0,
            "UVIndexText": "Low",
            "PrecipitationProbability": 3,
            "ThunderstormProbability": 0,
            "RainProbability": 3,
            "SnowProbability": 0,
            "IceProbability": 0,
            "TotalLiquid": {
              "Value": 0,
              "Unit": "in",
              "UnitType": 1
            },
            "Rain": {
              "Value": 0,
              "Unit": "in",
              "UnitType": 1
            },
            "Snow": {
              "Value": 0,
              "Unit": "in",
              "UnitType": 1
            },
            "Ice": {
              "Value": 0,
              "Unit": "in",
              "UnitType": 1
            },
            "CloudCover": 29,
            "Evapotranspiration": {
              "Value": 0.01,
              "Unit": "in",
              "UnitType": 1
            },
            "SolarIrradiance": {
              "Value": 76.4,
              "Unit": "W/m²",
              "UnitType": 33
            },
            "MobileLink": "http://www.accuweather.com/en/tr/izmit/318719/hourly-weather-forecast/318719?day=1&hbhhour=19&lang=en-us",
            "Link": "http://www.accuweather.com/en/tr/izmit/318719/hourly-weather-forecast/318719?day=1&hbhhour=19&lang=en-us"
          },
          {
            "DateTime": "2024-07-06T20:00:00+03:00",
            "EpochDateTime": 1720285200,
            "WeatherIcon": 3,
            "IconPhrase": "Partly sunny",
            "HasPrecipitation": false,
            "IsDaylight": true,
            "Temperature": {
              "Value": 77,
              "Unit": "F",
              "UnitType": 18
            },
            "RealFeelTemperature": {
              "Value": 77,
              "Unit": "F",
              "UnitType": 18,
              "Phrase": "Pleasant"
            },
            "RealFeelTemperatureShade": {
              "Value": 77,
              "Unit": "F",
              "UnitType": 18,
              "Phrase": "Pleasant"
            },
            "WetBulbTemperature": {
              "Value": 70,
              "Unit": "F",
              "UnitType": 18
            },
            "WetBulbGlobeTemperature": {
              "Value": 76,
              "Unit": "F",
              "UnitType": 18
            },
            "DewPoint": {
              "Value": 67,
              "Unit": "F",
              "UnitType": 18
            },
            "Wind": {
              "Speed": {
                "Value": 6.9,
                "Unit": "mi/h",
                "UnitType": 9
              },
              "Direction": {
                "Degrees": 44,
                "Localized": "NE",
                "English": "NE"
              }
            },
            "WindGust": {
              "Speed": {
                "Value": 16.1,
                "Unit": "mi/h",
                "UnitType": 9
              }
            },
            "RelativeHumidity": 71,
            "IndoorRelativeHumidity": 71,
            "Visibility": {
              "Value": 10,
              "Unit": "mi",
              "UnitType": 2
            },
            "Ceiling": {
              "Value": 30000,
              "Unit": "ft",
              "UnitType": 0
            },
            "UVIndex": 0,
            "UVIndexText": "Low",
            "PrecipitationProbability": 3,
            "ThunderstormProbability": 0,
            "RainProbability": 3,
            "SnowProbability": 0,
            "IceProbability": 0,
            "TotalLiquid": {
              "Value": 0,
              "Unit": "in",
              "UnitType": 1
            },
            "Rain": {
              "Value": 0,
              "Unit": "in",
              "UnitType": 1
            },
            "Snow": {
              "Value": 0,
              "Unit": "in",
              "UnitType": 1
            },
            "Ice": {
              "Value": 0,
              "Unit": "in",
              "UnitType": 1
            },
            "CloudCover": 45,
            "Evapotranspiration": {
              "Value": 0,
              "Unit": "in",
              "UnitType": 1
            },
            "SolarIrradiance": {
              "Value": 0,
              "Unit": "W/m²",
              "UnitType": 33
            },
            "MobileLink": "http://www.accuweather.com/en/tr/izmit/318719/hourly-weather-forecast/318719?day=1&hbhhour=20&lang=en-us",
            "Link": "http://www.accuweather.com/en/tr/izmit/318719/hourly-weather-forecast/318719?day=1&hbhhour=20&lang=en-us"
          },
          {
            "DateTime": "2024-07-06T21:00:00+03:00",
            "EpochDateTime": 1720288800,
            "WeatherIcon": 36,
            "IconPhrase": "Intermittent clouds",
            "HasPrecipitation": false,
            "IsDaylight": false,
            "Temperature": {
              "Value": 75,
              "Unit": "F",
              "UnitType": 18
            },
            "RealFeelTemperature": {
              "Value": 75,
              "Unit": "F",
              "UnitType": 18,
              "Phrase": "Pleasant"
            },
            "RealFeelTemperatureShade": {
              "Value": 75,
              "Unit": "F",
              "UnitType": 18,
              "Phrase": "Pleasant"
            },
            "WetBulbTemperature": {
              "Value": 70,
              "Unit": "F",
              "UnitType": 18
            },
            "WetBulbGlobeTemperature": {
              "Value": 75,
              "Unit": "F",
              "UnitType": 18
            },
            "DewPoint": {
              "Value": 67,
              "Unit": "F",
              "UnitType": 18
            },
            "Wind": {
              "Speed": {
                "Value": 5.8,
                "Unit": "mi/h",
                "UnitType": 9
              },
              "Direction": {
                "Degrees": 49,
                "Localized": "NE",
                "English": "NE"
              }
            },
            "WindGust": {
              "Speed": {
                "Value": 13.8,
                "Unit": "mi/h",
                "UnitType": 9
              }
            },
            "RelativeHumidity": 76,
            "IndoorRelativeHumidity": 76,
            "Visibility": {
              "Value": 7,
              "Unit": "mi",
              "UnitType": 2
            },
            "Ceiling": {
              "Value": 1900,
              "Unit": "ft",
              "UnitType": 0
            },
            "UVIndex": 0,
            "UVIndexText": "Low",
            "PrecipitationProbability": 3,
            "ThunderstormProbability": 0,
            "RainProbability": 3,
            "SnowProbability": 0,
            "IceProbability": 0,
            "TotalLiquid": {
              "Value": 0,
              "Unit": "in",
              "UnitType": 1
            },
            "Rain": {
              "Value": 0,
              "Unit": "in",
              "UnitType": 1
            },
            "Snow": {
              "Value": 0,
              "Unit": "in",
              "UnitType": 1
            },
            "Ice": {
              "Value": 0,
              "Unit": "in",
              "UnitType": 1
            },
            "CloudCover": 61,
            "Evapotranspiration": {
              "Value": 0,
              "Unit": "in",
              "UnitType": 1
            },
            "SolarIrradiance": {
              "Value": 0,
              "Unit": "W/m²",
              "UnitType": 33
            },
            "MobileLink": "http://www.accuweather.com/en/tr/izmit/318719/hourly-weather-forecast/318719?day=1&hbhhour=21&lang=en-us",
            "Link": "http://www.accuweather.com/en/tr/izmit/318719/hourly-weather-forecast/318719?day=1&hbhhour=21&lang=en-us"
          },
          {
            "DateTime": "2024-07-06T22:00:00+03:00",
            "EpochDateTime": 1720292400,
            "WeatherIcon": 36,
            "IconPhrase": "Intermittent clouds",
            "HasPrecipitation": false,
            "IsDaylight": false,
            "Temperature": {
              "Value": 72,
              "Unit": "F",
              "UnitType": 18
            },
            "RealFeelTemperature": {
              "Value": 73,
              "Unit": "F",
              "UnitType": 18,
              "Phrase": "Pleasant"
            },
            "RealFeelTemperatureShade": {
              "Value": 73,
              "Unit": "F",
              "UnitType": 18,
              "Phrase": "Pleasant"
            },
            "WetBulbTemperature": {
              "Value": 69,
              "Unit": "F",
              "UnitType": 18
            },
            "WetBulbGlobeTemperature": {
              "Value": 74,
              "Unit": "F",
              "UnitType": 18
            },
            "DewPoint": {
              "Value": 67,
              "Unit": "F",
              "UnitType": 18
            },
            "Wind": {
              "Speed": {
                "Value": 4.6,
                "Unit": "mi/h",
                "UnitType": 9
              },
              "Direction": {
                "Degrees": 52,
                "Localized": "NE",
                "English": "NE"
              }
            },
            "WindGust": {
              "Speed": {
                "Value": 11.5,
                "Unit": "mi/h",
                "UnitType": 9
              }
            },
            "RelativeHumidity": 82,
            "IndoorRelativeHumidity": 82,
            "Visibility": {
              "Value": 7,
              "Unit": "mi",
              "UnitType": 2
            },
            "Ceiling": {
              "Value": 30000,
              "Unit": "ft",
              "UnitType": 0
            },
            "UVIndex": 0,
            "UVIndexText": "Low",
            "PrecipitationProbability": 3,
            "ThunderstormProbability": 0,
            "RainProbability": 3,
            "SnowProbability": 0,
            "IceProbability": 0,
            "TotalLiquid": {
              "Value": 0,
              "Unit": "in",
              "UnitType": 1
            },
            "Rain": {
              "Value": 0,
              "Unit": "in",
              "UnitType": 1
            },
            "Snow": {
              "Value": 0,
              "Unit": "in",
              "UnitType": 1
            },
            "Ice": {
              "Value": 0,
              "Unit": "in",
              "UnitType": 1
            },
            "CloudCover": 52,
            "Evapotranspiration": {
              "Value": 0,
              "Unit": "in",
              "UnitType": 1
            },
            "SolarIrradiance": {
              "Value": 0,
              "Unit": "W/m²",
              "UnitType": 33
            },
            "MobileLink": "http://www.accuweather.com/en/tr/izmit/318719/hourly-weather-forecast/318719?day=1&hbhhour=22&lang=en-us",
            "Link": "http://www.accuweather.com/en/tr/izmit/318719/hourly-weather-forecast/318719?day=1&hbhhour=22&lang=en-us"
          },
          {
            "DateTime": "2024-07-06T23:00:00+03:00",
            "EpochDateTime": 1720296000,
            "WeatherIcon": 35,
            "IconPhrase": "Partly cloudy",
            "HasPrecipitation": false,
            "IsDaylight": false,
            "Temperature": {
              "Value": 71,
              "Unit": "F",
              "UnitType": 18
            },
            "RealFeelTemperature": {
              "Value": 72,
              "Unit": "F",
              "UnitType": 18,
              "Phrase": "Pleasant"
            },
            "RealFeelTemperatureShade": {
              "Value": 72,
              "Unit": "F",
              "UnitType": 18,
              "Phrase": "Pleasant"
            },
            "WetBulbTemperature": {
              "Value": 68,
              "Unit": "F",
              "UnitType": 18
            },
            "WetBulbGlobeTemperature": {
              "Value": 73,
              "Unit": "F",
              "UnitType": 18
            },
            "DewPoint": {
              "Value": 67,
              "Unit": "F",
              "UnitType": 18
            },
            "Wind": {
              "Speed": {
                "Value": 3.5,
                "Unit": "mi/h",
                "UnitType": 9
              },
              "Direction": {
                "Degrees": 53,
                "Localized": "NE",
                "English": "NE"
              }
            },
            "WindGust": {
              "Speed": {
                "Value": 9.2,
                "Unit": "mi/h",
                "UnitType": 9
              }
            },
            "RelativeHumidity": 86,
            "IndoorRelativeHumidity": 86,
            "Visibility": {
              "Value": 7,
              "Unit": "mi",
              "UnitType": 2
            },
            "Ceiling": {
              "Value": 30000,
              "Unit": "ft",
              "UnitType": 0
            },
            "UVIndex": 0,
            "UVIndexText": "Low",
            "PrecipitationProbability": 3,
            "ThunderstormProbability": 0,
            "RainProbability": 3,
            "SnowProbability": 0,
            "IceProbability": 0,
            "TotalLiquid": {
              "Value": 0,
              "Unit": "in",
              "UnitType": 1
            },
            "Rain": {
              "Value": 0,
              "Unit": "in",
              "UnitType": 1
            },
            "Snow": {
              "Value": 0,
              "Unit": "in",
              "UnitType": 1
            },
            "Ice": {
              "Value": 0,
              "Unit": "in",
              "UnitType": 1
            },
            "CloudCover": 43,
            "Evapotranspiration": {
              "Value": 0,
              "Unit": "in",
              "UnitType": 1
            },
            "SolarIrradiance": {
              "Value": 0,
              "Unit": "W/m²",
              "UnitType": 33
            },
            "MobileLink": "http://www.accuweather.com/en/tr/izmit/318719/hourly-weather-forecast/318719?day=1&hbhhour=23&lang=en-us",
            "Link": "http://www.accuweather.com/en/tr/izmit/318719/hourly-weather-forecast/318719?day=1&hbhhour=23&lang=en-us"
          },
          {
            "DateTime": "2024-07-07T00:00:00+03:00",
            "EpochDateTime": 1720299600,
            "WeatherIcon": 35,
            "IconPhrase": "Partly cloudy",
            "HasPrecipitation": false,
            "IsDaylight": false,
            "Temperature": {
              "Value": 71,
              "Unit": "F",
              "UnitType": 18
            },
            "RealFeelTemperature": {
              "Value": 73,
              "Unit": "F",
              "UnitType": 18,
              "Phrase": "Pleasant"
            },
            "RealFeelTemperatureShade": {
              "Value": 73,
              "Unit": "F",
              "UnitType": 18,
              "Phrase": "Pleasant"
            },
            "WetBulbTemperature": {
              "Value": 69,
              "Unit": "F",
              "UnitType": 18
            },
            "WetBulbGlobeTemperature": {
              "Value": 73,
              "Unit": "F",
              "UnitType": 18
            },
            "DewPoint": {
              "Value": 67,
              "Unit": "F",
              "UnitType": 18
            },
            "Wind": {
              "Speed": {
                "Value": 3.5,
                "Unit": "mi/h",
                "UnitType": 9
              },
              "Direction": {
                "Degrees": 51,
                "Localized": "NE",
                "English": "NE"
              }
            },
            "WindGust": {
              "Speed": {
                "Value": 9.2,
                "Unit": "mi/h",
                "UnitType": 9
              }
            },
            "RelativeHumidity": 87,
            "IndoorRelativeHumidity": 87,
            "Visibility": {
              "Value": 6,
              "Unit": "mi",
              "UnitType": 2
            },
            "Ceiling": {
              "Value": 30000,
              "Unit": "ft",
              "UnitType": 0
            },
            "UVIndex": 0,
            "UVIndexText": "Low",
            "PrecipitationProbability": 4,
            "ThunderstormProbability": 0,
            "RainProbability": 4,
            "SnowProbability": 0,
            "IceProbability": 0,
            "TotalLiquid": {
              "Value": 0,
              "Unit": "in",
              "UnitType": 1
            },
            "Rain": {
              "Value": 0,
              "Unit": "in",
              "UnitType": 1
            },
            "Snow": {
              "Value": 0,
              "Unit": "in",
              "UnitType": 1
            },
            "Ice": {
              "Value": 0,
              "Unit": "in",
              "UnitType": 1
            },
            "CloudCover": 35,
            "Evapotranspiration": {
              "Value": 0,
              "Unit": "in",
              "UnitType": 1
            },
            "SolarIrradiance": {
              "Value": 0,
              "Unit": "W/m²",
              "UnitType": 33
            },
            "MobileLink": "http://www.accuweather.com/en/tr/izmit/318719/hourly-weather-forecast/318719?day=2&hbhhour=0&lang=en-us",
            "Link": "http://www.accuweather.com/en/tr/izmit/318719/hourly-weather-forecast/318719?day=2&hbhhour=0&lang=en-us"
          },
          {
            "DateTime": "2024-07-07T01:00:00+03:00",
            "EpochDateTime": 1720303200,
            "WeatherIcon": 35,
            "IconPhrase": "Partly cloudy",
            "HasPrecipitation": false,
            "IsDaylight": false,
            "Temperature": {
              "Value": 72,
              "Unit": "F",
              "UnitType": 18
            },
            "RealFeelTemperature": {
              "Value": 73,
              "Unit": "F",
              "UnitType": 18,
              "Phrase": "Pleasant"
            },
            "RealFeelTemperatureShade": {
              "Value": 73,
              "Unit": "F",
              "UnitType": 18,
              "Phrase": "Pleasant"
            },
            "WetBulbTemperature": {
              "Value": 69,
              "Unit": "F",
              "UnitType": 18
            },
            "WetBulbGlobeTemperature": {
              "Value": 73,
              "Unit": "F",
              "UnitType": 18
            },
            "DewPoint": {
              "Value": 67,
              "Unit": "F",
              "UnitType": 18
            },
            "Wind": {
              "Speed": {
                "Value": 3.5,
                "Unit": "mi/h",
                "UnitType": 9
              },
              "Direction": {
                "Degrees": 51,
                "Localized": "NE",
                "English": "NE"
              }
            },
            "WindGust": {
              "Speed": {
                "Value": 9.2,
                "Unit": "mi/h",
                "UnitType": 9
              }
            },
            "RelativeHumidity": 86,
            "IndoorRelativeHumidity": 86,
            "Visibility": {
              "Value": 6,
              "Unit": "mi",
              "UnitType": 2
            },
            "Ceiling": {
              "Value": 30000,
              "Unit": "ft",
              "UnitType": 0
            },
            "UVIndex": 0,
            "UVIndexText": "Low",
            "PrecipitationProbability": 7,
            "ThunderstormProbability": 0,
            "RainProbability": 7,
            "SnowProbability": 0,
            "IceProbability": 0,
            "TotalLiquid": {
              "Value": 0,
              "Unit": "in",
              "UnitType": 1
            },
            "Rain": {
              "Value": 0,
              "Unit": "in",
              "UnitType": 1
            },
            "Snow": {
              "Value": 0,
              "Unit": "in",
              "UnitType": 1
            },
            "Ice": {
              "Value": 0,
              "Unit": "in",
              "UnitType": 1
            },
            "CloudCover": 30,
            "Evapotranspiration": {
              "Value": 0,
              "Unit": "in",
              "UnitType": 1
            },
            "SolarIrradiance": {
              "Value": 0,
              "Unit": "W/m²",
              "UnitType": 33
            },
            "MobileLink": "http://www.accuweather.com/en/tr/izmit/318719/hourly-weather-forecast/318719?day=2&hbhhour=1&lang=en-us",
            "Link": "http://www.accuweather.com/en/tr/izmit/318719/hourly-weather-forecast/318719?day=2&hbhhour=1&lang=en-us"
          },
          {
            "DateTime": "2024-07-07T02:00:00+03:00",
            "EpochDateTime": 1720306800,
            "WeatherIcon": 34,
            "IconPhrase": "Mostly clear",
            "HasPrecipitation": false,
            "IsDaylight": false,
            "Temperature": {
              "Value": 71,
              "Unit": "F",
              "UnitType": 18
            },
            "RealFeelTemperature": {
              "Value": 73,
              "Unit": "F",
              "UnitType": 18,
              "Phrase": "Pleasant"
            },
            "RealFeelTemperatureShade": {
              "Value": 73,
              "Unit": "F",
              "UnitType": 18,
              "Phrase": "Pleasant"
            },
            "WetBulbTemperature": {
              "Value": 69,
              "Unit": "F",
              "UnitType": 18
            },
            "WetBulbGlobeTemperature": {
              "Value": 73,
              "Unit": "F",
              "UnitType": 18
            },
            "DewPoint": {
              "Value": 67,
              "Unit": "F",
              "UnitType": 18
            },
            "Wind": {
              "Speed": {
                "Value": 3.5,
                "Unit": "mi/h",
                "UnitType": 9
              },
              "Direction": {
                "Degrees": 55,
                "Localized": "NE",
                "English": "NE"
              }
            },
            "WindGust": {
              "Speed": {
                "Value": 9.2,
                "Unit": "mi/h",
                "UnitType": 9
              }
            },
            "RelativeHumidity": 87,
            "IndoorRelativeHumidity": 87,
            "Visibility": {
              "Value": 6,
              "Unit": "mi",
              "UnitType": 2
            },
            "Ceiling": {
              "Value": 30000,
              "Unit": "ft",
              "UnitType": 0
            },
            "UVIndex": 0,
            "UVIndexText": "Low",
            "PrecipitationProbability": 7,
            "ThunderstormProbability": 0,
            "RainProbability": 7,
            "SnowProbability": 0,
            "IceProbability": 0,
            "TotalLiquid": {
              "Value": 0,
              "Unit": "in",
              "UnitType": 1
            },
            "Rain": {
              "Value": 0,
              "Unit": "in",
              "UnitType": 1
            },
            "Snow": {
              "Value": 0,
              "Unit": "in",
              "UnitType": 1
            },
            "Ice": {
              "Value": 0,
              "Unit": "in",
              "UnitType": 1
            },
            "CloudCover": 26,
            "Evapotranspiration": {
              "Value": 0,
              "Unit": "in",
              "UnitType": 1
            },
            "SolarIrradiance": {
              "Value": 0,
              "Unit": "W/m²",
              "UnitType": 33
            },
            "MobileLink": "http://www.accuweather.com/en/tr/izmit/318719/hourly-weather-forecast/318719?day=2&hbhhour=2&lang=en-us",
            "Link": "http://www.accuweather.com/en/tr/izmit/318719/hourly-weather-forecast/318719?day=2&hbhhour=2&lang=en-us"
          },
          {
            "DateTime": "2024-07-07T03:00:00+03:00",
            "EpochDateTime": 1720310400,
            "WeatherIcon": 34,
            "IconPhrase": "Mostly clear",
            "HasPrecipitation": false,
            "IsDaylight": false,
            "Temperature": {
              "Value": 71,
              "Unit": "F",
              "UnitType": 18
            },
            "RealFeelTemperature": {
              "Value": 72,
              "Unit": "F",
              "UnitType": 18,
              "Phrase": "Pleasant"
            },
            "RealFeelTemperatureShade": {
              "Value": 72,
              "Unit": "F",
              "UnitType": 18,
              "Phrase": "Pleasant"
            },
            "WetBulbTemperature": {
              "Value": 68,
              "Unit": "F",
              "UnitType": 18
            },
            "WetBulbGlobeTemperature": {
              "Value": 73,
              "Unit": "F",
              "UnitType": 18
            },
            "DewPoint": {
              "Value": 67,
              "Unit": "F",
              "UnitType": 18
            },
            "Wind": {
              "Speed": {
                "Value": 3.5,
                "Unit": "mi/h",
                "UnitType": 9
              },
              "Direction": {
                "Degrees": 58,
                "Localized": "ENE",
                "English": "ENE"
              }
            },
            "WindGust": {
              "Speed": {
                "Value": 8.1,
                "Unit": "mi/h",
                "UnitType": 9
              }
            },
            "RelativeHumidity": 88,
            "IndoorRelativeHumidity": 88,
            "Visibility": {
              "Value": 6,
              "Unit": "mi",
              "UnitType": 2
            },
            "Ceiling": {
              "Value": 30000,
              "Unit": "ft",
              "UnitType": 0
            },
            "UVIndex": 0,
            "UVIndexText": "Low",
            "PrecipitationProbability": 7,
            "ThunderstormProbability": 0,
            "RainProbability": 7,
            "SnowProbability": 0,
            "IceProbability": 0,
            "TotalLiquid": {
              "Value": 0,
              "Unit": "in",
              "UnitType": 1
            },
            "Rain": {
              "Value": 0,
              "Unit": "in",
              "UnitType": 1
            },
            "Snow": {
              "Value": 0,
              "Unit": "in",
              "UnitType": 1
            },
            "Ice": {
              "Value": 0,
              "Unit": "in",
              "UnitType": 1
            },
            "CloudCover": 22,
            "Evapotranspiration": {
              "Value": 0,
              "Unit": "in",
              "UnitType": 1
            },
            "SolarIrradiance": {
              "Value": 0,
              "Unit": "W/m²",
              "UnitType": 33
            },
            "MobileLink": "http://www.accuweather.com/en/tr/izmit/318719/hourly-weather-forecast/318719?day=2&hbhhour=3&lang=en-us",
            "Link": "http://www.accuweather.com/en/tr/izmit/318719/hourly-weather-forecast/318719?day=2&hbhhour=3&lang=en-us"
          }
        ])
      }

      
    } catch (err) {
      setError('Error fetching forecast data');
      setForecast(null);
    }
  };


  // console.log(IP);

  useEffect(() => {
    fetchForecast();
  }, [IP]);

  const getWeatherEmoji = (weatherPhrase) => {
    const phrase = weatherPhrase.toLowerCase();
    if (phrase.includes('sun') || phrase.includes('clear')) return '☀️';
    if (phrase.includes('cloud')) return '☁️';
    if (phrase.includes('rain')) return '🌧️';
    if (phrase.includes('snow')) return '❄️';
    if (phrase.includes('thunder')) return '⛈️';
    if (phrase.includes('wind')) return '💨';
    return '🌤️'; // default emoji for unknown weather
  };
  console.log(forecast)
  return (
    <div className="weather-forecast-container">
      {forecast != null ? (
        <>
          <div className="current-weather">
          <h1 className='current-weather-title'>Now</h1>

            <div className="current-weather-main">
              <div className="current-weather-icon">{getWeatherEmoji(forecast[0].IconPhrase)}</div>
              <div className="current-weather-temp">
                <span className="temp-value">{Math.round((forecast[0].Temperature.Value-32) * 5/9)}</span>
                <span className="temp-unit">°C</span>
              </div>
            </div>
            <div className="current-weather-details">
              <p className="weather-phrase">{forecast[0].IconPhrase}</p>
              <p>Feels like: {Math.round((forecast[0].RealFeelTemperature.Value-32) * 5/9)}°C</p>
              <p>Wind: {forecast[0].Wind.Speed.Value} {forecast[0].Wind.Speed.Unit} {forecast[0].Wind.Direction.English}</p>
              <p>Humidity: {forecast[0].RelativeHumidity}%</p>
              <p>Visibility: {forecast[0].Visibility.Value} {forecast[0].Visibility.Unit}</p>
            </div>
          </div>
          <h2 className="hourly-forecast-title">Hourly Forecast</h2>
          <div className="weather-container">
            {forecast.slice(1).map((weather, index) => (
              <div key={index} className="weather-card">
                <div className="weather-icon">{getWeatherEmoji(weather.IconPhrase)}</div>
                <p className="temperature">{Math.round((weather.Temperature.Value-32) * 5/9)}°C</p>
                <p className="weather-phrase">{weather.IconPhrase}</p>
                <p className="secondary-info">Feels: {Math.round((weather.RealFeelTemperature.Value-32) * 5/9)}°</p>
                <p className="secondary-info">Wind: {weather.Wind.Speed.Value} {weather.Wind.Speed.Unit}</p>
                <p className="time">{new Date(weather.DateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default WeatherForecast;