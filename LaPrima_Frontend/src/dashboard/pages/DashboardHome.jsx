import React from 'react';
import { FaStar, FaUserCircle } from 'react-icons/fa';

const stats = [
    { label: 'REVENUE TODAY', value: '$123,000', icon: 'wallet' },
    { label: 'ORDERS TODAY', value: '142', icon: 'cart' },
    { label: 'AVG RATINGS', value: '4.9', icon: 'star' },
    { label: 'CUSTOMERS', value: '890', icon: 'users' },
];

const liveOrders = [
    { name: 'Double Espresso', customer: 'James M.', time: '2 min ago', price: '$4.50', status: 'new' },
    { name: 'Iced Latte x 2', customer: 'Sarah K.', time: '5 min ago', price: '$9.00', status: 'preparing' },
    { name: 'Matcha Latte', customer: 'Tom R.', time: '8 min ago', price: '$5.50', status: 'ready' },
    { name: 'Cappuccino', customer: 'Lisa P.', time: '12 min ago', price: '$4.50', status: 'ready' },
];

const topMenuItems = [
    { name: 'Espresso', category: 'Hot Drinks', orders: 142, price: '$3.50', pct: 100 },
    { name: 'Flat White', category: 'Hot Drinks', orders: 98, price: '$4.50', pct: 69 },
    { name: 'Iced Caramel Latte', category: 'Cold Drinks', orders: 71, price: '$5.50', pct: 50 },
    { name: 'Croissant', category: 'Pastries', orders: 56, price: '$3.00', pct: 39 },
];

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

function RevenueChart() {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const series = [
        { color: '#DDA15E', points: '20,55 60,45 100,60 140,35 180,50 220,30 260,55' },
        { color: '#8B6914', points: '20,70 60,65 100,75 140,55 180,70 220,50 260,65' },
        { color: '#C4A882', points: '20,85 60,80 100,90 140,70 180,85 220,65 260,80' },
    ];

    return (
        <div>
            <svg className="revenue-chart" viewBox="0 0 280 200" preserveAspectRatio="none">
                {[0, 1, 2, 3].map((i) => (
                    <line key={i} x1="20" y1={20 + i * 55} x2="260" y2={20 + i * 55} stroke="#f0f0f0" strokeWidth="1" />
                ))}
                {series.map((s, i) => (
                    <polyline key={i} points={s.points} fill="none" stroke={s.color} strokeWidth="2" strokeDasharray="6 4" />
                ))}
                {series[0].points.split(' ').map((pt, i) => {
                    const [x, y] = pt.split(',');
                    return <circle key={i} cx={x} cy={y} r="3" fill="#DDA15E" />;
                })}
            </svg>
            <div className="revenue-chart-labels">
                {days.map((d) => (
                    <span key={d}>{d}</span>
                ))}
            </div>
        </div>
    );
}

function DashboardHome() {
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
                <div className="dashboard-card">
                    <h3 className="dashboard-card-title">Weekly Revenue</h3>
                    <RevenueChart />
                </div>

                <div className="dashboard-card">
                    <h3 className="dashboard-card-title">Live Orders</h3>
                    {liveOrders.map((order) => (
                        <div key={order.name + order.customer} className="live-order-item">
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
                    {topMenuItems.map((item) => (
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
