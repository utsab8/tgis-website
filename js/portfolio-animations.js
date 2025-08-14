document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations with enhanced settings
    AOS.init({
        duration: 1200,
        easing: 'ease-out-cubic',
        once: false,
        mirror: false,
        anchorPlacement: 'top-bottom',
        delay: 100,
        offset: 50
    });
    
    // Add beautiful entrance animations
    initializeEntranceAnimations();
    
    // Initialize advanced hover effects
    initializeAdvancedHoverEffects();
    
    // Initialize morphing animations
    initializeMorphingAnimations();
    
    // Initialize particles.js for background effects
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 100, density: { enable: true, value_area: 800 } },
                color: { value: '#ffffff' },
                shape: { 
                    type: 'circle', 
                    stroke: { width: 0, color: '#000000' },
                    polygon: { nb_sides: 5 },
                },
                opacity: { 
                    value: 0.5, 
                    random: true, 
                    anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } 
                },
                size: { 
                    value: 3, 
                    random: true, 
                    anim: { enable: true, speed: 2, size_min: 0.1, sync: false } 
                },
                line_linked: { 
                    enable: true, 
                    distance: 150, 
                    color: '#ffffff', 
                    opacity: 0.2, 
                    width: 1 
                },
                move: { 
                    enable: true, 
                    speed: 1, 
                    direction: 'none', 
                    random: true, 
                    straight: false, 
                    out_mode: 'out', 
                    bounce: false,
                    attract: { enable: false, rotateX: 600, rotateY: 1200 }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: { 
                    onhover: { enable: true, mode: 'grab' }, 
                    onclick: { enable: true, mode: 'push' }, 
                    resize: true 
                },
                modes: { 
                    grab: { distance: 140, line_linked: { opacity: 0.5 } }, 
                    bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
                    repulse: { distance: 200, duration: 0.4 },
                    push: { particles_nb: 4 }, 
                    remove: { particles_nb: 2 }
                }
            },
            retina_detect: true
        });
    }

    // Preloader animation
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            preloader.classList.add('fade-out');
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 1000);
        });
    }

    // Initialize VanillaTilt for 3D hover effects
    VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
        max: 10,
        speed: 400,
        glare: true,
        'max-glare': 0.3,
    });

    // Floating elements animation
    animateFloatingElements();

    // Animate counters when they come into view
    initializeCounters();

    // Portfolio item hover effects
    initializePortfolioHoverEffects();

    // Filter button animations
    initializeFilterButtonEffects();

    // Scroll animations for various sections
    initializeScrollAnimations();

    // Initialize parallax effect
    initializeParallaxEffect();
});

// Animate floating elements in the header
function animateFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach(element => {
        const speed = element.getAttribute('data-speed') || 2;
        const randomX = Math.random() * 20 - 10;
        const randomY = Math.random() * 20 - 10;
        
        // Set initial random position
        element.style.transform = `translate(${randomX}px, ${randomY}px)`;
        
        // Create floating animation
        anime({
            targets: element,
            translateX: [
                { value: randomX - 10, duration: 2000 * speed, easing: 'easeInOutQuad' },
                { value: randomX + 10, duration: 2000 * speed, easing: 'easeInOutQuad' }
            ],
            translateY: [
                { value: randomY - 15, duration: 2500 * speed, easing: 'easeInOutQuad' },
                { value: randomY + 15, duration: 2500 * speed, easing: 'easeInOutQuad' }
            ],
            rotate: [
                { value: -3, duration: 3000 * speed, easing: 'easeInOutSine' },
                { value: 3, duration: 3000 * speed, easing: 'easeInOutSine' }
            ],
            delay: Math.random() * 1000,
            loop: true,
            direction: 'alternate'
        });
    });
}

