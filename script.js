document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.nav-links');
  const dropdown = document.querySelector('.has-menu > button');
  const closeMenu = () => { menu.classList.remove('active'); toggle.classList.remove('active'); toggle.setAttribute('aria-expanded', 'false'); document.body.classList.remove('menu-open'); };
  if (toggle && menu) {
    toggle.addEventListener('click', () => { const open = menu.classList.toggle('active'); toggle.classList.toggle('active', open); toggle.setAttribute('aria-expanded', String(open)); document.body.classList.toggle('menu-open', open); });
    if (dropdown) dropdown.addEventListener('click', () => { const open = dropdown.getAttribute('aria-expanded') === 'true'; dropdown.setAttribute('aria-expanded', String(!open)); dropdown.parentElement.classList.toggle('open', !open); });
    document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
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
