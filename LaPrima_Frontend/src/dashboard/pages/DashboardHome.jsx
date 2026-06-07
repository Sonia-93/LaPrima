import React, { useState, useEffect } from 'react';
import { FaStar, FaUserCircle } from 'react-icons/fa';
import WeeklyRevenueChart from '../components/WeeklyRevenueChart';
import axiosInstance from '../../api/axios';

const recentReviews = [
    { name: 'Aisha K.', time: '2 hours ago', text: 'Best espresso in the city. The atmosphere is perfect for working.' },
    { name: 'Marcus C.', time: '5 hours ago', text: 'Found this on La Prima, been coming every day since.' },
    { name: 'Nina S.', time: '1 day ago', text: 'Ordering ahead saved me so much time every morning.' },
];

function StatIcon({ type }) {
    const icons = {
        wallet: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M16 12h.01" />
            </svg>
        ),
        cart: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
        ),
        star: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
        ),
        users: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
    };
    return icons[type] || null;
}

function DashboardHome() {
    const [liveOrders, setLiveOrders] = useState([]);
    const [topMenuItems, setTopMenuItems] = useState([]);
    const [stats, setStats] = useState([
        { label: 'REVENUE TODAY', value: '$0', icon: 'wallet' },
        { label: 'ORDERS TODAY', value: '0', icon: 'cart' },
        { label: 'AVG RATINGS', value: '4.9', icon: 'star' },
        { label: 'CUSTOMERS', value: '0', icon: 'users' },
    ]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true);
            try {
                const [ordersRes, menuRes] = await Promise.all([
                    axiosInstance.get('/orders'),
                    axiosInstance.get('/menu')
                ]);
                
                const orders = ordersRes.data || [];
                const menuItems = menuRes.data || [];

                const recentOrders = orders.slice(0, 4).map(o => ({
                    id: o._id,
                    name: o.item || 'Unknown Item',
                    customer: o.customer,
                    time: o.timeOrdered || 'Just now',
                    price: `$${Number(o.money || 0).toFixed(2)}`,
                    status: (o.status === 'Now' ? 'new' : (o.status === 'Preparing' ? 'preparing' : 'ready'))
                }));
                setLiveOrders(recentOrders);

                const sortedMenu = [...menuItems].sort((a,b) => (b.orderNumber || 0) - (a.orderNumber || 0)).slice(0, 4);
                const maxOrders = sortedMenu[0]?.orderNumber || 1;
                const topItems = sortedMenu.map(m => ({
                    name: m.name,
                    category: m.category,
                    orders: m.orderNumber || 0,
                    price: `$${Number(m.money || 0).toFixed(2)}`,
                    pct: Math.round(((m.orderNumber || 0) / maxOrders) * 100)
                }));
                setTopMenuItems(topItems);

                const todayOrders = orders.length; 
                const revenueToday = orders.reduce((sum, o) => sum + Number(o.money || 0), 0);
                const uniqueCustomers = new Set(orders.map(o => o.customer)).size;

                setStats([
                    { label: 'REVENUE TODAY', value: `$${revenueToday.toLocaleString('en-US', {minimumFractionDigits: 0})}`, icon: 'wallet' },
                    { label: 'ORDERS TODAY', value: String(todayOrders), icon: 'cart' },
                    { label: 'AVG RATINGS', value: '4.9', icon: 'star' },
                    { label: 'CUSTOMERS', value: String(uniqueCustomers), icon: 'users' },
                ]);

            } catch (error) {
                console.error("Failed to load dashboard data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <>
            <div className="stats-row">
                {stats.map((stat) => (
                    <div key={stat.label} className="stat-card">
                        <div>
                            <div className="stat-card-label">{stat.label}</div>
                            <div className="stat-card-value">{stat.value}</div>
                        </div>
                        <div className="stat-card-icon">
                            <StatIcon type={stat.icon} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="dashboard-middle-row">
                <div className="dashboard-card weekly-revenue-card">
                    <WeeklyRevenueChart />
                </div>

                <div className="dashboard-card">
                    <h3 className="dashboard-card-title">Live Orders</h3>
                    {loading ? <p style={{color: '#666', fontSize: '14px', marginTop: '10px'}}>Loading orders...</p> : liveOrders.length === 0 ? <p style={{color: '#666', fontSize: '14px', marginTop: '10px'}}>No live orders found.</p> : liveOrders.map((order) => (
                        <div key={order.id + order.customer} className="live-order-item">
                            <div>
                                <div className="live-order-name">{order.name}</div>
                                <div className="live-order-customer">{order.customer} · {order.time}</div>
                            </div>
                            <div className="live-order-right">
                                <div className="live-order-price">{order.price}</div>
                                <span className={`order-status ${order.status}`}>
                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="dashboard-bottom-row">
                <div className="dashboard-card">
                    <h3 className="dashboard-card-title">Top Menu Items</h3>
                    {loading ? <p style={{color: '#666', fontSize: '14px', marginTop: '10px'}}>Loading menu...</p> : topMenuItems.length === 0 ? <p style={{color: '#666', fontSize: '14px', marginTop: '10px'}}>No top items found.</p> : topMenuItems.map((item) => (
                        <div key={item.name} className="menu-item-row">
                            <div className="menu-item-info">
                                <div className="menu-item-name">{item.name}</div>
                                <div className="menu-item-meta">{item.category} · {item.price}</div>
                            </div>
                            <div className="menu-item-orders">{item.orders} orders</div>
                            <div className="menu-item-bar">
                                <div className="menu-item-bar-fill" style={{ width: `${item.pct}%` }} />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="dashboard-card">
                    <h3 className="dashboard-card-title">Recent Reviews</h3>
                    {recentReviews.map((review) => (
                        <div key={review.name} className="review-item">
                            <div className="review-avatar">
                                <FaUserCircle aria-hidden />
                            </div>
                            <div className="review-content">
                                <div className="review-header">
                                    <span className="review-name">{review.name}</span>
                                    <span className="review-time">{review.time}</span>
                                </div>
                                <div className="review-stars">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} aria-hidden />
                                    ))}
                                </div>
                                <p className="review-text">{review.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default DashboardHome;
