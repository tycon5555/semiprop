'use strict';

/* ── Fade-up on scroll ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  });
}, { rootMargin: '0px 0px -60px 0px', threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

/* ── Navbar scroll ── */
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.pageYOffset > 20);
  const prog = document.querySelector('.scroll-progress');
  if (prog) {
    const pct = window.pageYOffset / (document.body.scrollHeight - window.innerHeight) * 100;
    prog.style.width = Math.min(pct, 100) + '%';
  }
}, { passive: true });

/* ── Mobile nav ── */
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.nav-mobile');
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    const [s1, , s3] = hamburger.querySelectorAll('span');
    hamburger.querySelectorAll('span')[1].style.opacity = open ? '0' : '';
    s1.style.transform = open ? 'translateY(6.5px) rotate(45deg)' : '';
    s3.style.transform = open ? 'translateY(-6.5px) rotate(-45deg)' : '';
  });
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => s.style.cssText = '');
  }));
}

/* ── Active nav link ── */
const page = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
  if (a.getAttribute('href') === page) a.classList.add('active');
});

/* ── Smooth anchor scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

/* ── Contact form ── */
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = 'Message Sent ✓'; btn.disabled = true;
    setTimeout(() => { btn.textContent = orig; btn.disabled = false; form.reset(); }, 4000);
  });
}

/* ── Login form ── */
const loginForm = document.querySelector('.login-form');
const loginBtn  = document.querySelector('#login-btn');
if (loginForm && loginBtn) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    loginBtn.textContent = 'Signing in…'; loginBtn.disabled = true;
    setTimeout(() => {
      loginBtn.textContent = 'Sign In'; loginBtn.disabled = false;
      alert('Login is coming soon. Contact support@semiprop.in for access.');
    }, 1400);
  });
}

/* ── Password toggle ── */
const toggleBtn = document.querySelector('#toggle-pw');
const pwField   = document.querySelector('#pw');
if (toggleBtn && pwField) {
  toggleBtn.addEventListener('click', () => {
    const isText = pwField.type === 'text';
    pwField.type = isText ? 'password' : 'text';
    toggleBtn.textContent = isText ? 'Show' : 'Hide';
  });
}

/* ── Counter animation ── */
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const start = performance.now();
    const isInt = Number.isInteger(target);
    const animate = now => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      const val = target * eased;
      el.textContent = (isInt ? Math.floor(val).toLocaleString() : val.toFixed(1)) + suffix;
      if (p < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
    counterObs.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => counterObs.observe(el));

/* ── Trigger above-fold animations on load ── */
window.addEventListener('load', () => {
  document.querySelectorAll('.fade-up').forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight) {
      setTimeout(() => el.classList.add('visible'), 50);
    }
  });
});
