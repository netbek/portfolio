(function () {
  // Try to detect touchscreen device
  Modernizr.addTest('touchevents', function () {
    return (
      // https://github.com/Modernizr/Modernizr/blob/v3.12.0/feature-detects/touchevents.js
      ('ontouchstart' in window ||
        window.TouchEvent ||
        (window.DocumentTouch && document instanceof DocumentTouch)) &&
      // https://stackoverflow.com/a/4819886
      (('maxTouchPoints' in navigator && navigator.maxTouchPoints > 0) ||
        ('msMaxTouchPoints' in navigator && navigator.msMaxTouchPoints > 0))
    );
  });
})();
