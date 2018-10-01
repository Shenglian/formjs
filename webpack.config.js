const TARGET = process.env.npm_lifecycle_event;

if (TARGET === 'build:dev' || TARGET === 'dev' || !TARGET) {
  module.exports = require('./configs/webpack.config.dev');
  console.info('--> ./configs/webpack.config.dev.js');
}
if (TARGET === 'build' || TARGET === 'stats') {
  module.exports = require('./configs/webpack.config.prod');
  console.info('--> ./configs/webpack.config.prod.js');
}