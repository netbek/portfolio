import Expo from 'gsap/EasePack';
import jQuery from 'jquery/dist/jquery.slim';
import TweenMax from 'gsap/TweenMax';
import parseUrl from './utils/parseUrl';

const SPINNER = false; // TODO Enable after dev
const TRANSITION = false; // TODO Enable after dev

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

    $a.on('click', function(e) {
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

initAnchors();

if (sceneName === 'front') {
  if (!window.Modernizr.touchevents) {
    jQuery('.project a, .project__label', $scene)
      .on('mouseenter.nb focus.nb', function() {
        jQuery(this)
          .closest('.project-list-item')
          .addClass('hover');
      })
      .on('mouseleave.nb blur.nb', function() {
        jQuery(this)
          .closest('.project-list-item')
          .removeClass('hover');
      });
  }

  if (SPINNER) {
    showSpinner();

    $scene.imagesLoaded().always(() => {
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
