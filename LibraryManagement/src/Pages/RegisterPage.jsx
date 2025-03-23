import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase';
import { useNavigate } from 'react-router-dom';

export const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/login');
    } catch (error) {
      alert(error.message);
    }
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
        onSubmit={handleRegister}
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
            color: '#fff', // White text for better contrast
            fontSize: '28px',
            fontWeight: '600',
            letterSpacing: '1px',
          }}
        >
          Register
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
            type="password"
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
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
