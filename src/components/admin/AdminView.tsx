
import React, { useState } from 'react';
import { User } from '../../pages/Index';
import { Sidebar } from '../common/Sidebar';
import { LecturersPage } from './LecturersPage';
import { StudentsPage } from './StudentsPage';
import { AdminFilesPage } from './AdminFilesPage';
import { AdminProfile } from './AdminProfile';

interface AdminViewProps {
  user: User;
  onLogout: () => void;
}

export const AdminView: React.FC<AdminViewProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('lecturers');

  const renderContent = () => {
    switch (activeTab) {
      case 'lecturers':
        return <LecturersPage />;
      case 'students':
        return <StudentsPage />;
      case 'files':
        return <AdminFilesPage />;
      case 'profile':
        return <AdminProfile user={user} />;
      case 'faculty':
        return <div className="p-8"><h1 className="text-white text-2xl">Faculty Management - Coming Soon</h1></div>;
      case 'departments':
        return <div className="p-8"><h1 className="text-white text-2xl">Department Management - Coming Soon</h1></div>;
      case 'courses':
        return <div className="p-8"><h1 className="text-white text-2xl">Course Management - Coming Soon</h1></div>;
      case 'modules':
        return <div className="p-8"><h1 className="text-white text-2xl">Module Management - Coming Soon</h1></div>;
      case 'campus':
        return <div className="p-8"><h1 className="text-white text-2xl">Campus Management - Coming Soon</h1></div>;
      case 'settings':
        return <div className="p-8"><h1 className="text-white text-2xl">System Settings - Coming Soon</h1></div>;
      default:
        return <LecturersPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      <div className="fixed left-0 top-0 bottom-0">
        <Sidebar
          user={user}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onLogout={onLogout}
        />
      </div>
      <div className="flex-1 ml-64">
        {renderContent()}
      </div>
    </div>
  );
};
