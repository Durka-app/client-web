module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    browser: true
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'react'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    'react/jsx-uses-vars': 'error',
    'react/jsx-uses-react': 'error'
  }
};
