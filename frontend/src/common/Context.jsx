import React, { createContext, useContext, useState } from 'react';

// Create a context
const IPContext = createContext();

// Create a provider component
export const IPProvider = ({ children }) => {
  const [IP, setIP] = useState('');
  const [city, setCity] = useState('');
  const [weatherForecast, setWeatherForecast] = useState({});
  // Function to update IP address
  const updateIP = (newIP) => {
    setIP(newIP);
  };

  // Function to update city name
  const updateCity = (newCity) => {
    setCity(newCity);
  };

  const updateWeatherForecast = (newWeatherForecast) => {
    setWeatherForecast(newWeatherForecast);
  };
  return (
    <IPContext.Provider value={{ IP, updateIP, city, updateCity, weatherForecast, updateWeatherForecast }}>
      {children}
    </IPContext.Provider>
  );
};

// Custom hook to use the IP context
export const useIP = () => {
  return useContext(IPContext);
};
