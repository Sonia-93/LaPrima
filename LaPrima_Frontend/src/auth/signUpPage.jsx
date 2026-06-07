import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthLayout.css';
import AuthCarousel from './AuthCarousel';
import axiosInstance from '../api/axios';
import { FiEye, FiEyeOff } from 'react-icons/fi';

function SignUpPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            return setError("Passwords do not match");
        }

        setLoading(true);
        try {
            const response = await axiosInstance.post('/auth/signup', {
                name: `${formData.firstName} ${formData.lastName}`.trim(),
                email: formData.email,
                password: formData.password
            });
            
            // Expected response: { success: true, email: ... }
            if (response.data.success) {
                // Assuming `/verify` might need to know the email to show instructions
                // But for now, we just redirect there
                navigate('/verify', { state: { email: formData.email } });
            }
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong during signup.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <AuthCarousel />
            
            <div className="auth-right">
                <div className="auth-form-container">
                    
                    <div className="auth-tabs">
                        <button className="auth-tab active">Create Account</button>
                        <button className="auth-tab" onClick={() => navigate('/login')}>sign in</button>
                    </div>

                    <h1 className="auth-title">Join la Prima</h1>
                    <p className="auth-subtitle">Choose your account type — it's completely free.</p>

                    {error && <div className="auth-error" style={{ color: 'red', marginBottom: '16px' }}>{error}</div>}

                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="auth-form-row">
                            <div className="auth-form-group">
                                <label className="auth-label">First name</label>
                                <input type="text" name="firstName" className="auth-input" placeholder="Sofia" value={formData.firstName} onChange={handleChange} required />
                            </div>
                            <div className="auth-form-group">
                                <label className="auth-label">Last name</label>
                                <input type="text" name="lastName" className="auth-input" placeholder="Mendez" value={formData.lastName} onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="auth-form-group">
                            <label className="auth-label">Email address</label>
                            <input type="email" name="email" className="auth-input" placeholder="you@yourshop.com" value={formData.email} onChange={handleChange} required />
                        </div>

                        <div className="auth-form-group">
                            <label className="auth-label">Password</label>
                            <div className="password-input-wrapper">
                                <input type={showPassword ? "text" : "password"} name="password" className="auth-input" placeholder="create strong password" value={formData.password} onChange={handleChange} required />
                                <span className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                </span>
                            </div>
                        </div>

                        <div className="auth-form-group">
                            <label className="auth-label">confirm password</label>
                            <div className="password-input-wrapper">
                                <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" className="auth-input" placeholder="confirm password" value={formData.confirmPassword} onChange={handleChange} required />
                                <span className="password-toggle-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                </span>
                            </div>
                        </div>

                        <div className="auth-checkbox-group">
                            <input type="checkbox" className="auth-checkbox" required id="tos" />
                            <label className="auth-checkbox-label" htmlFor="tos">
                                I agree to La Prima's <a href="#/">Terms of services</a> and <a href="#/">Privacy Policy</a>. My shop data will be visible to customers on the platform.
                            </label>
                        </div>

                        <button type="submit" className="auth-submit-btn" disabled={loading}>
                            {loading ? 'Creating...' : 'Create My Account'}
                        </button>
                    </form>

                    <div className="auth-divider">or Sign up with</div>

                    <div className="social-buttons">
                        <button className="social-btn">
                            <svg width="24" height="24" viewBox="0 0 24 24">
                              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            Google
                        </button>
                        <button className="social-btn">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="#1877F2">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                            Facebook
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default SignUpPage;
