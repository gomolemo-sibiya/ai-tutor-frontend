
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Index from '../pages/Index';
import StudentRoutes from './StudentRoutes';
import EducatorRoutes from './EducatorRoutes';
import AdminRoutes from './AdminRoutes';
import AuthRoutes from './AuthRoutes';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="/student/*" element={<StudentRoutes />} />
      <Route path="/educator/*" element={<EducatorRoutes />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="*" element={<div>404 - Page not found</div>} />
    </Routes>
  );
};

export default AppRoutes;
