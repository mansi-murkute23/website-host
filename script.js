document.addEventListener("DOMContentLoaded", () => {
  
  // ===== HEADER TOGGLE =====
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('show');
    });
  }

  // ===== COUNTER SECTION =====
  const counters = document.querySelectorAll('.counter');
  if (counters.length > 0) {
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const speed = 200; 
        const increment = Math.ceil(target / speed);
        let count = +counter.innerText;

        if (count < target) {
          counter.innerText = count + increment;
          setTimeout(updateCount, 30);
        } else {
          counter.innerText = target + (counter.id === "satisfaction" ? "%" : "+");
        }
      };
      updateCount();
    });
  }

  // ===== TOP BANNER SLIDER =====
  let slides = document.querySelectorAll(".slide");
  if (slides.length > 0) {
    let currentIndex = 0;
    let slideInterval;

    const showSlide = (index) => {
      slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
      });
    };

    const nextSlide = () => {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    };

    const prevSlide = () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(currentIndex);
    };

    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");

    if (nextBtn) nextBtn.addEventListener("click", () => { nextSlide(); resetInterval(); });
    if (prevBtn) prevBtn.addEventListener("click", () => { prevSlide(); resetInterval(); });

    const startAutoSlide = () => {
      slideInterval = setInterval(nextSlide, 4000);
    };

    const resetInterval = () => {
      clearInterval(slideInterval);
      startAutoSlide();
    };

    showSlide(currentIndex);
    startAutoSlide();
  }

  // ===== TESTIMONIAL SECTION =====
  const container = document.getElementById('testimonialContainer');
  const dots = document.querySelectorAll('.dot');
  if (container && dots.length > 0) {
    let currentIndex = 0;
    const scrollToCard = (index) => {
      const cardWidth = container.querySelector('.testimonial-card').offsetWidth + 20;
      container.scrollTo({ left: cardWidth * index, behavior: 'smooth' });
      dots.forEach(dot => dot.classList.remove('active'));
      if (dots[index]) dots[index].classList.add('active');
      currentIndex = index;
    };
    const autoScroll = () => {
      currentIndex = (currentIndex + 1) % dots.length;
      scrollToCard(currentIndex);
    };
    setInterval(autoScroll, 5000);
  }

  // ===== WEBSITE PAGE DESIGN =====
  // 1 — Buttons
  const quoteBtn = document.getElementById('quoteBtn');
  const contactBtnji = document.getElementById('contactBtnji');
  if (quoteBtn) quoteBtn.addEventListener('click', () => alert('Thank you for your interest! Our team will contact you soon for a free quote.'));
  if (contactBtnji) contactBtnji.addEventListener('click', () => { window.location.href = 'contact.html'; });

  // 2 — Scroll animation for about section
  const aboutContainerweb = document.querySelector(".about-containerweb");
  if (aboutContainerweb) {
    const checkScroll = () => {
      const rect = aboutContainerweb.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        aboutContainerweb.classList.add("show");
      }
    };
    window.addEventListener("scroll", checkScroll);
    checkScroll();
  }

  // 3 — Filter & Modal
  const pills = document.querySelectorAll('.pill');
  const cards = document.querySelectorAll('.type-card');
  const grid = document.getElementById('cardsGrid');
  if (pills.length > 0 && cards.length > 0) {
    const filterBy = (type) => {
      cards.forEach(c => c.classList.toggle('hidden', !(type === 'all' || c.dataset.type === type)));
    };
    pills.forEach(p => {
      p.addEventListener('click', () => {
        pills.forEach(x => x.classList.remove('active'));
        p.classList.add('active');
        filterBy(p.dataset.filter);
      });
    });

    const obs = new IntersectionObserver((entries, o) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          grid.querySelectorAll('.type-card').forEach((card, i) => {
            card.style.transition = `opacity .45s ease ${i * 80}ms, transform .45s ease ${i * 80}ms`;
            card.style.opacity = 1;
            card.style.transform = 'translateY(0)';
          });
          o.disconnect();
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.type-card').forEach(c => {
      c.style.opacity = 0;
      c.style.transform = 'translateY(14px)';
    });
    if (grid) obs.observe(grid);

    const modal = document.getElementById('typeModal');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const modalClose = document.getElementById('modalClose');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalIcon = document.getElementById('modalIcon');
    const modalQuote = document.getElementById('modalQuote');

    const details = {
      business: { icon: '🏢', title: 'Business / Corporate Websites', desc: 'Professional corporate websites with About, Services, Team, Careers, Contact and CMS for easy updates.' },
      ecommerce: { icon: '🛒', title: 'E-Commerce Websites', desc: 'Full-featured online stores with product management, secure checkout, payment gateways and analytics.' },
      portfolio: { icon: '🎨', title: 'Portfolio Websites', desc: 'Visually focused portfolios to showcase work and generate leads.' },
      blog: { icon: '📰', title: 'Blog & News Portals', desc: 'Content-first platforms with SEO-ready templates and commenting.' },
      custom: { icon: '⚙️', title: 'Custom Web Applications', desc: 'Bespoke apps, dashboards, integrations, and SaaS platforms.' },
      landing: { icon: '🚀', title: 'Landing Pages', desc: 'High-converting landing pages for ads and campaigns.' }
    };

    cards.forEach(c => {
      c.addEventListener('click', () => {
        const t = c.dataset.type;
        const d = details[t] || {};
        modalIcon.textContent = d.icon || '🖥️';
        modalTitle.textContent = d.title || 'Website Type';
        modalDesc.textContent = d.desc || '';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeModal = () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    };
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
    if (modalQuote) modalQuote.addEventListener('click', () => { alert('Thanks — we will contact you shortly for a free quote.'); closeModal(); });
  }

  // 4 — Feature card reveal
  const featureCards = document.querySelectorAll(".feature-card");
  if (featureCards.length > 0) {
    const revealCards = () => {
      featureCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
          card.style.transform = "translateY(0)";
          card.style.opacity = "1";
        }
      });
    };
    window.addEventListener("scroll", revealCards);
    revealCards();
  }

  // 5 — Smooth scroll CTA
  const ctaButtons = document.querySelectorAll('.cta-buttons a');
  if (ctaButtons.length > 0) {
    ctaButtons.forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href').startsWith('#')) {
          e.preventDefault();
          document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }
  const ctaContent = document.querySelector('.cta-content');
  if (ctaContent) {
    window.addEventListener('scroll', () => {
      const rect = ctaContent.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        ctaContent.style.opacity = '1';
        ctaContent.style.transform = 'translateY(0)';
      }
    });
  }

});
