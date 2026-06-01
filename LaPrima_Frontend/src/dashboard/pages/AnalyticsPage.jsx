import React from 'react';
import { HiOutlineShoppingBag, HiOutlineShoppingCart, HiOutlineOfficeBuilding } from 'react-icons/hi';

const topStats = [
    { label: 'Revenue this Year', value: '$900,000', icon: HiOutlineShoppingBag },
    { label: 'Orders received this Year', value: '20K', icon: HiOutlineShoppingCart },
    { label: 'Coffee shops Joined', value: '5K', icon: HiOutlineOfficeBuilding },
];

const donutSegments = [
    { label: 'Hot Drinks', pct: 35, color: '#6B4423' },
    { label: 'Fast Foods', pct: 30, color: '#8B6914' },
    { label: 'Cold Drinks', pct: 20, color: '#C9A87C' },
    { label: 'Chinese', pct: 15, color: '#E8D4B8' },
];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
const kigaliBars = [35, 42, 48, 55, 60, 58, 65, 70];
const otherBars = [25, 30, 28, 38, 40, 45, 42, 48];

function AnalyticsPage() {
    let cumulative = 0;
    const donutGradient = donutSegments
        .map((seg) => {
            const start = cumulative;
            cumulative += seg.pct;
            return `${seg.color} ${start}% ${cumulative}%`;
        })
        .join(', ');

    return (
        <>
            <div className="analytics-top-stats">
                {topStats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.label} className="analytics-stat-card">
                            <Icon className="analytics-stat-icon" aria-hidden />
                            <div className="analytics-stat-value">{stat.value}</div>
                            <div className="analytics-stat-label">{stat.label}</div>
                        </div>
                    );
                })}
            </div>

            <div className="analytics-middle-row">
                <div className="dashboard-card analytics-donut-card">
                    <h3 className="dashboard-card-title">Orders In week</h3>
                    <div className="donut-chart-wrap">
                        <div
                            className="donut-chart"
                            style={{ background: `conic-gradient(${donutGradient})` }}
                        />
                        <div className="donut-hole" />
                    </div>
                    <ul className="donut-legend">
                        {donutSegments.map((seg) => (
                            <li key={seg.label}>
                                <span className="donut-legend-dot" style={{ background: seg.color }} />
                                {seg.label} ({seg.pct}%)
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="analytics-bottom-row">
                <div className="dashboard-card">
                    <div className="chart-card-header">
                        <h3 className="dashboard-card-title">Kigali Vs Other Districts</h3>
                        <button type="button" className="chart-filter-btn">Annually</button>
                    </div>
                    <div className="bar-chart">
                        {months.map((month, i) => (
                            <div key={month} className="bar-group">
                                <div className="bar-pair">
                                    <div
                                        className="bar bar-dark"
                                        style={{ height: `${(kigaliBars[i] / 80) * 100}%` }}
                                    />
                                    <div
                                        className="bar bar-light"
                                        style={{ height: `${(otherBars[i] / 80) * 100}%` }}
                                    />
                                </div>
                                <span className="bar-label">{month}</span>
                            </div>
                        ))}
                    </div>
                    <div className="bar-chart-y-labels">
                        <span>80$</span>
                        <span>40$</span>
                        <span>20$</span>
                        <span>0</span>
                    </div>
                </div>

                <div className="dashboard-card gauge-card">
                    <h3 className="dashboard-card-title">Customer care</h3>
                    <div className="gauge-wrap">
                        <div className="gauge-arc" />
                        <div className="gauge-value">90%</div>
                        <div className="gauge-sub">Good Reviews</div>
                    </div>
                    <div className="gauge-legend">
                        <span><i className="gauge-dot high" /> High</span>
                        <span><i className="gauge-dot medium" /> Medium</span>
                        <span><i className="gauge-dot low" /> Low</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AnalyticsPage;
