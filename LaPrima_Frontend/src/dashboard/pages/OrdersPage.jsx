import React, { useState } from 'react';
import { HiOutlineShoppingCart, HiOutlineFire, HiOutlineCheckCircle, HiOutlineCurrencyDollar } from 'react-icons/hi';
import { FiTrash2, FiEdit2 } from 'react-icons/fi';
import DashboardModal from '../components/DashboardModal';
import AddOrderForm from '../components/AddOrderForm';

const INITIAL_ORDERS = [
    { id: '#100', customer: 'Aisha.K', items: 'Double Expresso', money: '$8.50', time: '2min ago', status: 'new' },
    { id: '#101', customer: 'Russel .M', items: 'Iced Latte x 2', money: '$9.50', time: '5min ago', status: 'preparing' },
    { id: '#102', customer: 'Jessy.N', items: '—', money: '$14.50', time: '8min ago', status: 'ready' },
    { id: '#102', customer: 'Nina R.', items: '—', money: '$13.50', time: '12min ago', status: 'ready' },
    { id: '#103', customer: 'Sonia.T', items: '—', money: '$17.50', time: '20min ago', status: 'ready' },
];

function OrdersPage() {
    const [orders, setOrders] = useState(INITIAL_ORDERS);
    const [showAddModal, setShowAddModal] = useState(false);

    const newCount = orders.filter((o) => o.status === 'new').length;
    const preparingCount = orders.filter((o) => o.status === 'preparing').length;

    const summary = [
        { label: 'NEW ORDERS', value: String(newCount), icon: HiOutlineShoppingCart },
        { label: 'PREPARING', value: String(preparingCount), icon: HiOutlineFire },
        { label: 'COMPLETED TODAY', value: '129', icon: HiOutlineCheckCircle },
        { label: 'REVENUE TODAY', value: '$890', icon: HiOutlineCurrencyDollar },
    ];

    const handleAddOrder = (data) => {
        const nextId = `#${100 + orders.length}`;
        setOrders((prev) => [
            {
                id: nextId,
                customer: data.customer,
                items: data.items,
                money: data.money,
                time: 'Just now',
                status: data.status,
            },
            ...prev,
        ]);
        setShowAddModal(false);
    };

    const removeOrder = (index) => {
        setOrders((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <>
            <div className="orders-summary-row">
                {summary.map((item) => {
                    const Icon = item.icon;
                    return (
                        <div key={item.label} className="orders-summary-card">
                            <Icon className="orders-summary-icon" aria-hidden />
                            <div className="orders-summary-value">{item.value}</div>
                            <div className="orders-summary-label">{item.label}</div>
                        </div>
                    );
                })}
            </div>

            <div className="dashboard-card orders-table-card">
                <div className="orders-table-toolbar">
                    <button type="button" className="dash-btn-primary" onClick={() => setShowAddModal(true)}>
                        Add Order
                    </button>
                </div>
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>ORDERS</th>
                            <th>CUSTOMERS</th>
                            <th>ITEMS</th>
                            <th>MONEY</th>
                            <th>TIME</th>
                            <th>STATUS</th>
                            <th aria-label="Actions" />
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, idx) => (
                            <tr key={`${order.id}-${idx}`}>
                                <td>{order.id}</td>
                                <td>{order.customer}</td>
                                <td>{order.items}</td>
                                <td className="orders-money">{order.money}</td>
                                <td>{order.time}</td>
                                <td>
                                    <span className={`order-status table-status ${order.status}`}>
                                        {order.status === 'new' ? 'Now' : order.status}
                                    </span>
                                </td>
                                <td className="orders-actions">
                                    <button type="button" className="icon-btn" aria-label="Delete" onClick={() => removeOrder(idx)}>
                                        <FiTrash2 />
                                    </button>
                                    <button type="button" className="icon-btn" aria-label="Edit">
                                        <FiEdit2 />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <DashboardModal open={showAddModal} onClose={() => setShowAddModal(false)} title="Add Order">
                <AddOrderForm
                    onSubmit={handleAddOrder}
                    onCancel={() => setShowAddModal(false)}
                />
            </DashboardModal>
        </>
    );
}

export default OrdersPage;
