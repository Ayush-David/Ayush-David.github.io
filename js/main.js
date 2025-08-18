// Main site interactions: nav toggle, smooth scroll, year, progress bars
document.addEventListener('DOMContentLoaded',function(){
  // year
  document.getElementById('year').textContent = new Date().getFullYear();

  // nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const siteNav = document.getElementById('site-nav');
  navToggle && navToggle.addEventListener('click',()=>siteNav.classList.toggle('open'));

  // smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',function(e){
      const href = this.getAttribute('href');
      if(href.startsWith('#')){
        e.preventDefault();
        const el = document.querySelector(href);
        if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
        siteNav.classList.remove('open');
      }
    })
  })

  // animate skill bars
  document.querySelectorAll('.progress').forEach(p=>{
    const level = p.dataset.level || 50;
    const inner = p.querySelector('span');
    requestAnimationFrame(()=>{ inner.style.width = level + '%'; });
  });

  // contact form handling (no backend in this branch)
  const form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const msg = form.message.value.trim();
      if(!name || !email || !msg){
        alert('Please complete all fields.');
        return;
      }
      // Fallback: open user's email client with prefilled subject and body
      const subject = encodeURIComponent(`Contact from portfolio: ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${msg}`);
      window.location.href = `mailto:ayushr@karunya.edu.in?subject=${subject}&body=${body}`;
      form.reset();
    })
  }

  // Reveal phone button wiring
  const reveal = document.getElementById('reveal-phone');
  const reveal2 = document.getElementById('reveal-phone-2');
  function fetchPhone(btn){
    // No server in this branch — reveal a static message or data attribute
    const phoneEl = document.getElementById('phone-mask');
    const staticPhone = phoneEl && phoneEl.dataset.phone;
    if(staticPhone){
      phoneEl.textContent = staticPhone;
      btn.style.display = 'none';
      return;
    }
    alert('Phone not available in this branch. Please contact via email.');
  }
  reveal && reveal.addEventListener('click',()=>fetchPhone(reveal));
  reveal2 && reveal2.addEventListener('click',()=>fetchPhone(reveal2));
});
