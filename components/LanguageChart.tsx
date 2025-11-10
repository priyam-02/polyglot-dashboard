'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface LanguageChartProps {
  data: any[];
}

export default function LanguageChart({ data }: LanguageChartProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-1">Target Language Performance</h3>
      <p className="text-sm text-gray-600 mb-4">Compile rate and test pass rate by target programming language</p>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis label={{ value: 'Success Rate (%)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="compileRate" fill="#3b82f6" name="Compile Rate (%)" />
          <Bar dataKey="runtimeSuccessRate" fill="#8b5cf6" name="Runtime Success (%)" />
          <Bar dataKey="testPassRate" fill="#f59e0b" name="Test Pass Rate (%)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
