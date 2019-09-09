module.exports = {
  root: true,
  env: {
    // node: true
    browser: true
  },
  extends: [
    'plugin:vue/essential',
    'standard'
  ],
  plugins: ['@typescript-eslint'],
  // Prerequisite `eslint-plugin-vue`, being extended, sets
  // root property `parser` to `'vue-eslint-parser'`, which, for code parsing,
  // in turn delegates to the parser, specified in `parserOptions.parser`:
  // https://github.com/vuejs/eslint-plugin-vue#what-is-the-use-the-latest-vue-eslint-parser-error
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    // https://typescript-eslint.io/parser
    'no-undef': 'off',

    'no-unused-vars': 'off',
    // https://github.com/typescript-eslint/typescript-eslint/issues/46
    '@typescript-eslint/no-unused-vars': 'error',

    // temporary fix for https://github.com/vuejs/vue-cli/issues/1922
    // very strange as somehow this rule gets different behaviors depending
    // on the presence of @typescript-eslint/parser...
    'strict': 'off'
  }
}
