import React from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import logo from '../logo.svg';
import userAvatar from '../👩.svg';
import './dashboard.css';

const navItems = [
    {
        to: '/dashboard',
        label: 'Dashboard',
        end: true,
        icon: (
            <svg className="dashboard-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
            </svg>
        ),
    },
    {
        to: '/dashboard/orders',
        label: 'Orders',
        icon: (
            <svg className="dashboard-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
        ),
    },
    {
        to: '/dashboard/menu',
        label: 'Menu',
        icon: (
            <svg className="dashboard-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="15" y2="18" />
            </svg>
        ),
    },
    {
        to: '/dashboard/analytics',
        label: 'Analytics',
        icon: (
            <svg className="dashboard-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
        ),
    },
    {
        to: '/dashboard/users',
        label: 'Users',
        icon: (
            <svg className="dashboard-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
    },
    {
        to: '/dashboard/settings',
        label: 'Settings',
        icon: (
            <svg className="dashboard-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
        ),
    },
];

const PAGE_HEADERS = {
    '/dashboard': null,
    '/dashboard/orders': { title: 'Orders', subtitle: "Manage today's incoming orders" },
    '/dashboard/menu': { title: 'Menu', subtitle: '6 items · 1 sold out' },
    '/dashboard/analytics': { title: 'BusinessOverview', subtitle: 'Financial overview' },
    '/dashboard/users': { title: 'Users', subtitle: 'Manage your shop team members' },
    '/dashboard/settings': { title: 'Settings', subtitle: 'Account and Preferences' },
};

function DashboardLayout() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const pageHeader = PAGE_HEADERS[pathname];
    const isDashboardHome = pathname === '/dashboard' || pathname === '/dashboard/';

    return (
        <div className="dashboard-layout">
            <aside className="dashboard-sidebar">
                <img src={logo} alt="La Prima" className="dashboard-logo" />

                <nav className="dashboard-nav">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.end}
                            className={({ isActive }) =>
                                `dashboard-nav-link${isActive ? ' active' : ''}`
                            }
                        >
                            {item.icon}
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="dashboard-logout">
                    <button type="button" className="dashboard-logout-btn" onClick={() => navigate('/')}>
                        <svg className="dashboard-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        Logout
                    </button>
                </div>
            </aside>

            <div className="dashboard-main">
                <header className="dashboard-header">
                    <div className="dashboard-header-left">
                        {isDashboardHome ? (
                            <span className="dashboard-date">{today} — Your shop is live</span>
                        ) : pageHeader ? (
                            <>
                                <h1 className="dashboard-page-title">{pageHeader.title}</h1>
                                <p className="dashboard-page-subtitle">{pageHeader.subtitle}</p>
                            </>
                        ) : null}
                    </div>
                    <div className="dashboard-header-right">
                        <div className="dashboard-notifications">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                            </svg>
                            <span className="notification-badge">5</span>
                        </div>
                        <div className="dashboard-profile">
                            <div className="dashboard-profile-info">
                                <div className="dashboard-profile-name">Sofia Mendez</div>
                                <div className="dashboard-profile-role">Lumiere Coffee shop-Owner</div>
                            </div>
                            <img src={userAvatar} alt="Sofia Mendez" className="dashboard-avatar" />
                        </div>
                    </div>
                </header>

                <div className="dashboard-content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default DashboardLayout;
