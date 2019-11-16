import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
  input: './lib/index.js',
  output: {
    file: 'lib/mapper-js.min.js',
    format: 'umd',
    name: 'mapper',
    sourcemap: true,
  },
  plugins: [
    resolve({
      mainFields: ['module', 'main'],
    }),
    commonjs(),
    terser(),
  ],
};
