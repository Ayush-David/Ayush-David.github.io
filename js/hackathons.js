(function () {
  'use strict';

  const track = document.querySelector('.hackathon-track');
  const cards = Array.from(document.querySelectorAll('.hackathon-card'));
  const prevBtn = document.querySelector('.hackathon-prev');
  const nextBtn = document.querySelector('.hackathon-next');
  const dotsEl = document.querySelector('.hackathon-dots');

  if (!track || !cards.length || !prevBtn || !nextBtn || !dotsEl) return;

  dotsEl.innerHTML = '';
  const dots = cards.map((_, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'hackathon-dot' + (index === 0 ? ' hackathon-dot--active' : '');
    button.setAttribute('aria-label', `Go to hackathon ${index + 1}`);
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
    dots.forEach((dot, index) => dot.classList.toggle('hackathon-dot--active', index === current));
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