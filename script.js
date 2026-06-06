// ================================
// AOS INITIALIZE — Scroll Animations
// ================================
AOS.init({
  duration: 600,
  once: true,
  offset: 80,
  easing: 'ease-out-back'
});

console.log("Portfolio JS loaded ✅");

// ================================
// NAVBAR — SCROLL EFFECT
// ================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ================================
// HAMBURGER MENU — MOBILE
// ================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Nav link click pe menu close ho
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ================================
// ACTIVE LINK ON SCROLL
// ================================
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      if (navLink) navLink.classList.add('active');
    }
  });
});

// ================================
// ROTATING ROLES — HERO
// ================================
const roles = [
  "Full Stack Developer",
  "Web Developer",
  "DevOps Learner",
  "GenAI Enthusiast"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const roleText = document.getElementById('roleText');

function typeRole() {
  const currentRole = roles[roleIndex];

  if (isDeleting) {
    // Delete one character
    roleText.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    // Type one character
    roleText.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  // Typing speed
  let speed = isDeleting ? 60 : 100;

  // Word complete — pause then delete
  if (!isDeleting && charIndex === currentRole.length) {
    speed = 1800; // Pause at end
    isDeleting = true;
  }

  // Word deleted — move to next
  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 400; // Pause before next word
  }

  setTimeout(typeRole, speed);
}

// Start typing
typeRole();

// ================================
// SLIDE PANEL
// ================================
const slidePanel = document.getElementById('slidePanel');
const panelOverlay = document.getElementById('panelOverlay');

function openPanel(type) {
  // Sab panels hide karo
  document.querySelectorAll('.panel-content').forEach(p => {
    p.style.display = 'none';
  });

  // Selected panel show karo
  const target = document.getElementById('panel-' + type);
  if (target) target.style.display = 'block';

  // Panel + overlay open karo
  slidePanel.classList.add('active');
  panelOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closePanel() {
  slidePanel.classList.remove('active');
  panelOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

// ESC key se close
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closePanel();
});