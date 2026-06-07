import React, { useState, useEffect } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import axiosInstance from '../../api/axios';

const notificationsMeta = [
    { id: 'orders', label: 'New Orders', desc: 'Alert for every new order' },
    { id: 'reviews', label: 'New Reviews', desc: 'Notify when someone reviews' },
    { id: 'weekly', label: 'Weekly Reports', desc: 'Email summary every Monday' },
    { id: 'marketing', label: 'Marketing Tips', desc: 'Platform tips to grow your shop' },
    { id: 'stock', label: 'Low Stock Alerts', desc: 'When items run low in inventory' },
];

function SettingsPage() {
    const [toggles, setToggles] = useState({
        orders: true, reviews: true, weekly: true, marketing: true, stock: true
    });
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axiosInstance.get('/auth/profile');
                const data = res.data;
                // Fall back to splitting `name` if firstName/lastName were never set
                const nameParts = (data.name || '').trim().split(' ');
                setFormData({
                    firstName: data.firstName || nameParts[0] || '',
                    lastName: data.lastName || nameParts.slice(1).join(' ') || '',
                    email: data.email || '',
                    password: ''
                });
                if (data.notifications) {
                    setToggles(prev => ({ ...prev, ...data.notifications }));
                }
            } catch (err) {
                console.error("Failed to load profile", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const flip = (id) => {
        const newToggles = { ...toggles, [id]: !toggles[id] };
        setToggles(newToggles);
        saveProfile(newToggles);
    };

    const saveProfile = async (currentToggles = toggles) => {
        setSaving(true);
        setMessage('');
        try {
            const payload = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                notifications: currentToggles,
            };
            if (formData.password) {
                payload.newPassword = formData.password;
            }

            await axiosInstance.put('/auth/profile', payload);
            setMessage("Settings saved successfully.");
            setFormData({ ...formData, password: '' });
        } catch (err) {
            console.error("Failed to save settings", err);
            setMessage("Failed to save settings.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div style={{ padding: '40px', color: '#666' }}>Loading Settings...</div>;

    return (
        <div className="settings-grid">
            <div className="dashboard-card settings-card">
                <h3 className="dashboard-card-title">Account Settings</h3>
                <form className="settings-form" onSubmit={(e) => { e.preventDefault(); saveProfile(); }}>
                    <div className="settings-form-row">
                        <div className="settings-field">
                            <label htmlFor="firstName">First name</label>
                            <input id="firstName" type="text" value={formData.firstName} onChange={handleChange} />
                        </div>
                        <div className="settings-field">
                            <label htmlFor="lastName">Last name</label>
                            <input id="lastName" type="text" value={formData.lastName} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="settings-field">
                        <label htmlFor="email">Email address</label>
                        <input id="email" type="email" value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="settings-field">
                        <label htmlFor="password">New Password</label>
                        <div className="dashboard-password-wrapper" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                            <input 
                                id="password" 
                                type={showPassword ? "text" : "password"} 
                                placeholder="leave blank to keep current" 
                                value={formData.password}
                                onChange={handleChange}
                                style={{ width: '100%', paddingRight: '40px', fontFamily: !showPassword ? 'inherit' : 'inherit', fontSize: '14px', letterSpacing: 'normal' }}
                            />
                            <span 
                                onClick={() => setShowPassword(!showPassword)}
                                style={{ position: 'absolute', right: '12px', cursor: 'pointer', color: '#666', display: 'flex' }}
                            >
                                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                            </span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <button type="submit" className="dash-btn-primary settings-save" disabled={saving}>
                            {saving ? 'Saving...' : 'Save changes'}
                        </button>
                        {message && <span style={{ fontSize: '13px', color: message.includes('Failed') ? 'red' : 'green' }}>{message}</span>}
                    </div>
                </form>
            </div>

            <div className="dashboard-card settings-card">
                <h3 className="dashboard-card-title">Notifications</h3>
                <ul className="notification-settings-list">
                    {notificationsMeta.map((item) => (
                        <li key={item.id} className="notification-setting-item">
                            <div>
                                <div className="notification-setting-label">{item.label}</div>
                                <div className="notification-setting-desc">{item.desc}</div>
                            </div>
                            <button
                                type="button"
                                className={`toggle-switch${toggles[item.id] ? ' on' : ''}`}
                                onClick={() => flip(item.id)}
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
