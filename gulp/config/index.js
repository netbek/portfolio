const _ = require('lodash');
const os = require('os');
const {browserslist} = require('../../package.json');

// Browsers for node-open/livereload
const browsers = {
  default: 'firefox',
  darwin: 'google chrome',
  linux: 'google-chrome',
  win32: 'chrome'
};
const livereloadBrowser = _.get(browsers, os.platform(), browsers.default);

module.exports = {
  autoprefixer: {
    browsers: browserslist
  },
  css: {
    params: {
      includePaths: [
        'node_modules/bourbon/core/',
        'node_modules/breakpoint-sass/stylesheets/',
        'node_modules/mathsass/dist/',
        'src/css'
      ],
      errLogToConsole: true
    }
  },
  dist: {
    base: 'public/',
    css: 'public/css/',
    fonts: 'public/fonts/',
    js: 'public/js/',
    vendor: 'public/vendor/'
  },
  imageStyles: {
    '240': {
      actions: [
        {
          name: 'resize',
          width: 240,
          options: '>'
        }
      ],
      quality: 85
    },
    '480': {
      actions: [
        {
          name: 'resize',
          width: 480,
          options: '>'
        }
      ],
      quality: 85
    },
    '960': {
      actions: [
        {
          name: 'resize',
          width: 960,
          options: '>'
        }
      ],
      quality: 85
    },
    '1440': {
      actions: [
        {
          name: 'resize',
          width: 1440,
          options: '>'
        }
      ],
      quality: 85
    },
    '1920': {
      actions: [
        {
          name: 'resize',
          width: 1920,
          options: '>'
        }
      ],
      quality: 85
    }
  },
  modernizr: {
    classPrefix: '',
    options: ['addTest', 'prefixed', 'setClasses', 'testProp'],
    'feature-detects': [
      // 'canvas',
      // 'css/animations',
      // 'css/backgroundsize',
      // 'css/backgroundsizecover',
      // 'css/calc',
      // 'css/flexbox',
      // 'css/transforms',
      // 'css/transforms3d',
      // 'svg',
      // 'svg/clippaths',
      // 'svg/inline',
      'touchevents'
    ]
  },
  penrose: {
    schemes: {
      public: {
        path: 'public/files/'
      }
    },
    tasks: {
      work: {
        src: ['public://work/*'],
        styles: [
          240,
          480
          // 960,
          // 1440,
          // 1920
        ]
      }
    }
  },
  src: {
    css: 'src/css/',
    data: 'src/data/',
    fonts: 'src/fonts/',
    js: 'src/js/',
    svg: 'src/svg/',
    templates: 'src/templates/'
  },
  vendor: {
    paths: [
      'FitVids.js/jquery.fitvids.js',
      'gsap/src/minified/TweenMax.min.js',
      'imagesloaded/imagesloaded.pkgd.min.js',
      'jquery/dist/jquery.slim.min.js',
      'normalize-css/normalize.css',
      'picturefill/dist/picturefill.min.js'
    ]
  },
  webserver: {
    host: 'localhost',
    port: 8000,
    livereload: false,
    directoryListing: false,
    https: false,
    fallback: 'index.html', // For SPAs that manipulate browser history
    browser: livereloadBrowser
  }
};