// Initialize counter animations
function initializeCounters() {
    const counterElements = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                let start = 0;
                const increment = target / (duration / 16); // 60fps
                
                function updateCounter() {
                    start += increment;
                    if (start < target) {
                        entry.target.textContent = Math.floor(start);
                        requestAnimationFrame(updateCounter);
                    } else {
                        entry.target.textContent = target;
                    }
                }
                
                requestAnimationFrame(updateCounter);
                counterObserver.unobserve(entry.target);
                
                // Add animation to the parent stat-item
                const statItem = entry.target.closest('.stat-item');
                if (statItem) {
                    statItem.classList.add('counted');
                }
            }
        });
    }, { threshold: 0.5 });
    
    counterElements.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Portfolio item hover effects
function initializePortfolioHoverEffects() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        const card = item.querySelector('.portfolio-card');
        const overlay = item.querySelector('.portfolio-overlay');
        const overlayContent = item.querySelector('.overlay-content');
        const image = item.querySelector('.portfolio-image img');
        const title = item.querySelector('.portfolio-title');
        const rating = item.querySelector('.portfolio-rating');
        
        if (card && overlay) {
            item.addEventListener('mouseenter', function() {
                overlay.style.opacity = '1';
                if (overlayContent) {
                    overlayContent.style.transform = 'translateY(0)';
                    
                    // Animate overlay content elements
                    const elements = overlayContent.querySelectorAll('.animate__animated');
                    elements.forEach((el, index) => {
                        el.classList.add('animate__fadeInUp');
                        el.style.animationDelay = `${0.1 * (index + 1)}s`;
                    });
                }
                if (image) {
                    image.style.transform = 'scale(1.1)';
                }
                if (title) {
                    title.style.color = 'var(--primary-blue)';
                }
                if (rating) {
                    const stars = rating.querySelectorAll('i');
                    stars.forEach((star, index) => {
                        setTimeout(() => {
                            star.classList.add('star-pulse');
                            setTimeout(() => {
                                star.classList.remove('star-pulse');
                            }, 500);
                        }, index * 100);
                    });
                }
            });
            
            item.addEventListener('mouseleave', function() {
                overlay.style.opacity = '0';
                if (overlayContent) {
                    overlayContent.style.transform = 'translateY(20px)';
                    
                    // Reset animations
                    const elements = overlayContent.querySelectorAll('.animate__animated');
                    elements.forEach(el => {
                        el.classList.remove('animate__fadeInUp');
                        el.style.animationDelay = '0s';
                    });
                }
                if (image) {
                    image.style.transform = 'scale(1)';
                }
                if (title) {
                    title.style.color = 'var(--text-dark)';
                }
            });
        }
    });
}

// Filter button effects
function initializeFilterButtonEffects() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-5px)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0)';
            }
        });
        
        button.addEventListener('click', function() {
            // Add click effect
            this.classList.add('filter-btn-clicked');
            setTimeout(() => {
                this.classList.remove('filter-btn-clicked');
            }, 300);
            
            // Reset all buttons
            filterButtons.forEach(btn => {
                btn.style.transform = 'translateY(0)';
            });
        });
    });
}

// Scroll animations for various sections
function initializeScrollAnimations() {
    // Staggered animation for portfolio items
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const portfolioObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.transitionDelay = `${index * 0.1}s`;
                entry.target.classList.add('in-view');
                portfolioObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    portfolioItems.forEach(item => {
        portfolioObserver.observe(item);
    });
    
    // Testimonial card animations
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.03)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
            
            // Animate rating stars
            const stars = this.querySelectorAll('.fa-star, .fa-star-half-alt');
            stars.forEach((star, index) => {
                setTimeout(() => {
                    star.classList.add('star-pulse');
                }, index * 100);
                
                setTimeout(() => {
                    star.classList.remove('star-pulse');
                }, 1000 + (index * 100));
            });
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        });
    });
    
    // Award item animations
    const awardItems = document.querySelectorAll('.award-item');
    awardItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotate(2deg)';
            
            // Animate award icon
            const icon = this.querySelector('.award-icon');
            if (icon) {
                icon.classList.add('animate__animated', 'animate__tada');
                setTimeout(() => {
                    icon.classList.remove('animate__animated', 'animate__tada');
                }, 1000);
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0)';
        });
    });
}

