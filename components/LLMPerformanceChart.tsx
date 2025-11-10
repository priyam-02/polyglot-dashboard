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
    <div className="glass rounded-2xl shadow-lg p-8 border border-white/20 card-hover fade-in">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        LLM Performance Comparison
      </h3>
      <p className="text-sm text-gray-600 mb-6">
        Compile rate, runtime success, and test pass rate by LLM model
      </p>
      <ResponsiveContainer width="100%" height={450}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
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
          <Legend
            verticalAlign="bottom"
            wrapperStyle={{ paddingTop: "20px" }}
          />
          <Bar dataKey="compileRate" fill="#3b82f6" name="Compile Rate (%)" />
          <Bar
            dataKey="runtimeSuccessRate"
            fill="#8b5cf6"
            name="Runtime Success (%)"
          />
          <Bar
            dataKey="testPassRate"
            fill="#10b981"
            name="Test Pass Rate (%)"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
