import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import './header.css';

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
          'https://fullstack-forecast-forge-03fcfb305bcd.herokuapp.com/auth/check_auth',body,config
        );

        setIsAuthenticated(response.data.isAuthenticated === 'success');
      } catch (err) {
        console.error('Authentication check failed', err);
        setIsAuthenticated(false);
      }
    };
    checkAuthStatus();
  }, []);

  const handleLogout = async () => {
    try {
      const config = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': Cookies.get('csrftoken'),
        },
        withCredentials: true,
      };

      await axios.post('https://fullstack-forecast-forge-03fcfb305bcd.herokuapp.com/auth/logout', {}, config);
      Cookies.remove('email');
      setIsAuthenticated(false);
      navigate('/login');
      window.location.reload();

    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <div className="header-main-container">
      <div className='logo-container'><a className='logo' href="/">ForecastForge</a></div>
      <div className='other-buttons-container'>
        <Link to='/aboutus' className='header-button about-us'>Nosotros</Link>
        <Link to='/contactus' className='header-button contact-us'>Contactanos</Link>
        <Link to='/pricing' className='header-button pricing'>Precios</Link>
      </div>
      <div className="account-buttons-container">
        {isAuthenticated ? (
          <button className="header-button log-out" onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login" className="header-button log-in">Iniciar sesión</Link>
            <Link to="/signup" className="header-button sign-up">Inscribirse</Link>
          </>
        )}
      </div>
    </div>
  );
}