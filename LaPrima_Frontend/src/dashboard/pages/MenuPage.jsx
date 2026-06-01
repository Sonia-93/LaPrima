import React, { useState } from 'react';
import { FiTrash2, FiEdit2 } from 'react-icons/fi';

const categories = [
    { id: 'all', label: 'All(6)' },
    { id: 'hot', label: 'Hot Drinks' },
    { id: 'cold', label: 'Cold Drinks' },
    { id: 'fast', label: 'Fast Food' },
    { id: 'chinese', label: 'chinese' },
];

const menuItems = [
    { name: 'Expresso', category: 'Hot Drinks', orders: 134, price: '$3.50', status: 'active' },
    { name: 'Milk shake', category: 'Cold Drinks', orders: 98, price: '$4.50', status: 'active' },
    { name: 'Chicken Burger', category: 'Fast Food', orders: 71, price: '$5.50', status: 'active' },
    { name: 'Cappucino', category: 'Hot Drinks', orders: 56, price: '$3.00', status: 'active' },
    { name: 'Cocktail', category: 'Cold Drinks', orders: 42, price: '$6.00', status: 'active' },
    { name: 'Fried Rice', category: 'chinese', orders: 28, price: '$7.50', status: 'soldout' },
];

function MenuPage() {
    const [activeCat, setActiveCat] = useState('all');

    return (
        <>
            <div className="menu-toolbar">
                <div className="menu-categories">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            type="button"
                            className={`menu-cat-btn${activeCat === cat.id ? ' active' : ''}`}
                            onClick={() => setActiveCat(cat.id)}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
                <button type="button" className="dash-btn-primary">Add Item</button>
            </div>

            <div className="menu-grid">
                {menuItems.map((item) => (
                    <div key={item.name} className="menu-item-card">
                        <div className="menu-item-card-top">
                            <span className="menu-item-card-name">{item.name}</span>
                            <span className={`menu-item-badge ${item.status}`}>
                                {item.status === 'soldout' ? 'Sold out' : 'Active'}
                            </span>
                        </div>
                        <p className="menu-item-card-meta">
                            {item.category}-{item.orders} orders this week
                        </p>
                        <div className="menu-item-card-footer">
                            <span className="menu-item-card-price">{item.price}</span>
                            <div className="menu-item-card-actions">
                                <button type="button" className="icon-btn" aria-label="Delete">
                                    <FiTrash2 />
                                </button>
                                <button type="button" className="icon-btn" aria-label="Edit">
                                    <FiEdit2 />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default MenuPage;
