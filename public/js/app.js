/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var _EasePack = __webpack_require__(1);

var _EasePack2 = _interopRequireDefault(_EasePack);

var _jquery = __webpack_require__(2);

var _jquery2 = _interopRequireDefault(_jquery);

var _TweenMax = __webpack_require__(3);

var _TweenMax2 = _interopRequireDefault(_TweenMax);

var _front = __webpack_require__(4);

var _front2 = _interopRequireDefault(_front);

var _project = __webpack_require__(5);

var _project2 = _interopRequireDefault(_project);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $body = (0, _jquery2.default)('body');
var $scene = (0, _jquery2.default)('.scene');
var sceneName = $scene.data('scene');

var $doorWrapper = (0, _jquery2.default)('#door-wrapper');
var $doorCover = (0, _jquery2.default)('#door-cover');
var $doorLeft = (0, _jquery2.default)('#door-left');
var $doorRight = (0, _jquery2.default)('#door-right');

var doorAxis = 'X';
var doorSkew = Math.random() < 0.5 ? -30 : 30;

function openPage(cb) {
  _TweenMax2.default.killTweensOf($doorLeft);
  _TweenMax2.default.killTweensOf($doorRight);
  _TweenMax2.default.killTweensOf($doorCover);
  _TweenMax2.default.killTweensOf($doorWrapper);

  _TweenMax2.default.to($doorLeft, 0, {
    css: {
      transform: 'skew' + doorAxis + '(' + doorSkew + 'deg) translate' + doorAxis + '(-49%)'
    }
  });
  _TweenMax2.default.to($doorRight, 0, {
    css: {
      transform: 'skew' + doorAxis + '(' + doorSkew + 'deg) translate' + doorAxis + '(49%)'
    }
  });
  _TweenMax2.default.to($doorCover, 0, {
    css: {
      autoAlpha: 0,
      display: 'none'
    }
  });
  _TweenMax2.default.to($doorLeft, 1, {
    css: {
      transform: 'skew' + doorAxis + '(0deg) translate' + doorAxis + '(-100%)'
    },
    ease: _EasePack2.default.easeOut
  });
  _TweenMax2.default.to($doorRight, 1, {
    css: {
      transform: 'skew' + doorAxis + '(0deg) translate' + doorAxis + '(100%)'
    },
    ease: _EasePack2.default.easeOut,
    onComplete: function onComplete() {
      $doorWrapper.hide();

      if (cb) {
        cb();
      }
    }
  });
}

function closePage(cb) {
  _TweenMax2.default.killTweensOf($doorLeft);
  _TweenMax2.default.killTweensOf($doorRight);
  _TweenMax2.default.killTweensOf($doorCover);
  _TweenMax2.default.killTweensOf($doorWrapper);

  $doorWrapper.show();

  _TweenMax2.default.to($doorLeft, 1, {
    css: {
      transform: 'skew' + doorAxis + '(' + doorSkew + 'deg) translate' + doorAxis + '(-49%)'
    },
    ease: _EasePack2.default.easeOut
  });
  _TweenMax2.default.to($doorRight, 1, {
    css: {
      transform: 'skew' + doorAxis + '(' + doorSkew + 'deg) translate' + doorAxis + '(49%)'
    },
    ease: _EasePack2.default.easeOut,
    onComplete: function onComplete() {
      (0, _jquery2.default)('header, main, footer').hide();

      $body.addClass('closed-page');

      if (cb) {
        setTimeout(cb, 50);
      }
    }
  });
}

if (sceneName === 'front') {
  (0, _front2.default)($scene);
}

openPage();

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = Expo;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = TweenMax;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

exports.__esModule = true;

exports.default = function ($scene) {
  if (!window.Modernizr.touchevents) {
    jQuery('.project a, .project__label', $scene).on('mouseenter.nb focus.nb', function () {
      jQuery(this).closest('.project-list-item').addClass('hover');
    }).on('mouseleave.nb blur.nb', function () {
      jQuery(this).closest('.project-list-item').removeClass('hover');
    });
  }
};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

exports.__esModule = true;

exports.default = function () {
  console.log('project view');
};

/***/ })
/******/ ]);