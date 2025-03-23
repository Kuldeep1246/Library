import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Context/Context';
import PrivateRouter from './PrivateRoute';
import Navbar from './Context/Navbar';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import Dashboard from './Pages/Dashboard';
import BorrowedBooks from './Pages/BorrowedBooks'; // Import the BorrowedBooks component
import ForgotPasswordPage from './Pages/Forgetpassword';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<PrivateRouter><Dashboard /></PrivateRouter>} />
          <Route path="/borrowed-books" element={<PrivateRouter><BorrowedBooks /></PrivateRouter>} /> {/* Add the BorrowedBooks route */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
