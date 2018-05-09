
const rollup = require('rollup');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');


// see below for details on the options
const inputOptions = {
  input: './src/index.js',
  plugins: [
    resolve({
      customResolveOptions: {
        moduleDirectory: ['E:\\_work\\projects-small-scale\\modules\\pie']
      }
    }),
    babel({
      exclude: 'node_modules/**',
      // include: ['./src/**', 'modules'],
      // exclude: 'node_modules',
      // modules: false,
      // plugins: ['external-helpers'],
      // externalHelpers: false

    }),
    commonjs(),

  ]
};
const outputOptions = {
  // format: 'cjs',
  // moduleName: 'preloaderFull',
  format: 'umd',
  name: 'pieChart',
  file: 'dist/pie-chart.js'
};

async function build () {
  // create a bundle
  const bundle = await rollup.rollup(inputOptions);

  // generate code and a sourcemap
  // const { code, map } = await bundle.generate(outputOptions);

  // or write the bundle to disk
  await bundle.write(outputOptions);
}

build()




