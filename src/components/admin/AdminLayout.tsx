
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../common/Sidebar';
import { User } from '../../pages/Index';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  
  // Get user from localStorage for now
  const user: User = JSON.parse(localStorage.getItem('aiTutorUser') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('aiTutorUser');
    navigate('/');
  };

  const handleTabChange = (tab: string) => {
    const routeMap: { [key: string]: string } = {
      'lecturers': '/admin/lecturers',
      'students': '/admin/students',
      'files': '/admin/files',
      'faculty': '/admin/faculty',
      'departments': '/admin/departments',
      'courses': '/admin/courses',
      'modules': '/admin/modules',
      'campus': '/admin/campus',
      'profile': '/admin/profile',
      'settings': '/admin/settings'
    };
    
    navigate(routeMap[tab] || '/admin/lecturers');
  };

  const getActiveTab = () => {
    const path = window.location.pathname;
    if (path.includes('/students')) return 'students';
    if (path.includes('/files')) return 'files';
    if (path.includes('/faculty')) return 'faculty';
    if (path.includes('/departments')) return 'departments';
    if (path.includes('/courses')) return 'courses';
    if (path.includes('/modules')) return 'modules';
    if (path.includes('/campus')) return 'campus';
    if (path.includes('/profile')) return 'profile';
    if (path.includes('/settings')) return 'settings';
    return 'lecturers';
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
