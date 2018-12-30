export default $scene => {
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
};
