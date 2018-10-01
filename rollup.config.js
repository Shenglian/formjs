import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from "rollup-plugin-uglify";

// export default [
//   {
//     entry: 'src/index.js',
//     format: 'cjs',
//     plugins: [
//       resolve(),
//       commonjs({
//         namedExports: {
//           'node_modules/emoji-regex/index.js': ['named']
//         }
//       }),
//       babel({
//         exclude: 'node_modules/**' // 仅仅转译我们的源码
//       }),
//       uglify()
//     ],
//     dest: 'bundle.js' // 相当于 --output
//   },
//   {
//     entry: 'src/index.js',
//     format: 'cjs',
//     plugins: [
//       resolve(),
//       commonjs({
//         namedExports: {
//           'node_modules/emoji-regex/index.js': ['named']
//         }
//       }),
//       babel({
//         exclude: 'node_modules/**' // 仅仅转译我们的源码
//       }),
//     ],
//     dest: 'bundle.min.js' // 相当于 --output
//   }
// ]


export default {
  input: 'src/index.js',
  output: {
    file: 'bundle.js',
    format: 'cjs',
    plugins: [
      resolve(),
      commonjs({
        namedExports: {
          'node_modules/emoji-regex/index.js': ['named']
        }
      }),
      babel({
        exclude: 'node_modules/**' // 仅仅转译我们的源码
      }),
    ],
    dest: 'bundle.min.js' // 相当于 --output
  }
}
