import React, { useState, useEffect } from 'react';
import { HiOutlineShoppingBag, HiOutlineShoppingCart, HiOutlineOfficeBuilding } from 'react-icons/hi';
import { buildConicGradient, CHART_GOLD, primaGold } from '../chartColors';
import LabeledPieChart from '../components/LabeledPieChart';
import axiosInstance from '../../api/axios';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
const kigaliBars = [35, 42, 48, 55, 60, 58, 65, 70];
const otherBars = [25, 30, 28, 38, 40, 45, 42, 48];

function AnalyticsPage() {
    const [loading, setLoading] = useState(true);
    const [topStats, setTopStats] = useState([
        { label: 'Revenue this Year', value: '$0', icon: HiOutlineShoppingBag },
        { label: 'Orders received this Year', value: '0', icon: HiOutlineShoppingCart },
        { label: 'Coffee shops Joined', value: '1', icon: HiOutlineOfficeBuilding },
    ]);
    
    const [weekDonutSegments, setWeekDonutSegments] = useState([
        { label: 'Hot Drinks', pct: 0, opacity: 1 },
        { label: 'Fast Food', pct: 0, opacity: 0.5 },
        { label: 'Cold Drinks', pct: 0, opacity: 0.3 },
        { label: 'Chinese', pct: 0, opacity: 0.1 },
    ]);



    useEffect(() => {
        const fetchAnalytics = async () => {
            setLoading(true);
            try {
                const [ordersRes, menuRes] = await Promise.all([
                    axiosInstance.get('/orders'),
                    axiosInstance.get('/menu')
                ]);
                
                const orders = ordersRes.data || [];
                const menu = menuRes.data || [];

                // Calculate Top Stats
                const revenue = orders.reduce((acc, o) => acc + (Number(o.money) || 0), 0);
                setTopStats([
                    { label: 'Revenue this Year', value: `$${revenue.toLocaleString('en-US', {maximumFractionDigits: 0})}`, icon: HiOutlineShoppingBag },
                    { label: 'Orders received this Year', value: String(orders.length), icon: HiOutlineShoppingCart },
                    { label: 'Coffee shops Joined', value: '1', icon: HiOutlineOfficeBuilding }, // Static for now assuming single owner dashboard
                ]);

                // Calculate Order Categories 
                // First build a map of itemName -> category
                const itemCategoryMap = {};
                menu.forEach(m => {
                    itemCategoryMap[m.name.toLowerCase()] = m.category;
                });

                const catCounts = { 'Hot drinks': 0, 'Fast food': 0, 'Cold drinks': 0, 'Chinese': 0 };
                let totalCategorized = 0;

                orders.forEach(o => {
                    const itemName = (o.item || '').toLowerCase().trim();
                    let rawCat = itemCategoryMap[itemName] || 'Hot drinks';
                    let lowerCat = rawCat.toLowerCase();
                    
                    if (lowerCat.includes('cold')) catCounts['Cold drinks']++;
                    else if (lowerCat.includes('fast')) catCounts['Fast food']++;
                    else if (lowerCat.includes('chinese')) catCounts['Chinese']++;
                    else catCounts['Hot drinks']++;
                    
                    totalCategorized++;
                });

                if (totalCategorized === 0) totalCategorized = 1;

                setWeekDonutSegments([
                    { label: 'Hot Drinks', pct: Math.round((catCounts['Hot drinks']/totalCategorized)*100), opacity: 1 },
                    { label: 'Fast Foods', pct: Math.round((catCounts['Fast food']/totalCategorized)*100), opacity: 0.5 },
                    { label: 'Cold Drinks', pct: Math.round((catCounts['Cold drinks']/totalCategorized)*100), opacity: 0.3 },
                    { label: 'Chinese', pct: Math.round((catCounts['Chinese']/totalCategorized)*100), opacity: 0.1 },
                ]);



            } catch (err) {
                console.error("Error fetching analytics data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    const weekDonutGradient = buildConicGradient(weekDonutSegments);

    if (loading) {
        return <div style={{ padding: '40px', color: '#666' }}>Loading Analytics...</div>;
    }

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
