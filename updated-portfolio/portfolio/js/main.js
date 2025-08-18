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
    form.addEventListener('submit',async function(e){
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const msg = form.message.value.trim();
      if(!name || !email || !msg){
        alert('Please complete all fields.');
        return;
      }
      // POST to backend endpoint if available
      try{
        const res = await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,email,message:msg})});
        if(res.ok){
          alert('Thank you — your message was sent.');
          form.reset();
        } else {
          alert('Received an error from the server. Please try again later.');
        }
      }catch(err){
        // fallback message
        alert('Thank you! This form is front-end only. Connect a backend or service (Formspree, Netlify) to receive messages.');
        form.reset();
      }
    })
  }

  // Reveal phone button wiring
  const reveal = document.getElementById('reveal-phone');
  const reveal2 = document.getElementById('reveal-phone-2');
  async function fetchPhone(btn){
    btn.disabled = true;
    try{
      const r = await fetch('/api/phone');
      if(!r.ok) throw new Error('no phone');
      const j = await r.json();
      const phoneEl = document.getElementById('phone-mask');
      if(phoneEl) phoneEl.textContent = j.phone;
      btn.style.display = 'none';
    }catch(e){
      alert('Phone not available.');
      btn.disabled = false;
    }
  }
  reveal && reveal.addEventListener('click',()=>fetchPhone(reveal));
  reveal2 && reveal2.addEventListener('click',()=>fetchPhone(reveal2));
});
