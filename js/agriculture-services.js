/**
 * Agriculture Services Page JavaScript
 * Handles interactive elements and animations for the agriculture services page
 */

// Initialize service tabs functionality
function initServiceTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    // Add click event to each tab button
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Get the tab to activate
            const tabToActivate = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            button.classList.add('active');
            document.getElementById(tabToActivate).classList.add('active');
            
            // Refresh AOS animations in the newly visible tab
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        });
    });
}

// Initialize FAQ accordions
function initFaqAccordions() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const toggle = item.querySelector('.faq-toggle');
        
        question.addEventListener('click', () => {
            // Check if this item is already active
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
                const toggleIcon = faqItem.querySelector('.faq-toggle i');
                toggleIcon.className = 'fas fa-plus';
            });
            
            // If the clicked item wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
                toggle.querySelector('i').className = 'fas fa-minus';
            }
        });
    });
}

// Animate statistics with counting effect
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const targetValue = parseFloat(stat.textContent.replace(/[^\d.-]/g, ''));
        const duration = 2000; // Animation duration in milliseconds
        const startTime = performance.now();
        let suffix = '';
        
        // Check if there's a suffix like % or +
        if (stat.textContent.includes('%')) {
            suffix = '%';
        } else if (stat.textContent.includes('+')) {
            suffix = '+';
        }
        
        function updateCounter(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            // Easing function for smoother animation
            const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            
            const currentValue = Math.floor(easedProgress * targetValue);
            stat.textContent = currentValue + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = targetValue + suffix;
            }
        }
        
        requestAnimationFrame(updateCounter);
    });
}

// Initialize case study slider
function initCaseStudySlider() {
    const slider = document.querySelector('.case-studies-slider');
    const items = document.querySelectorAll('.case-study-item');
    
    if (items.length <= 2) return; // No need for slider with 2 or fewer items
    
    let currentIndex = 0;
    const totalItems = items.length;
    
    // Create navigation buttons
    const navContainer = document.createElement('div');
    navContainer.className = 'slider-nav';
    
    const prevBtn = document.createElement('button');
    prevBtn.className = 'slider-nav-btn prev-btn';
    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevBtn.setAttribute('aria-label', 'Previous case study');
    
    const nextBtn = document.createElement('button');
    nextBtn.className = 'slider-nav-btn next-btn';
    nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextBtn.setAttribute('aria-label', 'Next case study');
    
    navContainer.appendChild(prevBtn);
    navContainer.appendChild(nextBtn);
    slider.parentNode.appendChild(navContainer);
    
    // Show only the first two items initially
    updateSlider();
    
    // Add event listeners to buttons
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateSlider();
    });
    
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalItems;
        updateSlider();
    });
    
    function updateSlider() {
        items.forEach((item, index) => {
            // In a 2-column layout, show current and next item
            const isVisible = (index === currentIndex || index === (currentIndex + 1) % totalItems);
            item.style.display = isVisible ? 'block' : 'none';
            
            // Refresh AOS animations
            if (isVisible && typeof AOS !== 'undefined') {
                // Reset AOS attributes to trigger animation again
                const aosElements = item.querySelectorAll('[data-aos]');
                aosElements.forEach(el => {
                    el.classList.remove('aos-animate');
                    setTimeout(() => {
                        el.classList.add('aos-animate');
                    }, 50);
                });
            }
        });
    }
    
    // Responsive handling
    window.addEventListener('resize', () => {
        // If screen is small, show only one item
        const isMobile = window.innerWidth < 992;
        if (isMobile) {
            items.forEach((item, index) => {
                item.style.display = index === currentIndex ? 'block' : 'none';
            });
        } else {
            updateSlider(); // Show two items on larger screens
        }
    });
}

// Initialize interactive elements when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tabs
    initServiceTabs();
    
    // Initialize FAQ accordions
    initFaqAccordions();
    
    // Animate statistics when they come into view
    const statsSection = document.querySelector('.header-stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }
    
    // Initialize case study slider
    initCaseStudySlider();
    
    // Add parallax effect to header background
    const header = document.querySelector('.agriculture-header');
    if (header) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            const headerBg = header.querySelector('.service-header-bg');
            if (headerBg) {
                headerBg.style.transform = `translateY(${scrollPosition * 0.4}px)`;
            }
        });
    }
});