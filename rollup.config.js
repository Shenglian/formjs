import resolve from 'rollup-plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload'

const defaultConfig = {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/bundle.js',
      format: 'iife',
      plugins: [
        resolve({
          include: ['node_modules/**'],
        })
      ]
    }
  ]
}

export default commandLineArgs => {
  if (commandLineArgs.watch === true) {
    defaultConfig.output[0].plugins.push(
      serve({
        port: 3001,
        contentBase: ['dist']
      }),
      livereload({
        watch: 'dist',
      })
    )

    return defaultConfig;
  }
  return defaultConfig;
}
