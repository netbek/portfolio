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

var _parseUrl3 = __webpack_require__(4);

var _parseUrl4 = _interopRequireDefault(_parseUrl3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SPINNER = false;
var TRANSITION = false;
var _parseUrl = (0, _parseUrl4.default)(window.location.href),
    localhost = _parseUrl.hostNorm;

var $html = (0, _jquery2.default)('html');
var $body = (0, _jquery2.default)('body');
var $scene = (0, _jquery2.default)('.scene');
var sceneName = $scene.data('scene');

var $spinner = (0, _jquery2.default)('#spinner');
var $doorWrapper = (0, _jquery2.default)('#door-wrapper');
var $doorCover = (0, _jquery2.default)('#door-cover');
var $doorLeft = (0, _jquery2.default)('#door-left');
var $doorRight = (0, _jquery2.default)('#door-right');
var doorAxis = 'X';
var doorSkew = Math.random() < 0.5 ? -25 : 25;

function showSpinner() {
  _TweenMax2.default.killTweensOf($spinner);

  _TweenMax2.default.to($spinner, 0, {
    autoAlpha: 0
  });

  _TweenMax2.default.to($spinner, 0.3, {
    autoAlpha: 1
  });
}

function hideSpinner(cb) {
  _TweenMax2.default.killTweensOf($spinner);

  _TweenMax2.default.to($spinner, 0.3, {
    delay: 0.3,
    autoAlpha: 0,
    onComplete: cb
  });
}

function openPage(cb) {
  if (TRANSITION) {
    _TweenMax2.default.killTweensOf($doorLeft);
    _TweenMax2.default.killTweensOf($doorRight);
    _TweenMax2.default.killTweensOf($doorCover);
    _TweenMax2.default.killTweensOf($doorWrapper);

    $html.scrollTop(0);
    $body.scrollTop(0).css('overflow', 'auto');

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
  } else {
    $doorWrapper.hide();

    if (cb) {
      cb();
    }
  }
}

function closePage(cb) {
  if (TRANSITION) {
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
  } else {
    if (cb) {
      cb();
    }
  }
}

function initAnchors() {
  (0, _jquery2.default)('a').each(function (i, elm) {
    var $a = (0, _jquery2.default)(elm);
    var href = ($a.attr('href') || '').toLowerCase();
    var target = ($a.attr('target') || '').toLowerCase();

    if (~href.indexOf('javascript:') || ~href.indexOf('mailto:') || target && target !== '_self') {
      $a.data('pageTransition', false);
    } else {
      var _parseUrl2 = (0, _parseUrl4.default)(href),
          host = _parseUrl2.hostNorm,
          path = _parseUrl2.path;

      if (host) {
        if (host === localhost) {
          $a.data('pageTransition', true);
        } else {
          $a.data('pageTransition', false).attr('target', '_blank');
        }
      } else if (path === undefined || path === '') {
        $a.data('pageTransition', false);
      } else {
        $a.data('pageTransition', true);
      }
    }

    $a.on('click', function (e) {
      var $this = (0, _jquery2.default)(this);

      if ($this.data('pageTransition')) {
        e.preventDefault();

        var _href = $this.attr('href');

        closePage(function () {
          window.location.href = _href;
        });
      }
    });
  });
}

initAnchors();

if (sceneName === 'front') {
  if (!window.Modernizr.touchevents) {
    (0, _jquery2.default)('.project a, .project__label', $scene).on('mouseenter.nb focus.nb', function () {
      (0, _jquery2.default)(this).closest('.project-list-item').addClass('hover');
    }).on('mouseleave.nb blur.nb', function () {
      (0, _jquery2.default)(this).closest('.project-list-item').removeClass('hover');
    });
  }

  if (SPINNER) {
    showSpinner();

    $scene.imagesLoaded().always(function () {
      hideSpinner(openPage);
    });
  } else {
    openPage();
  }
} else if (sceneName === 'work') {
  openPage();
} else {
  openPage();
}

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


var re = /^(?:([^:\/?#]+):)?(?:\/\/()(?:(?:()(?:([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?()(?:(()(?:(?:[^?#\/]*\/)*)()(?:[^?#]*))(?:\?([^#]*))?(?:#(.*))?)/;

exports.default = function (url) {
  var matches = re.exec(url);

  if (!matches || !matches.length) {
    return undefined;
  }

  var source = matches[0],
      scheme = matches[1],
      authority = matches[2],
      userInfo = matches[3],
      user = matches[4],
      pass = matches[5],
      host = matches[6],
      port = matches[7],
      relative = matches[8],
      path = matches[9],
      directory = matches[10],
      file = matches[11],
      query = matches[12],
      fragment = matches[13];


  var hostNorm = (host || '').toLowerCase().replace(/^www\./, '');

  return {
    scheme: scheme,
    authority: authority,
    userInfo: userInfo,
    user: user,
    pass: pass,
    host: host,
    hostNorm: hostNorm,
    port: port,
    relative: relative,
    path: path,
    directory: directory,
    file: file,
    query: query,
    fragment: fragment
  };
};

/***/ })
/******/ ]);