import React from 'react';
import { HiOutlineChartBar } from 'react-icons/hi';
import { primaGold } from '../chartColors';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
const Y_LABELS = ['0', '10$', '40$', '80$'];

const SERIES = [
    { opacity: 0.2, values: [15, 20, 24, 28, 32, 38, 45] },
    { opacity: 0.5, values: [30, 42, 48, 58, 75, 65, 50] },
    { opacity: 1, values: [40, 35, 50, 55, 65, 72, 80] },
];

const PAD = { left: 52, top: 28, right: 24, bottom: 40 };
const W = 520;
const H = 220;
const CHART_W = W - PAD.left - PAD.right;
const CHART_H = H - PAD.top - PAD.bottom;
const Y_MAX = 80;

function toPoint(index, value) {
    const x = PAD.left + (index / (DAYS.length - 1)) * CHART_W;
    const y = PAD.top + CHART_H - (value / Y_MAX) * CHART_H;
    return { x, y };
}

function buildSmoothPath(points) {
    if (points.length < 2) return '';
    let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
    for (let i = 0; i < points.length - 1; i += 1) {
        const p0 = points[i - 1] || points[i];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = points[i + 2] || p2;
        const cp1x = p1.x + (p2.x - p0.x) / 6;
        const cp1y = p1.y + (p2.y - p0.y) / 6;
        const cp2x = p2.x - (p3.x - p1.x) / 6;
        const cp2y = p2.y - (p3.y - p1.y) / 6;
        d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }
    return d;
}

function WeeklyRevenueChart() {
    const gridYs = [0, 10, 40, 80].map((v) => PAD.top + CHART_H - (v / Y_MAX) * CHART_H);

    return (
        <div className="weekly-revenue-chart-wrap">
            <div className="weekly-revenue-chart-title">
                <HiOutlineChartBar className="weekly-revenue-chart-icon" aria-hidden />
                <span>Weekly Revenue</span>
            </div>
            <svg className="weekly-revenue-chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Weekly revenue line chart">
                {gridYs.map((y, i) => (
                    <g key={Y_LABELS[i]}>
                        <line
                            x1={PAD.left}
                            y1={y}
                            x2={W - PAD.right}
                            y2={y}
                            stroke="#e8e8e8"
                            strokeWidth="1"
                        />
                        <text x={PAD.left - 8} y={y + 4} textAnchor="end" className="chart-axis-label">
                            {Y_LABELS[i]}
                        </text>
                    </g>
                ))}
                {DAYS.map((_, i) => {
                    const x = PAD.left + (i / (DAYS.length - 1)) * CHART_W;
                    return (
                        <line
                            key={i}
                            x1={x}
                            y1={PAD.top}
                            x2={x}
                            y2={PAD.top + CHART_H}
                            stroke="#f0f0f0"
                            strokeWidth="1"
                        />
                    );
                })}
                {SERIES.map((s) => {
                    const color = primaGold(s.opacity);
                    const points = s.values.map((v, i) => toPoint(i, v));
                    return (
                        <g key={s.opacity}>
                            <path
                                d={buildSmoothPath(points)}
                                fill="none"
                                stroke={color}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            {points.map((p, i) => (
                                <circle key={i} cx={p.x} cy={p.y} r="4" fill={color} />
                            ))}
                        </g>
                    );
                })}
                {DAYS.map((day, i) => {
                    const x = PAD.left + (i / (DAYS.length - 1)) * CHART_W;
                    return (
                        <text key={day} x={x} y={H - 12} textAnchor="middle" className="chart-axis-label">
                            {day}
                        </text>
                    );
                })}
            </svg>
        </div>
    );
}

export default WeeklyRevenueChart;
