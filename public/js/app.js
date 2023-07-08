/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 708:
/***/ (function(__unused_webpack_module, exports) {



exports.__esModule = true;
exports["default"] = void 0;
var re = /^(?:([^:\/?#]+):)?(?:\/\/()(?:(?:()(?:([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?()(?:(()(?:(?:[^?#\/]*\/)*)()(?:[^?#]*))(?:\?([^#]*))?(?:#(.*))?)/;
var _default = function _default(url) {
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
exports["default"] = _default;

/***/ }),

/***/ 996:
/***/ (function(module) {

module.exports = Expo;

/***/ }),

/***/ 270:
/***/ (function(module) {

module.exports = TweenMax;

/***/ }),

/***/ 311:
/***/ (function(module) {

module.exports = jQuery;

/***/ }),

/***/ 304:
/***/ (function(module) {

module.exports = picturefill;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {


var _EasePack = _interopRequireDefault(__webpack_require__(996));
var _jquery = _interopRequireDefault(__webpack_require__(311));
var _TweenMax = _interopRequireDefault(__webpack_require__(270));
var _picturefill = _interopRequireDefault(__webpack_require__(304));
var _parseUrl3 = _interopRequireDefault(__webpack_require__(708));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var SPINNER = true;
var TRANSITION = true;
var _parseUrl = (0, _parseUrl3["default"])(window.location.href),
  localhost = _parseUrl.hostNorm;
var $html = (0, _jquery["default"])('html');
var $body = (0, _jquery["default"])('body');
var $scene = (0, _jquery["default"])('.scene');
var sceneName = $scene.data('scene');
var $spinner = (0, _jquery["default"])('#spinner');
var $doorWrapper = (0, _jquery["default"])('#door-wrapper');
var $doorCover = (0, _jquery["default"])('#door-cover');
var $doorLeft = (0, _jquery["default"])('#door-left');
var $doorRight = (0, _jquery["default"])('#door-right');
var doorAxis = 'X';
var doorSkew = Math.random() < 0.5 ? -25 : 25;
var loadTimeout;
function isLoaded() {
  return !!window.Expo && !!window.jQuery && !!window.jQuery.fn && !!window.jQuery.fn.fitVids && !!window.jQuery.fn.imagesLoaded && !!window.jQuery.fn.magnificPopup && !!window.Modernizr && !!window.picturefill && !!window.TweenMax;
}
function onLoad(cb) {
  loadTimeout = setTimeout(function () {
    if (isLoaded()) {
      cb();
    } else {
      clearTimeout(loadTimeout);
      onLoad(cb);
    }
  }, 1000 / 60);
}
function randomizeSpinner() {
  $spinner.removeClass('spinner--xy spinner--yx').addClass(Math.random() <= 0.5 ? 'spinner--xy' : 'spinner--yx');
}
function showSpinner() {
  _TweenMax["default"].killTweensOf($spinner);
  _TweenMax["default"].to($spinner, 0, {
    autoAlpha: 0
  });
  _TweenMax["default"].to($spinner, 0.3, {
    autoAlpha: 1
  });
}
function hideSpinner(cb) {
  _TweenMax["default"].killTweensOf($spinner);
  _TweenMax["default"].to($spinner, 0.3, {
    delay: 0.3,
    autoAlpha: 0,
    onComplete: cb
  });
}
function openPage(cb) {
  if (TRANSITION) {
    _TweenMax["default"].killTweensOf($doorLeft);
    _TweenMax["default"].killTweensOf($doorRight);
    _TweenMax["default"].killTweensOf($doorCover);
    _TweenMax["default"].killTweensOf($doorWrapper);
    $html.scrollTop(0);
    $body.scrollTop(0).css('overflow', 'auto');
    _TweenMax["default"].to($doorLeft, 0, {
      css: {
        transform: 'skew' + doorAxis + '(' + doorSkew + 'deg) translate' + doorAxis + '(-49%)'
      }
    });
    _TweenMax["default"].to($doorRight, 0, {
      css: {
        transform: 'skew' + doorAxis + '(' + doorSkew + 'deg) translate' + doorAxis + '(49%)'
      }
    });
    _TweenMax["default"].to($doorCover, 0, {
      css: {
        autoAlpha: 0,
        display: 'none'
      }
    });
    _TweenMax["default"].to($doorLeft, 1, {
      css: {
        transform: 'skew' + doorAxis + '(0deg) translate' + doorAxis + '(-100%)'
      },
      ease: _EasePack["default"].easeOut
    });
    _TweenMax["default"].to($doorRight, 1, {
      css: {
        transform: 'skew' + doorAxis + '(0deg) translate' + doorAxis + '(100%)'
      },
      ease: _EasePack["default"].easeOut,
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
    _TweenMax["default"].killTweensOf($doorLeft);
    _TweenMax["default"].killTweensOf($doorRight);
    _TweenMax["default"].killTweensOf($doorCover);
    _TweenMax["default"].killTweensOf($doorWrapper);
    $doorWrapper.show();
    _TweenMax["default"].to($doorLeft, 1, {
      css: {
        transform: 'skew' + doorAxis + '(' + doorSkew + 'deg) translate' + doorAxis + '(-49%)'
      },
      ease: _EasePack["default"].easeOut
    });
    _TweenMax["default"].to($doorRight, 1, {
      css: {
        transform: 'skew' + doorAxis + '(' + doorSkew + 'deg) translate' + doorAxis + '(49%)'
      },
      ease: _EasePack["default"].easeOut,
      onComplete: function onComplete() {
        (0, _jquery["default"])('header, main, footer').hide();
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
  (0, _jquery["default"])('a').each(function (i, elm) {
    var $a = (0, _jquery["default"])(elm);
    var href = ($a.attr('href') || '').toLowerCase();
    var target = ($a.attr('target') || '').toLowerCase();
    if (~href.indexOf('javascript:') || ~href.indexOf('mailto:') || target && target !== '_self') {
      $a.data('pageTransition', false);
    } else {
      var _parseUrl2 = (0, _parseUrl3["default"])(href),
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
      var $this = (0, _jquery["default"])(this);
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
onLoad(function () {
  initAnchors();
  if (sceneName === 'front') {
    if (!window.Modernizr.touchevents) {
      (0, _jquery["default"])('.project a, .project__label', $scene).on('mouseenter.nb focus.nb', function () {
        (0, _jquery["default"])(this).closest('.project-list-item').addClass('hover');
      }).on('mouseleave.nb blur.nb', function () {
        (0, _jquery["default"])(this).closest('.project-list-item').removeClass('hover');
      });
    }
    (0, _jquery["default"])('.project__label', $scene).on('click', function () {
      var href = (0, _jquery["default"])(this).closest('.project').find('.project__thumb a').attr('href');
      window.location.href = href;
    });
    if (SPINNER) {
      randomizeSpinner();
      showSpinner();
      $scene.imagesLoaded().always(function () {
        hideSpinner(openPage);
      });
    } else {
      openPage();
    }
  } else if (sceneName === 'work') {
    (0, _jquery["default"])('.frame__svg').magnificPopup({
      type: 'image',
      closeMarkup: '<button title="%title%" type="button" class="mfp-close"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="icon icon-ios-close"><path d="M278.6 256l68.2-68.2c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-68.2-68.2c-6.2-6.2-16.4-6.2-22.6 0-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3l68.2 68.2-68.2 68.2c-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3 6.2 6.2 16.4 6.2 22.6 0l68.2-68.2 68.2 68.2c6.2 6.2 16.4 6.2 22.6 0 6.2-6.2 6.2-16.4 0-22.6L278.6 256z"></path></svg></button>',
      retina: {
        ratio: window.devicePixelRatio,
        replaceSrc: function replaceSrc(item, ratio) {
          var $elm = (0, _jquery["default"])(item.el);
          var src = $elm.data('mfpSrc');
          var srcset = $elm.data('mfpSrcset');
          var candidates = _picturefill["default"]._.parseSet({
            srcset: srcset
          }).filter(function (s) {
            return s.d <= ratio;
          });
          var bestCandidates = candidates.filter(function (s) {
            return s.d >= ratio;
          });
          var result;
          if (bestCandidates.length) {
            result = bestCandidates[0].url;
          } else if (candidates.length) {
            result = candidates[candidates.length - 1].url;
          } else {
            result = src;
          }
          return result;
        }
      }
    });
    (0, _jquery["default"])('iframe[src*="youtube"]').parent().fitVids();
    if (SPINNER) {
      randomizeSpinner();
      showSpinner();
      $scene.imagesLoaded().always(function () {
        hideSpinner(openPage);
      });
    } else {
      openPage();
    }
  } else {
    openPage();
  }
});
}();
/******/ })()
;