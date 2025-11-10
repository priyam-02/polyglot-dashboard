'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ComplexityChartProps {
  data: any[];
}

export default function ComplexityChart({ data }: ComplexityChartProps) {
  return (
    <div className="glass rounded-2xl shadow-lg p-8 border border-white/20 card-hover fade-in">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Performance by Complexity Level</h3>
      <p className="text-sm text-gray-600 mb-6">Compile rate and test pass rate across problem complexity levels</p>
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
