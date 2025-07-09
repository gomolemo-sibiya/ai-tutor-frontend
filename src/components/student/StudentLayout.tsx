
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../common/Sidebar';
import { User } from '../../pages/Index';

interface StudentLayoutProps {
  children: React.ReactNode;
}

export const StudentLayout: React.FC<StudentLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  
  // Get user from localStorage for now
  const user: User = JSON.parse(localStorage.getItem('aiTutorUser') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('aiTutorUser');
    navigate('/');
  };

  const handleTabChange = (tab: string) => {
    switch (tab) {
      case 'modules':
        navigate('/student/modules');
        break;
      case 'chat':
        navigate('/student/chat');
        break;
      case 'profile':
        navigate('/student/profile');
        break;
      default:
        navigate('/student/modules');
    }
  };

  const getActiveTab = () => {
    const path = window.location.pathname;
    if (path.includes('/chat')) return 'chat';
    if (path.includes('/profile')) return 'profile';
    return 'modules';
  };

  return (
    <div className="min-h-screen bg-[#f7f8f9] flex">
      <div className="fixed left-0 top-0 bottom-0">
        <Sidebar
          user={user}
          activeTab={getActiveTab()}
          onTabChange={handleTabChange}
          onLogout={handleLogout}
        />
      </div>
      <div className="flex-1 ml-64">
        {children}
      </div>
    </div>
  );
};
