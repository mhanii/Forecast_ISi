import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function RequireAuth({children}) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const email = Cookies.get('email');

        const config = {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
          },
          withCredentials: true,
        };
        const body = JSON.stringify({ email });
        const response = await axios.post(
          'https://fullstack-forecast-forge-03fcfb305bcd.herokuapp.com/auth/check_auth', body, config
        );

        setIsAuthenticated(response.data.isAuthenticated === 'success');
        console.log(response.data);
      } catch (err) {
        console.error('Authentication check failed', err);
        setIsAuthenticated(false);
      }
    };
    checkAuthStatus();
    console.log("Why don't you see me?");
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Or some other loading indicator
  }

  if (!isAuthenticated) {
    document.title = "Login";
    return <Navigate to="/login"/>;
  }

  return children;
}
