import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload'

import path from 'path';
import { uglify } from "rollup-plugin-uglify";

const resolveFile = function(filePath) {
  return path.join(__dirname, '..', filePath)
}

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    plugins: [
      resolve({
        include: ['node_modules/**'],
      }),
      // serve({
      //   port: 3001,
      //   contentBase: ['demo', 'dist']
      // }),
      serve(),
      livereload({
        watch: 'dist',
      })
    ]
  },
}
