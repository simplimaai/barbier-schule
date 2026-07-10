// Werbe-Popup (einmal pro Sitzung)
(function () {
  if (sessionStorage.getItem('bs_popup_shown')) return;

  const overlay = document.createElement('div');
  overlay.className = 'bm-popup-overlay';
  overlay.innerHTML = `
    <div class="bm-popup">
      <button class="bm-popup-close" aria-label="Schließen">&times;</button>
      <img src="popup/wirsindzuruck.png" alt="Wir sind zurück – Barbier Schule" />
    </div>
  `;

  function closePopup() {
    overlay.classList.remove('open');
    setTimeout(() => overlay.remove(), 300);
  }

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closePopup();
  });

  window.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('open'));
    overlay.querySelector('.bm-popup-close').addEventListener('click', closePopup);
    sessionStorage.setItem('bs_popup_shown', '1');
  });
})();

// Header scroll effect
const header = document.getElementById('header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
    });
  });
}

// Scroll fade-in
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.anim-item').forEach(el => observer.observe(el));

// Gold particle canvas
(function () {
  const canvas = document.getElementById('heroParticles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < 55; i++) {
    particles.push({
      x: Math.random() * 1200,
      y: Math.random() * 800,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.4,
      dy: -Math.random() * 0.5 - 0.2,
      a: Math.random() * 0.6 + 0.2
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201,168,76,${p.a})`;
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      if (p.y < -5) { p.y = H + 5; p.x = Math.random() * W; }
      if (p.x < -5) p.x = W + 5;
      if (p.x > W + 5) p.x = -5;
    });
    requestAnimationFrame(draw);
  }
  draw();
})();
