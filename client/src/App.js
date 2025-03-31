import { Route, Routes } from 'react-router-dom';

import About from './pages/About';
import DashboardPage from './pages/DashboardPage';
import ExamPage from './pages/ExamPage';
import Help from './pages/Help';
import Home from './pages/Home';
import Layout from './components/layout/Layout';
import Login from './components/auth/Login';
import NotFound from './pages/NotFound';
import PictureLogin from './components/auth/PictureLogin';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import React from 'react';
import ResultsPage from './pages/ResultsPage';
import Signup from './components/auth/Signup';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="help" element={<Help />} />
        <Route path="login" element={<Login />} />
        <Route path="picture-login" element={<PictureLogin />} />
        <Route path="signup" element={<Signup />} />
        
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="exams/:examId" element={<ExamPage />} />
          <Route path="results/:resultId" element={<ResultsPage />} />
        </Route>
        
        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

