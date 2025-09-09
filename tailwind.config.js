/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'eco-navy': '#1e293b',
        'eco-blue': '#0f172a',
        'eco-green': '#34d399',
        'eco-green-light': '#6ee7b7',
        'eco-accent': '#10b981',
      },
      backgroundImage: {
        'eco-gradient': 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        'eco-gradient-green': 'linear-gradient(135deg, #059669 0%, #34d399 50%, #6ee7b7 100%)',
      },
      animation: {
        'movePattern': 'movePattern 20s linear infinite',
      },
      keyframes: {
        movePattern: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '40px 40px' },
        }
      }
    },
  },
  plugins: [],
}