'use client';

import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Filters } from '@/types';

interface LanguageChartProps {
  data: any[];
  filters: Filters;
}

export default function LanguageChart({ data, filters }: LanguageChartProps) {
  const showSortingNote = filters.language === "all";

  return (
    <div className="glass rounded-2xl shadow-lg p-8 border border-white/20 card-hover fade-in">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Target Language Performance</h3>
      <p className="text-sm text-gray-600 mb-6">Failure rates (bars) and test pass rate trend (line) by target programming language.{showSortingNote && <span className="italic"> Sorted by test pass rate (best to worst).</span>}</p>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis label={{ value: 'Rate (%)', angle: -90, position: 'insideLeft' }} domain={[0, 100]} tickFormatter={(value) => value.toFixed(0)} />
          <Tooltip />
          <Legend />
          <Bar dataKey="compileFailRate" fill="#ef4444" name="Fail Compilation (%)" maxBarSize={80} />
          <Bar dataKey="runtimeFailRate" fill="#f97316" name="Fail Running (%)" maxBarSize={80} />
          <Bar dataKey="testFailRate" fill="#f59e0b" name="Fail Test (%)" maxBarSize={80} />
          <Line type="monotone" dataKey="testPassRate" stroke="#10b981" strokeWidth={3} dot={{ r: 6, fill: "#10b981" }} name="Test Pass Rate (%)" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
