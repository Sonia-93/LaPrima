import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
const notifications = [
    { id: 'orders', label: 'New Orders', desc: 'Alert for every new order', on: true },
    { id: 'reviews', label: 'New Reviews', desc: 'Notify when someone reviews', on: true },
    { id: 'weekly', label: 'Weekly Reports', desc: 'Email summary every Monday', on: true },
    { id: 'marketing', label: 'Marketing Tips', desc: 'Platform tips to grow your shop', on: true },
    { id: 'stock', label: 'Low Stock Alerts', desc: 'When items run low in inventory', on: true },
];

function SettingsPage() {
    const [toggles, setToggles] = useState(
        notifications.reduce((acc, n) => ({ ...acc, [n.id]: n.on }), {})
    );
    const [showPassword, setShowPassword] = useState(false);

    const flip = (id) => setToggles((prev) => ({ ...prev, [id]: !prev[id] }));

    return (
        <div className="settings-grid">
            <div className="dashboard-card settings-card">
                <h3 className="dashboard-card-title">Account Settings</h3>
                <form className="settings-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="settings-form-row">
                        <div className="settings-field">
                            <label htmlFor="firstName">First name</label>
                            <input id="firstName" type="text" defaultValue="Sofia" />
                        </div>
                        <div className="settings-field">
                            <label htmlFor="lastName">Last name</label>
                            <input id="lastName" type="text" defaultValue="Mendez" />
                        </div>
                    </div>
                    <div className="settings-field">
                        <label htmlFor="email">Email address</label>
                        <input id="email" type="email" defaultValue="sofia@cafelumiere.com" />
                    </div>
                    <div className="settings-field">
                        <label htmlFor="password">New Password</label>
                        <div className="dashboard-password-wrapper" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                            <input 
                                id="password" 
                                type={showPassword ? "text" : "password"} 
                                placeholder="leave blank to keep current" 
                                style={{ width: '100%', paddingRight: '40px', fontFamily: !showPassword ? 'caption, "Inter", sans-serif' : 'inherit', fontSize: !showPassword ? '18px' : 'inherit', letterSpacing: !showPassword ? '2px' : 'normal' }}
                            />
                            <span 
                                onClick={() => setShowPassword(!showPassword)}
                                style={{ position: 'absolute', right: '12px', cursor: 'pointer', color: '#666', display: 'flex' }}
                            >
                                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                            </span>
                        </div>
                    </div>
                    <button type="submit" className="dash-btn-primary settings-save">Save changes</button>
                </form>
            </div>

            <div className="dashboard-card settings-card">
                <h3 className="dashboard-card-title">Notifications</h3>
                <ul className="notification-settings-list">
                    {notifications.map((item) => (
                        <li key={item.id} className="notification-setting-item">
                            <div>
                                <div className="notification-setting-label">{item.label}</div>
                                <div className="notification-setting-desc">{item.desc}</div>
                            </div>
                            <button
                                type="button"
                                className={`toggle-switch${toggles[item.id] ? ' on' : ''}`}
                                onClick={() => flip(item.id)}
                                aria-pressed={toggles[item.id]}
                                aria-label={`Toggle ${item.label}`}
                            >
                                <span className="toggle-knob" />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SettingsPage;
