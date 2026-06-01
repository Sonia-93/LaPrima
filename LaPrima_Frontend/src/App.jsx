import './App.css';
import LandingPage from './pages/landingPage';
import SignUpPage from './auth/signUpPage';
import LoginPage from './auth/loginPage';
import VerifyEmailPage from './auth/verifyEmailPage';
import DashboardLayout from './dashboard/DashboardLayout';
import DashboardHome from './dashboard/pages/DashboardHome';
import UsersPage from './dashboard/pages/UsersPage';
import PlaceholderPage from './dashboard/pages/PlaceholderPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/verify" element={<VerifyEmailPage />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="orders" element={<PlaceholderPage title="Orders" description="Order management coming soon." />} />
            <Route path="menu" element={<PlaceholderPage title="Menu" description="Menu builder coming soon." />} />
            <Route path="analytics" element={<PlaceholderPage title="Analytics" description="Detailed analytics coming soon." />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="settings" element={<PlaceholderPage title="Settings" description="Shop settings coming soon." />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
