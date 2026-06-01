import React, { useState } from 'react';

const ROLES = ['Owner', 'Manager', 'Barista', 'Cashier'];

function AddUserForm({ onSubmit, onCancel }) {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        role: 'Barista',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            name: `${form.firstName} ${form.lastName}`.trim(),
            email: form.email,
            role: form.role,
            status: 'active',
        });
    };

    return (
        <form className="dash-form" onSubmit={handleSubmit}>
            <div className="dash-form-row">
                <div className="dash-form-field">
                    <label htmlFor="user-first">First name</label>
                    <input
                        id="user-first"
                        name="firstName"
                        type="text"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="dash-form-field">
                    <label htmlFor="user-last">Last name</label>
                    <input
                        id="user-last"
                        name="lastName"
                        type="text"
                        value={form.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
            <div className="dash-form-field">
                <label htmlFor="user-email">Email</label>
                <input
                    id="user-email"
                    name="email"
                    type="email"
                    placeholder="name@lumiere.coffee"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="dash-form-field">
                <label htmlFor="user-role">Role</label>
                <select id="user-role" name="role" value={form.role} onChange={handleChange}>
                    {ROLES.map((role) => (
                        <option key={role} value={role}>{role}</option>
                    ))}
                </select>
            </div>
            <div className="dash-form-actions">
                <button type="button" className="dash-btn-secondary" onClick={onCancel}>Cancel</button>
                <button type="submit" className="dash-btn-primary">Add User</button>
            </div>
        </form>
    );
}

export default AddUserForm;
