const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
      fontFamily: {
        display: ['Helvetica', 'sans-serif'],
        body: ['Graphik', 'sans-serif'],
        mono: ['Inconsolata', 'monospace'],
        fantasy: ['Trattatello', 'fantasy'],
      },
      borderWidth: {
        default: '1px',
        0: '0',
        2: '2px',
        4: '4px',
      },
      colors: {
        grayish: '#0D2439',
        blackish: '#5E81AC',
        cyan: '#9cdbff',
        orange: colors.orange,
      },
      spacing: {
        96: '24rem',
        128: '32rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}