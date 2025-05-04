/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'reu-cream': '#fdfcee',
        'reu-red': '#f14f40',
        'reu-brown': '#501c17',
        'reu-dark-brown': '#6d130b',
        'reu-pink': '#FFB4B4',
        'reu-light-yellow': '#FFF8E3',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      textStroke: {
        '1': '1px',
        '2': '2px',
        '3': '3px',
      },
      textStrokeColor: {
        'reu-brown': '#501C18',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.text-stroke': {
          '-webkit-text-stroke': 'var(--tw-text-stroke-width) var(--tw-text-stroke-color)',
        },
        '.text-stroke-1': {
          '--tw-text-stroke-width': '1px',
        },
        '.text-stroke-2': {
          '--tw-text-stroke-width': '2px',
        },
        '.text-stroke-3': {
          '--tw-text-stroke-width': '3px',
        },
      }
      addUtilities(newUtilities)
    },
  ],
};
