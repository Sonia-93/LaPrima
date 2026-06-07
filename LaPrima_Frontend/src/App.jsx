import './App.css';
import LandingPage from './pages/landingPage';
import SignUpPage from './auth/signUpPage';
import LoginPage from './auth/loginPage';
import VerifyEmailPage from './auth/verifyEmailPage';
import DashboardLayout from './dashboard/DashboardLayout';
import DashboardHome from './dashboard/pages/DashboardHome';
import OrdersPage from './dashboard/pages/OrdersPage';
import MenuPage from './dashboard/pages/MenuPage';
import AnalyticsPage from './dashboard/pages/AnalyticsPage';
import SettingsPage from './dashboard/pages/SettingsPage';
import UsersPage from './dashboard/pages/UsersPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/verify" element={<VerifyEmailPage />} />
            
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<DashboardHome />} />
                <Route path="orders" element={<OrdersPage />} />
                <Route path="menu" element={<MenuPage />} />
                <Route path="analytics" element={<AnalyticsPage />} />
                <Route path="users" element={<UsersPage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
