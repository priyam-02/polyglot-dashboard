"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface LLMPerformanceChartProps {
  data: any[];
}

export default function LLMPerformanceChart({
  data,
}: LLMPerformanceChartProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        LLM Performance Comparison
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 20, left: 60, bottom: 80 }}
          maxBarSize={100}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="end"
            height={100}
            interval={0}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            label={{
              value: "Success Rate (%)",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="compileRate" fill="#3b82f6" name="Compile Rate (%)" />
          <Bar dataKey="runtimeSuccessRate" fill="#8b5cf6" name="Runtime Success (%)" />
          <Bar dataKey="testPassRate" fill="#10b981" name="Test Pass Rate (%)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
