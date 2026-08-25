import { useMemo } from 'react';

interface TrendData {
  date: string;
  views: number;
}

interface TrendChartProps {
  data: TrendData[];
}

export function TrendChart({ data }: TrendChartProps) {
  const { maxValue, points } = useMemo(() => {
    if (!data || data.length === 0) {
      return { maxValue: 0, points: [] };
    }

    const max = Math.max(...data.map((d) => d.views));
    const height = 200;

    const points = data.map((d, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = height - (d.views / max) * height;

      return {
        ...d,
        x,
        y,
      };
    });

    return { maxValue: max, points };
  }, [data]);

  if (!data || data.length === 0) {
    return <p className="text-gray-600">No data available</p>;
  }

  const svgWidth = 100;
  const svgHeight = 250;
  const chartHeight = 200;
  const padding = 40;

  const pathPoints = points
    .map((p) => `${(p.x / 100) * (svgWidth - padding)} ${p.y + padding}`)
    .join(' L ');

  return (
    <div className="overflow-x-auto">
      <svg width={svgWidth} height={svgHeight} className="min-w-full">
        {/* Y Axis */}
        <line x1={padding} y1={padding} x2={padding} y2={padding + chartHeight} stroke="#d1d5db" />

        {/* X Axis */}
        <line x1={padding} y1={padding + chartHeight} x2={svgWidth} y2={padding + chartHeight} stroke="#d1d5db" />

        {/* Grid Lines */}
        {[0.25, 0.5, 0.75].map((fraction) => (
          <line
            key={`grid-${fraction}`}
            x1={padding}
            y1={padding + chartHeight * (1 - fraction)}
            x2={svgWidth}
            y2={padding + chartHeight * (1 - fraction)}
            stroke="#f3f4f6"
            strokeDasharray="4"
          />
        ))}

        {/* Y Axis Labels */}
        {[0, 0.5, 1].map((fraction) => {
          const value = Math.round(maxValue * fraction);
          const y = padding + chartHeight * (1 - fraction);

          return (
            <text key={`label-${fraction}`} x={padding - 10} y={y} fontSize="12" fill="#6b7280" textAnchor="end" dy="0.3em">
              {value}
            </text>
          );
        })}

        {/* Data Line */}
        <polyline points={pathPoints} fill="none" stroke="#3b82f6" strokeWidth="2" />

        {/* Data Points */}
        {points.map((p, i) => (
          <circle
            key={`point-${i}`}
            cx={(p.x / 100) * (svgWidth - padding) + padding}
            cy={p.y + padding}
            r="3"
            fill="#3b82f6"
          />
        ))}

        {/* X Axis Labels (every 5th day) */}
        {points
          .filter((_, i) => i % Math.max(1, Math.floor(points.length / 5)) === 0)
          .map((p, i) => (
            <text
              key={`x-label-${i}`}
              x={(p.x / 100) * (svgWidth - padding) + padding}
              y={padding + chartHeight + 15}
              fontSize="12"
              fill="#6b7280"
              textAnchor="middle"
            >
              {new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </text>
          ))}
      </svg>
    </div>
  );
}
