"use client";

interface HeatmapChartProps {
  data: any[];
}

export default function HeatmapChart({ data }: HeatmapChartProps) {
  const llms = Array.from(new Set(data.map((d) => d.llm)));
  const languages = Array.from(new Set(data.map((d) => d.language)));

  const getColor = (value: number) => {
    if (value >= 60) return "bg-green-500";
    if (value >= 40) return "bg-yellow-400";
    if (value >= 20) return "bg-orange-400";
    return "bg-red-500";
  };

  const getValue = (llm: string, language: string) => {
    const item = data.find((d) => d.llm === llm && d.language === language);
    return item ? item.value : 0;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-1">
        LLM × Language Performance Heatmap
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Test pass rate (%) by LLM model and target language
      </p>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg">
          <thead>
            <tr>
              <th className="p-3 bg-gray-50 text-left text-sm font-semibold text-gray-700">
                LLM / Language
              </th>
              {languages.map((lang) => (
                <th
                  key={lang}
                  className="p-3 bg-gray-50 text-center text-sm font-semibold text-gray-700"
                >
                  {lang}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {llms.map((llm) => (
              <tr key={llm}>
                <td className="p-3 bg-white text-sm font-medium text-gray-800 border-t border-gray-200">
                  {llm}
                </td>
                {languages.map((lang) => {
                  const value = getValue(llm, lang);
                  return (
                    <td
                      key={`${llm}-${lang}`}
                      className="p-1 border-t border-gray-200"
                    >
                      <div
                        className={`${getColor(value)} h-16 flex items-center justify-center text-white font-bold text-sm rounded shadow-sm`}
                      >
                        {value.toFixed(1)}%
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex items-center justify-center gap-4 text-xs">
        <span className="font-semibold">Legend:</span>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-green-500"></div>
          <span>60%+</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-yellow-400"></div>
          <span>40-60%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-orange-400"></div>
          <span>20-40%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-red-500"></div>
          <span>&lt;20%</span>
        </div>
      </div>
    </div>
  );
}
