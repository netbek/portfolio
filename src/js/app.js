import Expo from 'gsap/EasePack';
import jQuery from 'jquery/dist/jquery.slim';
import TweenMax from 'gsap/TweenMax';
import frontScene from './scenes/front';
import projectScene from './scenes/project';

const $body = jQuery('body');
const $scene = jQuery('.scene');
const sceneName = $scene.data('scene');

// The Doors
const $doorWrapper = jQuery('#door-wrapper');
const $doorCover = jQuery('#door-cover');
const $doorLeft = jQuery('#door-left');
const $doorRight = jQuery('#door-right');

const doorAxis = 'X';
const doorSkew = Math.random() < 0.5 ? -30 : 30;

function openPage(cb) {
  TweenMax.killTweensOf($doorLeft);
  TweenMax.killTweensOf($doorRight);
  TweenMax.killTweensOf($doorCover);
  TweenMax.killTweensOf($doorWrapper);

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
}

function closePage(cb) {
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
}

if (sceneName === 'front') {
  frontScene($scene);
}

openPage();
