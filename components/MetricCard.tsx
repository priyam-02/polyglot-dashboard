import { getSuccessColor, getSuccessBgColor } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  description: string;
  color?: string;
  percentage?: number;
}

export default function MetricCard({ title, value, description, percentage }: MetricCardProps) {
  const displayValue = typeof value === 'number' ? value.toLocaleString() : value;

  const getColorClass = (pct: number | undefined) => {
    if (pct === undefined) return 'text-gray-900';
    if (pct >= 60) return 'text-green-600';
    if (pct >= 30) return 'text-yellow-600';
    return 'text-red-600';
  };

  const colorClass = getColorClass(percentage);

  return (
    <div className="glass rounded-2xl shadow-lg p-6 border border-white/20 card-hover fade-in">
      <div className="flex items-start justify-between">
        <div className="w-full">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">{title}</p>
          <p className={`text-4xl font-bold ${colorClass} mb-3`}>{displayValue}</p>
          <p className="text-xs text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}
