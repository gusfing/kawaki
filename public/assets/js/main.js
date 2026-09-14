function initGlobalNav() {
    const toggleBtns = document.querySelectorAll('#menuToggleBtn, #compactMenuLink, .card-hamburger-btn, .nav-right, #menuCloseBtn, .menu-close-btn, #lamaMenuBtn, #lamaMenuTextBtn, #uclayMenuTrigger');
    const menu = document.getElementById('fullscreenMenu');
    const navWrapper = document.querySelector('.nav-wrapper');
    const lamaTopRight = document.getElementById('lamaTopRight');
    const body = document.body;
    
    let isMenuOpen = false;

    function toggleMenuState() {
        if (!menu) return;
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            body.classList.add('menu-is-open');
            menu.classList.add('open');
            menu.style.display = 'flex';
            menu.style.opacity = '1';
            menu.style.pointerEvents = 'auto';
            body.style.overflow = 'hidden';
            
            if (typeof gsap !== 'undefined') {
                gsap.set('.menu-overlay-layer', { scaleY: 0, transformOrigin: 'top center' });
                gsap.to('.menu-overlay-layer', {
                    scaleY: 1,
                    duration: 0.75,
                    stagger: 0.09,
                    ease: 'power4.inOut'
                });
                
                gsap.fromTo('.menu-content-wrapper', 
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.6, delay: 0.35, ease: 'power3.out' }
                );
                
                gsap.fromTo('.main-menu-links ul li', 
                    { y: 35, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.65, stagger: 0.06, delay: 0.4, ease: 'power3.out' }
                );
            }
            
            const textEl = document.getElementById('menu-toggle-text');
            if (textEl) textEl.innerText = 'CLOSE';
        } else {
            body.classList.remove('menu-is-open');
            body.style.overflow = '';
            
            if (typeof gsap !== 'undefined') {
                gsap.to('.menu-content-wrapper', {
                    opacity: 0,
                    y: 15,
                    duration: 0.25,
                    ease: 'power2.in'
                });
                
                gsap.to('.menu-overlay-layer', {
                    scaleY: 0,
                    duration: 0.5,
                    stagger: 0.06,
                    ease: 'power3.inOut',
                    onComplete: () => {
                        menu.classList.remove('open');
                        menu.style.display = 'none';
                        menu.style.opacity = '0';
                        menu.style.pointerEvents = 'none';
                    }
                });
            } else {
                menu.classList.remove('open');
                menu.style.display = 'none';
                menu.style.opacity = '0';
                menu.style.pointerEvents = 'none';
            }
            
            const textEl = document.getElementById('menu-toggle-text');
            if (textEl) textEl.innerText = 'MENU';
        }
    }

    // Services Submenu Controller
    let isServicesOpen = false;
    const mainMenuPrimary = menu ? menu.querySelector('#mainMenuPrimary') : null;
    const mainMenuServices = menu ? menu.querySelector('#mainMenuServices') : null;
    const servicesTrigger = menu ? menu.querySelector('#menuServicesTrigger') : null;
    const servicesBackBtn = menu ? menu.querySelector('#menuServicesBackBtn') : null;

    function openServicesMenu() {
        if (!mainMenuPrimary || !mainMenuServices) return;
        isServicesOpen = true;

        if (typeof gsap !== 'undefined') {
            gsap.to(mainMenuPrimary, {
                opacity: 0,
                x: -20,
                duration: 0.25,
                ease: 'power2.in',
                onComplete: () => {
                    mainMenuPrimary.style.display = 'none';
                    mainMenuServices.style.display = 'block';
                    gsap.fromTo(mainMenuServices, 
                        { opacity: 0, x: 20 },
                        { opacity: 1, x: 0, duration: 0.35, ease: 'power3.out' }
                    );
                    gsap.fromTo('.menu-services-group',
                        { y: 15, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power3.out' }
                    );
                }
            });
        } else {
            mainMenuPrimary.style.display = 'none';
            mainMenuServices.style.display = 'block';
            mainMenuServices.style.opacity = '1';
        }
    }

    function closeServicesMenu() {
        if (!mainMenuPrimary || !mainMenuServices) return;
        isServicesOpen = false;

        if (typeof gsap !== 'undefined') {
            gsap.to(mainMenuServices, {
                opacity: 0,
                x: 20,
                duration: 0.2,
                ease: 'power2.in',
                onComplete: () => {
                    mainMenuServices.style.display = 'none';
                    mainMenuPrimary.style.display = 'block';
                    gsap.fromTo(mainMenuPrimary, 
                        { opacity: 0, x: -15 },
                        { opacity: 1, x: 0, duration: 0.3, ease: 'power3.out' }
                    );
                }
            });
        } else {
            mainMenuServices.style.display = 'none';
            mainMenuPrimary.style.display = 'block';
            mainMenuPrimary.style.opacity = '1';
        }
    }

    if (servicesTrigger) {
        servicesTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            openServicesMenu();
        });
    }

    if (servicesBackBtn) {
        servicesBackBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeServicesMenu();
        });
    }

    if (toggleBtns.length > 0 && menu) {
        toggleBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleMenuState();
            });
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            if (isServicesOpen) {
                closeServicesMenu();
            } else {
                toggleMenuState();
            }
        }
    });

    // Close on link click (exclude submenu trigger)
    if (menu) {
        const menuLinks = menu.querySelectorAll('.main-menu-links a:not(#menuServicesTrigger), .menu-services-list a, .menu-cta-button, .menu-services-hub-link');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (isMenuOpen) {
                    toggleMenuState();
                    if (isServicesOpen) {
                        mainMenuServices.style.display = 'none';
                        mainMenuPrimary.style.display = 'block';
                        mainMenuPrimary.style.opacity = '1';
                        isServicesOpen = false;
                    }
                }
            });
        });
    }

    // Hover image preview updates
    if (menu) {
        const menuItems = menu.querySelectorAll('.main-menu-links li, .menu-services-list li');
        const previewImg = document.getElementById('menuPreviewImg');
        const previewTag = document.getElementById('menuPreviewTag');
        const previewDesc = document.getElementById('menuPreviewDesc');

        menuItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                const img = item.dataset.img;
                const tag = item.dataset.tag;
                const desc = item.dataset.desc;
                if (previewImg && img) {
                    previewImg.style.opacity = '0';
                    setTimeout(() => {
                        previewImg.src = img;
                        previewImg.style.opacity = '1';
                    }, 120);
                }
                if (previewTag && tag) {
                    previewTag.textContent = tag;
                }
                if (previewDesc && desc) {
                    previewDesc.textContent = desc;
                }
            });
        });
    }

    // Smooth scroll listener for global floating nav-wrapper
    let isTicking = false;
    function handleHeaderScroll() {
        const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
        if (navWrapper) {
            if (scrollY > 30) {
                navWrapper.classList.add('scrolled');
            } else {
                navWrapper.classList.remove('scrolled');
            }
        }
        isTicking = false;
    }

    window.addEventListener('scroll', () => {
        if (!isTicking) {
            window.requestAnimationFrame(handleHeaderScroll);
            isTicking = true;
        }
    }, { passive: true });

    handleHeaderScroll(); // Run initially

    // Smooth Editorial Entrance Animation for Hero
    if (typeof gsap !== 'undefined' && document.querySelector('.hero-lamalama-section')) {
        const heroTl = gsap.timeline({ defaults: { ease: 'power4.out' } });

        heroTl.fromTo('.hero-lama-bg-img', 
            { scale: 1.08, opacity: 0.7 },
            { scale: 1.02, opacity: 1, duration: 2.2, ease: 'power3.out' },
            0
        );

        heroTl.fromTo('.nav-wrapper nav',
            { y: -30, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.1, ease: 'power4.out' },
            0.2
        );

        heroTl.fromTo('.hero-lama-eyebrow',
            { y: 25, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
            0.4
        );

        heroTl.fromTo('.hero-lama-title',
            { y: 45, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out' },
            0.5
        );

        heroTl.fromTo('.hero-lama-desc-box',
            { y: 35, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out' },
            0.65
        );

        heroTl.fromTo('.hero-lama-bottom-bar',
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out' },
            0.8
        );
    }

    // Live Digital Studio Clock
    function updateStudioClock() {
        const clockEl = document.getElementById('heroLiveClock');
        if (!clockEl) return;
        const now = new Date();
        const hrs = String(now.getHours()).padStart(2, '0');
        const mins = String(now.getMinutes()).padStart(2, '0');
        const secs = String(now.getSeconds()).padStart(2, '0');
        clockEl.textContent = `${hrs} : ${mins} : ${secs}`;
    }

    updateStudioClock();
    setInterval(updateStudioClock, 1000);

    // World Clocks Updater for Footer
    function updateWorldClocks() {
        const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
        
        const delhiEl = document.getElementById('footerTimeDelhi');
        if (delhiEl) {
            delhiEl.textContent = new Intl.DateTimeFormat('en-US', { ...timeOptions, timeZone: 'Asia/Kolkata' }).format(new Date()) + ' IST';
        }

        const tokyoEl = document.getElementById('footerTimeTokyo');
        if (tokyoEl) {
            tokyoEl.textContent = new Intl.DateTimeFormat('en-US', { ...timeOptions, timeZone: 'Asia/Tokyo' }).format(new Date()) + ' JST';
        }

        const londonEl = document.getElementById('footerTimeLondon');
        if (londonEl) {
            londonEl.textContent = new Intl.DateTimeFormat('en-US', { ...timeOptions, timeZone: 'Europe/London' }).format(new Date()) + ' GMT';
        }

        const nyEl = document.getElementById('footerTimeNY');
        if (nyEl) {
            nyEl.textContent = new Intl.DateTimeFormat('en-US', { ...timeOptions, timeZone: 'America/New_York' }).format(new Date()) + ' EST';
        }
    }

    updateWorldClocks();
    setInterval(updateWorldClocks, 1000);

    // Back to top button listener
    document.querySelectorAll('#backToTop, .footer-back-to-top').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // Process timeline step hover interaction
    const processCols = document.querySelectorAll('.hwb-step-col');
    if (processCols.length > 0) {
        processCols.forEach((col) => {
            col.addEventListener('mouseenter', () => {
                processCols.forEach((c) => c.classList.remove('active'));
                col.classList.add('active');
            });
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlobalNav);
} else {
    initGlobalNav();
}
