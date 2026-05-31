import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthLayout.css';
import logo from '../logo.svg';
import signupImage from '../signup_image.jpeg';

function VerifyEmailPage() {
    const navigate = useNavigate();
    
    // Auto-focus logic for OTP squares
    const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

    const handleInputChange = (e, index) => {
        const val = e.target.value;
        if (val.length === 1 && index < 5) {
            inputRefs[index + 1].current.focus();
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-left" style={{ backgroundImage: `url(${signupImage})` }}>
                <img src={logo} alt="La Prima Logo" className="auth-logo" />
            </div>
            
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
                        sofia@lumuniere.com
                    </div>

                    <div className="verify-subtitle">ENTER VERIFICATION CODE</div>

                    <div className="otp-container">
                        {[0, 1, 2, 3, 4, 5].map((index) => (
                            <input 
                                key={index}
                                type="text" 
                                maxLength="1" 
                                className="otp-input"
                                ref={inputRefs[index]}
                                onChange={(e) => handleInputChange(e, index)}
                            />
                        ))}
                    </div>

                    <div className="expires-text">
                        Code expires in <span>15min</span>
                    </div>

                    <button 
                        className="auth-submit-btn" 
                        onClick={() => navigate('/')} 
                        style={{ marginTop: '0', marginBottom: '20px' }}>
                        Verify Email
                    </button>

                    <div className="resend-text">
                        Didn't receive it ? <span>Resend Code</span>
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
