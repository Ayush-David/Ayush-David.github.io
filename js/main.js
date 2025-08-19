// Enhanced main site interactions with animations
document.addEventListener('DOMContentLoaded', function() {
  // Set current year
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Enhanced nav toggle with animation
  const navToggle = document.getElementById('nav-toggle');
  const siteNav = document.getElementById('site-nav');
  
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      siteNav.classList.toggle('open');
      navToggle.classList.toggle('active');
      
      // Animate hamburger bars
      const spans = navToggle.querySelectorAll('span');
      if (navToggle.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }

  // Enhanced smooth scroll with easing
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
          // Close mobile menu if open
          siteNav?.classList.remove('open');
          navToggle?.classList.remove('active');
          
          // Reset hamburger animation
          const spans = navToggle?.querySelectorAll('span');
          if (spans) {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
          }
          
          // Smooth scroll with offset for fixed header
          const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
          const targetPosition = target.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Enhanced skill bar animations with intersection observer
  const skillBars = document.querySelectorAll('.progress');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target;
        const level = progressBar.dataset.level || 50;
        const inner = progressBar.querySelector('span');
        
        if (inner) {
          // Add stagger delay based on position
          const delay = Array.from(skillBars).indexOf(progressBar) * 200;
          
          setTimeout(() => {
            inner.style.width = level + '%';
            
            // Add glow effect
            inner.style.boxShadow = `0 0 10px var(--accent)`;
            setTimeout(() => {
              inner.style.boxShadow = 'none';
            }, 1000);
          }, delay);
        }
        
        skillObserver.unobserve(progressBar);
      }
    });
  }, { threshold: 0.5 });
  
  skillBars.forEach(bar => skillObserver.observe(bar));

  // Enhanced contact form handling
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(form);
      const name = formData.get('name')?.trim();
      const email = formData.get('email')?.trim();
      const message = formData.get('message')?.trim();
      
      // Enhanced validation with visual feedback
      const inputs = form.querySelectorAll('input, textarea');
      let isValid = true;
      
      inputs.forEach(input => {
        const value = input.value.trim();
        input.classList.remove('error', 'success');
        
        if (!value) {
          input.classList.add('error');
          isValid = false;
          
          // Shake animation
          input.style.animation = 'shake 0.5s ease-in-out';
          setTimeout(() => {
            input.style.animation = '';
          }, 500);
        } else {
          input.classList.add('success');
        }
      });
      
      if (!isValid) {
        showNotification('Please fill in all fields', 'error');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        const emailInput = form.querySelector('input[type="email"]');
        emailInput.classList.add('error');
        showNotification('Please enter a valid email address', 'error');
        return;
      }
      
      // Success feedback
      showNotification('Opening email client...', 'success');
      
      // Fallback: open user's email client with prefilled content
      const subject = encodeURIComponent(`Portfolio Contact: ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      window.location.href = `mailto:ayushr@karunya.edu.in?subject=${subject}&body=${body}`;
      
      // Reset form with animation
      setTimeout(() => {
        form.reset();
        inputs.forEach(input => {
          input.classList.remove('error', 'success');
        });
      }, 1000);
    });
    
    // Real-time validation feedback
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', function() {
        this.classList.remove('error', 'success');
        
        if (this.value.trim()) {
          this.classList.add('success');
        }
      });
      
      input.addEventListener('focus', function() {
        this.classList.remove('error');
      });
    });
  }

  // Phone reveal functionality with animation
  const phoneButtons = document.querySelectorAll('#reveal-phone, #reveal-phone-2');
  phoneButtons.forEach(button => {
    button.addEventListener('click', function() {
      const phoneMask = document.getElementById('phone-mask');
      const phoneNumber = phoneMask.dataset.phone;
      
      if (phoneNumber) {
        // Animate reveal
        phoneMask.style.transition = 'all 0.3s ease';
        phoneMask.style.opacity = '0';
        
        setTimeout(() => {
          phoneMask.textContent = phoneNumber;
          phoneMask.style.opacity = '1';
          
          // Hide button with fade
          this.style.transition = 'all 0.3s ease';
          this.style.opacity = '0';
          setTimeout(() => {
            this.style.display = 'none';
          }, 300);
        }, 300);
      } else {
        showNotification('Phone number not configured', 'info');
      }
    });
  });

  // Enhanced scroll animations
  initScrollAnimations();
  
  // Initialize parallax scroll effects
  initParallaxScroll();
  
  // Professional subtitle animation
  initProfessionalAnimations();
  
  // Back to top button
  initBackToTop();
});

// Notification system
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <span>${message}</span>
    <button onclick="this.parentElement.remove()">&times;</button>
  `;
  
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--card);
    color: var(--text);
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 20px var(--shadow);
    border-left: 4px solid var(--accent);
    z-index: 1000;
    display: flex;
    align-items: center;
    gap: 1rem;
    max-width: 300px;
    animation: slideIn 0.3s ease;
  `;
  
  if (type === 'error') {
    notification.style.borderLeftColor = '#ef4444';
  } else if (type === 'success') {
    notification.style.borderLeftColor = '#10b981';
  }
  
  document.body.appendChild(notification);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 5000);
}

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
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
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
