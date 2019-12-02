module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    'jest/globals': true
  },
  extends: [
    'standard',
    'plugin:jest/recommended',
    'plugin:jest/style'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
  },
  plugins: [
    'standard',
    'promise',
    'jest'
  ]
}
