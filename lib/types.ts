export interface BenchmarkData {
  translation_id: number;
  campaign: string;
  llm: string;
  prompt: string;
  problem: string;
  complexity: string;
  source_language: string;
  solution: string;
  target_language: string;
  translated_solution: string;
  compiles: boolean;
  runtime_error: boolean;
  passes_tests: boolean;
  number_tests_passed: number;
  total_tests: number;
  cc_solution: number | null;
  cc_translated: number | null;
  sloc_solution: number | null;
  sloc_translated: number | null;
  cc_var: number | null;
  log_cc: number | null;
  sloc_var: number | null;
  log_sloc: number | null;
}

export interface Filters {
  language: string;
  llm: string;
  prompt: string;
  complexity: string;
}

export interface MetricCard {
  title: string;
  value: string | number;
  subtitle?: string;
  color: string;
}

export interface ChartData {
  name: string;
  value: number;
  [key: string]: string | number;
}
