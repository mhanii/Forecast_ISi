import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../signuppage/signuppage.css';
import CSRFToken from '../common/CSRFToken';
import SnackbarComponent from '../common/tools/SnackBar';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
    timeout: 6000,
  });

  const navigate = useNavigate();

  const showSnackbar = (message, severity, timeout = 6000) => {
    setSnackbar({ open: true, message, severity, timeout });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': Cookies.get('csrftoken'),
        },
        withCredentials: true,
      };

      const body = JSON.stringify({ email, password });

      const res = await axios.post('https://fullstack-forecast-forge-03fcfb305bcd.herokuapp.com/auth/login', body, config);

      if (res.data.success) {
        showSnackbar('Logged in successfully', 'success', 3000);
        Cookies.set('email', email, { expires: 2 });
        
        navigate('/');
        window.location.reload();

      } else {
        window.location.reload();

        showSnackbar(res.data.error, 'error', 3000);
      }
    } catch (err) {
      console.error(err);
      showSnackbar('An error occurred during login.', 'error');
    }
  };

  return (
    <div className="auth-container">

      <main>
        <form method='post' onSubmit={(e) => {handleSubmit(e)}} className="auth-form">
          <CSRFToken />
          <h1>Iniciar sesión</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Iniciar sesión</button>
        </form>
        <p>¿No tienes una cuenta? <Link to="/signup">Inscribirse</Link></p>
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

export default LoginPage;
