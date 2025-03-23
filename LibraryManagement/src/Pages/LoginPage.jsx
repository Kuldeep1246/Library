import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (error) {
      alert(error.message);
    }
  };

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible); 
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundImage: "url('https://t4.ftcdn.net/jpg/05/17/76/83/240_F_517768363_e0nTfWAWhZIucnvwXVrJFG8nVI4ekZfT.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          padding: '40px',
          borderRadius: '12px',
          width: '350px',
          backdropFilter: 'blur(10px)', 
          backgroundColor: 'rgba(255, 255, 255, 0.3)', 
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            marginBottom: '30px',
            color: '#fff',
            fontSize: '28px',
            fontWeight: '600',
            letterSpacing: '1px',
          }}
        >
          Login
        </h2>
        <div style={{ marginBottom: '25px' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '15px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontSize: '16px',
              transition: 'border-color 0.3s ease',
              outline: 'none',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#2575fc';
              e.target.style.boxShadow = '0 0 8px rgba(37, 117, 252, 0.3)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#ddd';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>
        <div style={{ marginBottom: '25px' }}>
          <input
            type={passwordVisible ? 'text' : 'password'} 
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '15px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontSize: '16px',
              transition: 'border-color 0.3s ease',
              outline: 'none',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#2575fc';
              e.target.style.boxShadow = '0 0 8px rgba(37, 117, 252, 0.3)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#ddd';
              e.target.style.boxShadow = 'none';
            }}
          />
          <button
            type="button"
            onClick={handlePasswordVisibility}
            style={{
              position: 'absolute',
              right: '15px',
              top: '45px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#2575fc',
              fontSize: '16px',
            }}
          >
            {passwordVisible ? 'Hide' : 'Show'} Password
          </button>
        </div>
        <div style={{ textAlign: 'center' }}>
          <a href="/forgot-password" style={{ color: '#2575fc', textDecoration: 'none' }}>
            Forgot Password?
          </a>
        </div>
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '15px',
            backgroundColor: '#6a11cb',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '18px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#580fa8')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#6a11cb')}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
