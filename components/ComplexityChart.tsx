'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ComplexityChartProps {
  data: any[];
}

export default function ComplexityChart({ data }: ComplexityChartProps) {
  return (
    <div className="glass rounded-2xl shadow-lg p-8 border border-white/20 card-hover fade-in">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Performance by Complexity Level</h3>
      <p className="text-sm text-gray-600 mb-6">Failure rates and test pass rate across problem complexity levels</p>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis label={{ value: 'Rate (%)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="compileFailRate"
            stroke="#ef4444"
            strokeWidth={2}
            name="Fail Compilation (%)"
            dot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="runtimeFailRate"
            stroke="#f97316"
            strokeWidth={2}
            name="Fail Running (%)"
            dot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="testFailRate"
            stroke="#f59e0b"
            strokeWidth={2}
            name="Fail Test (%)"
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
