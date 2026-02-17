// ==========================================
// WEBZINE MÚSICA LATINA - JAVASCRIPT
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // 1. CARRUSEL DE ÁLBUMES
    // ==========================================
    
    const viewport = document.querySelector('.albums-viewport');
    const track = document.querySelector('.albums-track');
    const leftArrow = document.querySelector('.carousel-arrow-left');
    const rightArrow = document.querySelector('.carousel-arrow-right');
    
    if (!viewport || !track) {
        console.warn('Elementos del carrusel no encontrados');
        return;
    }
    
    const config = {
        scrollDistance: 240,
        autoScrollDelay: 4000,
        userPauseTime: 8000,
        smoothScrollDuration: 400
    };
    
    let state = {
        isAutoScrolling: true,
        autoScrollInterval: null,
        userInteractionTimeout: null,
        isScrolling: false
    };
    
    function smoothScroll(distance) {
        if (state.isScrolling) return;
        
        state.isScrolling = true;
        viewport.scrollBy({
            left: distance,
            behavior: 'smooth'
        });
        
        setTimeout(() => {
            state.isScrolling = false;
        }, config.smoothScrollDuration);
    }
    
    function checkInfiniteLoop() {
        const scrollLeft = viewport.scrollLeft;
        const scrollWidth = viewport.scrollWidth;
        const clientWidth = viewport.clientWidth;
        const maxScroll = scrollWidth - clientWidth;
        
        if (scrollLeft >= maxScroll - 50) {
            viewport.scrollTo({
                left: 0,
                behavior: 'auto'
            });
        }
        
        if (scrollLeft <= 50) {
            viewport.scrollTo({
                left: maxScroll - 100,
                behavior: 'auto'
            });
        }
    }
    
    function startAutoScroll() {
        if (state.autoScrollInterval) {
            clearInterval(state.autoScrollInterval);
        }
        
        state.autoScrollInterval = setInterval(() => {
            if (state.isAutoScrolling && !state.isScrolling) {
                smoothScroll(config.scrollDistance);
                setTimeout(checkInfiniteLoop, config.smoothScrollDuration + 100);
            }
        }, config.autoScrollDelay);
    }
    
    function stopAutoScroll() {
        if (state.autoScrollInterval) {
            clearInterval(state.autoScrollInterval);
            state.autoScrollInterval = null;
        }
    }
    
    function pauseAutoScrollTemporarily() {
        state.isAutoScrolling = false;
        
        if (state.userInteractionTimeout) {
            clearTimeout(state.userInteractionTimeout);
        }
        
        state.userInteractionTimeout = setTimeout(() => {
            state.isAutoScrolling = true;
        }, config.userPauseTime);
    }
    
    function handleMouseEnter() {
        state.isAutoScrolling = false;
    }
    
    function handleMouseLeave() {
        state.isAutoScrolling = true;
    }
    
    function handleLeftClick() {
        pauseAutoScrollTemporarily();
        smoothScroll(-config.scrollDistance);
        setTimeout(checkInfiniteLoop, config.smoothScrollDuration + 100);
    }
    
    function handleRightClick() {
        pauseAutoScrollTemporarily();
        smoothScroll(config.scrollDistance);
        setTimeout(checkInfiniteLoop, config.smoothScrollDuration + 100);
    }
    
    function handleManualScroll() {
        if (state.isAutoScrolling) {
            pauseAutoScrollTemporarily();
        }
    }
    
    viewport.addEventListener('mouseenter', handleMouseEnter);
    viewport.addEventListener('mouseleave', handleMouseLeave);
    viewport.addEventListener('scroll', handleManualScroll, { passive: true });
    
    if (leftArrow) {
        leftArrow.addEventListener('click', handleLeftClick);
        leftArrow.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleLeftClick();
            }
        });
    }
    
    if (rightArrow) {
        rightArrow.addEventListener('click', handleRightClick);
        rightArrow.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleRightClick();
            }
        });
    }
    
    startAutoScroll();
    viewport.scrollLeft = (viewport.scrollWidth - viewport.clientWidth) / 2;
      
    const articles = document.querySelectorAll('article');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const articleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    articles.forEach(article => {
        articleObserver.observe(article);
    });
    

    
    const backToIndexBtn = document.querySelector('.back-to-index');
    
    if (backToIndexBtn) {
        let scrollTimeout;
        
        function toggleBackButton() {
            const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
            const triggerHeight = 500;
            
            if (scrollPosition > triggerHeight) {
                backToIndexBtn.classList.add('visible');
            } else {
                backToIndexBtn.classList.remove('visible');
            }
        }
        
        function handleScroll() {
            if (scrollTimeout) {
                window.cancelAnimationFrame(scrollTimeout);
            }
            
            scrollTimeout = window.requestAnimationFrame(() => {
                toggleBackButton();
            });
        }
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        toggleBackButton();
    }
    

    
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const checkbox = this.querySelector('input[type="checkbox"]');
            const submitBtn = this.querySelector('button[type="submit"]');
            
            if (!emailInput.value || !emailInput.validity.valid) {
                alert('Por favor, ingresa un correo electrónico válido.');
                emailInput.focus();
                return;
            }
            
            if (!checkbox.checked) {
                alert('Por favor, acepta los términos para continuar.');
                checkbox.focus();
                return;
            }
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';
            
            setTimeout(() => {
                submitBtn.textContent = '¡Suscrito! ✓';
                submitBtn.style.background = '#28a745';
                
                setTimeout(() => {
                    newsletterForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Suscribirme';
                    submitBtn.style.background = '';
                }, 3000);
            }, 1500);
        });
    }
    

    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (this.classList.contains('back-to-index')) {
                return;
            }
            
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    

    
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.style.backgroundColor = '#f0f0f0';
            this.alt = 'Imagen no disponible';
            console.warn(`Error al cargar imagen: ${this.src}`);
        });
    });
    
    
    window.addEventListener('beforeunload', () => {
        stopAutoScroll();
        
        if (state.userInteractionTimeout) {
            clearTimeout(state.userInteractionTimeout);
        }
    });
    
});