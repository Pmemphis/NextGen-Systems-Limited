document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.nav-links');
  const dropdown = document.querySelector('.has-menu > button');
  const backdrop = document.querySelector('.nav-backdrop');
  let previousFocus;
  const focusableMenuItems = () => [...menu.querySelectorAll('a[href], button:not([disabled])')];
  const setMenuAccessibility = hidden => hidden ? menu.setAttribute('aria-hidden', 'true') : menu.removeAttribute('aria-hidden');
  const closeMenu = (restoreFocus = true) => {
    menu.classList.remove('active');
    toggle.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
    setMenuAccessibility(window.innerWidth <= 900);
    backdrop?.classList.remove('active');
    document.body.classList.remove('menu-open');
    if (dropdown) { dropdown.setAttribute('aria-expanded', 'false'); dropdown.parentElement.classList.remove('open'); }
    if (restoreFocus && previousFocus instanceof HTMLElement) previousFocus.focus();
  };
  const openMenu = () => {
    previousFocus = document.activeElement;
    menu.classList.add('active');
    toggle.classList.add('active');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close navigation');
    setMenuAccessibility(false);
    backdrop?.classList.add('active');
    document.body.classList.add('menu-open');
    focusableMenuItems()[0]?.focus();
  };
  if (toggle && menu) {
    setMenuAccessibility(window.innerWidth <= 900);
    toggle.addEventListener('click', () => menu.classList.contains('active') ? closeMenu() : openMenu());
    if (dropdown) dropdown.addEventListener('click', () => { const open = dropdown.getAttribute('aria-expanded') === 'true'; dropdown.setAttribute('aria-expanded', String(!open)); dropdown.parentElement.classList.toggle('open', !open); });
    document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => closeMenu(false)));
    backdrop?.addEventListener('click', () => closeMenu());
    document.addEventListener('keydown', event => {
      if (!menu.classList.contains('active')) return;
      if (event.key === 'Escape') { event.preventDefault(); closeMenu(); }
      if (event.key === 'Tab') {
        const items = focusableMenuItems();
        const first = items[0];
        const last = items.at(-1);
        if (!first || !last) return;
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) {
        if (menu.classList.contains('active')) closeMenu(false);
        else setMenuAccessibility(false);
      } else if (!menu.classList.contains('active')) setMenuAccessibility(true);
    });
  }
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(item => observer.observe(item));
  const form = document.querySelector('.contact-form');
  if (form) form.addEventListener('submit', async event => {
    event.preventDefault();
    const status = form.querySelector('.form-status');
    const submit = form.querySelector('[type="submit"]');
    if (!form.checkValidity()) { form.reportValidity(); return; }
    submit.disabled = true;
    status.className = 'form-status';
    status.textContent = 'Sending your enquiry…';
    try {
      const response = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error('Submission was not accepted.');
      form.reset();
      status.className = 'form-status success';
      status.textContent = 'Thank you. Your enquiry has been sent and NextGen will get back to you.';
    } catch (error) {
      status.className = 'form-status error';
      status.innerHTML = 'We could not send the form. Please <a href="mailto:pinidymwendia8@gmail.com?subject=NextGen%20demo%20request">email NextGen</a> or use WhatsApp instead.';
    } finally { submit.disabled = false; }
  });
  document.querySelector('#year').textContent = new Date().getFullYear();
});
