# Polyglot Benchmark Dashboard - Overview

## Purpose

This dashboard visualizes the results of the Polyglot Benchmark experiment, which evaluates the ability of Large Language Models (LLMs) to translate code from C to other programming languages (Python, Java, and Rust).

## Dataset

- **Total Translations**: 56,637 code translations
- **Source Language**: C
- **Target Languages**: Python, Java, Rust
- **LLM Models Tested**: 7 models
  - DeepSeek-Coder-V2 16B
  - DeepSeek-Coder 33B
  - Llama3.1 8B
  - Llama3.1 70B
  - Qwen2.5-Coder 7B
  - Qwen2.5-Coder 32B
  - Qwen2.5 32B
- **Prompt Strategies**: 3 types
  - Standard Zero-Shot
  - Curated Zero-Shot
  - Chain-of-Thought
- **Problem Complexity Levels**: Simple, Moderate, Complex
- **Unique Problems**: 150 distinct coding problems

## Key Metrics

The dashboard tracks three sequential success metrics for each translation:

1. **Compilation Success**: Did the translated code compile without errors?
2. **Runtime Success**: Did the compiled code run without runtime errors?
3. **Test Pass Rate**: Did the code pass all test cases?

These metrics form a pipeline: code must compile before it can run, and must run before tests can be evaluated.

## Dashboard Components

### 1. Interactive Filters
Users can filter the data by four dimensions:
- **Target Language**: Python, Java, or Rust
- **LLM Model**: Any of the 7 tested models
- **Prompt Strategy**: Standard, Curated, or Chain-of-Thought
- **Problem Complexity**: Simple, Moderate, or Complex

### 2. Summary Metrics Cards
Five high-level metrics update based on applied filters:
- **Total Translations**: Number of translations in the filtered dataset
- **Unique Problems**: Number of distinct problems in the filtered dataset
- **Compilation Success**: Percentage of translations that compiled successfully
- **Runtime Success**: Percentage of translations that ran without runtime errors
- **Test Pass Rate**: Percentage of translations that passed all tests (color-coded: green ≥60%, yellow 30-60%, red <30%)

### 3. LLM Performance Comparison (Bar Chart)
Shows how each LLM model performs across all three metrics:
- Blue bars: Compilation success rate
- Purple bars: Runtime success rate
- Green bars: Test pass rate
- Models are sorted by test pass rate (best to worst)
- Reveals which models are most effective at code translation

### 4. Performance by Complexity Level (Line Chart)
Tracks how performance degrades as problem complexity increases:
- Blue line: Compilation success rate
- Purple line: Runtime success rate
- Green line: Test pass rate
- Shows the impact of problem difficulty on translation quality
- Typically shows declining success rates from Simple → Moderate → Complex

### 5. Target Language Performance (Bar Chart)
Compares translation success across the three target languages:
- Blue bars: Compilation success rate
- Purple bars: Runtime success rate
- Orange bars: Test pass rate
- Reveals which languages are easier or harder for LLMs to translate to
- Sorted by test pass rate

### 6. Prompt Strategy Effectiveness (Pie Chart)
Displays the distribution of test pass rates across different prompting approaches:
- Shows which prompt strategy yields the best results
- Useful for understanding how prompt engineering affects translation quality

### 7. LLM × Language Performance Heatmap
A detailed matrix showing test pass rates for each combination of:
- **Rows**: LLM models
- **Columns**: Target languages
- **Colors**:
  - Green (≥60%): High success
  - Yellow (40-60%): Moderate success
  - Orange (20-40%): Low success
  - Red (<20%): Very low success
- Reveals which LLM/language combinations work best

### 8. Key Insights Summary
Automatically generated insights highlighting:
- Best performing LLM model
- Easiest target language
- Most effective prompt strategy
- Impact of complexity on success rates

## Use Cases

### For Researchers
- Compare LLM performance across different dimensions
- Identify patterns in translation failures
- Understand how problem complexity affects translation quality
- Evaluate the effectiveness of different prompt strategies

### For Practitioners
- Select the best LLM for specific code translation tasks
- Understand which target languages have better LLM support
- Set realistic expectations for automated code translation
- Identify areas where manual review is most needed

### For Conference Presentations
- Interactive filtering allows real-time exploration during Q&A
- Multiple visualizations provide different perspectives on the data
- Color-coded metrics make patterns immediately visible
- Can pre-filter to highlight specific findings

## Insights from the Data

Based on the full dataset, typical patterns include:

1. **Compilation rates** (70-90%) are generally higher than **test pass rates** (20-50%), indicating that LLMs can generate syntactically correct code more easily than semantically correct code.

2. **Runtime success rates** fall between compilation and test pass rates, showing that even compilable code may have runtime errors.

3. **Python** typically has the highest success rates, likely due to its simpler syntax and abundance in training data.

4. **Rust** typically has the lowest success rates, due to its complex ownership/borrowing system and stricter type requirements.

5. **Problem complexity** has a strong negative correlation with success rates - complex problems are significantly harder to translate correctly.

6. **Larger models** (e.g., 32B, 70B parameters) generally outperform smaller models (7B, 8B parameters).

7. **Prompt strategy** effects vary, but structured prompts (Chain-of-Thought, Curated) sometimes outperform basic zero-shot approaches.

## Technical Details

- Built with **Next.js 16** and **React 19**
- Visualizations powered by **Recharts**
- Styled with **Tailwind CSS**
- Fully client-side rendering for fast, interactive filtering
- No backend required - all data processing happens in the browser
