'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ComplexityChartProps {
  data: any[];
}

export default function ComplexityChart({ data }: ComplexityChartProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-1">Performance by Complexity Level</h3>
      <p className="text-sm text-gray-600 mb-4">Compile rate and test pass rate across problem complexity levels</p>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis label={{ value: 'Success Rate (%)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="compileRate"
            stroke="#3b82f6"
            strokeWidth={2}
            name="Compile Rate (%)"
            dot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="runtimeSuccessRate"
            stroke="#8b5cf6"
            strokeWidth={2}
            name="Runtime Success (%)"
            dot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="testPassRate"
            stroke="#10b981"
            strokeWidth={2}
            name="Test Pass Rate (%)"
            dot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
