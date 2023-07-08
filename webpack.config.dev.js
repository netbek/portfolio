const webpack = require('webpack');
const webpackConfigBase = require('./webpack.config.base');
const mode = 'development';

module.exports = {
  ...webpackConfigBase,
  mode: mode,
  optimization: {
    minimize: false
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(mode)
    }),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
