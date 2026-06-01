/** La Prima brand gold #DDA15E — chart palette uses opacity steps only */
export const PRIMA_GOLD = '#DDA15E';

export const primaGold = (opacity) => `rgba(221, 161, 94, ${opacity})`;

export const CHART_GOLD = {
    full: PRIMA_GOLD,
    half: primaGold(0.5),
    faint: primaGold(0.2),
};

/** Build conic-gradient stops from segments: [{ pct, opacity }] */
export function buildConicGradient(segments) {
    let cumulative = 0;
    return segments
        .map((seg) => {
            const start = cumulative;
            cumulative += seg.pct;
            const color = typeof seg.opacity === 'number' ? primaGold(seg.opacity) : seg.color;
            return `${color} ${start}% ${cumulative}%`;
        })
        .join(', ');
}
