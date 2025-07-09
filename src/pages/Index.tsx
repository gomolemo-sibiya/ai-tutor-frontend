
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginPage } from '../components/auth/LoginPage';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'educator' | 'admin';
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('aiTutorUser');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      // Redirect based on user role
      switch (userData.role) {
        case 'student':
          navigate('/student');
          break;
        case 'educator':
          navigate('/educator');
          break;
        case 'admin':
          navigate('/admin');
          break;
      }
    }
    setIsLoading(false);
  }, [navigate]);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('aiTutorUser', JSON.stringify(userData));
    
    // Redirect based on user role
    switch (userData.role) {
      case 'student':
        navigate('/student');
        break;
      case 'educator':
        navigate('/educator');
        break;
      case 'admin':
        navigate('/admin');
        break;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return <LoginPage onLogin={handleLogin} />;
};

export default Index;
