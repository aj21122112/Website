
function cycleFonts(el, fonts, interval = 900) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let i = 0;
  setInterval(() => {
    i = (i + 1) % fonts.length;
    el.style.fontFamily = fonts[i];
  }, interval);
}

document.querySelectorAll("h1[data-font-cycle]").forEach((h1) => {
  cycleFonts(h1, [
    '"Playfair Display", Georgia, serif',
    'monospace',
    'cursive',
    'Impact, sans-serif',
    '"Bradley Hand", fantasy',
    'Luminari, fantasy',
    '"Brush Script MT", "Brush Script Std"',
    '"Marker Felt", fantasy',
    'Trattatello, fantasy'

  ]);
});


