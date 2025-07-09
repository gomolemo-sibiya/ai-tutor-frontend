
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { EducatorLayout } from '../components/educator/EducatorLayout';
import { FilesPage } from '../components/educator/FilesPage';
import { EducatorProfile } from '../components/educator/EducatorProfile';
import { User } from '../pages/Index';

const EducatorRoutes: React.FC = () => {
  // Get user from localStorage
  const user: User = JSON.parse(localStorage.getItem('aiTutorUser') || '{"name":"","email":"","role":"educator"}');

  return (
    <EducatorLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/educator/files" replace />} />
        <Route path="/files" element={<FilesPage />} />
        <Route path="/profile" element={<EducatorProfile user={user} />} />
      </Routes>
    </EducatorLayout>
  );
};

export default EducatorRoutes;
