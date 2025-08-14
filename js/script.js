// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeLoading();
    initializeNavigation();
    initializeHero();
    initializeAnimations();
    initializeCounters();
    initializeTestimonials();
    initializeScrollEffects();
    initializeLazyLoading();
    initializeFloatingButtons();
    
    // Initialize search if needed
    try {
        if (typeof initializeSearch === 'function') {
            initializeSearch();
        }
    } catch (e) {
        console.log('Search initialization skipped');
    }
});

// Loading Screen
function initializeLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Check if loading screen element exists before trying to manipulate it
    if (!loadingScreen) {
        return;
    }
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1500);
    });
}

// Navigation
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Sticky navigation
    window.addEventListener('scroll', function() {
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });
    }
    
    // Close mobile menu when clicking on links
    if (navLinks && navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navToggle && navMenu) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
                document.body.classList.remove('nav-open');
            });
        });
    }
    
    // Active link highlighting
    window.addEventListener('scroll', function() {
        if (!navLinks || navLinks.length === 0) return;
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href) return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Hero Section
function initializeHero() {
    const video = document.querySelector('.hero-video video');
    
    if (video) {
        // Ensure video plays on mobile
        video.play().catch(() => {
            // Ignore autoplay errors
        });
        
        // Video error handling
        video.addEventListener('error', function() {
            const heroSection = document.querySelector('.hero');
            if (heroSection) {
                heroSection.style.background = 'linear-gradient(135deg, rgba(71, 130, 180, 0.8), rgba(135, 206, 235, 0.6)), url("/placeholder.svg?height=1080&width=1920&text=Hero+Background") center/cover';
            }
        });
    }
    
    // Parallax effect for hero content
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Animation on Scroll (AOS)
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);
    
    // Observe all elements with data-aos attribute
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

// Counter Animation
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    if (!counters || counters.length === 0) return;

    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target')) || 0;
                const increment = Math.max(1, target / 100);
                let current = 0;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.min(target, Math.ceil(current));
                        setTimeout(updateCounter, 20);
                    } else {
                        counter.textContent = target + '+';
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Testimonials Carousel
function initializeTestimonials() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let slideInterval;
    
    function showSlide(index) {
        if (!slides || slides.length === 0) return;
        slides.forEach(slide => slide.classList.remove('active'));
        if (dots && dots.length > 0) dots.forEach(dot => dot.classList.remove('active'));
        
        const safeIndex = ((index % slides.length) + slides.length) % slides.length;
        slides[safeIndex].classList.add('active');
        if (dots && dots[safeIndex]) dots[safeIndex].classList.add('active');
        currentSlide = safeIndex;
    }
    
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    function startSlideshow() {
        stopSlideshow();
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    function stopSlideshow() {
        if (slideInterval) clearInterval(slideInterval);
    }
    
    if (nextBtn) nextBtn.addEventListener('click', () => {
        nextSlide();
        startSlideshow();
    });
    
    if (prevBtn) prevBtn.addEventListener('click', () => {
        prevSlide();
        startSlideshow();
    });
    
    if (dots && dots.length > 0) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                startSlideshow();
            });
        });
    }
    
    const testimonialSection = document.querySelector('.testimonials-carousel');
    if (testimonialSection) {
        testimonialSection.addEventListener('mouseenter', stopSlideshow);
        testimonialSection.addEventListener('mouseleave', startSlideshow);
    }
    
    if (slides && slides.length > 0) {
        showSlide(0);
        startSlideshow();
    }
}

// Scroll Effects
function initializeScrollEffects() {
    // Parallax backgrounds
    const parallaxElements = document.querySelectorAll('.stats-bg');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        if (parallaxElements && parallaxElements.length > 0) {
            parallaxElements.forEach(element => {
                const speed = 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        }
    });
    
    // Reveal animations
    const revealElements = document.querySelectorAll('.service-card, .feature-item, .stat-item');
    if (!revealElements || revealElements.length === 0) return;

    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(element);
    });
}

// Floating Buttons
function initializeFloatingButtons() {
    try {
        const backToTopBtn = document.getElementById('back-to-top') || document.getElementById('backToTop');
        
        // Back to top button
        if (backToTopBtn) {
            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 300) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
            });
            
            backToTopBtn.addEventListener('click', function() {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
        
        // Chat popup functionality
        initializeChatPopup();
    } catch (e) {
        console.log('Error initializing floating buttons:', e);
    }
}

