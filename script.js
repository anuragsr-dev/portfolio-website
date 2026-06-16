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

// ================================
// PASSWORD MODAL
// ================================
const passwordModal = document.getElementById('passwordModal');
const passwordModalOverlay = document.getElementById('passwordModalOverlay');
const aiSlidePanel = document.getElementById('aiSlidePanel');
const aiPanelOverlay = document.getElementById('aiPanelOverlay');
const modalError = document.getElementById('modalError');
const accessCodeInput = document.getElementById('accessCodeInput');

// Backend URL — Deploy hone ke baad replace karna
const BACKEND_URL = "https://portfolio-backend-3ad3.onrender.com";

function openPasswordModal() {
  passwordModal.classList.add('active');
  passwordModalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  accessCodeInput.focus();
  modalError.textContent = '';
  accessCodeInput.value = '';
}

function closePasswordModal() {
  passwordModal.classList.remove('active');
  passwordModalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

function openAiPanel() {
  aiSlidePanel.classList.add('active');
  aiPanelOverlay.classList.add('active');
}

function closeAiPanel() {
  aiSlidePanel.classList.remove('active');
  aiPanelOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

// Enter key support
function handleEnterKey(event) {
  if (event.key === 'Enter') verifyPassword();
}

// Password Verify — Backend API call
async function verifyPassword() {
  const password = accessCodeInput.value.trim();

  if (!password) {
    modalError.textContent = 'Please enter access code.';
    return;
  }

  // Button loading state
  const btn = document.querySelector('.modal-unlock-btn');
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verifying...';
  btn.disabled = true;
  modalError.textContent = '';

  try {
    const response = await fetch(`${BACKEND_URL}/unlock-service`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });

    const data = await response.json();

    if (data.success) {
      // Password correct
      closePasswordModal();

      // Loading spinner
      aiPanelContent.innerHTML = `
  <div style="
    display:flex;
    justify-content:center;
    align-items:center;
    height:200px;
  ">
    <i class="fas fa-spinner fa-spin"
       style="
         color:var(--primary);
         font-size:2rem;
       ">
    </i>
  </div>
`;
      aiPanelContent.innerHTML = data.content;
      setTimeout(() => {
        openAiPanel();
        document.body.style.overflow = 'hidden';
      }, 300);
    } else {
      // Wrong password
      modalError.textContent = 'Invalid access code. Please try again.';
      accessCodeInput.value = '';
      accessCodeInput.focus();
    }

  } catch (error) {
    modalError.textContent = 'Connection error. Please try again.';
  }

  // Button reset
  btn.innerHTML = '<span>Unlock Access</span><i class="fas fa-arrow-right"></i>';
  btn.disabled = false;
}

// ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closePasswordModal();
    closeAiPanel();
  }
});

// ================================
// VIRTUAL NUMBER PANEL
// ================================
const vnSlidePanel = document.getElementById('vnSlidePanel');
const vnPanelOverlay = document.getElementById('vnPanelOverlay');

function openVNPanel() {
  vnSlidePanel.classList.add('active');
  vnPanelOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeVNPanel() {
  vnSlidePanel.classList.remove('active');
  vnPanelOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

// View More Regions Toggle
function toggleMoreRegions() {
  const moreRegions = document.getElementById('moreRegions');
  const viewMoreIcon = document.getElementById('viewMoreIcon');
  const viewMoreBtn = document.getElementById('viewMoreBtn');

  if (moreRegions.classList.contains('visible')) {
    moreRegions.classList.remove('visible');
    viewMoreIcon.style.transform = 'rotate(0deg)';
    viewMoreBtn.querySelector('span').textContent = 'View More Regions';
  } else {
    moreRegions.classList.add('visible');
    viewMoreIcon.style.transform = 'rotate(180deg)';
    viewMoreBtn.querySelector('span').textContent = 'Show Less';
  }
}

// ESC key — VN panel
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeVNPanel();
  }
});

// ================================
// EMAILJS SETUP
// ================================
// EmailJS CDN — index.html ke head mein add karo:
// <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
// <script>emailjs.init("YOUR_PUBLIC_KEY")</script>

emailjs.init("OGHzzx19Oyd5m8z1W");

async function sendMessage() {
  const name = document.getElementById('contactName').value.trim();
  const email = 'No email provided';
  const message = document.getElementById('contactMessage').value.trim();
  const feedback = document.getElementById('formFeedback');
  const btnText = document.getElementById('sendBtnText');
  const btnIcon = document.getElementById('sendBtnIcon');

  // Validation
  if (!name) {
    feedback.textContent = 'Please enter your name.';
    feedback.className = 'form-feedback error';
    return;
  }

  if (!message) {
    feedback.textContent = 'Please write a message.';
    feedback.className = 'form-feedback error';
    return;
  }

  // Loading state
  btnText.textContent = 'Sending...';
  btnIcon.className = 'fas fa-spinner fa-spin';
  feedback.textContent = '';

  try {
    await emailjs.send(
      'service_bqepjga',    // EmailJS service ID
      'template_9zff3pv',   // EmailJS template ID
      {
        name: name,
        email: email,
        message: message,
        to_email: 'anuragsrivastava.tech@gmail.com'
      }
    );

    // Success
    feedback.textContent = '✅ Message sent! I\'ll get back to you soon.';
    feedback.className = 'form-feedback success';
    document.getElementById('contactName').value = '';
    document.getElementById('contactMessage').value = '';

  } catch (error) {
    feedback.textContent = '❌ Something went wrong. Try again or reach out directly.';
    feedback.className = 'form-feedback error';
  }

  // Reset button
  btnText.textContent = 'Send Message';
  btnIcon.className = 'fas fa-paper-plane';
}