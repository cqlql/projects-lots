module.exports = {
  verbose: true,
  rootDir: '../',
  // testMatch: ['<rootDir>/src/**/autoprefix.test.js'],
  testMatch: ['<rootDir>/src/utils/corejs/dict-data/dict-create.js'],
  // 'testRegex': [
  //   '/test/unit/.+(test|spec)\\.[jt]sx?$'
  // ],
  testPathIgnorePatterns: ['node_modules'],
  'moduleNameMapper': {
    // 同步 webpack 别名
    '@/(.*)$': '<rootDir>/src/$1'
  },
  
  transform: { '^.+\\.js$': '<rootDir>/test/jest-preprocess.js' },
}