// Menu mobile toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Fechar menu ao clicar em um link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

// Animação de scroll
function animateOnScroll() {
  const elements = document.querySelectorAll(".animate-on-scroll");

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("animated");
    }
  });
}

// Header transparente
function handleHeaderScroll() {
  const header = document.querySelector("header");
  if (window.scrollY > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

// Scroll indicator
function updateScrollIndicator() {
  const scrollIndicator = document.querySelector(".scroll-indicator");
  const totalHeight = document.body.scrollHeight - window.innerHeight;
  const progress = (window.scrollY / totalHeight) * 100;
  scrollIndicator.style.width = `${progress}%`;
}

// Back to top button
function handleBackToTopButton() {
  const backToTopButton = document.querySelector(".back-to-top");
  if (window.scrollY > 500) {
    backToTopButton.classList.add("visible");
  } else {
    backToTopButton.classList.remove("visible");
  }
}

// Smooth scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Back to top functionality
document.querySelector(".back-to-top").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Event listeners
window.addEventListener("scroll", () => {
  animateOnScroll();
  handleHeaderScroll();
  updateScrollIndicator();
  handleBackToTopButton();
});

window.addEventListener("load", () => {
  animateOnScroll();
  updateScrollIndicator();
});

// Formulário de contato
document
  .querySelector(".contato-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Simular envio do formulário
    const submitBtn = this.querySelector(".submit-btn");
    const originalText = submitBtn.textContent;

    submitBtn.disabled = true;
    submitBtn.textContent = "Enviando...";

    setTimeout(() => {
      alert(
        "Obrigado pelo seu interesse! Sua mensagem foi enviada com sucesso e entraremos em contato em breve."
      );
      this.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }, 1500);
  });

// Contador animado para estatísticas
function animateCounters() {
  const statItems = document.querySelectorAll(".stat-number");

  statItems.forEach((item) => {
    const target = parseInt(item.textContent);
    const duration = 2000; // 2 segundos
    const step = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
      current += step;
      if (current < target) {
        if (target > 100) {
          item.textContent = Math.floor(current);
        } else {
          item.textContent = Math.floor(current) + "%";
        }
        requestAnimationFrame(updateCounter);
      } else {
        if (target > 100) {
          item.textContent = target;
        } else {
          item.textContent = target + "%";
        }
      }
    };

    // Iniciar animação quando o elemento estiver visível
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        updateCounter();
        observer.disconnect();
      }
    });

    observer.observe(item);
  });
}

// Iniciar contador quando a página carregar
window.addEventListener("load", animateCounters);
