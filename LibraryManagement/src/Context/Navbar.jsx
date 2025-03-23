import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/Context';

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <nav
      style={{
        backgroundColor: '#333',
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div>
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: '20px',
            fontWeight: 'bold',
          }}
        >
          Home
        </Link>
      </div>

      <div>
        {user ? (
          <>
            <Link
              to="/dashboard"
              style={{
                color: 'white',
                textDecoration: 'none',
                marginLeft: '20px',
              }}
            >
              Dashboard
            </Link>
            <Link
              to="/borrowed-books"
              style={{
                color: 'white',
                textDecoration: 'none',
                marginLeft: '20px',
              }}
            >
              Borrowed Books
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/login"
              style={{
                color: 'white',
                textDecoration: 'none',
                marginLeft: '20px',
              }}
            >
              Login
            </Link>
            <Link
              to="/register"
              style={{
                color: 'white',
                textDecoration: 'none',
                marginLeft: '20px',
              }}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
