const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
    context: __dirname,
    mode: 'production',
    entry: {
        "form": path.join(__dirname, '../src'),
        "form.min": path.join(__dirname, '../src')
    },
    output: {
        path: path.join(__dirname, '../'),
        filename: '[name].js',
        publicPath: './'
    },
    module: {
        rules: [{
            test: /\.(js)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
        }]
    },
    optimization: {
        minimize: true,
        minimizer: [new UglifyJsPlugin({
            include: /\.min\.js$/
        })]
    },
    plugins: [
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(true),
            VERSION: JSON.stringify('1.1.0'),
            SHENG: JSON.stringify('SHENG'),
            DEBUG: false
        })
    ]
};