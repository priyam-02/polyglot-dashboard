# Polyglot Benchmark Dashboard

An interactive web dashboard for visualizing code translation benchmark results from C to Python, Java, and Rust across multiple LLM models.

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your machine:
- **Node.js** (version 18.x or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)

To check if you have them installed:
```bash
node --version
npm --version
```

## 🚀 Quick Start Guide

### Step 1: Extract the ZIP file
Extract the `polyglot-dashboard.zip` file to your desired location.

### Step 2: Open Terminal/Command Prompt
Navigate to the extracted folder:
```bash
cd polyglot-dashboard
```

### Step 3: Install Dependencies
Run the following command to install all required packages:
```bash
npm install
```
This will take 1-2 minutes. You'll see a progress bar.

### Step 4: Start the Development Server
Run:
```bash
npm run dev
```

### Step 5: Open in Browser
Once you see "Ready in XXXXms", open your web browser and go to:
```
http://localhost:3000
```

The dashboard should now be visible! 🎉

## 🎯 Features

- **4 Interactive Filters**: Language, LLM Model, Prompt Type, and Problem Complexity
- **Real-time Updates**: All visualizations update instantly when filters change
- **Key Metrics Cards**: Shows total translations, compilation rate, runtime success, and test pass rate
- **6 Visualizations**:
  1. LLM Performance Comparison
  2. Performance by Target Language
  3. Performance by Problem Complexity
  4. Performance by Prompt Strategy
  5. LLM × Language Performance Heatmap
- **Color-coded Results**: Green (>60%), Orange (30-60%), Red (<30%)
- **Responsive Design**: Works on desktop, tablet, and mobile

## 📊 Data

The dashboard analyzes **56,637 code translations** from the benchmark results:
- **7 LLM Models**: deepseek-coder-v2, deepseek-coder_33b, llama3.1, llama3.1_70b, qwen2.5-coder, qwen2.5-coder_32b, qwen2.5_32b
- **3 Target Languages**: Python, Java, Rust
- **3 Prompt Types**: chain-of-thought, curated zero-shot, standard zero-shot
- **3 Complexity Levels**: simple, moderate, complex
- **150 Unique Problems**

## 🛠️ Troubleshooting

### Port 3000 is already in use
If you see an error about port 3000 being in use:
```bash
# On Windows
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# On Mac/Linux
lsof -ti:3000 | xargs kill -9
```

Or run on a different port:
```bash
npm run dev -- -p 3001
```
Then open `http://localhost:3001`

### Module not found errors
Make sure you ran `npm install` first. If issues persist:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Browser shows blank page
1. Check the terminal for any error messages
2. Open browser console (F12) and check for errors
3. Try hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)

## 📁 Project Structure

```
polyglot-dashboard/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main dashboard page
├── components/
│   ├── FilterPanel.tsx      # Filter controls
│   ├── MetricCard.tsx       # Metric display cards
│   ├── PerformanceChart.tsx # Bar charts
│   └── HeatmapChart.tsx     # Heatmap visualization
├── lib/
│   ├── types.ts             # TypeScript type definitions
│   └── utils.ts             # Data processing utilities
├── public/
│   └── benchmark_data.json  # Converted benchmark data
├── package.json
└── README.md
```

## 🎨 Customization

### Changing Colors
Edit `tailwind.config.js` to customize the color scheme:
```javascript
theme: {
  extend: {
    colors: {
      success: '#10b981',  // Green for high performance
      warning: '#f59e0b',  // Orange for moderate
      danger: '#ef4444',   // Red for low performance
    },
  },
}
```

### Adding More Filters
Edit `app/page.tsx` and `components/FilterPanel.tsx` to add additional filter options.

## 🏗️ Building for Production

To create an optimized production build:
```bash
npm run build
npm start
```

The production build will be faster and more optimized.

## 📦 Technologies Used

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Recharts** - Charts and visualizations
- **xlsx** - Excel file processing

## 💡 Tips for Conference Presentation

1. **Full Screen**: Press F11 in your browser for full-screen mode
2. **Pre-select Filters**: Before presenting, you can pre-filter to show specific results
3. **Zoom**: Use Ctrl/Cmd + Plus/Minus to adjust zoom level
4. **Multiple Views**: Open multiple browser tabs with different filter combinations

## 📧 Support

If you encounter any issues, check the terminal output for error messages and refer to the troubleshooting section above.

## 🎓 For Conference

This dashboard was created to present Polyglot Benchmark results at your conference. The interactive nature allows you to:
- Answer audience questions in real-time by adjusting filters
- Compare different models, languages, and approaches dynamically
- Showcase specific findings with visual evidence

Good luck with your presentation! 🚀
