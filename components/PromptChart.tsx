'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Filters } from '@/types';
import { useState } from 'react';

interface PromptChartProps {
  data: any[];
  filters: Filters;
}

export default function PromptChart({ data, filters }: PromptChartProps) {
  const [chartType, setChartType] = useState<'grouped' | 'stacked'>('grouped');
  const showSortingNote = filters.prompt === "all";

  return (
    <div className="glass rounded-2xl shadow-lg p-8 border border-white/20 card-hover fade-in">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Prompt Strategy Effectiveness</h3>
          <p className="text-sm text-gray-600">
            {chartType === 'grouped'
              ? 'Failure rates and test pass rate comparison across prompt strategies.'
              : 'Composition of failure rates and test pass rate across prompt strategies.'}
            {showSortingNote && <span className="italic"> Sorted by test pass rate (best to worst).</span>}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setChartType('grouped')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              chartType === 'grouped'
                ? 'bg-primary-600 text-white shadow-md hover:shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 shadow-sm hover:shadow-md'
            }`}
          >
            Grouped
          </button>
          <button
            onClick={() => setChartType('stacked')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              chartType === 'stacked'
                ? 'bg-primary-600 text-white shadow-md hover:shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 shadow-sm hover:shadow-md'
            }`}
          >
            Stacked
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        {chartType === 'grouped' ? (
          <BarChart data={data} layout="vertical" margin={{ top: 20, right: 30, left: 150, bottom: 20 }} barCategoryGap="20%">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              domain={[0, 100]}
              tickFormatter={(value) => value.toFixed(0)}
            />
            <YAxis type="category" dataKey="name" width={140} />
            <Tooltip formatter={(value: any) => `${Number(value).toFixed(2)}%`} />
            <Legend />
            <Bar dataKey="compileFailRate" fill="#ef4444" name="Fail Compilation (%)" maxBarSize={20} />
            <Bar dataKey="runtimeFailRate" fill="#f97316" name="Fail Running (%)" maxBarSize={20} />
            <Bar dataKey="testFailRate" fill="#f59e0b" name="Fail Test (%)" maxBarSize={20} />
            <Bar dataKey="testPassRate" fill="#10b981" name="Test Pass Rate (%)" maxBarSize={20} />
          </BarChart>
        ) : (
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }} barCategoryGap="20%">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis
              label={{ value: 'Rate (%)', angle: -90, position: 'insideLeft' }}
              domain={[0, 100]}
              tickFormatter={(value) => value.toFixed(0)}
            />
            <Tooltip formatter={(value: any) => `${Number(value).toFixed(2)}%`} />
            <Legend />
            <Bar dataKey="compileFailRate" stackId="a" fill="#ef4444" name="Fail Compilation (%)" maxBarSize={150} />
            <Bar dataKey="runtimeFailRate" stackId="a" fill="#f97316" name="Fail Running (%)" maxBarSize={150} />
            <Bar dataKey="testFailRate" stackId="a" fill="#f59e0b" name="Fail Test (%)" maxBarSize={150} />
            <Bar dataKey="testPassRate" stackId="a" fill="#10b981" name="Test Pass Rate (%)" maxBarSize={150} />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
