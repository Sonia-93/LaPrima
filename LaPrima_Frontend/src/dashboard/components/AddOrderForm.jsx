import React, { useState } from 'react';

const STATUS_OPTIONS = [
    { value: 'new', label: 'New' },
    { value: 'preparing', label: 'Preparing' },
    { value: 'ready', label: 'Ready' },
];

function AddOrderForm({ onSubmit, onCancel }) {
    const [form, setForm] = useState({
        customer: '',
        items: '',
        money: '',
        status: 'new',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            ...form,
            money: form.money.startsWith('$') ? form.money : `$${form.money}`,
        });
    };

    return (
        <form className="dash-form" onSubmit={handleSubmit}>
            <div className="dash-form-field">
                <label htmlFor="order-customer">Customer name</label>
                <input
                    id="order-customer"
                    name="customer"
                    type="text"
                    placeholder="Aisha K."
                    value={form.customer}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="dash-form-field">
                <label htmlFor="order-items">Items</label>
                <input
                    id="order-items"
                    name="items"
                    type="text"
                    placeholder="Double Espresso"
                    value={form.items}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="dash-form-field">
                <label htmlFor="order-money">Amount</label>
                <input
                    id="order-money"
                    name="money"
                    type="text"
                    placeholder="8.50"
                    value={form.money}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="dash-form-field">
                <label htmlFor="order-status">Status</label>
                <select id="order-status" name="status" value={form.status} onChange={handleChange}>
                    {STATUS_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            </div>
            <div className="dash-form-actions">
                <button type="button" className="dash-btn-secondary" onClick={onCancel}>Cancel</button>
                <button type="submit" className="dash-btn-primary">Save Order</button>
            </div>
        </form>
    );
}

export default AddOrderForm;
