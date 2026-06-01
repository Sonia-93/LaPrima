import React from 'react';
import { primaGold } from '../chartColors';

/**
 * SVG pie with percentage labels on slices.
 * segments: [{ pct, opacity, label }] — label is shown on slice (e.g. "86.4%")
 */
function LabeledPieChart({ segments, size = 200 }) {
    const cx = size / 2;
    const cy = size / 2;
    const r = size * 0.38;
    let angle = -90;

    const slices = segments.map((seg) => {
        const sweep = (seg.pct / 100) * 360;
        const startAngle = angle;
        const endAngle = angle + sweep;
        angle = endAngle;

        const startRad = (startAngle * Math.PI) / 180;
        const endRad = (endAngle * Math.PI) / 180;
        const x1 = cx + r * Math.cos(startRad);
        const y1 = cy + r * Math.sin(startRad);
        const x2 = cx + r * Math.cos(endRad);
        const y2 = cy + r * Math.sin(endRad);
        const largeArc = sweep > 180 ? 1 : 0;
        const d = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;

        const midAngle = ((startAngle + endAngle) / 2) * (Math.PI / 180);
        const labelR = r * 0.55;
        const lx = cx + labelR * Math.cos(midAngle);
        const ly = cy + labelR * Math.sin(midAngle);

        const fill = primaGold(seg.opacity);

        return { d, fill, lx, ly, label: seg.label };
    });

    return (
        <svg className="labeled-pie-chart" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {slices.map((s, i) => (
                <g key={i}>
                    <path d={s.d} fill={s.fill} stroke="#fff" strokeWidth="2" />
                    <text
                        x={s.lx}
                        y={s.ly}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="pie-slice-label"
                    >
                        {s.label}
                    </text>
                </g>
            ))}
        </svg>
    );
}

export default LabeledPieChart;
