// Hero Slider & Carousels

document.addEventListener('DOMContentLoaded', () => {
    initHeroSlider();
    initTestimonialSlider();
});

// Hero Image Slider
function initHeroSlider() {
    const slider = document.querySelector('.hero__gallery');
    if (!slider) return;

    const slides = slider.querySelectorAll('.hero__slide');
    const prevBtn = slider.querySelector('.slider-prev');
    const nextBtn = slider.querySelector('.slider-next');
    const cardTitle = slider.querySelector('.slider-title');
    const cardLabel = slider.querySelector('.slider-label');
    
    if (slides.length === 0) return;

    let currentSlide = 0;
    let autoplayInterval;
    
    const slideData = [
        { label: 'LATEST PROJECT', title: 'Elegant Living\nRedefined' },
        { label: 'FEATURED', title: 'Luxury Dining\nExperience' },
        { label: 'SIGNATURE', title: 'Modern Comfort\nLiving' }
    ];

    function goToSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active', 'prev');
            if (i === index) {
                slide.classList.add('active');
            } else if (i === currentSlide) {
                slide.classList.add('prev');
            }
        });
        
        if (cardTitle && slideData[index]) {
            cardTitle.style.opacity = '0';
            cardTitle.style.transform = 'translateY(10px)';
            setTimeout(() => {
                cardTitle.innerHTML = slideData[index].title.replace('\n', '<br>');
                if (cardLabel) cardLabel.textContent = slideData[index].label;
                cardTitle.style.opacity = '1';
                cardTitle.style.transform = 'translateY(0)';
            }, 300);
        }
        
        currentSlide = index;
    }

    function nextSlide() {
        goToSlide((currentSlide + 1) % slides.length);
    }

    function prevSlide() {
        goToSlide((currentSlide - 1 + slides.length) % slides.length);
    }

    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    if (nextBtn) nextBtn.addEventListener('click', () => { stopAutoplay(); nextSlide(); startAutoplay(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { stopAutoplay(); prevSlide(); startAutoplay(); });

    // Touch/Swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    slider.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; }, {passive: true});
    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            stopAutoplay();
            diff > 0 ? nextSlide() : prevSlide();
            startAutoplay();
        }
    });

    // Initialize
    slides[0].classList.add('active');
    startAutoplay();
}

// Testimonial Carousel
function initTestimonialSlider() {
    // Basic slider if needed on other pages, testimonials page uses CSS grid currently
    const container = document.querySelector('.testimonials-slider');
    if (!container) return;
    
    // ... slider implementation ...
}
