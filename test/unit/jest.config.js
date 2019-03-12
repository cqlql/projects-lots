module.exports = {
  moduleFileExtensions: ['js'],
  // verbose: true,
  rootDir: './',
  testMatch: ['<rootDir>/**/*.test.js'],
  // 'testRegex': [
  //   'ajax-cache\\.test\\.js$',
  //   // '/test/unit/.+(test|spec)\\.[jt]sx?$'
  // ],
  // watchPathIgnorePatterns: [
  //   '/components/',
  //   '/projects/',
  // ],
  testPathIgnorePatterns: ['/src/', 'node_modules'],
  moduleNameMapper: {
    // 同步 webpack 别名
    '@/(.*)$': '<rootDir>../../src/$1'
  },
  
  transform: { '^.+\\.js$': '<rootDir>jest-preprocess.js' },
}