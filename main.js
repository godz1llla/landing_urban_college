// Premium JS for URBAN COLLEGE

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileClose = document.getElementById('mobile-menu-close');
    const navLinks = document.querySelectorAll('.nav-list a, .mobile-nav-list a');
    const leadForm = document.getElementById('lead-form');
    const revealElements = document.querySelectorAll('.reveal');

    // Smooth Scroll
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    toggleMenu(false);
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Mobile Menu Logic
    const toggleMenu = (active) => {
        if (active) {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    mobileBtn?.addEventListener('click', () => toggleMenu(true));
    mobileClose?.addEventListener('click', () => toggleMenu(false));

    // Intersection Observer for Reveal Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // Scrolled Header Effect
    const handleHeader = () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleHeader, { passive: true });
    handleHeader();

    // Lead Form Submission
    leadForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = leadForm.querySelector('button');
        const originalText = btn.textContent;

        btn.disabled = true;
        btn.textContent = 'Жіберілуде...';

        setTimeout(() => {
            alert('Рақмет! Сіздің өтінішіңіз сәтті қабылданды. Біз сізбен жақын арада хабарласамыз.');
            leadForm.reset();
            btn.disabled = false;
            btn.textContent = originalText;
        }, 1500);
    });

    // Language Toggle
    const langSwitchers = document.querySelectorAll('.lang-switcher');
    langSwitchers.forEach(sw => {
        sw.addEventListener('click', (e) => {
            if (e.target.tagName === 'SPAN') {
                sw.querySelectorAll('span').forEach(s => s.classList.remove('active'));
                e.target.classList.add('active');
            }
        });
    });

    // =============================================
    // Sticky Scroll Timeline
    // =============================================
    const stickyWrapper = document.querySelector('.timeline-sticky-wrapper');
    const slides = document.querySelectorAll('.tl-slide');
    const dots = document.querySelectorAll('.tl-dot');
    let currentSlide = 0;

    function activateSlide(index) {
        if (index === currentSlide) return;

        // Exit current slide
        slides[currentSlide].classList.remove('active');
        slides[currentSlide].classList.add('exit');
        setTimeout(() => slides[currentSlide]?.classList.remove('exit'), 600);

        dots[currentSlide].classList.remove('active');

        // Enter new slide
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function onTimelineScroll() {
        if (!stickyWrapper) return;
        const rect = stickyWrapper.getBoundingClientRect();
        const total = stickyWrapper.offsetHeight - window.innerHeight;
        const scrolled = -rect.top; // How many px have been scrolled within the wrapper
        const progress = Math.max(0, Math.min(1, scrolled / total)); // 0 → 1

        const newIndex = Math.min(
            slides.length - 1,
            Math.floor(progress * slides.length)
        );

        if (newIndex !== currentSlide) activateSlide(newIndex);
    }

    // Dot click: jump scroll to that slide's position
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            if (!stickyWrapper) return;
            const targetProgress = i / slides.length;
            const maxScroll = stickyWrapper.offsetHeight - window.innerHeight;
            const targetY = stickyWrapper.offsetTop + targetProgress * maxScroll;
            window.scrollTo({ top: targetY, behavior: 'smooth' });
        });
    });

    window.addEventListener('scroll', onTimelineScroll, { passive: true });
    onTimelineScroll();
});
