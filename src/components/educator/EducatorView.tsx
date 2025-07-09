
import React, { useState } from 'react';
import { User } from '../../pages/Index';
import { Sidebar } from '../common/Sidebar';
import { FilesPage } from './FilesPage';
import { EducatorProfile } from './EducatorProfile';

interface EducatorViewProps {
  user: User;
  onLogout: () => void;
}

export const EducatorView: React.FC<EducatorViewProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('files');

  const renderContent = () => {
    switch (activeTab) {
      case 'files':
        return <FilesPage />;
      case 'profile':
        return <EducatorProfile user={user} />;
      default:
        return <FilesPage />;
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
