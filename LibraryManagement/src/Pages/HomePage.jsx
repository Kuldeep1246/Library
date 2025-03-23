import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #2980B9, #6DD5FA)',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: '#fff',
        textAlign: 'center',
        backgroundImage: "url('https://t4.ftcdn.net/jpg/05/17/76/83/240_F_517768363_e0nTfWAWhZIucnvwXVrJFG8nVI4ekZfT.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <h1
        style={{
          fontSize: '3rem',
          marginBottom: '30px',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
        }}
      >
        Welcome to the Library Management System
      </h1>
      <div
        style={{
          display: 'flex',
          gap: '30px',
        }}
      >
        <Link
          to="/login"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            padding: '15px 30px',
            borderRadius: '8px',
            textDecoration: 'none',
            color: '#fff',
            fontSize: '1.2rem',
            transition: 'background-color 0.3s ease',
            border: '2px solid rgba(255, 255, 255, 0.5)',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)')}
          onMouseOut={(e) => (e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)')}
        >
          Login
        </Link>
        <Link
          to="/register"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            padding: '15px 30px',
            borderRadius: '8px',
            textDecoration: 'none',
            color: '#fff',
            fontSize: '1.2rem',
            transition: 'background-color 0.3s ease',
            border: '2px solid rgba(255, 255, 255, 0.5)',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)')}
          onMouseOut={(e) => (e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)')}
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
