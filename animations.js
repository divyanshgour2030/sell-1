// Advanced animations using vanilla JS

document.addEventListener('DOMContentLoaded', () => {
    initTextSplitAnimation();
    initStaggerAnimation();
    initScrollProgress();
    initTiltEffect();
    initTypewriter();
    initCursorFollower();
});

// Split text into chars for animation
function initTextSplitAnimation() {
    document.querySelectorAll('.split-text').forEach(el => {
        const text = el.textContent;
        el.innerHTML = '';
        text.split('').forEach((char, i) => {
            const span = document.createElement('span');
            span.classList.add('char');
            span.style.transitionDelay = `${i * 0.03}s`;
            span.textContent = char === ' ' ? '\u00A0' : char;
            el.appendChild(span);
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('.split-text').forEach(el => observer.observe(el));
}

// Stagger children animation
function initStaggerAnimation() {
    const staggerContainers = document.querySelectorAll('.stagger-container');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const children = entry.target.children;
                Array.from(children).forEach((child, i) => {
                    child.style.transitionDelay = `${i * 0.1}s`;
                    child.classList.add('visible');
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    staggerContainers.forEach(el => observer.observe(el));
}

// Scroll Progress Bar
function initScrollProgress() {
    const progress = document.getElementById('scrollProgress');
    if (progress) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progress.style.width = `${scrollPercent}%`;
        });
    }
}

// 3D Tilt Effect on Cards
function initTiltEffect() {
    document.querySelectorAll('.tilt-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            const rotateX = (y - 0.5) * -10;
            const rotateY = (x - 0.5) * 10;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// Typewriter Effect
function initTypewriter() {
    document.querySelectorAll('.typewriter').forEach(el => {
        const text = el.dataset.text || el.textContent;
        el.textContent = '';
        el.style.borderRight = '2px solid var(--gold)';
        let i = 0;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const type = () => {
                        if (i < text.length) {
                            el.textContent += text.charAt(i);
                            i++;
                            setTimeout(type, 50);
                        } else {
                            // Blink cursor
                            setInterval(() => {
                                el.style.borderRightColor = el.style.borderRightColor === 'transparent' ? 'var(--gold)' : 'transparent';
                            }, 500);
                        }
                    };
                    type();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(el);
    });
}

// Custom Cursor Follower
function initCursorFollower() {
    const cursor = document.getElementById('cursorFollower');
    if (!cursor || window.matchMedia('(max-width: 992px)').matches) return;
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    document.querySelectorAll('a, button, .project-card, .service-item').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
            cursor.style.borderColor = 'transparent';
            cursor.style.backgroundColor = 'var(--gold)';
            cursor.style.mixBlendMode = 'difference';
            cursor.style.opacity = '0.5';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.borderColor = 'var(--gold)';
            cursor.style.backgroundColor = 'transparent';
            cursor.style.mixBlendMode = 'normal';
            cursor.style.opacity = '1';
        });
    });
}
