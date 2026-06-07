import React, { useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './AuthLayout.css';
import AuthCarousel from './AuthCarousel';
import axiosInstance from '../api/axios';
import { useAuth } from '../context/AuthContext';

function VerifyEmailPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    
    
    const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    
    const email = location.state?.email || "your-email@example.com";

    const handleInputChange = (e, index) => {
        const val = e.target.value;
        if (!/^[0-9]*$/.test(val)) return; 
        
        const newCode = [...code];
        newCode[index] = val;
        setCode(newCode);

        // move to next input automatically
        if (val.length === 1 && index < 5) {
            inputRefs[index + 1].current.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && code[index] === '' && index > 0) {
            inputRefs[index - 1].current.focus();
        }
    };

    const handleVerify = async () => {
        const fullCode = code.join('');
        if (fullCode.length < 6) {
            setError("Please enter the complete 6-digit code.");
            return;
        }

        setError('');
        setLoading(true);

        try {
            const response = await axiosInstance.post('/auth/verify-email', {
                email,
                code: fullCode
            });
            // According to backend, it returns { success, token, user }
            if (response.data.success) {
                login(response.data.user, response.data.token);
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || "Invalid verification code.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <AuthCarousel />
            
            <div className="auth-right">
                <div className="auth-form-container">
                    
                    <div className="verify-icon-container">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7" />
                            <rect x="3" y="5" width="18" height="14" rx="2" />
                        </svg>
                    </div>

                    <h1 className="auth-title">Check your inbox</h1>
                    <p className="auth-subtitle">We've sent a 6-digit verification code to</p>

                    <div className="verify-email-display">
                        {email}
                    </div>

                    {error && <div className="auth-error" style={{ color: 'red', marginTop: '10px' }}>{error}</div>}

                    <div className="verify-subtitle">ENTER VERIFICATION CODE</div>

                    <div className="otp-container">
                        {[0, 1, 2, 3, 4, 5].map((index) => (
                            <input 
                                key={index}
                                type="text" 
                                maxLength="1" 
                                className="otp-input"
                                ref={inputRefs[index]}
                                value={code[index]}
                                onChange={(e) => handleInputChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                            />
                        ))}
                    </div>

                    <div className="expires-text">
                        Code expires in <span>15min</span>
                    </div>

                    <button 
                        className="auth-submit-btn" 
                        onClick={handleVerify} 
                        disabled={loading}
                        style={{ marginTop: '0', marginBottom: '20px' }}>
                        {loading ? 'Verifying...' : 'Verify Email'}
                    </button>

                    <div className="resend-text">
                        Didn't receive it ? <span style={{ cursor: 'pointer' }}>Resend Code</span>
                    </div>

                    <button 
                        className="back-to-signup" 
                        style={{ background: 'transparent', border: 'none' }}
                        onClick={() => navigate('/signup')} 
                    >
                        <>&larr;</> Back to Sign Up
                    </button>
                    
                </div>
            </div>
        </div>
    );
}

export default VerifyEmailPage;
