import './App.css';
import LandingPage from './pages/landingPage';
import SignUpPage from './auth/signUpPage';
import LoginPage from './auth/loginPage';
import VerifyEmailPage from './auth/verifyEmailPage';
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