// Chat Popup
function initializeChatPopup() {
    const floatingBtn = document.getElementById('floating-btn');
    const chatPopup = document.getElementById('chatPopup');
    const chatOverlay = document.getElementById('chatOverlay');
    const chatCloseBtn = document.getElementById('chatCloseBtn');
    const chatInput = document.getElementById('chatInput');
    const chatSendBtn = document.getElementById('chatSendBtn');
    const chatMessages = document.getElementById('chatMessages');
    
    if (!floatingBtn || !chatPopup) return;
    
    function openChatPopup() {
        chatPopup.classList.add('active');
        if (chatOverlay) chatOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        setTimeout(() => { if (chatInput) chatInput.focus(); }, 300);
    }
    
    function closeChatPopup() {
        chatPopup.classList.remove('active');
        if (chatOverlay) chatOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function addMessage(text, sender) {
        if (!chatMessages) return;
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}-message`;
        const currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-${sender === 'user' ? 'user' : 'robot'}"></i>
            </div>
            <div class="message-content">
                <p>${text}</p>
                <span class="message-time">${currentTime}</span>
            </div>
        `;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function showTypingIndicator() {
        if (!chatMessages) return;
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message bot-message typing-message';
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="typing-indicator">
                    <div class="typing-dots">
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                    </div>
                </div>
            </div>
        `;
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function hideTypingIndicator() {
        if (!chatMessages) return;
        const typingMessage = chatMessages.querySelector('.typing-message');
        if (typingMessage) typingMessage.remove();
    }
    
    function generateBotResponse(userMessage) {
        const message = (userMessage || '').toLowerCase();
        if (message.includes('hello') || message.includes('hi')) {
            return "Hello! Welcome to TGIS. How can I assist you today?";
        } else if (message.includes('service') || message.includes('what do you do')) {
            return "We offer various services including GIS mapping, surveying, real estate services, IT solutions, and equipment rental. Which service interests you?";
        } else if (message.includes('contact') || message.includes('phone') || message.includes('email')) {
            return "You can reach us at +1 (555) 123-4567 or email us at info@tgis.com. We're here to help!";
        } else if (message.includes('price') || message.includes('cost') || message.includes('quote')) {
            return "Pricing varies by project scope. Would you like to schedule a consultation for a detailed quote?";
        } else if (message.includes('thank') || message.includes('thanks')) {
            return "You're welcome! Is there anything else I can help you with?";
        } else if (message.includes('bye') || message.includes('goodbye')) {
            return "Thank you for contacting TGIS! Have a great day!";
        } else {
            return "Thank you for your message! Our team will get back to you shortly. For immediate assistance, please call us at +1 (555) 123-4567.";
        }
    }
    
    function sendMessage() {
        if (!chatInput) return;
        const message = chatInput.value.trim();
        if (!message) return;
        addMessage(message, 'user');
        chatInput.value = '';
        showTypingIndicator();
        setTimeout(() => {
            hideTypingIndicator();
            const botResponse = generateBotResponse(message);
            addMessage(botResponse, 'bot');
        }, 1500);
    }
    
    // Open chat popup
    floatingBtn.addEventListener('click', function(e) {
        e.preventDefault();
        openChatPopup();
    });
    
    // Close chat popup
    if (chatCloseBtn) chatCloseBtn.addEventListener('click', closeChatPopup);
    if (chatOverlay) chatOverlay.addEventListener('click', closeChatPopup);
    
    // Send message functionality
    if (chatSendBtn && chatInput) {
        chatSendBtn.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') sendMessage();
        });
    }
    
    // Close popup with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && chatPopup.classList.contains('active')) {
            closeChatPopup();
        }
    });
}

// Lazy Loading
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    if (!images || images.length === 0) return;

    const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Form Validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        const value = input.value.trim();
        if (!value) {
            showError(input, 'This field is required');
            isValid = false;
        } else if (input.type === 'email' && !isValidEmail(value)) {
            showError(input, 'Please enter a valid email address');
            isValid = false;
        } else {
            hideError(input);
        }
    });
    
    return isValid;
}

function showError(input, message) {
    input.classList.add('error');
    let errorElement = input.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains('error-message')) {
        errorElement = document.createElement('span');
        errorElement.classList.add('error-message');
        input.parentNode.insertBefore(errorElement, input.nextSibling);
    }
    errorElement.textContent = message;
}

function hideError(input) {
    input.classList.remove('error');
    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.remove();
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Search Functionality
function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.trim();
            if (query.length > 2) {
                searchTimeout = setTimeout(() => {
                    performSearch(query);
                }, 300);
            } else {
                hideSearchResults();
            }
        });
    }
}

function performSearch(query) {
    // Implement search functionality
    // This would typically make an API call
    console.log('Searching for:', query);
}

function hideSearchResults() {
    const searchResults = document.getElementById('search-results');
    if (searchResults) {
        searchResults.style.display = 'none';
    }
}

// Utility Functions
function debounce(func, wait) {
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Performance Optimization
const debouncedScroll = debounce(function() {
    // Handle scroll events - update sticky elements, animations, etc.
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    void scrollPosition; // placeholder usage
}, 10);

const throttledResize = throttle(function() {
    // Handle resize events - update responsive elements, recalculate layouts
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    void windowWidth; // placeholder usage
    void windowHeight; // placeholder usage
}, 250);

// Error Handling
window.addEventListener('error', function(e) {
    const errorMessage = e.error || e.message || 'Unknown error';
    console.error('JavaScript error:', errorMessage);
});

// Service Worker Registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        if (location.protocol === 'http:' || location.protocol === 'https:') {
            fetch('/sw.js', { method: 'HEAD' })
                .then(response => {
                    if (response.ok) {
                        return navigator.serviceWorker.register('/sw.js');
                    } else {
                        throw new Error('ServiceWorker file not found');
                    }
                })
                .then(function() {
                    console.log('ServiceWorker registration successful');
                })
                .catch(function(error) {
                    console.log('ServiceWorker registration skipped:', error.message);
                });
        } else {
            console.log('ServiceWorker registration skipped - not served over HTTP/HTTPS');
        }
    });
}
