(function () {
  'use strict';

  const track = document.querySelector('.cert-track');
  const cards = Array.from(document.querySelectorAll('.cert-card'));
  const prevBtn = document.querySelector('.cert-prev');
  const nextBtn = document.querySelector('.cert-next');
  const dotsEl = document.querySelector('.cert-dots');

  if (!track || !cards.length || !prevBtn || !nextBtn || !dotsEl) return;

  const toPlaceholder = (label) => {
    const safeLabel = label.replace(/[<>&"]/g, '').slice(0, 36) || 'Certificate';
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="560" height="320" viewBox="0 0 560 320"><rect width="560" height="320" fill="#f3f4f6"/><rect x="18" y="18" width="524" height="284" rx="16" fill="#ffffff" stroke="#e5e7eb"/><text x="280" y="142" text-anchor="middle" fill="#111827" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="600">${safeLabel}</text><text x="280" y="176" text-anchor="middle" fill="#6b7280" font-family="Inter, Arial, sans-serif" font-size="14">Image pending</text></svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  };

  cards.forEach((card) => {
    const img = card.querySelector('.cert-card-img');
    if (!img) return;
    const applyFallback = () => {
      if (img.dataset.placeholderApplied === '1') return;
      img.dataset.placeholderApplied = '1';
      img.src = toPlaceholder(card.querySelector('.cert-card-title')?.textContent?.trim() || 'Certificate');
    };
    img.addEventListener('error', applyFallback);
    if (img.complete && img.naturalWidth === 0) applyFallback();
  });

  dotsEl.innerHTML = '';
  const dots = cards.map((_, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'cert-dot' + (index === 0 ? ' cert-dot--active' : '');
    button.setAttribute('aria-label', `Go to certificate ${index + 1}`);
    button.addEventListener('click', () => goTo(index));
    dotsEl.appendChild(button);
    return button;
  });

  let current = 0;

  function visibleCount() {
    if (window.innerWidth >= 900) return 3;
    if (window.innerWidth >= 600) return 2;
    return 1;
  }

  function maxIndex() {
    return Math.max(0, cards.length - visibleCount());
  }

  function goTo(index) {
    current = Math.max(0, Math.min(index, maxIndex()));
    const gap = parseFloat(getComputedStyle(track).gap) || 16;
    const cardWidth = cards[0].offsetWidth + gap;
    track.style.transform = `translateX(-${current * cardWidth}px)`;
    dots.forEach((dot, index) => dot.classList.toggle('cert-dot--active', index === current));
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === maxIndex();
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  let startX = 0;
  track.addEventListener('touchstart', (event) => { startX = event.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', (event) => {
    const dx = event.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) goTo(dx < 0 ? current + 1 : current - 1);
  }, { passive: true });

  window.addEventListener('resize', () => goTo(Math.min(current, maxIndex())));
  goTo(0);
})();