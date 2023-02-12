/* eslint-disable prettier/prettier */
module.exports = {
  env: { es6: true, jest: true },
  extends: [
    'prettier',
    'plugin:vue/recommended',
    'standard',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:sonarjs/recommended',
    'eslint-config-prettier',
  ],
  plugins: ['prettier', 'sonarjs'],
  parserOptions: { ecmaVersion: 9, sourceType: 'module' },
  rules: {
    'prefer-promise-reject-errors': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/html-self-closing': 'off',
    'prettier/prettier': ['error', { endOfLine: 'off' }],
  },
  overrides: [{ files: '*.spec.[tj]s', rules: { 'no-import-assign': 'off' } }],
  parser: 'vue-eslint-parser',
}
