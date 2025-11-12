import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PerformanceChartProps {
  data: Array<{ name: string; passRate: number; compileFailRate: number; runtimeFailRate?: number; testFailRate?: number }>;
  title: string;
}

export default function PerformanceChart({ data, title }: PerformanceChartProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="end"
            height={100}
            interval={0}
            style={{ fontSize: '12px' }}
          />
          <YAxis label={{ value: 'Rate (%)', angle: -90, position: 'insideLeft' }} />
          <Tooltip formatter={(value: number) => `${value.toFixed(2)}%`} />
          <Legend />
          <Bar dataKey="compileFailRate" fill="#ef4444" name="Fail Compilation" />
          <Bar dataKey="runtimeFailRate" fill="#f97316" name="Fail Running" />
          <Bar dataKey="testFailRate" fill="#f59e0b" name="Fail Test" />
          <Bar dataKey="passRate" fill="#10b981" name="Test Pass Rate" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
