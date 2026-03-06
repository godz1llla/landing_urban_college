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
    // Timeline Scroll Animations (IntersectionObserver)
    // =============================================
    const timelineItems = document.querySelectorAll('.timeline-item');

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Get index to stagger delay
                const index = [...timelineItems].indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 0.15}s`;
                entry.target.classList.add('animate');
                timelineObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -80px 0px'
    });

    timelineItems.forEach(item => timelineObserver.observe(item));
});
