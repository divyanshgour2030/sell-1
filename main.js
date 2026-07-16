// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    initPageLoader();
    initMobileMenu();
    initActiveNav();
    initScrollReveal();
    initSmoothScroll();
    initCounterAnimation();
    initImageLazyLoad();
    initParallax();
    initMagneticButtons();
    initBackToTop();
    initContactForm();
    initProjectFilter();
});

// Page Loader
function initPageLoader() {
    const loader = document.getElementById('pageLoader');
    if (loader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('loaded');
                document.body.classList.add('loaded');
            }, 500);
        });
    }
}

// Mobile Menu Toggle
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const desktopMenuBtn = document.getElementById('desktopMenuBtn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobileOverlay');
    
    function toggleMenu() {
        if(hamburger) hamburger.classList.toggle('active');
        if(sidebar) sidebar.classList.toggle('active');
        if(overlay) overlay.style.display = sidebar.classList.contains('active') ? 'block' : 'none';
        document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
    }

    if (hamburger) hamburger.addEventListener('click', toggleMenu);
    if (desktopMenuBtn) desktopMenuBtn.addEventListener('click', toggleMenu);
    
    // Close on nav click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if(window.innerWidth <= 992) toggleMenu();
        });
    });
    
    // Close on overlay click
    if (overlay) overlay.addEventListener('click', toggleMenu);
}

// Active Navigation Highlighting
function initActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        const link = item.querySelector('.nav-link');
        if (link) {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                item.classList.add('active');
            }
        }
    });
}

// Scroll Reveal (Intersection Observer)
function initScrollReveal() {
    const reveals = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    reveals.forEach(el => observer.observe(el));
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Counter Animation
function initCounterAnimation() {
    const counters = document.querySelectorAll('[data-count]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.count);
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        entry.target.textContent = target;
                        clearInterval(timer);
                    } else {
                        entry.target.textContent = Math.floor(current);
                    }
                }, 16);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => observer.observe(c));
}

// Image Lazy Loading
function initImageLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    }, { rootMargin: '100px' });
    images.forEach(img => observer.observe(img));
}

// Simple Parallax
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-image');
    if (parallaxElements.length === 0) return;
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        parallaxElements.forEach(el => {
            const speed = el.dataset.speed || 0.3;
            const rect = el.parentElement.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                el.style.transform = `translateY(${scrollY * speed}px)`;
            }
        });
    });
}

// Magnetic Button Effect
function initMagneticButtons() {
    document.querySelectorAll('.magnetic-btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

// Back to Top
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (btn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        });
        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// Contact Form Validation
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let valid = true;
            form.querySelectorAll('[required]').forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('error');
                    valid = false;
                } else {
                    field.classList.remove('error');
                }
            });
            const email = form.querySelector('input[type="email"]');
            if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
                email.classList.add('error');
                valid = false;
            }
            if (valid) {
                const btn = form.querySelector('.btn-primary');
                const originalText = btn.textContent;
                btn.textContent = 'Message Sent!';
                btn.style.backgroundColor = '#4CAF50';
                btn.style.color = 'white';
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.color = '';
                    form.reset();
                }, 3000);
            }
        });
    }
}

// Filter functionality for projects
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.masonry-item');
    if(filterBtns.length === 0 || projects.length === 0) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            
            projects.forEach(project => {
                if (filter === 'all' || project.dataset.category === filter) {
                    project.style.display = 'block';
                    setTimeout(() => project.style.opacity = '1', 50);
                } else {
                    project.style.opacity = '0';
                    setTimeout(() => project.style.display = 'none', 400);
                }
            });
        });
    });
}
