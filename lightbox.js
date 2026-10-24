(function () {
  var images = document.querySelectorAll('.content img');
  if (!images.length) return;

  // Build the overlay once
  var overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Expanded image');
  overlay.setAttribute('aria-hidden', 'true');
  overlay.innerHTML =
    '<button class="lightbox-close" type="button" aria-label="Close expanded image">&times;</button>' +
    '<img class="lightbox-img" alt="">' +
    '<p class="lightbox-caption"></p>';
  document.body.appendChild(overlay);

  var bigImg = overlay.querySelector('.lightbox-img');
  var caption = overlay.querySelector('.lightbox-caption');
  var closeBtn = overlay.querySelector('.lightbox-close');
  var lastFocused = null;

  function openLightbox(img) {
    lastFocused = document.activeElement;
    bigImg.src = img.currentSrc || img.src;
    bigImg.alt = img.alt || '';

    var fig = img.closest('figure');
    var figcap = fig && fig.querySelector('figcaption');
    caption.textContent = figcap ? figcap.textContent : '';

    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';   // stop the page scrolling behind it
    closeBtn.focus();
  }

  function closeLightbox() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  images.forEach(function (img) {
    img.tabIndex = 0;                          // keyboard users can reach it
    img.addEventListener('click', function (e) {
      e.preventDefault();                      // stops linked images (e.g. certificates) from navigating
      openLightbox(img);
    });
    img.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(img);
      }
    });
  });

  closeBtn.addEventListener('click', closeLightbox);

  // Clicking the dark backdrop (but not the image itself) also closes it
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
      closeLightbox();
    }
  });
})();