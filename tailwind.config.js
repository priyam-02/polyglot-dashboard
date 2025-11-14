/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary color (Interactive elements, brand)
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          500: '#6366f1', // Main indigo
          600: '#4f46e5',
          700: '#4338ca',
        },
        // Secondary color (Success states)
        secondary: {
          500: '#10b981', // Emerald
          600: '#059669',
        },
        // Tertiary color (Variation/neutral data)
        tertiary: {
          400: '#fbbf24', // Amber light
          500: '#f59e0b', // Amber
          600: '#d97706',
        },
        // Semantic colors
        success: {
          500: '#10b981', // Emerald
          600: '#059669',
        },
        warning: {
          400: '#fbbf24', // Amber light
          500: '#f59e0b', // Amber
          600: '#d97706',
        },
        danger: {
          500: '#ef4444', // Red
          600: '#dc2626',
        },
        info: {
          500: '#f97316', // Orange
        },
      },
    },
  },
  plugins: [],
}
