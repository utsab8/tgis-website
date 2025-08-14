/**
 * Training Services Animations
 * Advanced animations for the training services page
 * Enhanced with GSAP, Anime.js, and custom effects
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS with enhanced settings
    AOS.init({
        duration: 1200,          // Increased duration for smoother animations
        easing: 'ease-in-out',   // Smooth easing
        once: false,             // Animations occur every time you scroll
        mirror: true,            // Whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom', // Anchor placement
        delay: 100,              // Small delay for staggered effect
        disable: window.innerWidth < 768 // Disable on mobile for performance
    });
    
    // Initialize custom cursor
    initCustomCursor();
    
    // Initialize scroll progress indicator
    initScrollProgress();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize particles.js with enhanced settings
    initParticles();
    
    // Initialize enhanced category card animations
    initCategoryCardAnimations();
    
    // Initialize enhanced course card animations
    initCourseCardAnimations();
    
    // Initialize stats counter animations
    initStatsAnimations();
    
    // Initialize staggered feature animations
    initFeatureAnimations();
    
    // Initialize parallax effect for header background
    initParallaxEffect();

    
    // Custom cursor initialization function
    function initCustomCursor() {
        // Check if we're on a touch device - don't use custom cursor on touch devices
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            return;
        }
        
        // Get the custom cursor elements
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');
        
        if (!cursorDot || !cursorOutline) return;
        
        // Add the active class to body to hide the default cursor
        document.body.classList.add('custom-cursor-active');
        
        // Track mouse movement with anime.js for smooth animation
        document.addEventListener('mousemove', function(e) {
            // Animate the dot to follow cursor exactly
            anime({
                targets: cursorDot,
                left: e.clientX,
                top: e.clientY,
                duration: 50,
                easing: 'linear'
            });
            
            // Animate the outline with a spring effect for more organic movement
            anime({
                targets: cursorOutline,
                left: e.clientX,
                top: e.clientY,
                duration: 300,
                easing: 'spring(1, 80, 10, 0)'
            });
        });
        
        // Add hover effect to all interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .course-card, .category-card, .tab-button, .accordion-header');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.classList.add('cursor-hover');
            });
            
            el.addEventListener('mouseleave', () => {
                cursorOutline.classList.remove('cursor-hover');
            });
        });
        
        // Add click animation
        document.addEventListener('mousedown', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(0.9)';
        });
        
        document.addEventListener('mouseup', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        });
        
        // Handle cursor leaving the window
        document.addEventListener('mouseleave', () => {
            cursorDot.style.opacity = '0';
            cursorOutline.style.opacity = '0';
        });
        
        document.addEventListener('mouseenter', () => {
            cursorDot.style.opacity = '1';
            cursorOutline.style.opacity = '1';
        });
    }

    // Scroll progress indicator function
    function initScrollProgress() {
        const progressBar = document.querySelector('.scroll-progress-bar');
        if (!progressBar) return;
        
        // Update progress bar width based on scroll position
        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = (scrollTop / scrollHeight) * 100;
            
            progressBar.style.width = scrollPercent + '%';
        });
    }
    
    // Back to top button function
    function initBackToTop() {
        const backToTopButton = document.getElementById('back-to-top');
        if (!backToTopButton) return;
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                if (!backToTopButton.classList.contains('visible')) {
                    backToTopButton.classList.add('visible');
                }
            } else {
                if (backToTopButton.classList.contains('visible')) {
                    backToTopButton.classList.remove('visible');
                }
            }
        });
        
        // Scroll to top with smooth animation when clicked
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Animate scroll to top
            anime({
                targets: [document.documentElement, document.body],
                scrollTop: 0,
                duration: 800,
                easing: 'easeInOutQuad'
            });
        });
    }
    
    // Initialize particles.js for background effects
    function initParticles() {
        const particlesContainer = document.getElementById('particles-container');
        if (!particlesContainer) return;
        
        particlesJS('particles-container', {
            "particles": {
                "number": {
                    "value": 80,  // Increased particle count
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": ["#0078ff", "#00c6ff", "#ffffff"]  // Multiple colors
                },
                "shape": {
                    "type": ["circle", "triangle", "polygon", "edge"],  // Multiple shapes
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 6
                    },
                    "image": {
                        "src": "img/github.svg",
                        "width": 100,
                        "height": 100
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "bubble"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "repulse"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 400,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 250,
                        "size": 6,
                        "duration": 2,
                        "opacity": 0.8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
                },
                "size": {
                    "value": 5,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 4,
                        "size_min": 0.3,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": true,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "bubble"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "repulse"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 400,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 250,
                        "size": 6,
                        "duration": 2,
                        "opacity": 0.8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }
    
    // Enhanced course card animations with GSAP and shine effect
    function initCourseCardAnimations() {
        const courseCards = document.querySelectorAll('.course-card');
        if (courseCards.length === 0) return;
        
        // Add shine element to each card
        courseCards.forEach(card => {
            // Create shine element if it doesn't exist
            if (!card.querySelector('.card-shine')) {
                const shine = document.createElement('div');
                shine.classList.add('card-shine');
                card.appendChild(shine);
            }
            
            // Create a GSAP timeline for each card
            const cardTimeline = gsap.timeline({ paused: true });
            
            // Get card elements
            const cardImage = card.querySelector('.course-image img');
            const cardBadge = card.querySelector('.course-badge');
            const cardTitle = card.querySelector('.course-title');
            const cardFeatures = card.querySelectorAll('.course-features li');
            const cardButton = card.querySelector('.btn');
            const cardShine = card.querySelector('.card-shine');
            
            // Add animations to timeline
            cardTimeline
                .to(card, { 
                    y: -15, 
                    scale: 1.02,
                    boxShadow: '0 20px 30px rgba(0, 0, 0, 0.2)',
                    duration: 0.4,
                    ease: 'power2.out'
                })
                .to(cardImage, { 
                    scale: 1.1, 
                    duration: 0.5,
                    ease: 'power1.out'
                }, '<')
                .to(cardBadge, { 
                    scale: 1.1, 
                    y: -5,
                    duration: 0.3,
                    ease: 'back.out(1.7)'
                }, '<+0.1')
                .to(cardTitle, { 
                    color: 'var(--primary-color)', 
                    duration: 0.3 
                }, '<')
                .to(cardButton, { 
                    scale: 1.05, 
                    backgroundColor: 'var(--accent-color)',
                    duration: 0.3 
                }, '<')
                .to(cardShine, {
                    opacity: 0.7,
                    backgroundPosition: '200% 200%',
                    duration: 0.8,
                    ease: 'power1.inOut'
                }, '<');
            
            // Stagger animation for features
            if (cardFeatures.length > 0) {
                cardTimeline.to(cardFeatures, {
                    x: 5,
                    stagger: 0.05,
                    duration: 0.3,
                    ease: 'power1.out'
                }, '<+0.1');
            }
            
            // Add hover event listeners
            card.addEventListener('mouseenter', () => {
                // Play the animation
                cardTimeline.play();
            });
            
            card.addEventListener('mouseleave', () => {
                // Reverse the animation
                cardTimeline.reverse();
            });
        });
    }
    
    // Enhanced stats animations with counter effect
    function initStatsAnimations() {
        const statItems = document.querySelectorAll('.stat-item');
        if (statItems.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statItem = entry.target;
                    const statValue = statItem.querySelector('.stat-value');
                    const statIcon = statItem.querySelector('i');
                    
                    // Add animation class
                    statItem.classList.add('animate__animated');
                    
                    // Animate the counter
                    if (statValue) {
                        const finalValue = parseInt(statValue.getAttribute('data-value') || statValue.textContent, 10);
                        const suffix = statValue.getAttribute('data-suffix') || '';
                        
                        anime({
                            targets: statValue,
                            innerHTML: [0, finalValue],
                            round: 1,
                            duration: 2000,
                            easing: 'easeInOutExpo',
                            update: function(anim) {
                                statValue.innerHTML = Math.round(anim.animations[0].currentValue) + suffix;
                            }
                        });
                    }
                    
                    // Animate the icon
                    if (statIcon) {
                        anime({
                            targets: statIcon,
                            rotate: [0, 360],
                            scale: [1, 1.5, 1],
                            duration: 1500,
                            easing: 'easeInOutBack'
                        });
                    }
                    
                    // Unobserve after animation
                    observer.unobserve(statItem);
                }
            });
        }, { threshold: 0.5 });
        
        statItems.forEach(item => {
            observer.observe(item);
        });
    }
    
    // Enhanced staggered feature animations
    function initFeatureAnimations() {
        const courseCards = document.querySelectorAll('.course-card');
        if (courseCards.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    const features = card.querySelectorAll('.course-features li');
                    
                    // Stagger the animations
                    features.forEach((feature, index) => {
                        setTimeout(() => {
                            feature.classList.add('feature-animate');
                            
                            // Animate the icon
                            const icon = feature.querySelector('i');
                            if (icon) {
                                anime({
                                    targets: icon,
                                    rotate: [0, 15, 0],
                                    scale: [1, 1.2, 1],
                                    duration: 800,
                                    easing: 'easeInOutBack'
                                });
                            }
                        }, 100 * index);
                    });
                    
                    // Unobserve after animation
                    observer.unobserve(card);
                }
            });
        }, { threshold: 0.2 });
        
        courseCards.forEach(card => {
            observer.observe(card);
        });
    }
    
    // Enhanced parallax effect for header background
    function initParallaxEffect() {
        const header = document.querySelector('.training-header');
        const floatingElements = document.querySelectorAll('.floating-elements .floating-element');
        const headerContent = document.querySelector('.header-content');
        
        if (!header) return;
        
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            const headerHeight = header.offsetHeight;
            const scrollRatio = scrollPosition / headerHeight;
            
            // Parallax for background
            header.style.backgroundPosition = `50% ${50 + (scrollRatio * 30)}%`;
            
            // Parallax for floating elements with different speeds for depth effect
            if (floatingElements.length > 0) {
                floatingElements.forEach((element, index) => {
                    const speed = 0.1 + (index % 3) * 0.05; // Different speeds for different elements
                    const yPos = -scrollPosition * speed;
                    element.style.transform = `translateY(${yPos}px) ${element.getAttribute('data-transform') || ''}`;
                });
            }
            
            // Parallax for header content
            if (headerContent) {
                headerContent.style.transform = `translateY(${scrollPosition * 0.2}px)`;
                headerContent.style.opacity = 1 - (scrollRatio * 1.5);
            }
        });
    }
    
    // Enhanced category card animations with GSAP
    function initCategoryCardAnimations() {
        const categoryCards = document.querySelectorAll('.category-card');
        if (categoryCards.length === 0) return;
        
        categoryCards.forEach(card => {
            // Create a GSAP timeline for each card
            const cardTimeline = gsap.timeline({ paused: true });
            
            // Get card elements
            const cardIcon = card.querySelector('.category-icon');
            const cardTitle = card.querySelector('h3');
            const cardButton = card.querySelector('.btn');
            
            // Add animations to timeline
            cardTimeline
                .to(card, { 
                    y: -15, 
                    boxShadow: '0 20px 30px rgba(0, 0, 0, 0.2)',
                    duration: 0.3,
                    ease: 'power2.out'
                })
                .to(cardIcon, { 
                    scale: 1.2, 
                    y: -5, 
                    color: 'var(--accent-color)',
                    duration: 0.3,
                    ease: 'back.out(1.7)'
                }, '<')
                .to(cardTitle, { 
                    color: 'var(--primary-color)', 
                    duration: 0.3 
                }, '<')
                .to(cardButton, { 
                    scale: 1.05, 
                    duration: 0.3 
                }, '<');
            
            // Add hover event listeners
            card.addEventListener('mouseenter', () => {
                // Play the animation
                cardTimeline.play();
                
                // Dim and scale down sibling cards
                categoryCards.forEach(otherCard => {
                    if (otherCard !== card) {
                        gsap.to(otherCard, {
                            scale: 0.95,
                            opacity: 0.7,
                            duration: 0.3
                        });
                    }
                });
            });
            
            card.addEventListener('mouseleave', () => {
                // Reverse the animation
                cardTimeline.reverse();
                
                // Restore sibling cards
                categoryCards.forEach(otherCard => {
                    if (otherCard !== card) {
                        gsap.to(otherCard, {
                            scale: 1,
                            opacity: 1,
                            duration: 0.3
                        });
                    }
                });
            });
        });
    }
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.5
                        }
                    },
                    "push": {
                        "particles_nb": 3
                    }
                }
            },
            "retina_detect": true
        });
    }

    // Enhanced hover effects for category cards with GSAP animations
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        // Create a timeline for each card
        const cardTimeline = gsap.timeline({ paused: true });
        const cardIcon = card.querySelector('.category-icon i');
        const cardTitle = card.querySelector('.category-title');
        const cardBtn = card.querySelector('.btn');
        
        // Setup the animation sequence
        cardTimeline
            .to(card, { 
                y: -15, 
                boxShadow: '0 20px 30px rgba(0, 120, 255, 0.3), 0 0 30px rgba(0, 180, 255, 0.2)', 
                duration: 0.4, 
                ease: 'power2.out' 
            })
            .to(cardIcon, { 
                scale: 1.2, 
                color: 'var(--accent-color)', 
                textShadow: '0 0 15px rgba(0, 180, 255, 0.5)', 
                duration: 0.3, 
                ease: 'back.out(1.7)' 
            }, '-=0.3')
            .to(cardTitle, { 
                color: 'var(--accent-color)', 
                duration: 0.3 
            }, '-=0.2')
            .to(cardBtn, { 
                backgroundColor: 'var(--accent-color)', 
                color: '#fff', 
                duration: 0.3 
            }, '-=0.3');
        
        // Add event listeners to play/reverse the timeline
        card.addEventListener('mouseenter', function() {
            // Play this card's animation
            cardTimeline.play();
            
            // Dim sibling cards with GSAP
            categoryCards.forEach(sibling => {
                if (sibling !== this) {
                    gsap.to(sibling, { 
                        opacity: 0.6, 
                        scale: 0.95, 
                        filter: 'blur(2px)', 
                        duration: 0.3 
                    });
                }
            });
        });
        
        card.addEventListener('mouseleave', function() {
            // Reverse this card's animation
            cardTimeline.reverse();
            
            // Restore sibling cards with GSAP
            categoryCards.forEach(sibling => {
                if (sibling !== this) {
                    gsap.to(sibling, { 
                        opacity: 1, 
                        scale: 1, 
                        filter: 'blur(0px)', 
                        duration: 0.3 
                    });
                }
            });
        });
    });

    // Enhanced 3D tilt effect for course cards with GSAP
    const courseCards = document.querySelectorAll('.course-card');
    
    courseCards.forEach(card => {
        // Create shine effect element
        const shineElement = document.createElement('div');
        shineElement.classList.add('card-shine');
        card.appendChild(shineElement);
        
        // Create hover animation timeline
        const cardHoverTimeline = gsap.timeline({ paused: true });
        const cardImage = card.querySelector('.course-image img');
        const cardBadge = card.querySelector('.course-badge');
        const cardTitle = card.querySelector('.course-title');
        const cardFeatures = card.querySelectorAll('.course-features li');
        const cardButton = card.querySelector('.btn');
        
        // Setup animation sequence
        cardHoverTimeline
            .to(card, { 
                boxShadow: '0 30px 60px rgba(0, 0, 0, 0.2), 0 0 30px rgba(0, 120, 255, 0.2)',
                y: -15,
                duration: 0.4,
                ease: 'power2.out'
            })
            .to(cardImage, {
                scale: 1.08,
                duration: 0.5,
                ease: 'power1.out'
            }, '-=0.4')
            .to(cardTitle, {
                color: 'var(--accent-color)',
                duration: 0.3
            }, '-=0.3');
            
        // Add staggered animation for features
        if (cardFeatures.length > 0) {
            cardHoverTimeline.to(cardFeatures, {
                x: 5,
                opacity: 1,
                stagger: 0.05,
                duration: 0.2,
                ease: 'power1.out'
            }, '-=0.2');
        }
        
        // Add badge animation if it exists
        if (cardBadge) {
            cardHoverTimeline.to(cardBadge, {
                scale: 1.1,
                rotation: 5,
                duration: 0.3,
                ease: 'back.out(1.7)'
            }, '-=0.4');
        }
        
        // Add button animation
        if (cardButton) {
            cardHoverTimeline.to(cardButton, {
                backgroundColor: 'var(--accent-color)',
                color: '#fff',
                scale: 1.05,
                duration: 0.3
            }, '-=0.3');
        }
        
        // 3D tilt effect with mouse movement
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX * 12; // Max 12 degrees rotation
            const deltaY = (y - centerY) / centerY * 12;
            
            // Apply 3D transform with GSAP
            gsap.to(card, {
                rotationX: -deltaY,
                rotationY: deltaX,
                scale: 1.02,
                duration: 0.3,
                ease: 'power1.out',
                transformPerspective: 1000,
                transformStyle: 'preserve-3d'
            });
            
            // Move shine effect
            const shinePosX = (x / rect.width) * 100;
            const shinePosY = (y / rect.height) * 100;
            gsap.to(shineElement, {
                backgroundPosition: `${shinePosX}% ${shinePosY}%`,
                opacity: 0.15,
                duration: 0.5
            });
        });
        
        // Play/reverse hover animation
        card.addEventListener('mouseenter', function() {
            cardHoverTimeline.play();
        });
        
        card.addEventListener('mouseleave', function() {
            cardHoverTimeline.reverse();
            
            // Reset 3D transform
            gsap.to(card, {
                rotationX: 0,
                rotationY: 0,
                scale: 1,
                duration: 0.5,
                ease: 'power1.out'
            });
            
            // Hide shine
            gsap.to(shineElement, {
                opacity: 0,
                duration: 0.3
            });
        });
    });

    // Scroll-triggered animations for stats with counter effect
    const statItems = document.querySelectorAll('.stat-item');
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add bounce animation
                entry.target.classList.add('animate__animated', 'animate__bounceIn');
                
                // Add number counter animation
                const statValue = entry.target.querySelector('.stat-value');
                if (statValue) {
                    const targetValue = parseInt(statValue.getAttribute('data-value') || statValue.innerText, 10);
                    const duration = 2000; // 2 seconds
                    
                    // Save original text if it has a suffix like '+' or '%'
                    const originalText = statValue.innerText;
                    const suffix = originalText.replace(/[0-9]/g, '').trim();
                    
                    // Start counter animation
                    let startValue = 0;
                    const startTime = performance.now();
                    
                    function updateCounter(currentTime) {
                        const elapsedTime = currentTime - startTime;
                        const progress = Math.min(elapsedTime / duration, 1);
                        
                        // Use easeOutExpo for more dynamic counting
                        const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                        const currentValue = Math.floor(easedProgress * targetValue);
                        
                        statValue.textContent = currentValue + suffix;
                        
                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        }
                    }
                    
                    requestAnimationFrame(updateCounter);
                }
                
                // Add icon animation if present
                const statIcon = entry.target.querySelector('i');
                if (statIcon) {
                    anime({
                        targets: statIcon,
                        rotateY: [0, 360],
                        scale: [1, 1.5, 1],
                        duration: 1200,
                        easing: 'easeInOutQuad'
                    });
                }
                
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statItems.forEach(item => {
        statObserver.observe(item);
    });

    // Enhanced staggered animations for course features
    const courseFeatures = document.querySelectorAll('.course-features li');
    const featureObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Group features by their parent course card
                const parentCard = entry.target.closest('.course-card');
                const siblingFeatures = parentCard ? Array.from(parentCard.querySelectorAll('.course-features li')) : [];
                const featureIndex = siblingFeatures.indexOf(entry.target);
                
                // Add staggered delay based on index within the same card
                setTimeout(() => {
                    // Add the animation class
                    entry.target.classList.add('feature-animate');
                    
                    // Animate the icon with anime.js
                    const icon = entry.target.querySelector('i');
                    if (icon) {
                        anime({
                            targets: icon,
                            scale: [0, 1.2, 1],
                            rotate: [0, 15, 0],
                            opacity: [0, 1],
                            color: ['#666', 'var(--accent-color)'],
                            duration: 600,
                            easing: 'easeOutElastic(1, .5)'
                        });
                    }
                }, featureIndex * 150); // 150ms delay between items in the same card
                
                featureObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -10% 0px' });
    
    courseFeatures.forEach(feature => {
        featureObserver.observe(feature);
    });

    // Enhanced parallax effect for header background with depth layers
    const trainingHeader = document.querySelector('.training-header');
    if (trainingHeader) {
        const headerBg = trainingHeader.querySelector('.service-header-bg');
        const floatingElements = trainingHeader.querySelectorAll('.floating-element');
        const headerContent = trainingHeader.querySelector('.service-header-content');
        
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            const headerHeight = trainingHeader.offsetHeight;
            const scrollRatio = Math.min(scrollPosition / headerHeight, 1);
            
            // Parallax for background
            if (headerBg) {
                headerBg.style.transform = `translateY(${scrollPosition * 0.4}px) scale(${1 + scrollRatio * 0.1})`;
                headerBg.style.opacity = 1 - scrollRatio * 0.5;
            }
            
            // Parallax for floating elements with different speeds
            floatingElements.forEach((element, index) => {
                const speed = 0.2 + (index % 3) * 0.1; // Different speeds based on element index
                const direction = index % 2 === 0 ? 1 : -1; // Alternate directions
                element.style.transform = `translateY(${scrollPosition * speed * direction}px)`;
            });
            
            // Move header content up slightly for depth effect
            if (headerContent) {
                headerContent.style.transform = `translateY(${scrollPosition * -0.2}px)`;
            }
        });
    }
});