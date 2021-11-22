export default {
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    fontFamily: {
      display: ['Gilroy', 'sans-serif'],
      body: ['Graphik', 'sans-serif'],
      mono: ['ui-monospace', 'SFMono-Regular'],
    },
    borderWidth: {
      default: '1px',
      0: '0',
      2: '2px',
      4: '4px',
    },
    extend: {
      colors: {
        grayish: '#0D2439',
        blackish: '#5E81AC',
        cyan: '#9cdbff',
      },
      spacing: {
        96: '24rem',
        128: '32rem',
      },
    },
  },
  plugins: [require('windicss/plugin/typography')],
}
