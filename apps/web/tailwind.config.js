/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Olsera design tokens
        'primary-blue': '#1E3A8A',
        'accent-blue': '#2563EB',
        gold: '#D97706',
        success: '#16A34A',
        warning: '#CA8A04',
        error: '#DC2626',
        bg: '#F8FAFC',
        card: '#FFFFFF',
        'text-primary': '#0F172A',
        'text-secondary': '#64748B',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
