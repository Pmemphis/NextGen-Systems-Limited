document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.nav-links');
  const dropdown = document.querySelector('.has-menu > button');
  const closeMenu = () => { menu.classList.remove('active'); toggle.setAttribute('aria-expanded', 'false'); document.body.classList.remove('menu-open'); };
  toggle.addEventListener('click', () => { const open = menu.classList.toggle('active'); toggle.setAttribute('aria-expanded', String(open)); document.body.classList.toggle('menu-open', open); });
  dropdown.addEventListener('click', () => { const open = dropdown.getAttribute('aria-expanded') === 'true'; dropdown.setAttribute('aria-expanded', String(!open)); dropdown.parentElement.classList.toggle('open', !open); });
  document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(item => observer.observe(item));
  document.querySelector('.contact-form').addEventListener('submit', () => { const status = document.querySelector('.form-status'); status.textContent = 'Sending your enquiry…'; });
  document.querySelector('#year').textContent = new Date().getFullYear();
});
