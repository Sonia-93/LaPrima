import React, { useState, useEffect } from 'react';
import { FiTrash2, FiEdit2 } from 'react-icons/fi';
import DashboardModal from '../components/DashboardModal';
import AddMenuItemForm from '../components/AddMenuItemForm';
import axiosInstance from '../api/axios';

const categories = [
    { id: 'all', label: 'All' },
    { id: 'hot', label: 'Hot Drinks' },
    { id: 'cold', label: 'Cold Drinks' },
    { id: 'fast', label: 'Fast Food' },
    { id: 'chinese', label: 'chinese' },
];

// Helper to strictly map UI categories to backend strictly cased Enums
const mapCategoryToBackend = (uiCat) => {
    const mapping = {
        'Hot Drinks': 'Hot drinks',
        'Cold Drinks': 'Cold drinks',
        'Fast Food': 'Fast food',
        'chinese': 'Chinese'
    };
    return mapping[uiCat] || 'Hot drinks';
};

const mapCategoryToFrontend = (backendCat) => {
    const mapping = {
        'Hot drinks': 'Hot Drinks',
        'Cold drinks': 'Cold Drinks',
        'Fast food': 'Fast Food',
        'Chinese': 'chinese'
    };
    return mapping[backendCat] || backendCat;
};

function MenuPage() {
    const [menuItems, setMenuItems] = useState([]);
    const [activeCat, setActiveCat] = useState('all');
    const [showAddModal, setShowAddModal] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchMenu = async () => {
        try {
            const response = await axiosInstance.get('/menu');
            // the backend returns array of items. Let's adapt their fields to our frontend standard
            const adapted = response.data.map(item => ({
                _id: item._id,
                name: item.name,
                category: mapCategoryToFrontend(item.category),
                orders: item.orderNumber || 0,
                price: `$${Number(item.money).toFixed(2)}`,
                status: item.status === 'Sold Out' ? 'soldout' : 'active'
            }));
            setMenuItems(adapted);
        } catch (error) {
            console.error("Error fetching menu items:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMenu();
    }, []);

    const filtered = menuItems.filter((item) => {
        if (activeCat === 'all') return true;
        if (activeCat === 'hot') return item.category === 'Hot Drinks';
        if (activeCat === 'cold') return item.category === 'Cold Drinks';
        if (activeCat === 'fast') return item.category === 'Fast Food';
        if (activeCat === 'chinese') return item.category === 'chinese';
        return true;
    });

    const handleAddItem = async (data) => {
        try {
            const backendPayload = {
                name: data.name,
                category: mapCategoryToBackend(data.category),
                money: Number(data.price.replace(/[^0-9.-]+/g, "")),
                orderNumber: data.orders || 0,
                status: data.status === 'soldout' ? 'Sold Out' : 'Active',
                timeOrdered: new Date().toISOString()
            };
            const response = await axiosInstance.post('/menu', backendPayload);
            
            // Successfully added to DB, now adapt and push to our local list
            const newItem = response.data;
            setMenuItems((prev) => [...prev, {
                _id: newItem._id,
                name: newItem.name,
                category: mapCategoryToFrontend(newItem.category),
                orders: newItem.orderNumber,
                price: `$${Number(newItem.money).toFixed(2)}`,
                status: newItem.status === 'Sold Out' ? 'soldout' : 'active'
            }]);
            setShowAddModal(false);
        } catch (error) {
            console.error("Error adding menu item:", error);
            alert("Failed to add menu item. Check the console for more details.");
        }
    };

    const removeItem = async (id) => {
        try {
            await axiosInstance.delete(`/menu/${id}`);
            setMenuItems((prev) => prev.filter((item) => item._id !== id));
        } catch (error) {
            console.error("Error removing menu item:", error);
        }
    };

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
                            {cat.id === 'all' ? `All (${menuItems.length})` : cat.label}
                        </button>
                    ))}
                </div>
                <button type="button" className="dash-btn-primary" onClick={() => setShowAddModal(true)}>
                    Add Item
                </button>
            </div>

            {loading ? (
                <p>Loading menu...</p>
            ) : (
                <div className="menu-grid">
                    {filtered.map((item) => (
                        <div key={item._id || item.name} className="menu-item-card">
                            <div className="menu-item-card-top">
                                <span className="menu-item-card-name">{item.name}</span>
                                <span className={`menu-item-badge ${item.status}`}>
                                    {item.status === 'soldout' ? 'Sold out' : 'Active'}
                                </span>
                            </div>
                            <p className="menu-item-card-meta">
                                {item.category} • {item.orders} orders this week
                            </p>
                            <div className="menu-item-card-footer">
                                <span className="menu-item-card-price">{item.price}</span>
                                <div className="menu-item-card-actions">
                                    <button type="button" className="icon-btn" aria-label="Delete" onClick={() => removeItem(item._id)}>
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
            )}

            <DashboardModal open={showAddModal} onClose={() => setShowAddModal(false)} title="Add Menu Item">
                <AddMenuItemForm
                    onSubmit={handleAddItem}
                    onCancel={() => setShowAddModal(false)}
                />
            </DashboardModal>
        </>
    );
}

export default MenuPage;
