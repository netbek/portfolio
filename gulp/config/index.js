const _ = require('lodash');
const os = require('os');
const {PNG, WEBP} = require('penrose');
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
    overrideBrowserslist: browserslist
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
    '240-png': {
      actions: [
        {
          name: 'resize',
          width: 240,
          withoutEnlargement: true
        }
      ],
      format: PNG,
      quality: 85
    },
    '480-png': {
      actions: [
        {
          name: 'resize',
          width: 480,
          withoutEnlargement: true
        }
      ],
      format: PNG,
      quality: 85
    },
    '960-png': {
      actions: [
        {
          name: 'resize',
          width: 960,
          withoutEnlargement: true
        }
      ],
      format: PNG,
      quality: 85
    },
    '1920-png': {
      actions: [
        {
          name: 'resize',
          width: 1920,
          withoutEnlargement: true
        }
      ],
      format: PNG,
      quality: 85
    },
    '240-webp': {
      actions: [
        {
          name: 'resize',
          width: 240,
          withoutEnlargement: true
        }
      ],
      format: WEBP,
      quality: 75
    },
    '480-webp': {
      actions: [
        {
          name: 'resize',
          width: 480,
          withoutEnlargement: true
        }
      ],
      format: WEBP,
      quality: 75
    },
    '960-webp': {
      actions: [
        {
          name: 'resize',
          width: 960,
          withoutEnlargement: true
        }
      ],
      format: WEBP,
      quality: 75
    },
    '1920-webp': {
      actions: [
        {
          name: 'resize',
          width: 1920,
          withoutEnlargement: true
        }
      ],
      format: WEBP,
      quality: 75
    }
  },
  modernizr: {
    classPrefix: '',
    options: ['addTest', 'prefixed', 'setClasses', 'testProp'],
    'feature-detects': ['img/webp', 'svg/clippaths', 'touchevents']
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
          '240-png',
          '480-png',
          '960-png',
          '1920-png',
          '240-webp',
          '480-webp',
          '960-webp',
          '1920-webp'
        ]
      }
    }
  },
  src: {
    css: 'src/css/',
    data: 'src/data/',
    favicon: 'src/favicon/',
    fonts: 'src/fonts/',
    js: 'src/js/',
    svg: 'src/svg/',
    templates: 'src/templates/'
  },
  vendor: {
    paths: [
      'gsap/src/minified/TweenMax.min.js',
      'imagesloaded/imagesloaded.pkgd.min.js',
      'jquery/dist/jquery.slim.min.js',
      'jquery-fitvids/jquery.fitvids.js',
      'magnific-popup/dist',
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
