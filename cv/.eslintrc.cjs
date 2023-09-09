module.exports = {
  root: true,
  env: {
    browser: true,
    jquery: true,
    mocha: true,
    node: true
  },
  plugins: ['prettier'],
  extends: ['eslint:recommended', 'prettier'],
  // rules: {},
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2017,
    requireConfigFile: false,
    sourceType: 'module'
  }
};
