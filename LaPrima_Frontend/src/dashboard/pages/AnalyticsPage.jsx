import React from 'react';
import { HiOutlineShoppingBag, HiOutlineShoppingCart, HiOutlineOfficeBuilding } from 'react-icons/hi';
import { buildConicGradient, CHART_GOLD, primaGold } from '../chartColors';
import LabeledPieChart from '../components/LabeledPieChart';

const topStats = [
    { label: 'Revenue this Year', value: '$900,000', icon: HiOutlineShoppingBag },
    { label: 'Orders received this Year', value: '20K', icon: HiOutlineShoppingCart },
    { label: 'Coffee shops Joined', value: '5K', icon: HiOutlineOfficeBuilding },
];

const weekDonutSegments = [
    { label: 'Hot Drinks', pct: 35, opacity: 1 },
    { label: 'Fast Foods', pct: 30, opacity: 0.5 },
    { label: 'Cold Drinks', pct: 20, opacity: 0.5 },
    { label: 'Chinese', pct: 15, opacity: 0.2 },
];

const deliveryPieSegments = [
    { pct: 45, opacity: 1, label: '86.4%' },
    { pct: 30, opacity: 0.5, label: '42%' },
    { pct: 25, opacity: 0.2, label: '60.7%' },
];

const deliveryLegend = [
    { label: 'On Time', opacity: 1 },
    { label: 'Delayed', opacity: 0.5 },
    { label: 'Missed', opacity: 0.2 },
];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
const kigaliBars = [35, 42, 48, 55, 60, 58, 65, 70];
const otherBars = [25, 30, 28, 38, 40, 45, 42, 48];

function AnalyticsPage() {
    const weekDonutGradient = buildConicGradient(weekDonutSegments);

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

            <div className="analytics-charts-row">
                <div className="dashboard-card analytics-donut-card">
                    <h3 className="dashboard-card-title">Orders In week</h3>
                    <div className="analytics-chart-body">
                        <div className="donut-chart-wrap">
                            <div
                                className="donut-chart"
                                style={{ background: `conic-gradient(${weekDonutGradient})` }}
                            />
                            <div className="donut-hole" />
                        </div>
                        <ul className="donut-legend">
                            {weekDonutSegments.map((seg) => (
                                <li key={seg.label}>
                                    <span
                                        className="donut-legend-dot"
                                        style={{ background: primaGold(seg.opacity) }}
                                    />
                                    {seg.label} ({seg.pct}%)
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="dashboard-card analytics-pie-card">
                    <div className="chart-card-header">
                        <h3 className="dashboard-card-title">Delivery Performance</h3>
                        <button type="button" className="chart-filter-btn">Annual</button>
                    </div>
                    <div className="analytics-chart-body">
                        <LabeledPieChart segments={deliveryPieSegments} size={220} />
                        <ul className="donut-legend delivery-legend">
                            {deliveryLegend.map((item) => (
                                <li key={item.label}>
                                    <span
                                        className="donut-legend-dot"
                                        style={{ background: primaGold(item.opacity) }}
                                    />
                                    {item.label}
                                </li>
                            ))}
                        </ul>
                    </div>
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
                                        className="bar"
                                        style={{
                                            height: `${(kigaliBars[i] / 80) * 100}%`,
                                            background: CHART_GOLD.full,
                                        }}
                                    />
                                    <div
                                        className="bar"
                                        style={{
                                            height: `${(otherBars[i] / 80) * 100}%`,
                                            background: CHART_GOLD.half,
                                        }}
                                    />
                                </div>
                                <span className="bar-label">{month}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="dashboard-card gauge-card">
                    <h3 className="dashboard-card-title">Customer care</h3>
                    <div className="gauge-wrap">
                        <div
                            className="gauge-arc"
                            style={{
                                borderTopColor: CHART_GOLD.full,
                                borderRightColor: CHART_GOLD.half,
                                borderLeftColor: CHART_GOLD.faint,
                            }}
                        />
                        <div className="gauge-value">90%</div>
                        <div className="gauge-sub">Good Reviews</div>
                    </div>
                    <div className="gauge-legend">
                        <span><i className="gauge-dot" style={{ background: CHART_GOLD.full }} /> High</span>
                        <span><i className="gauge-dot" style={{ background: CHART_GOLD.half }} /> Medium</span>
                        <span><i className="gauge-dot" style={{ background: CHART_GOLD.faint }} /> Low</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AnalyticsPage;
