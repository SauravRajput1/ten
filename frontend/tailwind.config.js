/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '1170px',
      xl: '1240px',
    },
    colors: {
      'primary': '#087BE0',
      'primary-400': '#E8F1FF',
      'primary-100': '#E8F1FF',
      'white': '#fff',
      'black': '#000000',
      'black-200': '#465A69',
      'green': '#4CAF50',
      'grey': '#DDDDDD',
      'grey-200': '#4A4A4A',
      'grey-100': '#F1F2F4',
      'error': '#D32F2F'
    },
    fontFamily: {
      sans: ['Open Sans', 'sans-serif'],
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'custom': '0px 10px 10px #E8F1FF',
      },
    }
  },
  plugins: [],
};
