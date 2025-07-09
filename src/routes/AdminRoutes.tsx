
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout } from '../components/admin/AdminLayout';
import { LecturersPage } from '../components/admin/LecturersPage';
import { StudentsPage } from '../components/admin/StudentsPage';
import { AdminFilesPage } from '../components/admin/AdminFilesPage';
import { AdminProfile } from '../components/admin/AdminProfile';
import { FacultyPage } from '../components/admin/FacultyPage';
import { DepartmentsPage } from '../components/admin/DepartmentsPage';
import { CoursesPage } from '../components/admin/CoursesPage';
import { ModulesPage as AdminModulesPage } from '../components/admin/ModulesPage';
import { CampusPage } from '../components/admin/CampusPage';
import { SettingsPage } from '../components/admin/SettingsPage';
import { User } from '../pages/Index';

const AdminRoutes: React.FC = () => {
  // Get user from localStorage
  const user: User = JSON.parse(localStorage.getItem('aiTutorUser') || '{"name":"","email":"","role":"admin"}');

  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/lecturers" replace />} />
        <Route path="/lecturers" element={<LecturersPage />} />
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/files" element={<AdminFilesPage />} />
        <Route path="/faculty" element={<FacultyPage />} />
        <Route path="/departments" element={<DepartmentsPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/modules" element={<AdminModulesPage />} />
        <Route path="/campus" element={<CampusPage />} />
        <Route path="/profile" element={<AdminProfile user={user} />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;
