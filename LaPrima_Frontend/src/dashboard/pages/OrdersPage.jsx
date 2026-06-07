import React, { useState, useEffect } from 'react';
import { HiOutlineShoppingCart, HiOutlineFire, HiOutlineCheckCircle, HiOutlineCurrencyDollar } from 'react-icons/hi';
import { FiTrash2, FiEdit2 } from 'react-icons/fi';
import DashboardModal from '../components/DashboardModal';
import AddOrderForm from '../components/AddOrderForm';
import axiosInstance from '../api/axios';

const mapStatusToBackend = (status) => {
    if (status === 'new') return 'Now';
    if (status === 'preparing') return 'Preparing';
    if (status === 'ready') return 'Ready';
    return 'Now';
};

const mapStatusToFrontend = (status) => {
    if (status === 'Now') return 'new';
    if (status === 'Preparing') return 'preparing';
    if (status === 'Ready') return 'ready';
    return 'new';
};

function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const response = await axiosInstance.get('/orders');
            const data = response.data.map(order => ({
                _id: order._id,
                id: `#${order.orderNum || Math.floor(Math.random()*(999-100+1)+100)}`,
                customer: order.customer,
                items: order.item,
                money: `$${Number(order.money).toFixed(2)}`,
                time: order.timeOrdered || 'Just now',
                status: mapStatusToFrontend(order.status)
            }));
            setOrders(data);
        } catch (error) {
            console.error("Failed to fetch orders", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const newCount = orders.filter((o) => o.status === 'new').length;
    const preparingCount = orders.filter((o) => o.status === 'preparing').length;

    const summary = [
        { label: 'NEW ORDERS', value: String(newCount), icon: HiOutlineShoppingCart },
        { label: 'PREPARING', value: String(preparingCount), icon: HiOutlineFire },
        { label: 'COMPLETED TODAY', value: '129', icon: HiOutlineCheckCircle },
        { label: 'REVENUE TODAY', value: '$890', icon: HiOutlineCurrencyDollar },
    ];

    const handleAddOrder = async (data) => {
        try {
            const backendPayload = {
                orderNum: Math.floor(Math.random()*(9999-1000+1)+1000), // temp fallback
                customer: data.customer,
                item: data.items,
                money: Number(data.money.replace(/[^0-9.-]+/g, "")),
                status: mapStatusToBackend(data.status),
                timeOrdered: 'Just now' // Simplified as a static string to fit current mock UI
            };

            const response = await axiosInstance.post('/orders', backendPayload);
            const newOrder = response.data;

            setOrders((prev) => [
                {
                    _id: newOrder._id,
                    id: `#${newOrder.orderNum}`,
                    customer: newOrder.customer,
                    items: newOrder.item,
                    money: `$${Number(newOrder.money).toFixed(2)}`,
                    time: newOrder.timeOrdered,
                    status: mapStatusToFrontend(newOrder.status),
                },
                ...prev,
            ]);
            setShowAddModal(false);
        } catch (error) {
            console.error("Failed to add order", error);
        }
    };

    const removeOrder = async (id) => {
        try {
            await axiosInstance.delete(`/orders/${id}`);
            setOrders((prev) => prev.filter((order) => order._id !== id));
        } catch (error) {
            console.error("Failed to delete order", error);
        }
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
                {loading ? (
                    <p>Loading orders...</p>
                ) : (
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
                                <tr key={`${order._id}-${idx}`}>
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
                                        <button type="button" className="icon-btn" aria-label="Delete" onClick={() => removeOrder(order._id)}>
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
                )}
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
