const webpack = require('webpack');
const path = require('path');

const libraryName = 'ammonite';

module.exports = {
  entry: './src/index.ts',
  devtool: 'source-map',
  output: {
    path: './dist',
    filename: libraryName + '.js',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /(\.tsx|\.ts)$/,
        loader: 'awesome-typescript-loader',
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ],
  externals: {
    immutable: 'immutable',
  }
};
