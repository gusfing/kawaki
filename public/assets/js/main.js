function initGlobalNav() {
    const toggleBtns = document.querySelectorAll('#menuToggleBtn, .card-hamburger-btn, .nav-right, #menuCloseBtn, .menu-close-btn');
    const menu = document.getElementById('fullscreenMenu');
    const navWrapper = document.querySelector('.nav-wrapper');
    const body = document.body;
    
    let isMenuOpen = false;

    function toggleMenuState() {
        if (!menu) return;
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            menu.classList.add('open');
            menu.style.display = 'flex';
            menu.style.opacity = '1';
            menu.style.pointerEvents = 'auto';
            body.style.overflow = 'hidden';
            
            if (typeof gsap !== 'undefined') {
                gsap.set('.menu-overlay-layer', { scaleY: 0, transformOrigin: 'top center' });
                gsap.to('.menu-overlay-layer', {
                    scaleY: 1,
                    duration: 0.65,
                    stagger: 0.08,
                    ease: 'power3.inOut'
                });
                
                gsap.fromTo('.menu-content-wrapper', 
                    { opacity: 0, y: 25 },
                    { opacity: 1, y: 0, duration: 0.45, delay: 0.3, ease: 'power2.out' }
                );
                
                gsap.fromTo('.main-menu-links ul li', 
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.55, stagger: 0.05, delay: 0.35, ease: 'power3.out' }
                );
            }
            
            const textEl = document.getElementById('menu-toggle-text');
            if (textEl) textEl.innerText = 'CLOSE';
        } else {
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

    if (toggleBtns.length > 0 && menu) {
        toggleBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleMenuState();
            });
        });
    }

    // Hover image preview updates
    if (menu) {
        const menuItems = menu.querySelectorAll('.main-menu-links li');
        const previewImg = document.getElementById('menuPreviewImg');
        const previewTag = document.getElementById('menuPreviewTag');

        menuItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                const img = item.dataset.img;
                const tag = item.dataset.tag;
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
            });
        });
    }

    // Scroll listener for nav-wrapper (non-homepage)
    if (navWrapper) {
        const isHomePage = document.querySelector('.hero-card-section, .card-hero-content') !== null;
        if (!isHomePage) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navWrapper.classList.add('scrolled');
                } else {
                    navWrapper.classList.remove('scrolled');
                }
            });
        }
    }

    // Back to top button listener
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Magnetic button hover effect
    const magneticButtons = document.querySelectorAll('.rlvnt-btn');
    magneticButtons.forEach((btn) => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - (rect.left + rect.width / 2);
            const y = e.clientY - (rect.top + rect.height / 2);
            if (typeof gsap !== 'undefined') {
                gsap.to(btn, { x: x * 0.25, y: y * 0.25, duration: 0.3, ease: 'power2.out' });
            }
        });
        btn.addEventListener('mouseleave', () => {
            if (typeof gsap !== 'undefined') {
                gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', initGlobalNav);
