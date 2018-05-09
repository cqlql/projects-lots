import Vue from 'vue'
Vue.config.productionTip = false

// require all test files (files that ends with .spec.js)
const testsContext = require.context('./', true, /test\.js$/)

// 只测试 slider-one-load.test
// const testsContext = require.context('./components/slider-one-load.test.js', true, /test\.js$/)
testsContext.keys().forEach(testsContext)
