// Lightweight project filtering and modal details (basic)
document.addEventListener('DOMContentLoaded',()=>{
  const filter = document.getElementById('project-filter');
  const grid = document.getElementById('project-grid');
  if(!filter || !grid) return;
  filter.addEventListener('input',()=>{
    const q = filter.value.trim().toLowerCase();
    Array.from(grid.querySelectorAll('.project-card')).forEach(card=>{
      const tech = (card.dataset.tech||'').toLowerCase();
      const visible = q === '' || tech.includes(q);
      card.style.display = visible ? '' : 'none';
    })
  });

  // Project details buttons (placeholder modal)
  // Modal wiring
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalVideo = document.getElementById('modal-video');
  const modalRepo = document.getElementById('modal-repo');
  const modalTech = document.getElementById('modal-tech');
  const modalClose = modal && modal.querySelector('.modal-close');

  grid.addEventListener('click', e => {
    const btn = e.target.closest('button[data-action="details"]');
    if(!btn) return;
    const card = btn.closest('.project-card');
    if(!card) return;
    const title = card.dataset.title || card.querySelector('h4').textContent;
    const desc = card.dataset.description || '';
    const repo = card.dataset.repo || '#';
    const video = card.dataset.video || '';
  const tech = card.dataset.tech || '';
  const role = card.dataset.role || card.dataset.contributor || '';
  const outcomes = card.dataset.outcomes || '';

    // populate modal
    if(modalTitle) modalTitle.textContent = title;
    if(modalDesc) modalDesc.textContent = desc;
  if(modalRepo) { modalRepo.href = repo; modalRepo.style.display = repo === '#' ? 'none' : '' }
  if(modalTech) modalTech.textContent = tech;
  const modalRoleEl = document.getElementById('modal-role');
  const modalOutcomesEl = document.getElementById('modal-outcomes');
  if(modalRoleEl) modalRoleEl.textContent = role || 'Contributor';
  if(modalOutcomesEl) modalOutcomesEl.textContent = outcomes || 'Key outcomes highlighted here.';

    // lazy-load video iframe
    if(modalVideo){
      modalVideo.innerHTML = '';
      if(video){
        const iframe = document.createElement('iframe');
        iframe.src = video + '?rel=0&modestbranding=1';
        iframe.setAttribute('allow','accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
        iframe.setAttribute('allowfullscreen','');
        modalVideo.appendChild(iframe);
        modalVideo.setAttribute('aria-hidden','false');
      } else {
        modalVideo.setAttribute('aria-hidden','true');
      }
    }

    // show modal
    if(modal) modal.setAttribute('aria-hidden','false');
  });

  function closeModal(){
    if(!modal) return;
    modal.setAttribute('aria-hidden','true');
    if(modalVideo) modalVideo.innerHTML = '';
  }

  modalClose && modalClose.addEventListener('click', closeModal);
  modal && modal.addEventListener('click', e=>{ if(e.target === modal) closeModal(); });

  // Accessibility: close modal with Escape
  document.addEventListener('keydown', e=>{ if(e.key === 'Escape') closeModal(); });
});
