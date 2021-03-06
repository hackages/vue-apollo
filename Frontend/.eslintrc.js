module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/recommended'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-irregular-whitespace': 0,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
}
