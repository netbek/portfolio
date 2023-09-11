/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.njk'],
  plugins: [],
  prefix: 'tw-',
  theme: {
    extend: {
      fontSize: {
        xs: ['0.75rem', {lineHeight: '1'}],
        sm: ['0.875rem', {lineHeight: '1.5'}],
        base: ['1rem', {lineHeight: '1.5'}],
        lg: ['1.125rem', {lineHeight: '1.333'}],
        xl: ['1.25rem', {lineHeight: '1.25'}],
        '2xl': ['1.5rem', {lineHeight: '1.25'}],
        '3xl': ['1.875rem', {lineHeight: '1.25'}],
        '4xl': ['2.25rem', {lineHeight: '1.25'}],
        '5xl': ['3rem', {lineHeight: '1'}],
        '6xl': ['3.75rem', {lineHeight: '1'}],
        '7xl': ['4.5rem', {lineHeight: '1'}],
        '8xl': ['6rem', {lineHeight: '1'}],
        '9xl': ['8rem', {lineHeight: '1'}]
      }
    },
    fontFamily: {
      sans: ['"IBM Plex Sans"', 'sans-serif'],
      serif: ['"IBM Plex Serif"', 'serif']
    }
  }
};
