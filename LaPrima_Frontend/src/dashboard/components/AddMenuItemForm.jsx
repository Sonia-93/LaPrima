import React, { useState } from 'react';

const CATEGORIES = ['Hot Drinks', 'Cold Drinks', 'Fast Food', 'chinese'];

function AddMenuItemForm({ onSubmit, onCancel }) {
    const [form, setForm] = useState({
        name: '',
        category: 'Hot Drinks',
        price: '',
        status: 'active',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            ...form,
            price: form.price.startsWith('$') ? form.price : `$${form.price}`,
            orders: 0,
        });
    };

    return (
        <form className="dash-form" onSubmit={handleSubmit}>
            <div className="dash-form-field">
                <label htmlFor="item-name">Item name</label>
                <input
                    id="item-name"
                    name="name"
                    type="text"
                    placeholder="Espresso"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="dash-form-field">
                <label htmlFor="item-category">Category</label>
                <select id="item-category" name="category" value={form.category} onChange={handleChange}>
                    {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>
            <div className="dash-form-field">
                <label htmlFor="item-price">Price</label>
                <input
                    id="item-price"
                    name="price"
                    type="text"
                    placeholder="3.50"
                    value={form.price}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="dash-form-field">
                <label htmlFor="item-status">Status</label>
                <select id="item-status" name="status" value={form.status} onChange={handleChange}>
                    <option value="active">Active</option>
                    <option value="soldout">Sold out</option>
                </select>
            </div>
            <div className="dash-form-actions">
                <button type="button" className="dash-btn-secondary" onClick={onCancel}>Cancel</button>
                <button type="submit" className="dash-btn-primary">Save Item</button>
            </div>
        </form>
    );
}

export default AddMenuItemForm;
