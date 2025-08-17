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

  // contact form validation (front-end only)
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
      // Instruct user about backend option
      alert('Thank you! This form is front-end only. Connect a backend or service (Formspree, Netlify) to receive messages.');
      form.reset();
    })
  }
});
