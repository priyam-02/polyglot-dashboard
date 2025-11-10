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
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className={`text-3xl font-bold ${colorClass}`}>{displayValue}</p>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-3">{description}</p>
    </div>
  );
}
