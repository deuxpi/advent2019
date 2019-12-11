module.exports = {
  env: {
    es6: true,
    node: true,
    'jest/globals': true
  },
  extends: [
    'eslint:recommended',
    'standard',
    'plugin:jest/recommended',
    'plugin:jest/style'
  ],
  plugins: [
    'standard',
    'promise',
    'jest'
  ]
}
