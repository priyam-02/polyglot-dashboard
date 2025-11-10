import { Filters } from "@/types";

interface FilterPanelProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  languages: string[];
  llms: string[];
  prompts: string[];
  complexities: string[];
}

export default function FilterPanel({
  filters,
  onFilterChange,
  languages,
  llms,
  prompts,
  complexities,
}: FilterPanelProps) {
  const handleReset = () => {
    onFilterChange({
      language: "all",
      llm: "all",
      prompt: "all",
      complexity: "all",
    });
  };

  const formatLLMDisplay = (llm: string) => {
    const nameMap: { [key: string]: string } = {
      "qwen2.5-coder_32b": "Qwen2.5-Coder 32B",
      "qwen2.5_32b": "Qwen2.5 32B",
      "qwen2.5-coder": "Qwen2.5-Coder 7B",
      "deepseek-coder-v2": "DeepSeek-Coder-V2 16B",
      "deepseek-coder_33b": "DeepSeek-Coder 33B",
      "llama3.1_70b": "Llama3.1 70B",
      "llama3.1": "Llama3.1 8B",
    };
    return nameMap[llm] || llm;
  };

  const formatPromptDisplay = (prompt: string) => {
    const nameMap: { [key: string]: string } = {
      "standard zero-shot": "Standard Zero-Shot",
      "curated zero-shot": "Curated Zero-Shot",
      "chain-of-thought": "Chain-of-Thought",
    };
    return nameMap[prompt] || prompt;
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-6 border border-white/30">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-gray-900">Filters</h2>
        <button
          onClick={handleReset}
          className="text-sm text-purple-600 hover:text-purple-800 font-semibold transition-colors px-4 py-2 rounded-lg hover:bg-purple-50"
        >
          Reset All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Language
          </label>
          <select
            value={filters.language}
            onChange={(e) =>
              onFilterChange({ ...filters, language: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="all">All Languages</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            LLM Model
          </label>
          <select
            value={filters.llm}
            onChange={(e) =>
              onFilterChange({ ...filters, llm: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="all">All Models</option>
            {llms.map((llm) => (
              <option key={llm} value={llm}>
                {formatLLMDisplay(llm)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Prompt Strategy
          </label>
          <select
            value={filters.prompt}
            onChange={(e) =>
              onFilterChange({ ...filters, prompt: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="all">All Prompts</option>
            {prompts.map((prompt) => (
              <option key={prompt} value={prompt}>
                {formatPromptDisplay(prompt)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Problem Complexity
          </label>
          <select
            value={filters.complexity}
            onChange={(e) =>
              onFilterChange({ ...filters, complexity: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="all">All Complexities</option>
            {complexities.map((complexity) => (
              <option key={complexity} value={complexity}>
                {complexity.charAt(0).toUpperCase() + complexity.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
