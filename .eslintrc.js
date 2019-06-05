module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    // 'plugin:vue/essential',
    'plugin:vue/recommended',
    '@vue/standard',
    '@vue/typescript'
  ],
  rules: {
    'vue/max-attributes-per-line': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    // allow async-await
    'generator-star-spacing': 'off',

    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
}
