# Installation & Setup Guide

## Step-by-Step Instructions with Screenshots Reference

### Prerequisites Check

**1. Check if Node.js is installed:**

Open your terminal (Command Prompt on Windows, Terminal on Mac/Linux) and type:
```bash
node --version
```

If you see a version number like `v18.x.x` or higher, you're good to go! ✅

If not, download and install Node.js from: https://nodejs.org/ (Download the LTS version)

---

### Installation Steps

**Step 1: Extract the ZIP file**
- Right-click `polyglot-dashboard.zip`
- Select "Extract All..." (Windows) or double-click (Mac)
- Choose a location you can easily find (like Desktop or Documents)

**Step 2: Open Terminal/Command Prompt**
- **Windows**: Press `Win + R`, type `cmd`, press Enter
- **Mac**: Press `Cmd + Space`, type "terminal", press Enter  
- **Linux**: Press `Ctrl + Alt + T`

**Step 3: Navigate to the folder**
```bash
cd path/to/polyglot-dashboard
```

Example on Windows:
```bash
cd C:\Users\YourName\Desktop\polyglot-dashboard
```

Example on Mac/Linux:
```bash
cd ~/Desktop/polyglot-dashboard
```

**Step 4: Install dependencies**
```bash
npm install
```

⏳ This will take 1-3 minutes. You'll see a progress bar and messages about packages being installed.

**Step 5: Start the server**
```bash
npm run dev
```

Wait for the message: `✓ Ready in XXXXms`

**Step 6: Open your browser**
- Open Chrome, Firefox, or any modern browser
- Type in the address bar: `http://localhost:3000`
- Press Enter

🎉 The dashboard should now be running!

---

### What You Should See

When you open `http://localhost:3000`, you should see:

1. **Header**: Blue gradient banner with "Polyglot Benchmark Dashboard"
2. **Filter Panel**: Four dropdown menus (Language, LLM, Prompt Type, Complexity)
3. **Metrics Cards**: Four cards showing statistics
4. **Charts**: Multiple bar charts and a heatmap table

---

### Using the Dashboard

**Filters:**
- Click any dropdown to change filters
- All charts update automatically
- Click "Reset All" to clear all filters

**Reading the Charts:**
- **Green bars/values**: High performance (>60%)
- **Orange bars/values**: Moderate performance (30-60%)
- **Red bars/values**: Low performance (<30%)

**Tips for Presentation:**
1. Start with all filters set to "All" to show overview
2. Then filter by specific LLM to deep-dive into a model
3. Use the heatmap to compare models across languages
4. The page is fully responsive - works on any screen size

---

### Common Issues & Solutions

**Issue 1: "npm is not recognized"**
- Solution: Node.js not installed properly. Reinstall from nodejs.org
- Make sure to close and reopen terminal after installation

**Issue 2: Port 3000 already in use**
- Solution: Another app is using port 3000
- Run: `npm run dev -- -p 3001` instead
- Then open: `http://localhost:3001`

**Issue 3: Blank page or errors in browser**
- Solution 1: Check terminal for error messages
- Solution 2: Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
- Solution 3: Clear browser cache

**Issue 4: Module not found errors**
- Solution: Delete `node_modules` folder and `package-lock.json`
- Run `npm install` again

**Issue 5: Changes not appearing**
- Solution: Make sure dev server is running
- Check terminal for "✓ Ready" message
- Refresh browser page

---

### Stopping the Server

When you're done:
- Go to the terminal where the server is running
- Press `Ctrl + C`
- Type `Y` if asked to confirm

---

### For Your Conference Presentation

**Before the presentation:**
1. Test everything the day before
2. Keep terminal window open but minimized
3. Have browser tab ready
4. Consider pre-loading specific filter combinations in multiple tabs

**During the presentation:**
1. Use F11 for full-screen browser mode
2. Use Ctrl/Cmd + Plus/Minus to zoom in/out
3. Have the dashboard open before connecting to projector
4. Consider having a backup (screenshots/PDF) just in case

**Interactive elements for audience:**
- Show how filters change results in real-time
- Compare different models live
- Answer "what if" questions by adjusting filters
- Use the heatmap to spot patterns quickly

---

### Technical Details

**Data Source:**
- 56,637 code translations from C to Python, Java, and Rust
- 7 different LLM models tested
- 150 unique programming problems
- 3 complexity levels and 3 prompt strategies

**Performance:**
- All data loads on page load (~30MB JSON)
- Filtering happens instantly in browser
- No backend required
- Works offline after initial load

**Browser Compatibility:**
- Chrome ✅
- Firefox ✅
- Safari ✅
- Edge ✅
- Opera ✅

**System Requirements:**
- Any modern computer (Windows/Mac/Linux)
- Node.js 18+
- 2GB free RAM
- Modern web browser

---

### Need Help?

If you encounter issues:
1. Check the error message in terminal
2. Read the error message in browser console (F12)
3. Refer to README.md for detailed documentation
4. Check that all files were extracted properly

---

### Project Files Overview

```
polyglot-dashboard/
├── QUICKSTART.txt           ← Start here!
├── README.md                ← Full documentation
├── INSTALLATION_GUIDE.md    ← This file
├── package.json             ← Project dependencies
├── app/                     ← Main application code
├── components/              ← UI components
├── lib/                     ← Utilities and types
└── public/                  ← Data and assets
    └── benchmark_data.json  ← Your benchmark results
```

---

Good luck with your conference! 🚀🎓

The dashboard will help you present your research in an engaging, interactive way that will impress the audience!
