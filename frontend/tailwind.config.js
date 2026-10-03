// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          maroon: { DEFAULT: '#7B1E26', dark: '#5E161D', light: '#9A2C35' },
          green: { DEFAULT: '#0E6B3A', dark: '#0A512C' },
          gold: { DEFAULT: '#E8A33D', dark: '#C9861F' },
          cream: '#F9F7F2',
          ink: '#1A1A2E',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        card: '0 10px 30px -12px rgba(0,0,0,0.15)',
      },
    },
  },
  plugins: [],
};
