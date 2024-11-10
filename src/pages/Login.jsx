import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/users/login', { email, password });

      // Check if login is successful (assuming a token or status in response)
      if (response.data.token) {
        // Save token to localStorage or context
        localStorage.setItem('token', response.data.token);

        // Navigate to dashboard or home page
        navigate('/users');
      } else {
        setError('Invalid login credentials');
      }
    } catch (err) {
      setError('Invalid login credentials');
    }
  };

  return (
    <div style={{
      maxWidth: '350px',
      margin: 'auto',
      padding: '2rem',
      textAlign: 'center',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: 'white',
      marginTop: '10vh' // Adjust this value to move the form lower
    }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" style={{
          padding: '0.5rem 1rem',
          cursor: 'pointer',
          width: '100%',
          marginTop: '1rem',
          backgroundColor: '#1976d2',
          color: 'white',
          border: 'none',
          borderRadius: '4px'
        }}>
          Login
        </button>
      </form>
      <p style={{ marginTop: '1rem' }}>
        Don't have an account?{' '}
        <Link to="/register" style={{ color: '#1976d2', textDecoration: 'none' }}>
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;
