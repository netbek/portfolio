const {EsbuildPlugin} = require('esbuild-loader');
const webpack = require('webpack');
const webpackConfigBase = require('./webpack.config.base');
const mode = 'production';

module.exports = {
  ...webpackConfigBase,
  mode: mode,
  optimization: {
    minimize: true,
    minimizer: [
      new EsbuildPlugin({
        include: /\.min\.js$/,
        legalComments: 'none',
        minify: true,
        target: 'es5'
      })
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(mode)
    }),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
