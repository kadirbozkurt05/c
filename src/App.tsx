import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import LoginForm from './components/LoginForm';
import DashboardLayout from './components/Layout/DashboardLayout';
import ResourcesPage from './pages/ResourcesPage';
import ExamsPage from './pages/ExamsPage';
import GamesPage from './pages/GamesPage';
import UsersPage from './pages/UsersPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Navigate to="/dashboard/resources" replace />} />
              <Route path="resources" element={<ResourcesPage />} />
              <Route path="exams" element={<ExamsPage />} />
              <Route path="games" element={<GamesPage />} />
              <Route path="users" element={<UsersPage />} />
            </Route>
          </Routes>
        </Router>
        <Toaster position="top-right" />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;