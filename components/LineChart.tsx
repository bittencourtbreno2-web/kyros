import React, { useState, useMemo } from 'react';

interface ChartData {
  day: string;
  ep: number;
}

interface LineChartProps {
  data: ChartData[];
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const [tooltip, setTooltip] = useState<{ x: number; y: number; data: ChartData } | null>(null);
  const width = 500;
  const height = 250;
  const padding = { top: 20, right: 20, bottom: 30, left: 50 };

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const { xScale, yScale, linePath, areaPath, points } = useMemo(() => {
    const maxEp = Math.max(...data.map(d => d.ep), 0);
    const minEp = Math.min(...data.map(d => d.ep), 0);

    const getX = (index: number) => (index / (data.length - 1)) * chartWidth + padding.left;
    const getY = (ep: number) => chartHeight - ((ep - minEp) / ((maxEp - minEp) || 1)) * chartHeight + padding.top;

    const points = data.map((d, i) => ({
      x: getX(i),
      y: getY(d.ep),
      data: d,
    }));

    const linePath = points.map((p, i) => (i === 0 ? 'M' : 'L') + `${p.x} ${p.y}`).join(' ');

    const areaPath = `${linePath} V ${height - padding.bottom} H ${padding.left} Z`;

    return { xScale: getX, yScale: getY, linePath, areaPath, points };
  }, [data, chartWidth, chartHeight, padding]);

  return (
    <div className="relative w-full h-full">
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet" className="w-full h-full">
        <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="var(--color-bg)" stopOpacity={0.1} />
            </linearGradient>
        </defs>
        
        {/* Y-Axis Grid Lines */}
        {points.map((p, i) => (
             <line
                key={`grid-y-${i}`}
                x1={padding.left}
                y1={p.y}
                x2={width - padding.right}
                y2={p.y}
                stroke="rgba(255,255,255,0.05)"
                strokeDasharray="2,2"
            />
        ))}

        {/* Gradient Area */}
        <path d={areaPath} fill="url(#areaGradient)" />

        {/* Line */}
        <path d={linePath} fill="none" stroke="var(--color-primary)" strokeWidth="2" />

        {/* X-Axis Labels */}
        {data.map((d, i) => (
          <text
            key={d.day}
            x={xScale(i)}
            y={height - 10}
            textAnchor="middle"
            fill="var(--color-text-dark)"
            fontSize="12"
          >
            {d.day}
          </text>
        ))}

        {/* Data Points & Tooltip Triggers */}
        {points.map((p, i) => (
          <circle
            key={`point-${i}`}
            cx={p.x}
            cy={p.y}
            r="8"
            fill="transparent"
            onMouseEnter={() => setTooltip(p)}
            onMouseLeave={() => setTooltip(null)}
          />
        ))}
        {points.map((p, i) => (
             <circle
                key={`point-visible-${i}`}
                cx={p.x}
                cy={p.y}
                r="3"
                fill={tooltip?.data.day === p.data.day ? 'var(--color-accent)' : 'var(--color-primary)'}
                className="pointer-events-none transition-all"
             />
        ))}
      </svg>
      {tooltip && (
        <div
          className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-full p-2 bg-slate-900 text-white text-xs rounded-md shadow-lg transition-opacity duration-200"
          style={{
            left: `${(tooltip.x / width) * 100}%`,
            top: `${(tooltip.y / height) * 100}%`,
            marginTop: '-10px',
          }}
        >
          {tooltip.data.ep} EP
        </div>
      )}
    </div>
  );
};

export default LineChart;