// Initialize parallax effect
function initializeParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.page-header-bg, .particles-container');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        parallaxElements.forEach(element => {
            // Only apply parallax effect if we're near the top of the page
            if (scrollPosition < 600) {
                const speed = 0.5; // Adjust for desired effect intensity
                const yPos = -(scrollPosition * speed);
                element.style.transform = `translateY(${yPos}px)`;
            }
        });
    });
    
    // Parallax effect on mouse move for header elements
    const header = document.querySelector('.portfolio-header');
    const headerContent = document.querySelector('.page-header-content');
    
    if (header && headerContent) {
        header.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            const moveX = (mouseX - 0.5) * 20; // Adjust for desired effect intensity
            const moveY = (mouseY - 0.5) * 20; // Adjust for desired effect intensity
            
            headerContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        header.addEventListener('mouseleave', function() {
            headerContent.style.transform = 'translate(0, 0)';
        });
    }
}

// Add custom cursor effect
function initializeCustomCursor() {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    const cursorDot = document.createElement('div');
    cursorDot.classList.add('cursor-dot');
    document.body.appendChild(cursorDot);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });
    
    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .portfolio-card, .filter-btn');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            cursorDot.classList.add('dot-hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            cursorDot.classList.remove('dot-hover');
        });
    });
}

// Add scroll progress indicator
function initializeScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.classList.add('scroll-progress');
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize beautiful entrance animations
function initializeEntranceAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Observe elements with entrance animations
    document.querySelectorAll('.portfolio-item, .testimonial-card, .award-item, .stat-item').forEach(el => {
        observer.observe(el);
    });
}

// Initialize advanced hover effects
function initializeAdvancedHoverEffects() {
    // Enhanced portfolio card effects
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    
    portfolioCards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.classList.add('ripple-effect');
            
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Add glow effect
            this.style.boxShadow = '0 0 30px rgba(71, 130, 180, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
    
    // Enhanced filter button effects
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Create pulse effect
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'click-ripple 0.3s ease-out';
            }, 10);
        });
    });
}

// Initialize morphing animations
function initializeMorphingAnimations() {
    // Morphing stat numbers
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        stat.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(5deg)';
            this.style.textShadow = '0 0 20px rgba(71, 130, 180, 0.5)';
        });
        
        stat.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.textShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Morphing award icons
    const awardIcons = document.querySelectorAll('.award-icon');
    
    awardIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: [1, 1.3, 1.1],
                rotate: [0, 360, 0],
                duration: 800,
                easing: 'easeOutElastic(1, .8)'
            });
        });
    });
}

// Add dynamic CSS for ripple effect
const rippleCSS = `
.ripple-effect {
    position: absolute;
    border-radius: 50%;
    background: rgba(71, 130, 180, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
    width: 20px;
    height: 20px;
    margin-left: -10px;
    margin-top: -10px;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

.scroll-progress {
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 4px;
    background: linear-gradient(90deg, var(--primary-blue), var(--dark-blue));
    z-index: 9999;
    transition: width 0.3s ease;
}

.custom-cursor {
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid var(--primary-blue);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: all 0.3s ease;
    transform: translate(-50%, -50%);
}

.cursor-dot {
    position: fixed;
    width: 4px;
    height: 4px;
    background: var(--primary-blue);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: all 0.1s ease;
}

.cursor-hover {
    transform: translate(-50%, -50%) scale(1.5);
    background: rgba(71, 130, 180, 0.1);
}

.dot-hover {
    transform: translate(-50%, -50%) scale(2);
}

.star-pulse {
    animation: star-pulse-animation 0.5s ease-out;
}

@keyframes star-pulse-animation {
    0% { transform: scale(1); }
    50% { transform: scale(1.3); color: #ffd700; }
    100% { transform: scale(1); }
}
`;

// Inject the CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = rippleCSS;
document.head.appendChild(styleSheet);