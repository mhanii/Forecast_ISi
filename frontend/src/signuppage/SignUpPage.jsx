import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import './signuppage.css';
import CSRFToken from '../common/CSRFToken';
import SnackbarComponent from '../common/tools/SnackBar';
import { useCookies } from 'react-cookie';
const SignupPage = () => {
  axios.defaults.withCredentials = true;
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    plan: '',
    alerts: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
    timeout: 6000
  });

  useEffect(() => {
    if (location.state?.selectedPlan) {
      setFormData(prev => ({ ...prev, plan: location.state.selectedPlan }));
    } else {
      navigate("/pricing");
    }
  }, [location, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const showSnackbar = (message, severity, timeout = 6000) => {
    setSnackbar({ open: true, message, severity, timeout });
  };
  const [cookies] = useCookies(['csrftoken']);
  const test = Cookies.get('csrftoken')
  console.log(test)
  console.log(cookies.csrftoken)
  const register = async (email, password,plan) => {
    const config = {
      headers: {
        'X-CSRFToken': cookies.csrftoken,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
      withCredentials: true,
    };
    const body = JSON.stringify({ email, password,plan });
    try {
      const res = await axios.post('https://fullstack-forecast-forge-03fcfb305bcd.herokuapp.com/auth/signup', body, config);
      return res;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await register(formData.email, formData.password, formData.plan);
      const result = Object.keys(res.data)[0];
      if (result === 'success') {
        showSnackbar('Accound created successfully', 'success', 3000);
        // Cookies.set('email', formData.email, { expires: 2 });
        await sleep(3000)
        navigate("/login");
      } else {
        showSnackbar('Something went wrong', 'error', 3000);

      }
    } catch (err) {
      console.error(err);
      showSnackbar('An error occurred during signup.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <main>
        <form method='post' onSubmit={(e) => {handleSubmit(e)}} className="auth-form">
         <CSRFToken /> 
         <h1>Inscribirse</h1>
          <h2>{formData.plan.toUpperCase()} Plan</h2>


          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {formData.plan === 'premium' && (
            <label>
              <input
                type="checkbox"
                name="alerts"
                checked={formData.alerts}
                onChange={handleChange}
              /> Recibir alertas
            </label>
          )}
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Registrando...' : 'Completar registro'}
          </button>
        </form>
        <p>¿Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link></p>
      </main>
      <SnackbarComponent
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        timeout={snackbar.timeout}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
      />
    </div>
  );
};

export default SignupPage;