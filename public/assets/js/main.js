function initGlobalNav() {
    const toggleBtn = document.getElementById('menuToggleBtn');
    const menu = document.getElementById('fullscreenMenu');
    const navWrapper = document.querySelector('.nav-wrapper');
    const body = document.body;
    
    let isMenuOpen = false;

    if (toggleBtn && menu) {
        toggleBtn.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            
            if (isMenuOpen) {
                // Open menu
                menu.classList.add('open');
                body.style.overflow = 'hidden'; // Prevent scrolling
                
                // Animate backgrounds
                gsap.to('.menu-overlay-layer', {
                    scaleY: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.inOut'
                });
                
                // Animate content
                gsap.to('.menu-content-wrapper', {
                    opacity: 1,
                    duration: 0.4,
                    delay: 0.5
                });
                
                gsap.to('.main-menu-links ul, .menu-info', {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    delay: 0.5,
                    ease: 'power3.out'
                });
                
                document.getElementById('menu-toggle-text').innerText = 'CLOSE';
            } else {
                // Close menu
                body.style.overflow = '';
                
                gsap.to('.main-menu-links ul, .menu-info', {
                    y: 40,
                    opacity: 0,
                    duration: 0.4,
                    ease: 'power2.in'
                });
                
                gsap.to('.menu-content-wrapper', {
                    opacity: 0,
                    duration: 0.3
                });
                
                gsap.to('.menu-overlay-layer', {
                    scaleY: 0,
                    duration: 0.8,
                    stagger: -0.1,
                    delay: 0.3,
                    ease: 'power3.inOut',
                    onComplete: () => {
                        menu.classList.remove('open');
                    }
                });
                
                document.getElementById('menu-toggle-text').innerText = 'MENU';
            }
        });

        // Hover image preview updates
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

    // Scroll listener for nav-wrapper
    if (navWrapper) {
        // If we are on the homepage, hide initially
        const isHomePage = document.querySelector('.hero .intro-content') !== null;
        if (isHomePage) {
            navWrapper.classList.add('hidden-header');
        }

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navWrapper.classList.add('scrolled');
                if (isHomePage && window.scrollY > window.innerHeight * 0.8) {
                    navWrapper.classList.remove('hidden-header');
                } else if (isHomePage) {
                    navWrapper.classList.add('hidden-header');
                }
            } else {
                navWrapper.classList.remove('scrolled');
                if (isHomePage) {
                    navWrapper.classList.add('hidden-header');
                }
            }
        });
    }

    // Classic Header Controls
    const classicHeader = document.getElementById('classicHeader');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const drawerCloseBtn = document.getElementById('drawerCloseBtn');
    const classicMobileDrawer = document.getElementById('classicMobileDrawer');

    if (classicHeader) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 30) {
                classicHeader.classList.add('scrolled');
            } else {
                classicHeader.classList.remove('scrolled');
            }
        });
    }

    if (mobileMenuBtn && classicMobileDrawer) {
        mobileMenuBtn.addEventListener('click', () => {
            classicMobileDrawer.classList.add('open');
            body.style.overflow = 'hidden';
        });
    }

    if (drawerCloseBtn && classicMobileDrawer) {
        drawerCloseBtn.addEventListener('click', () => {
            classicMobileDrawer.classList.remove('open');
            body.style.overflow = '';
        });
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
