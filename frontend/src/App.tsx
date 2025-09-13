import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

// Importing page components from the 'pages' folder
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import UserDashboardPage from './pages/UserDashboardPage';
import NewComplaintPage from './pages/NewComplaintPage';
import UserComplaintDetailsPage from './pages/UserComplaintDetailsPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminComplaintDetailsPage from './pages/AdminComplaintDetailsPage';
import NotFoundPage from './pages/NotFoundPage';

// Importing reusable components from the 'components' folder
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<UserDashboardPage />} />
            <Route path="/new-complaint" element={<NewComplaintPage />} />
            <Route path="/complaint/:id" element={<UserComplaintDetailsPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/complaint/:id" element={<AdminComplaintDetailsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;