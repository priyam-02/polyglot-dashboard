"use client";

import { useState, useEffect } from "react";
import { BenchmarkResult, Filters } from "@/types";
import FilterPanel from "@/components/FilterPanel";
import MetricCard from "@/components/MetricCard";
import LLMPerformanceChart from "@/components/LLMPerformanceChart";
import ComplexityChart from "@/components/ComplexityChart";
import LanguageChart from "@/components/LanguageChart";
import PromptChart from "@/components/PromptChart";
import HeatmapChart from "@/components/HeatmapChart";
import {
  filterData,
  calculateMetrics,
  getLLMPerformance,
  getComplexityPerformance,
  getLanguagePerformance,
  getPromptPerformance,
  getHeatmapData,
} from "@/lib/utils";

export default function Dashboard() {
  const [data, setData] = useState<BenchmarkResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    language: "all",
    llm: "all",
    prompt: "all",
    complexity: "all",
  });

  const [languages, setLanguages] = useState<string[]>([]);
  const [llms, setLlms] = useState<string[]>([]);
  const [prompts, setPrompts] = useState<string[]>([]);
  const [complexities, setComplexities] = useState<string[]>([]);

  useEffect(() => {
    fetch("/benchmark_data.json")
      .then((res) => res.json())
      .then((jsonData: BenchmarkResult[]) => {
        setData(jsonData);
        setLanguages(
          [...new Set(jsonData.map((d) => d.target_language))].sort()
        );
        setLlms([...new Set(jsonData.map((d) => d.llm))].sort());
        setPrompts([...new Set(jsonData.map((d) => d.prompt))].sort());
        setComplexities(["simple", "moderate", "complex"]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading benchmark data...</p>
        </div>
      </div>
    );
  }

  const filteredData = filterData(data, filters);
  const metrics = calculateMetrics(filteredData);
  const llmPerformance = getLLMPerformance(filteredData);
  const complexityPerformance = getComplexityPerformance(filteredData);
  const languagePerformance = getLanguagePerformance(filteredData);
  const promptPerformance = getPromptPerformance(filteredData);
  const heatmapData = getHeatmapData(filteredData);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Polyglot Benchmark Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Code Translation Performance Analysis: C → Python/Java/Rust
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Total Translations</p>
              <p className="text-2xl font-bold text-blue-600">
                {data.length.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="sticky top-0 z-10 mb-8 pb-1 pt-1 bg-gradient-to-br from-blue-50 to-indigo-100 border-b border-gray-300/50">
          <FilterPanel
            filters={filters}
            onFilterChange={setFilters}
            languages={languages}
            llms={llms}
            prompts={prompts}
            complexities={complexities}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <MetricCard
            title="Total Translations"
            value={metrics.totalTranslations.toLocaleString()}
            description="Total number of code translations in filtered dataset"
          />
          <MetricCard
            title="Unique Problems"
            value={metrics.uniqueProblems.toLocaleString()}
            description="Number of unique problems in filtered dataset"
          />
          <MetricCard
            title="Compilation Success"
            value={`${metrics.compileRate}%`}
            percentage={metrics.compileRate}
            description="Percentage of translations that compiled successfully"
          />
          <MetricCard
            title="Runtime Success"
            value={`${metrics.runtimeSuccessRate}%`}
            percentage={metrics.runtimeSuccessRate}
            description="Percentage of translations that ran without errors"
          />
          <MetricCard
            title="Test Pass Rate"
            value={`${metrics.testPassRate}%`}
            percentage={metrics.testPassRate}
            description="Percentage of translations that passed all tests"
          />
        </div>

        <div className="space-y-8">
          <LLMPerformanceChart data={llmPerformance} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ComplexityChart data={complexityPerformance} />
            <LanguageChart data={languagePerformance} />
          </div>

          <PromptChart data={promptPerformance} />
          <HeatmapChart data={heatmapData} />
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Key Insights</h3>
          <div className="space-y-3">
            {llmPerformance.length > 0 && (
              <div className="flex items-start">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></span>
                <p className="text-gray-700">
                  <strong>Best Performing LLM:</strong> {llmPerformance[0].name}{" "}
                  with {llmPerformance[0].testPassRate.toFixed(1)}% test pass
                  rate
                </p>
              </div>
            )}
            {languagePerformance.length > 0 && (
              <div className="flex items-start">
                <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                <p className="text-gray-700">
                  <strong>Easiest Target Language:</strong>{" "}
                  {languagePerformance[0].name} with{" "}
                  {languagePerformance[0].testPassRate.toFixed(1)}% success rate
                </p>
              </div>
            )}
            {promptPerformance.length > 0 && (
              <div className="flex items-start">
                <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></span>
                <p className="text-gray-700">
                  <strong>Most Effective Prompt:</strong>{" "}
                  {promptPerformance[0].name} with{" "}
                  {promptPerformance[0].testPassRate.toFixed(1)}% test pass rate
                </p>
              </div>
            )}
            <div className="flex items-start">
              <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3"></span>
              <p className="text-gray-700">
                <strong>Complexity Impact:</strong> Performance drops from{" "}
                {complexityPerformance[0]?.testPassRate.toFixed(1)}% (simple) to{" "}
                {complexityPerformance[2]?.testPassRate.toFixed(1)}% (complex)
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-600 text-sm">
          <p>Polyglot Benchmark Results Dashboard</p>
          <p className="mt-1">
            Data from {data.length.toLocaleString()} code translations across 7
            LLMs
          </p>
        </div>
      </footer>
    </div>
  );
}
