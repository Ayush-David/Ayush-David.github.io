document.addEventListener('DOMContentLoaded', () => {
  const sections = [...document.querySelectorAll('main section[id]')];
  const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
  const linkById = new Map(navLinks.map(link => [link.getAttribute('href').slice(1), link]));

  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    navLinks.forEach(link => link.classList.remove('active'));
    const active = linkById.get(visible.target.id);
    if (active) active.classList.add('active');
  }, { rootMargin: '-35% 0px -55% 0px', threshold: [0.15, 0.3, 0.6] });

  sections.forEach(section => observer.observe(section));
  // Initialize UI enhancements
  try {
    initScrollAnimations();
    initProfessionalAnimations();
    initParallaxScroll();
    initBackToTop();
  } catch (e) {
    // non-fatal
    console.warn('UI init error', e);
  }

  // Hamburger visual toggle for small screens
  const navToggle = document.getElementById('nav-toggle');
  const hamburger = document.querySelector('.hamburger');
  if (navToggle && hamburger) {
    navToggle.addEventListener('change', () => {
      if (navToggle.checked) hamburger.classList.add('active');
      else hamburger.classList.remove('active');
    });
  }
});

// Enhanced scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe sections for fade-in animation
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.6s ease';
    observer.observe(section);
  });
}

// Professional animations for CV engineer portfolio
function initProfessionalAnimations() {
  const subtitle = document.querySelector('.hero-subtitle');
  if (subtitle) {
    // Subtle fade-in with professional timing
    subtitle.style.opacity = '0';
    subtitle.style.transform = 'translateY(10px)';
    subtitle.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    
    setTimeout(() => {
      subtitle.style.opacity = '1';
      subtitle.style.transform = 'translateY(0)';
    }, 800);
  }
  
  // Professional project card interactions
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const img = card.querySelector('img');
      if (img) {
        img.style.filter = 'brightness(1.1) contrast(1.05)';
      }
    });
    
    card.addEventListener('mouseleave', () => {
      const img = card.querySelector('img');
      if (img) {
        img.style.filter = 'none';
      }
    });
  });
}

// Back to top functionality
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;
  
  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.style.display = 'inline-flex';
    } else {
      backToTopBtn.style.display = 'none';
    }
  });
  
  // Smooth scroll to top
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Parallax scroll effects
function initParallaxScroll() {
  let ticking = false;
  
  function updateParallax() {
    const scrolled = window.pageYOffset;
    
    // Hero parallax
    const hero = document.querySelector('.hero');
    if (hero) {
      const rate = scrolled * 0.5;
      hero.style.transform = `translateY(${rate}px)`;
    }
    
    // Floating elements
    const floatingElements = document.querySelectorAll('.hero-media img');
    floatingElements.forEach(el => {
      const rate = scrolled * 0.3;
      el.style.transform = `translateY(${rate}px)`;
    });
    
    ticking = false;
  }
  
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', requestTick);
}

// Add CSS animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
  
  @keyframes glow {
    0%, 100% { box-shadow: 0 0 5px var(--accent); }
    50% { box-shadow: 0 0 20px var(--accent), 0 0 30px var(--accent); }
  }
  
  .notification button {
    background: none;
    border: none;
    color: var(--muted);
    cursor: pointer;
    font-size: 1.2rem;
    padding: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .notification button:hover {
    color: var(--text);
  }
  
  input.error, textarea.error {
    border-color: #ef4444 !important;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
  }
  
  input.success, textarea.success {
    border-color: #10b981 !important;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1) !important;
  }
  
  .hamburger.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }
  
  .hamburger.active span:nth-child(2) {
    opacity: 0;
  }
  
  .hamburger.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
  }
`;

document.head.appendChild(animationStyles);
