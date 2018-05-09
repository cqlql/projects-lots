const rollup = require('rollup')
const commonjs = require('rollup-plugin-commonjs')
const babel = require('rollup-plugin-babel')

// see below for details on the options
const inputOptions = {
  input: './src/main.js',
  plugins: [
    babel({
      include: ['./src/**']
    }),
    commonjs()
  ]
}
const outputOptions = {
  format: 'umd',
  name: 'dragClone',
  file: 'E:\\__admin\\Desktop\\demoyangmei\\src\\js\\drag-clone.js',
  sourcemap: 'inline'
}

let watchOptions = Object.assign(inputOptions, {

  output: [outputOptions],
  watch: {
    // chokidar,
    include: './src/**',
    // exclude
  }
})

const watcher = rollup.watch(watchOptions)

watcher.on('event', event => {
  // event.code can be one of:
  //   START        — the watcher is (re)starting
  //   BUNDLE_START — building an individual bundle
  //   BUNDLE_END   — finished building a bundle
  //   END          — finished building all bundles
  //   ERROR        — encountered an error while bundling
  //   FATAL        — encountered an unrecoverable error
  console.log(event)
  console.log(event.code)
})

// stop watching
// watcher.close();
