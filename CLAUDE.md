# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 dashboard application for visualizing Polyglot Benchmark results - analyzing 56,637+ code translations from C to Python/Java/Rust across 7 LLM models (DeepSeek Coder, Llama 3.1, Qwen2.5 variants). The dashboard provides interactive filtering and visualizations of compilation success, runtime success, and test pass rates.

## Commands

### Development
- `npm run dev` - Start development server on http://localhost:3000
- `npm run dev -- -p 3001` - Start on different port if 3000 is in use

### Build & Deploy
- `npm run build` - Create production build
- `npm start` - Run production server
- `npm run lint` - Run ESLint

### Dependencies
- `npm install` - Install all dependencies (required after cloning)

## Architecture

### Data Flow
1. **Data Source**: `public/benchmark_data.json` contains ~30MB of raw benchmark results (56K+ translations)
2. **Data Loading**: [app/page.tsx](app/page.tsx) fetches `/data.json` on mount (Next.js serves from `/public`)
3. **Filtering**: `lib/utils.ts` `filterData()` applies user-selected filters across 4 dimensions
4. **Aggregation**: Utility functions in [lib/utils.ts](lib/utils.ts) compute metrics by grouping results by LLM/language/complexity/prompt
5. **Visualization**: Individual chart components in `components/` render using Recharts library

### Key Components Structure
- **[app/page.tsx](app/page.tsx)**: Main dashboard container - manages global state (filters, data) and orchestrates all child components
- **[components/FilterPanel.tsx](components/FilterPanel.tsx)**: 4-select filter interface (language/LLM/prompt/complexity) with "Reset All" button
- **Chart Components**: Each visualization is a separate component (LLMPerformanceChart, ComplexityChart, LanguageChart, PromptChart, HeatmapChart)
- **[components/MetricCard.tsx](components/MetricCard.tsx)**: Reusable card for displaying aggregated metrics with color-coded percentages

### Type System
- **[types/index.ts](types/index.ts)**: Single source of truth for TypeScript interfaces
- `BenchmarkResult`: Raw data structure (17 fields including compiles, runtime_error, passes_tests)
- `Filters`: User-selected filter state (language/llm/prompt/complexity)
- Path aliases: `@/*` maps to project root (configured in [tsconfig.json](tsconfig.json))

### Data Processing Patterns
All aggregation functions in [lib/utils.ts](lib/utils.ts) follow this pattern:
1. Group filtered data by dimension (e.g., by LLM model)
2. Calculate metrics for each group using `calculateMetrics()`
3. Return sorted array with formatted names and percentages

Key formatting utilities:
- `formatLLMName()` - Maps raw model names to display names (e.g., "deepseek-coder-v2" → "DeepSeek Coder V2")
- `formatPromptName()` - Capitalizes prompt types consistently
- `getSuccessColor()` / `getSuccessBgColor()` - Apply color thresholds: green (≥60%), yellow (30-60%), red (<30%)

### Styling
- Tailwind CSS with custom gradient background (`from-blue-50 to-indigo-100`)
- Responsive design: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4` pattern throughout
- All components use white cards with `rounded-lg shadow-md border border-gray-200`

## Important Notes

- **Data file location**: The dashboard expects data at `/data.json` which Next.js serves from [public/benchmark_data.json](public/benchmark_data.json). Do not move this file.
- **Client-side only**: Main dashboard uses `'use client'` directive - all state management and data fetching happens in browser
- **No backend API**: This is a static dashboard with no server-side data processing
- **Type duplication**: Both `lib/types.ts` and `types/index.ts` exist but the app imports from `@/types` (root types directory)
