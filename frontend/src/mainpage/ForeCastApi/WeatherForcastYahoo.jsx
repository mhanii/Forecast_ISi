import React, { useState, useEffect } from 'react';
import './css/yahoo.css';
import { useIP } from '../../common/Context';
import axios from 'axios';
import Cookies from 'js-cookie';

const WeatherForecast = () => {
    const [forecast, setForecast] = useState(null);
    const [error, setError] = useState(null);
    const [ip, setIp] = useState(null);
    const [city, setCity] = useState(null);
    const { updateWeatherForecast } = useIP();

    useEffect(() => {
        const fetchIpAndCity = async () => {
            try {
                const ipResponse = await axios.get('https://api.ipify.org?format=json');
                const ipAddress = ipResponse.data.ip;
                setIp(ipAddress);
    
                const ipinfoToken = '221a3aa5f9a16c';  // Replace with your ipinfo token
                const geoResponse = await axios.get(`https://ipinfo.io/${ipAddress}?token=${ipinfoToken}`);
    
                if (geoResponse.data) {
                    setCity(geoResponse.data.city);

                } else {
                    throw new Error('Location data not found in the response');
                }
            } catch (err) {
                console.error('Error fetching IP or location data:', err);
                setError('Error fetching location data');
            }
        };

        fetchIpAndCity();
    }, []);

    useEffect(() => {
        const fetchForecast = async () => {
            if (!ip || !city) return;

            try {
                const response = await axios.get(`https://fullstack-forecast-forge-03fcfb305bcd.herokuapp.com/api/weather_forecast/?city=${city}&ip=${ip}`, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'X-CSRFToken': Cookies.get('csrftoken'),
                    },
                    withCredentials: true,
                });
                console.log("Weather Forecast Response:", response.data);
                setForecast(response.data);
                setError(null);
            } catch (err) {
                console.error('Error fetching forecast data', err);
                setError('Error fetching forecast data');
                setForecast(null);
            }
        };

        fetchForecast();
    }, [ip, city]);

    // Update the context when the forecast data changes
    useEffect(() => {
        if (forecast) {
            updateWeatherForecast(forecast);
        }
    }, [forecast, updateWeatherForecast]);

    const getWeatherEmoji = (code) => {
        switch (code) {
            case 32: return '☀️';
            case 24: return '💨';
            case 11: return '🌧️';
            case 34: return '⛅';
            default: return '🌤️';
        }
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return `${date.getMonth() + 1}/${date.getDate()}`;
    };

    if (!forecast) {
        return <div>Loading...</div>;
    }

    const { location, current_observation, forecasts } = forecast;

    return (
        <div className="weather-container-yahoo">
            <h1>Today</h1>
            <div className="current-weather">
                <div className="date-location">
                    <span>{formatDate(current_observation.pubDate)}</span>
                    <span>{location.city}</span>
                </div>
                <div className="current-temp">
                    <span className="emoji">{getWeatherEmoji(current_observation.condition.code)}</span>
                    <span className="temp">{current_observation.condition.temperature}°</span>
                    <span className="low-high">/{forecasts[0].low}°</span>
                </div>
                <div className="weather-description">{current_observation.condition.text}</div>
                <div className="details_container">
                    <div className="weather-details_1">
                        <div>Feels like: {current_observation.condition.temperature}°</div>
                        <div>Visibility:{current_observation.atmosphere.visibility} km</div>
                        <div>Wind: {current_observation.wind.direction} {current_observation.wind.speed} km/h</div>
                    </div>
                    <div className="weather-details_2">
                        <div>Humidity: {current_observation.atmosphere.humidity}%</div>
                        <div>Pressure: {current_observation.atmosphere.pressure}hPa</div>
                    </div>
                </div>
            </div>
            <h1>Next {forecasts.length - 1} days</h1>
            <div className='empty-forecast'></div>
            {forecasts.slice(1).map((day, index) => (
                <div key={index} className="forecast-day">
                    <div className="date-location">
                        <span>{day.day}</span>
                        <span>{formatDate(day.date)}</span>
                    </div>
                    <div className="forecast-temp">
                        <span className="emoji">{getWeatherEmoji(day.code)}</span>
                        <span className="temp">{day.high}°</span>
                        <span className="low-high">/{day.low}°</span>
                    </div>
                    <div className="weather-description">{day.text}</div>
                    <div className="weather-details">
                        <div>Feels like: {day.wind ? day.wind.chill : day.high}°</div>
                        <div>Wind: {day.wind ? `${day.wind.speed} ${day.wind.direction}` : 'W 42'} km/h</div>
                        <div>UV Index: {day.uv ? day.uv : 0}</div>
                        <div>Humidity: {day.precip ? day.precip : 0}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default WeatherForecast;
