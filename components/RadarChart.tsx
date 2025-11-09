import React from 'react';
import type { LifeArea } from '../types';

interface RadarChartProps {
  data: LifeArea[];
}

const RadarChart: React.FC<RadarChartProps> = ({ data }) => {
  const size = 300;
  const center = size / 2;
  const numLevels = 5;
  const angleSlice = (Math.PI * 2) / data.length;

  if (!data || data.length === 0) {
    return (
        <div className="flex items-center justify-center h-full text-gray-400">
            Complete o diagnóstico para ver seus resultados.
        </div>
    );
  }

  // Calculate polygon points
  const points = data.map((d, i) => {
    const radius = (d.score / 10) * (center * 0.8);
    const x = center + radius * Math.cos(angleSlice * i - Math.PI / 2);
    const y = center + radius * Math.sin(angleSlice * i - Math.PI / 2);
    return `${x},${y}`;
  }).join(' ');
  
  return (
    <div className="w-full h-full flex items-center justify-center">
        <svg viewBox={`0 0 ${size} ${size}`} width="100%" height="100%">
            <defs>
                <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: 'rgba(124, 58, 237, 0.5)'}} />
                    <stop offset="100%" style={{ stopColor: 'rgba(56, 189, 248, 0.5)' }} />
                </linearGradient>
            </defs>
            
            {/* Grid lines */}
            {[...Array(numLevels)].map((_, levelIndex) => (
                <polygon
                    key={levelIndex}
                    points={data.map((_, i) => {
                        const radius = ((levelIndex + 1) / numLevels) * (center * 0.8);
                        const x = center + radius * Math.cos(angleSlice * i - Math.PI / 2);
                        const y = center + radius * Math.sin(angleSlice * i - Math.PI / 2);
                        return `${x},${y}`;
                    }).join(' ')}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.1)"
                />
            ))}

            {/* Axes */}
            {data.map((_, i) => {
                const x = center + (center * 0.8) * Math.cos(angleSlice * i - Math.PI / 2);
                const y = center + (center * 0.8) * Math.sin(angleSlice * i - Math.PI / 2);
                return <line key={i} x1={center} y1={center} x2={x} y2={y} stroke="rgba(255, 255, 255, 0.1)" />;
            })}

            {/* Labels */}
            {data.map((d, i) => {
                const radius = center * 0.95;
                const x = center + radius * Math.cos(angleSlice * i - Math.PI / 2);
                const y = center + radius * Math.sin(angleSlice * i - Math.PI / 2);
                const textAnchor = Math.abs(x - center) < 1 ? 'middle' : x > center ? 'start' : 'end';
                return (
                    <text key={d.name} x={x} y={y} dy="0.35em" textAnchor={textAnchor} fontSize="10" fill="rgba(255, 255, 255, 0.7)">
                        {d.name}
                    </text>
                );
            })}
            
            {/* Data Polygon */}
            <polygon points={points} fill="url(#radarGradient)" stroke="#7C3AED" strokeWidth="2" />

             {/* Data Points */}
            {data.map((d, i) => {
                const radius = (d.score / 10) * (center * 0.8);
                const x = center + radius * Math.cos(angleSlice * i - Math.PI / 2);
                const y = center + radius * Math.sin(angleSlice * i - Math.PI / 2);
                return <circle key={`point-${i}`} cx={x} cy={y} r="3" fill="#FFD700" />;
            })}
        </svg>
    </div>
  );
};

export default RadarChart;