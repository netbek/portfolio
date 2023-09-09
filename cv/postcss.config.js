module.exports = {
  plugins: [
    require('@tailwindcss/nesting')(require('postcss-nested')),
    require('tailwindcss')
  ]
};
