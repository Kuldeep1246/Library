import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../Firebase';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent! Please check your inbox.');
    } catch (error) {
      setMessage('Error: ' + error.message);
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
        onSubmit={handlePasswordReset}
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
          Forgot Password
        </h2>
        <div style={{ marginBottom: '25px' }}>
          <input
            type="email"
            placeholder="Enter your email"
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
          Send Password Reset Email
        </button>
        {message && <p style={{ textAlign: 'center', marginTop: '15px', color: '#fff' }}>{message}</p>}
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
