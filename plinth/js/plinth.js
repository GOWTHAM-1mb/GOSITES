/* Plinth v1.0 — plinth.js. Progressive enhancement only: every page must work without it.
   Modules: menu, filter, viewer, reveal, forms, file input. Initialise with data attributes. No dependencies. */
(() => {
  const d = document, root = d.documentElement;
  root.classList.remove('no-js');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const focusables = el => [...el.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex]:not([tabindex="-1"])')].filter(n => n.offsetParent !== null);

  /* MENU — <button class="p-menu-btn" aria-controls="menu" aria-expanded="false"> + <div class="p-menu" id="menu" role="dialog" aria-modal="true" aria-label="Menu"> */
  d.querySelectorAll('.p-menu-btn[aria-controls]').forEach(btn => {
    const menu = d.getElementById(btn.getAttribute('aria-controls'));
    if (!menu) return;
    const close = menu.querySelector('[data-menu-close]');
    const set = open => {
      btn.setAttribute('aria-expanded', String(open));
      menu.dataset.state = open ? 'open' : 'closed';
      menu.inert = !open;
      root.classList.toggle('p-menu-open', open);
      (open ? (close || focusables(menu)[0]) : btn)?.focus();
    };
    menu.inert = true;
    btn.addEventListener('click', () => set(true));
    close?.addEventListener('click', () => set(false));
    menu.addEventListener('keydown', e => {
      if (e.key === 'Escape') set(false);
      if (e.key !== 'Tab') return;
      const f = focusables(menu), first = f[0], last = f[f.length - 1];
      if (e.shiftKey && d.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && d.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    matchMedia('(min-width: 1024px)').addEventListener('change', e => { if (e.matches && menu.dataset.state === 'open') set(false); });
  });

  /* FILTER — <div class="p-filter" data-filter-target="#work" role="group" aria-label="Filter projects"> buttons[data-filter][aria-pressed] + .p-filter__count[aria-live]. Items: [data-category="residential hospitality"] */
  d.querySelectorAll('.p-filter[data-filter-target]').forEach(bar => {
    const list = d.querySelector(bar.dataset.filterTarget); if (!list) return;
    const items = [...list.querySelectorAll('[data-category]')];
    const count = bar.querySelector('.p-filter__count');
    bar.addEventListener('click', e => {
      const b = e.target.closest('button[data-filter]'); if (!b) return;
      bar.querySelectorAll('button[data-filter]').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      const f = b.dataset.filter; let n = 0;
      items.forEach(it => { const show = f === 'all' || it.dataset.category.split(' ').includes(f); it.hidden = !show; n += show; });
      if (count) count.textContent = `${n} project${n === 1 ? '' : 's'}`;
      const u = new URL(location); f === 'all' ? u.searchParams.delete('type') : u.searchParams.set('type', f); history.replaceState(null, '', u);
    });
    const initial = new URLSearchParams(location.search).get('type');
    if (initial) bar.querySelector(`button[data-filter="${CSS.escape(initial)}"]`)?.click();
  });

  /* VIEWER — gallery buttons: <button class="p-gallery__item" data-viewer="project-014" data-src="…" data-caption="…">. One <dialog class="p-viewer" id="viewer"> per page. */
  const dlg = d.querySelector('dialog.p-viewer');
  if (dlg && typeof dlg.showModal === 'function') {
    const img = dlg.querySelector('img'), cap = dlg.querySelector('.p-viewer__caption'), pos = dlg.querySelector('.p-viewer__count');
    let set = [], i = 0, opener = null, x0 = null;
    const show = n => { i = (n + set.length) % set.length; const it = set[i];
      img.src = it.dataset.src; img.alt = it.querySelector('img')?.alt || it.dataset.alt || '';
      if (cap) cap.textContent = it.dataset.caption || ''; if (pos) pos.textContent = `${i + 1} / ${set.length}`; };
    d.addEventListener('click', e => {
      const b = e.target.closest('[data-viewer]'); if (!b) return;
      set = [...d.querySelectorAll(`[data-viewer="${b.dataset.viewer}"]`)]; opener = b; show(set.indexOf(b)); dlg.showModal();
    });
    dlg.querySelector('[data-viewer-prev]')?.addEventListener('click', () => show(i - 1));
    dlg.querySelector('[data-viewer-next]')?.addEventListener('click', () => show(i + 1));
    dlg.querySelector('[data-viewer-close]')?.addEventListener('click', () => dlg.close());
    dlg.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') show(i - 1); if (e.key === 'ArrowRight') show(i + 1); });
    dlg.addEventListener('close', () => opener?.focus());
    dlg.addEventListener('pointerdown', e => { x0 = e.clientX; });
    dlg.addEventListener('pointerup', e => { if (x0 === null) return; const dx = e.clientX - x0; x0 = null; if (Math.abs(dx) > 48) show(i + (dx < 0 ? 1 : -1)); });
  }

  /* REVEAL — .p-reveal, once per element. Skipped under reduced motion. */
  const rev = d.querySelectorAll('.p-reveal');
  if (reduce.matches || !('IntersectionObserver' in window)) rev.forEach(n => n.classList.add('is-in'));
  else { const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -10% 0px' }); rev.forEach(n => io.observe(n)); }

  /* FORMS — <form class="p-form" data-validate novalidate>. Native constraints; messages from data-error on the field. */
  d.querySelectorAll('form[data-validate]').forEach(form => {
    const summary = form.querySelector('[data-error-summary]'), status = form.querySelector('[data-status]');
    const wrap = el => el.closest('.p-field, fieldset');
    const check = el => {
      const w = wrap(el); if (!w) return true;
      const ok = el.checkValidity();
      const group = el.type === 'radio' ? form.querySelectorAll(`[name="${el.name}"]`) : [el];
      group.forEach(g => g.setAttribute('aria-invalid', String(!ok)));
      w.toggleAttribute('data-invalid', !ok);
      const msg = w.querySelector('.p-field__error'); if (msg && !ok) msg.textContent = el.dataset.error || el.validationMessage;
      return ok;
    };
    form.addEventListener('blur', e => { if (e.target.matches('input,select,textarea') && e.target.value) check(e.target); }, true);
    form.addEventListener('input', e => { if (wrap(e.target)?.hasAttribute('data-invalid')) check(e.target); });
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const fields = [...form.querySelectorAll('input,select,textarea')].filter(f => f.willValidate);
      const bad = fields.filter(f => !check(f));
      if (bad.length) {
        if (summary) { summary.hidden = false; summary.querySelector('ul').innerHTML = [...new Set(bad.map(f => wrap(f)))].map(w => { const t = w.querySelector('.p-field__label, legend')?.textContent.trim(); const id = w.querySelector('input,select,textarea').id; return `<li><a href="#${id}">${t}</a></li>`; }).join(''); summary.focus(); }
        else bad[0].focus();
        return;
      }
      if (summary) summary.hidden = true;
      const btn = form.querySelector('[type="submit"]'); btn?.setAttribute('aria-busy', 'true'); btn?.setAttribute('aria-disabled', 'true');
      try {
        if (form.action && !form.hasAttribute('data-demo')) { const r = await fetch(form.action, { method: form.method || 'POST', body: new FormData(form) }); if (!r.ok) throw new Error(r.status); }
        else await new Promise(r => setTimeout(r, 600));
        if (status) { status.hidden = false; status.className = 'p-alert p-alert--success'; status.querySelector('[data-status-title]').textContent = form.dataset.success || 'Thank you. Your enquiry has been sent.'; }
        form.reset();
      } catch {
        if (status) { status.hidden = false; status.className = 'p-alert p-alert--error'; status.querySelector('[data-status-title]').textContent = 'Your enquiry could not be sent. Please try again, or email us directly.'; }
      } finally { btn?.removeAttribute('aria-busy'); btn?.removeAttribute('aria-disabled'); status?.focus(); }
    });
  });

  /* FILE INPUT — lists chosen files; enforces data-max-mb */
  d.querySelectorAll('.p-file input[type="file"]').forEach(inp => {
    const list = inp.closest('.p-file').querySelector('.p-file__list'), max = +(inp.dataset.maxMb || 20) * 1e6;
    inp.addEventListener('change', () => {
      const files = [...inp.files], big = files.filter(f => f.size > max);
      inp.setCustomValidity(big.length ? `${big[0].name} is larger than ${inp.dataset.maxMb || 20} MB.` : '');
      if (list) list.replaceChildren(...files.map(f => { const li = d.createElement('li'), a = d.createElement('span'), b = d.createElement('span'); a.textContent = f.name; b.className = 'p-meta'; b.textContent = `${(f.size / 1e6).toFixed(1)} MB`; li.append(a, b); return li; }));
    });
  });
})();
