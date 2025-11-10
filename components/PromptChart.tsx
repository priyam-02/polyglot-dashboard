'use client';

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PromptChartProps {
  data: any[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

export default function PromptChart({ data }: PromptChartProps) {
  const pieData = data.map(item => ({
    name: item.name,
    value: item.testPassRate,
  }));

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-1">Prompt Strategy Effectiveness</h3>
      <p className="text-sm text-gray-600 mb-4">Test pass rate (%) by prompt strategy</p>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => `${value.toFixed(2)}%`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
