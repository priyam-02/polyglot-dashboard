'use client';

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

interface PromptChartProps {
  data: any[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

export default function PromptChart({ data }: PromptChartProps) {
  // Get color based on prompt type
  const getPromptColor = (promptName: string) => {
    if (promptName.includes('Standard')) return COLORS[0]; // Blue
    if (promptName.includes('Curated')) return COLORS[1]; // Teal
    if (promptName.includes('Chain')) return COLORS[2]; // Yellow
    return COLORS[0];
  };

  // If only one prompt type, show as bar chart
  if (data.length === 1) {
    const barColor = getPromptColor(data[0].name);

    return (
      <div className="glass rounded-2xl shadow-lg p-8 border border-white/20 card-hover fade-in">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Prompt Strategy Effectiveness</h3>
        <p className="text-sm text-gray-600 mb-6">Test pass rate (%) by prompt strategy</p>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis label={{ value: 'Test Pass Rate (%)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Bar dataKey="testPassRate" fill={barColor} name="Test Pass Rate (%)" maxBarSize={150} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  // Define consistent order for prompt types
  const promptOrder = ['Standard Zero-Shot', 'Curated Zero-Shot', 'Chain-of-Thought'];

  // Sort data to maintain consistent order
  const sortedData = [...data].sort((a, b) => {
    const indexA = promptOrder.indexOf(a.name);
    const indexB = promptOrder.indexOf(b.name);
    return indexA - indexB;
  });

  // Create data showing test pass rate effectiveness (using actual performance, not count)
  const donutData = sortedData.map(item => ({
    name: item.name,
    value: item.testPassRate, // Use test pass rate so it changes visually
    compileRate: item.compileRate,
    runtimeSuccessRate: item.runtimeSuccessRate,
    count: item.count,
    fill: getPromptColor(item.name),
  }));

  // Calculate total for percentage display
  const total = donutData.reduce((sum, item) => sum + item.value, 0);

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value, name }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 30; // Position outside the donut
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#374151"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="font-bold text-sm"
      >
        {`${name}: ${value.toFixed(1)}%`}
      </text>
    );
  };

  return (
    <div className="glass rounded-2xl shadow-lg p-8 border border-white/20 card-hover fade-in">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Prompt Strategy Effectiveness</h3>
      <p className="text-sm text-gray-600 mb-6">Relative test pass rate comparison by prompt strategy</p>
      <ResponsiveContainer width="100%" height={450}>
        <PieChart>
          <Pie
            data={donutData}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={140}
            paddingAngle={2}
            dataKey="value"
            label={renderCustomLabel}
            labelLine={false}
            isAnimationActive={true}
            animationBegin={0}
            animationDuration={500}
          >
            {donutData.map((entry) => (
              <Cell key={entry.name} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number, name: string, props: any) => {
              const payload = props?.payload;
              if (!payload) return ['', name];
              return [
                `Test Pass Rate: ${(value || 0).toFixed(1)}% | Compile: ${(payload.compileRate || 0).toFixed(1)}% | Runtime: ${(payload.runtimeSuccessRate || 0).toFixed(1)}%`,
                name
              ];
            }}
          />
          <Legend
            verticalAlign="bottom"
            wrapperStyle={{ paddingTop: "20px" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
