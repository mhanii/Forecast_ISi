import React, { useState, useEffect } from 'react';
import { useIP } from '../../common/Context';

export default function GetLocation() {
  const [ipAddress, setIpAddress] = useState('');
  const [geoInfo, setGeoInfo] = useState({});
  const { updateIP, updateCity } = useIP();

  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        setIpAddress(data.ip);
      } catch (error) {
        console.error('Error fetching IP address:', error);
      }
    };
    fetchIpAddress();
  }, []);

  useEffect(() => {
    const fetchGeoInfo = async () => {
      try {
        const token = '221a3aa5f9a16c';  // Replace with your ipinfo token
        const response = await fetch(`https://ipinfo.io/${ipAddress}?token=${token}`);
        const data = await response.json();
        setGeoInfo(data);
      } catch (error) {
        console.error('Error fetching Geo information:', error);
      }
    };
    if (ipAddress) {
      updateIP(ipAddress);
      fetchGeoInfo();
    }
  }, [ipAddress, updateIP]);

  useEffect(() => {
    if (geoInfo.city) {
      updateCity(geoInfo.city);
    }
  }, [geoInfo, updateCity]);

  return null;
}
