// Services Page Enhanced Animations
// Next-level animations and interactive effects

class ServicesAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.initializeAOS();
        this.initializeCounters();
        this.initializeParallax();
        this.initializeHoverEffects();
        this.initializeScrollEffects();
        this.initializeServiceCards();
        this.initializeProcessTimeline();
        this.initializeFloatingShapes();
        this.initializeLoadingScreen();
    }

    // Initialize AOS (Animate On Scroll)
    initializeAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: false,
                mirror: false,
                offset: 50,
                delay: 0
            });
        }
    }

    // Initialize Counter Animations
    initializeCounters() {
        const counters = document.querySelectorAll('[data-count]');
        
        const animateCounter = (counter) => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        };

        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        counters.forEach(counter => observer.observe(counter));
    }

    // Initialize Parallax Effects
    initializeParallax() {
        const parallaxElements = document.querySelectorAll('.floating-shapes .shape');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                element.style.transform = `translateY(${rate * speed}px)`;
            });
        });
    }

    // Initialize Hover Effects
    initializeHoverEffects() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.addHoverEffect(card, e);
            });
            
            card.addEventListener('mouseleave', (e) => {
                this.removeHoverEffect(card, e);
            });
        });
    }

    addHoverEffect(card, event) {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
        
        card.classList.add('hover-active');
    }

    removeHoverEffect(card, event) {
        card.classList.remove('hover-active');
    }

    // Initialize Scroll Effects
    initializeScrollEffects() {
        const header = document.querySelector('.services-header');
        const navbar = document.querySelector('.navbar');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const headerHeight = header.offsetHeight;
            
            if (scrolled > headerHeight * 0.5) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Initialize Service Cards
    initializeServiceCards() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach((card, index) => {
            // Add staggered animation delay
            card.style.animationDelay = `${index * 0.2}s`;
            
            // Add intersection observer for reveal animation
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                    }
                });
            }, { threshold: 0.3 });
            
            observer.observe(card);
        });
    }

    // Initialize Process Timeline
    initializeProcessTimeline() {
        const processSteps = document.querySelectorAll('.process-step');
        
        processSteps.forEach((step, index) => {
            const stepNumber = step.querySelector('.step-number');
            const stepIcon = step.querySelector('.step-icon');
            
            // Add click animation
            step.addEventListener('click', () => {
                this.animateStepClick(stepNumber, stepIcon);
            });
            
            // Add intersection observer
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('step-active');
                        this.animateStepNumber(stepNumber, index + 1);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(step);
        });
    }

    animateStepClick(stepNumber, stepIcon) {
        stepNumber.style.transform = 'scale(1.2)';
        stepIcon.style.transform = 'scale(1.1) rotate(360deg)';
        
        setTimeout(() => {
            stepNumber.style.transform = 'scale(1)';
            stepIcon.style.transform = 'scale(1) rotate(0deg)';
        }, 300);
    }

    animateStepNumber(stepNumber, number) {
        stepNumber.style.animation = 'stepReveal 0.6s ease-out';
        stepNumber.textContent = number.toString().padStart(2, '0');
    }

    // Initialize Floating Shapes
    initializeFloatingShapes() {
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach((shape, index) => {
            // Add random movement
            setInterval(() => {
                const randomX = Math.random() * 20 - 10;
                const randomY = Math.random() * 20 - 10;
                shape.style.transform = `translate(${randomX}px, ${randomY}px)`;
            }, 3000 + (index * 1000));
            
            // Add click effect
            shape.addEventListener('click', () => {
                this.animateShapeClick(shape);
            });
        });
    }

    animateShapeClick(shape) {
        shape.style.animation = 'shapePulse 0.6s ease-out';
        setTimeout(() => {
            shape.style.animation = '';
        }, 600);
    }

    // Initialize Loading Screen
    initializeLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        
        if (loadingScreen) {
            // Hide loading screen after page load
            window.addEventListener('load', () => {
                setTimeout(() => {
                    loadingScreen.style.opacity = '0';
                    loadingScreen.style.visibility = 'hidden';
                    
                    // Trigger entrance animations
                    this.triggerEntranceAnimations();
                }, 1500);
            });
        }
    }

    triggerEntranceAnimations() {
        const elements = document.querySelectorAll('[data-aos]');
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('aos-animate');
            }, index * 100);
        });
    }

    // Utility Functions
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Enhanced CSS Animations
const enhancedAnimations = {
    // Add CSS animations dynamically
    addKeyframes() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes stepReveal {
                0% { transform: scale(0) rotate(0deg); opacity: 0; }
                50% { transform: scale(1.2) rotate(180deg); opacity: 1; }
                100% { transform: scale(1) rotate(360deg); opacity: 1; }
            }
            
            @keyframes shapePulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.3); }
                100% { transform: scale(1); }
            }
            
            @keyframes serviceCardReveal {
                0% { transform: translateY(50px) scale(0.9); opacity: 0; }
                100% { transform: translateY(0) scale(1); opacity: 1; }
            }
            
            @keyframes iconFloat {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }
            
            @keyframes gradientShift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            
            .service-card.revealed {
                animation: serviceCardReveal 0.8s ease-out;
            }
            
            .step-active .step-number {
                animation: stepReveal 0.6s ease-out;
            }
            
            .service-icon {
                animation: iconFloat 3s ease-in-out infinite;
            }
            
            .gradient-animate {
                background-size: 200% 200%;
                animation: gradientShift 3s ease infinite;
            }
            
            .hover-active {
                transform: translateY(-10px) scale(1.02);
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            }
            
            .navbar.scrolled {
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            }
        `;
        document.head.appendChild(style);
    },

    // Add gradient animations to elements
    addGradientAnimations() {
        const gradientElements = document.querySelectorAll('.service-icon, .btn-service');
        gradientElements.forEach(element => {
            element.classList.add('gradient-animate');
        });
    },

    // Add smooth scrolling
    addSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add enhanced animations
    enhancedAnimations.addKeyframes();
    enhancedAnimations.addGradientAnimations();
    enhancedAnimations.addSmoothScrolling();
    
    // Initialize services animations
    new ServicesAnimations();
    
    // REMOVED: Custom cursor effects code
    // The following code block has been removed to disable pointer animation:
    /*
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.innerHTML = '<div class="cursor-dot"></div><div class="cursor-trail"></div>';
    document.body.appendChild(cursor);
    
    // Custom cursor animation
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        
        cursorX += dx * 0.1;
        cursorY += dy * 0.1;
        
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .btn');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
        });
    });
    */
});

// REMOVED: Custom cursor styles
// The following CSS styles have been removed:
/*
const cursorStyles = document.createElement('style');
cursorStyles.textContent = `
    .custom-cursor {
        position: fixed;
        top: 0;
        left: 0;
        width: 20px;
        height: 20px;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
    }
    
    .cursor-dot {
        width: 8px;
        height: 8px;
        background: white;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transition: all 0.1s ease;
    }
    
    .cursor-trail {
        width: 20px;
        height: 20px;
        border: 2px solid white;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transition: all 0.3s ease;
    }
    
    .cursor-hover .cursor-dot {
        transform: translate(-50%, -50%) scale(1.5);
    }
    
    .cursor-hover .cursor-trail {
        transform: translate(-50%, -50%) scale(1.2);
        border-color: rgba(255, 255, 255, 0.5);
    }
    
    @media (max-width: 768px) {
        .custom-cursor {
            display: none;
        }
    }
`;
document.head.appendChild(cursorStyles);
*/