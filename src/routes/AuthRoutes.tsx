
import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { LoginPage } from '../components/auth/LoginPage';
import { VerificationPage } from '../components/auth/VerificationPage';
import { User } from '../pages/Index';

const AuthRoutes: React.FC = () => {
  const navigate = useNavigate();
  const [verificationEmail, setVerificationEmail] = useState('');

  const handleLogin = (user: User) => {
    localStorage.setItem('aiTutorUser', JSON.stringify(user));
    
    // Navigate based on user role
    switch (user.role) {
      case 'student':
        navigate('/student');
        break;
      case 'educator':
        navigate('/educator');
        break;
      case 'admin':
        navigate('/admin');
        break;
      default:
        navigate('/');
    }
  };

  const handleVerificationComplete = () => {
    navigate('/auth/login');
  };

  const handleBackToLogin = () => {
    navigate('/auth/login');
  };

  return (
    <Routes>
      <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
      <Route 
        path="/verify" 
        element={
          <VerificationPage 
            email={verificationEmail}
            onVerificationComplete={handleVerificationComplete}
            onBack={handleBackToLogin}
          />
        } 
      />
    </Routes>
  );
};

export default AuthRoutes;
