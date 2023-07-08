import Expo from 'gsap/EasePack';
import jQuery from 'jquery/dist/jquery.slim';
import TweenMax from 'gsap/TweenMax';
import picturefill from 'picturefill/dist/picturefill';
import parseUrl from './utils/parseUrl';

const SPINNER = true;
const TRANSITION = true;

const {hostNorm: localhost} = parseUrl(window.location.href);

const $html = jQuery('html');
const $body = jQuery('body');
const $scene = jQuery('.scene');
const sceneName = $scene.data('scene');

const $spinner = jQuery('#spinner');
const $doorWrapper = jQuery('#door-wrapper');
const $doorCover = jQuery('#door-cover');
const $doorLeft = jQuery('#door-left');
const $doorRight = jQuery('#door-right');
const doorAxis = 'X';
const doorSkew = Math.random() < 0.5 ? -25 : 25;

let loadTimeout;

function isLoaded() {
  return (
    !!window.Expo &&
    !!window.jQuery &&
    !!window.jQuery.fn &&
    !!window.jQuery.fn.fitVids &&
    !!window.jQuery.fn.imagesLoaded &&
    !!window.jQuery.fn.magnificPopup &&
    !!window.Modernizr &&
    !!window.picturefill &&
    !!window.TweenMax
  );
}

function onLoad(cb) {
  loadTimeout = setTimeout(() => {
    if (isLoaded()) {
      cb();
    } else {
      clearTimeout(loadTimeout);
      onLoad(cb);
    }
  }, 1000 / 60);
}

function randomizeSpinner() {
  $spinner
    .removeClass('spinner--xy spinner--yx')
    .addClass(Math.random() <= 0.5 ? 'spinner--xy' : 'spinner--yx');
}

function showSpinner() {
  TweenMax.killTweensOf($spinner);

  TweenMax.to($spinner, 0, {
    autoAlpha: 0
  });

  TweenMax.to($spinner, 0.3, {
    autoAlpha: 1
  });
}

function hideSpinner(cb) {
  TweenMax.killTweensOf($spinner);

  TweenMax.to($spinner, 0.3, {
    delay: 0.3,
    autoAlpha: 0,
    onComplete: cb
  });
}

function openPage(cb) {
  if (TRANSITION) {
    TweenMax.killTweensOf($doorLeft);
    TweenMax.killTweensOf($doorRight);
    TweenMax.killTweensOf($doorCover);
    TweenMax.killTweensOf($doorWrapper);

    $html.scrollTop(0);
    $body.scrollTop(0).css('overflow', 'auto');

    TweenMax.to($doorLeft, 0, {
      css: {
        transform:
          'skew' +
          doorAxis +
          '(' +
          doorSkew +
          'deg) translate' +
          doorAxis +
          '(-49%)'
      }
    });
    TweenMax.to($doorRight, 0, {
      css: {
        transform:
          'skew' +
          doorAxis +
          '(' +
          doorSkew +
          'deg) translate' +
          doorAxis +
          '(49%)'
      }
    });
    TweenMax.to($doorCover, 0, {
      css: {
        autoAlpha: 0,
        display: 'none'
      }
    });
    TweenMax.to($doorLeft, 1, {
      css: {
        transform: 'skew' + doorAxis + '(0deg) translate' + doorAxis + '(-100%)'
      },
      ease: Expo.easeOut
    });
    TweenMax.to($doorRight, 1, {
      css: {
        transform: 'skew' + doorAxis + '(0deg) translate' + doorAxis + '(100%)'
      },
      ease: Expo.easeOut,
      onComplete: () => {
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
    TweenMax.killTweensOf($doorLeft);
    TweenMax.killTweensOf($doorRight);
    TweenMax.killTweensOf($doorCover);
    TweenMax.killTweensOf($doorWrapper);

    $doorWrapper.show();

    TweenMax.to($doorLeft, 1, {
      css: {
        transform:
          'skew' +
          doorAxis +
          '(' +
          doorSkew +
          'deg) translate' +
          doorAxis +
          '(-49%)'
      },
      ease: Expo.easeOut
    });
    TweenMax.to($doorRight, 1, {
      css: {
        transform:
          'skew' +
          doorAxis +
          '(' +
          doorSkew +
          'deg) translate' +
          doorAxis +
          '(49%)'
      },
      ease: Expo.easeOut,
      onComplete: () => {
        // Hide page content. Workaround for flash of content before loading next page on iOS.
        jQuery('header, main, footer').hide();

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
  jQuery('a').each((i, elm) => {
    const $a = jQuery(elm);
    const href = ($a.attr('href') || '').toLowerCase();
    const target = ($a.attr('target') || '').toLowerCase();

    if (
      ~href.indexOf('javascript:') ||
      ~href.indexOf('mailto:') ||
      (target && target !== '_self')
    ) {
      $a.data('pageTransition', false);
    } else {
      const {hostNorm: host, path} = parseUrl(href);

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
      const $this = jQuery(this);

      if ($this.data('pageTransition')) {
        e.preventDefault();

        const href = $this.attr('href');

        closePage(() => {
          window.location.href = href;
        });
      }
    });
  });
}

// Init page

onLoad(() => {
  initAnchors();

  if (sceneName === 'front') {
    if (!window.Modernizr.touchevents) {
      jQuery('.project a, .project__label', $scene)
        .on('mouseenter.nb focus.nb', function () {
          jQuery(this).closest('.project-list-item').addClass('hover');
        })
        .on('mouseleave.nb blur.nb', function () {
          jQuery(this).closest('.project-list-item').removeClass('hover');
        });
    }

    jQuery('.project__label', $scene).on('click', function () {
      const href = jQuery(this)
        .closest('.project')
        .find('.project__thumb a')
        .attr('href');

      window.location.href = href;
    });

    if (SPINNER) {
      randomizeSpinner();
      showSpinner();

      $scene.imagesLoaded().always(() => {
        hideSpinner(openPage);
      });
    } else {
      openPage();
    }
  } else if (sceneName === 'work') {
    jQuery('.frame__svg').magnificPopup({
      type: 'image',
      closeMarkup:
        '<button title="%title%" type="button" class="mfp-close"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="icon icon-ios-close"><path d="M278.6 256l68.2-68.2c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-68.2-68.2c-6.2-6.2-16.4-6.2-22.6 0-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3l68.2 68.2-68.2 68.2c-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3 6.2 6.2 16.4 6.2 22.6 0l68.2-68.2 68.2 68.2c6.2 6.2 16.4 6.2 22.6 0 6.2-6.2 6.2-16.4 0-22.6L278.6 256z"></path></svg></button>',
      retina: {
        ratio: window.devicePixelRatio,
        replaceSrc: (item, ratio) => {
          const $elm = jQuery(item.el);
          const src = $elm.data('mfpSrc');
          const srcset = $elm.data('mfpSrcset');
          const candidates = picturefill._.parseSet({srcset}).filter(
            (s) => s.d <= ratio
          );
          const bestCandidates = candidates.filter((s) => s.d >= ratio);

          let result;
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

    jQuery('iframe[src*="youtube"]').parent().fitVids();

    if (SPINNER) {
      randomizeSpinner();
      showSpinner();

      $scene.imagesLoaded().always(() => {
        hideSpinner(openPage);
      });
    } else {
      openPage();
    }
  } else {
    openPage();
  }
});
