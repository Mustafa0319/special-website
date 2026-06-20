const loader = document.getElementById('loader');
const page = document.getElementById('page');
const heroTitle = document.getElementById('heroTitle');
const choiceCards = document.querySelectorAll('.choice-card');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const closeModal = document.getElementById('closeModal');
const surpriseButton = document.getElementById('surpriseButton');
const celebration = document.getElementById('celebration');
const endCelebration = document.getElementById('endCelebration');

const cursor = document.getElementById('cursor');
const trail = document.getElementById('trail');
const heroPhoto = document.getElementById('heroPhoto');
const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');

const heroText = heroTitle.textContent.trim();
heroTitle.textContent = '';

function showLoader() {
  setTimeout(() => {
    loader.classList.add('hidden');
    page.classList.remove('hidden');
    typeText(heroTitle, heroText, 80);
    initRevealObserver();
  }, 2000);
}

function typeText(element, text, delay) {
  text.split('').forEach((char, index) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.opacity = '0';
    span.style.display = 'inline-block';
    span.style.transform = 'translateY(20px)';
    span.style.transition = `all 0.45s cubic-bezier(0.22, 1, 0.36, 1) ${index * delay}ms`;
    element.appendChild(span);
  });

  requestAnimationFrame(() => {
    element.querySelectorAll('span').forEach((span) => {
      span.style.opacity = '1';
      span.style.transform = 'translateY(0)';
    });
  });
}

function initRevealObserver() {
  const elements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });
  elements.forEach((el) => observer.observe(el));
}

function initCursor() {
  document.addEventListener('mousemove', (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
    createTrail(event.clientX, event.clientY);
  });

  const hoverTargets = document.querySelectorAll('button, a');
  hoverTargets.forEach((target) => {
    target.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    target.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
}

function createTrail(x, y) {
  const dot = document.createElement('div');
  dot.className = 'trail-dot';
  dot.style.left = `${x}px`;
  dot.style.top = `${y}px`;
  trail.appendChild(dot);
  setTimeout(() => dot.remove(), 700);
}

function initParallax() {
  document.addEventListener('mousemove', (event) => {
    const rect = heroPhoto.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    heroPhoto.style.transform = `scale(1.03) translate(${x * 12}px, ${y * 12}px)`;
  });
}

function openModal(title, message) {
  modalTitle.textContent = title;
  modalMessage.textContent = message;
  modal.classList.remove('hidden');
}

function closeModalHandler() {
  modal.classList.add('hidden');
}

function createParticles(container, className, count, createCallback) {
  for (let i = 0; i < count; i += 1) {
    const node = document.createElement('span');
    node.className = className;
    createCallback(node, i);
    container.appendChild(node);
  }
}

function showCelebration() {
  celebration.classList.remove('hidden');

  createParticles(celebration.querySelector('.confetti-layer'), 'confetti-piece', 42, (node) => {
    const hue = Math.random() * 40 + 320;
    node.style.left = `${Math.random() * 100}%`;
    node.style.top = `${Math.random() * 20}%`;
    node.style.width = `${Math.random() * 12 + 8}px`;
    node.style.height = `${Math.random() * 4 + 8}px`;
    node.style.background = `hsl(${hue}, 92%, 72%)`;
    node.style.animationDuration = `${Math.random() * 1.5 + 2}s`;
    node.style.animationDelay = `${Math.random() * 0.5}s`;
  });
  createParticles(celebration.querySelector('.heart-layer'), 'celebration-heart', 16, (node) => {
    node.style.left = `${Math.random() * 100}%`;
    node.style.top = `${Math.random() * 80 + 10}%`;
    node.style.animationDuration = `${Math.random() * 1.8 + 2.2}s`;
    node.style.animationDelay = `${Math.random() * 0.8}s`;
  });
  createParticles(celebration.querySelector('.firework-layer'), 'firework-burst', 10, (node, index) => {
    node.style.left = `${10 + index * 9}%`;
    node.style.top = `${20 + Math.random() * 20}%`;
    node.style.animationDelay = `${index * 0.18}s`;
  });
}

function resetCelebration() {
  celebration.classList.add('hidden');
  celebration.querySelector('.confetti-layer').innerHTML = '';
  celebration.querySelector('.heart-layer').innerHTML = '';
  celebration.querySelector('.firework-layer').innerHTML = '';
}



function initChoiceCards() {
  choiceCards.forEach((card) => {
    card.addEventListener('click', () => {
      const title = card.dataset.title;
      const message = card.dataset.message;
      openModal(title, message);
    });
  });
}

function initNoButton() {
  noButton.addEventListener('mouseenter', () => {
    const x = Math.random() * 160 - 80;
    const y = Math.random() * 20 - 10;
    noButton.style.transform = `translate(${x}px, ${y}px)`;
  });
  noButton.addEventListener('mouseleave', () => {
    noButton.style.transform = 'translate(0, 0)';
  });
}

function init() {

  showLoader();
  initCursor();
  initParallax();
  initChoiceCards();
  initNoButton();


  closeModal.addEventListener('click', closeModalHandler);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModalHandler();
  });
  surpriseButton.addEventListener('click', showCelebration);
  endCelebration.addEventListener('click', resetCelebration);
  yesButton.addEventListener('click', showCelebration);

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      event.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

init();

// Style definitions are already included in style.css for the celebration and trail effects.
// The injected style element is no longer required.
