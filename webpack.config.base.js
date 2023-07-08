const browserslist = require('browserslist');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules/']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          cacheDirectory: true,
          comments: false,
          env: {
            development: {
              plugins: [
                [
                  '@babel/plugin-proposal-object-rest-spread',
                  {useBuiltIns: false}
                ], // ES2018
                ['@babel/plugin-transform-object-assign'], // ES6
                ['@babel/plugin-transform-strict-mode'] // ???
              ]
            },
            production: {
              plugins: [
                [
                  '@babel/plugin-proposal-object-rest-spread',
                  {useBuiltIns: false}
                ], // ES2018
                ['@babel/plugin-transform-object-assign'], // ES6
                ['@babel/plugin-transform-strict-mode'] // ???
              ]
            }
          },
          plugins: [],
          presets: [
            [
              '@babel/preset-env',
              {
                loose: true,
                modules: 'commonjs',
                targets: {
                  browsers: browserslist()
                },
                useBuiltIns: false
              }
            ]
          ]
        }
      }
    ]
  },
  externals: {
    'gsap/EasePack': 'Expo',
    'gsap/TweenMax': 'TweenMax',
    'jquery/dist/jquery.slim': 'jQuery',
    'picturefill/dist/picturefill': 'picturefill'
  }
};
