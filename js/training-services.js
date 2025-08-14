/**
 * Training & Certificate Services JavaScript
 * Handles interactive elements and animations for the training services page
 */

// Initialize testimonial slider functionality
function initTestimonialSlider() {
    const slider = document.querySelector('.testimonials-slider');
    const items = slider.querySelectorAll('.testimonial-item');
    const totalItems = items.length;
    let currentIndex = 0;
    
    // Create navigation controls if more than one testimonial
    if (totalItems > 1) {
        // Create navigation container
        const navContainer = document.createElement('div');
        navContainer.className = 'slider-nav';
        
        // Create previous button
        const prevBtn = document.createElement('button');
        prevBtn.className = 'slider-nav-btn prev-btn';
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevBtn.setAttribute('aria-label', 'Previous testimonial');
        
        // Create next button
        const nextBtn = document.createElement('button');
        nextBtn.className = 'slider-nav-btn next-btn';
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextBtn.setAttribute('aria-label', 'Next testimonial');
        
        // Create dots container
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'slider-dots';
        
        // Create dots for each testimonial
        for (let i = 0; i < totalItems; i++) {
            const dot = document.createElement('button');
            dot.className = 'slider-dot';
            dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
            if (i === 0) dot.classList.add('active');
            
            // Add click event to each dot
            dot.addEventListener('click', () => {
                goToSlide(i);
            });
            
            dotsContainer.appendChild(dot);
        }
        
        // Add event listeners to navigation buttons
        prevBtn.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
        });
        
        nextBtn.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
        });
        
        // Append navigation elements to container
        navContainer.appendChild(prevBtn);
        navContainer.appendChild(dotsContainer);
        navContainer.appendChild(nextBtn);
        
        // Append navigation container after the slider
        slider.parentNode.insertBefore(navContainer, slider.nextSibling);
        
        // Initially hide all testimonials except the first one
        items.forEach((item, index) => {
            if (index !== 0) {
                item.style.display = 'none';
            }
        });
        
        // Function to navigate to a specific slide
        function goToSlide(index) {
            // Handle circular navigation
            if (index < 0) index = totalItems - 1;
            if (index >= totalItems) index = 0;
            
            // Hide current testimonial
            items[currentIndex].style.display = 'none';
            
            // Show new testimonial
            items[index].style.display = 'block';
            
            // Update active dot
            const dots = dotsContainer.querySelectorAll('.slider-dot');
            dots[currentIndex].classList.remove('active');
            dots[index].classList.add('active');
            
            // Update current index
            currentIndex = index;
        }
        
        // Auto-rotate testimonials every 5 seconds
        let autoRotate = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000);
        
        // Pause auto-rotation when hovering over the slider
        slider.addEventListener('mouseenter', () => {
            clearInterval(autoRotate);
        });
        
        // Resume auto-rotation when mouse leaves the slider
        slider.addEventListener('mouseleave', () => {
            autoRotate = setInterval(() => {
                goToSlide(currentIndex + 1);
            }, 5000);
        });
        
        // Add responsive styles for the slider navigation
        const style = document.createElement('style');
        style.textContent = `
            .slider-nav {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 30px;
            }
            
            .slider-nav-btn {
                background-color: transparent;
                border: none;
                color: var(--primary-color);
                font-size: 1.2rem;
                cursor: pointer;
                padding: 10px;
                transition: color 0.3s ease;
            }
            
            .slider-nav-btn:hover {
                color: var(--accent-color);
            }
            
            .slider-dots {
                display: flex;
                gap: 8px;
                margin: 0 15px;
            }
            
            .slider-dot {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background-color: rgba(var(--primary-rgb), 0.2);
                border: none;
                cursor: pointer;
                transition: background-color 0.3s ease, transform 0.3s ease;
            }
            
            .slider-dot.active {
                background-color: var(--primary-color);
                transform: scale(1.2);
            }
            
            .slider-dot:hover {
                background-color: rgba(var(--primary-rgb), 0.5);
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize course animations
function initCourseAnimations() {
    const courseCards = document.querySelectorAll('.course-card');
    
    courseCards.forEach(card => {
        // Add hover animation class
        card.classList.add('course-animate');
        
        // Add event listeners for mouse interactions
        card.addEventListener('mouseenter', () => {
            const courseImage = card.querySelector('.course-image img');
            const courseIcon = card.querySelector('.course-features i');
            
            if (courseImage) {
                courseImage.style.transform = 'scale(1.05)';
            }
            
            if (courseIcon) {
                courseIcon.forEach(icon => {
                    icon.style.transform = 'scale(1.2)';
                });
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const courseImage = card.querySelector('.course-image img');
            const courseIcon = card.querySelector('.course-features i');
            
            if (courseImage) {
                courseImage.style.transform = 'scale(1)';
            }
            
            if (courseIcon) {
                courseIcon.forEach(icon => {
                    icon.style.transform = 'scale(1)';
                });
            }
        });
    });
    
    // Add CSS for course animations
    const style = document.createElement('style');
    style.textContent = `
        .course-animate {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .course-animate:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        }
        
        .course-animate .course-image img {
            transition: transform 0.5s ease;
        }
        
        .course-animate .course-features i {
            transition: transform 0.3s ease, color 0.3s ease;
        }
        
        .course-animate:hover .course-features i {
            color: var(--accent-color);
        }
    `;
    document.head.appendChild(style);
}

// Initialize animated counting for statistics
function initStatCounter() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent.replace(/\D/g, ''), 10);
        const duration = 2000; // 2 seconds duration
        const step = Math.ceil(target / (duration / 20)); // Update every 20ms
        let current = 0;
        
        // Store the original text with any non-numeric characters
        const format = stat.textContent.replace(/[0-9,]+/, '{num}');
        
        // Start the counter animation when the element is in viewport
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Start counter
                    const timer = setInterval(() => {
                        current += step;
                        
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        
                        // Format the number with commas and replace in the original format
                        const formattedNumber = current.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                        stat.textContent = format.replace('{num}', formattedNumber);
                        
                    }, 20);
                    
                    // Stop observing once animation starts
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(stat);
    });
}

// Initialize FAQ accordion functionality
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        // Set initial state
        answer.style.maxHeight = '0';
        answer.style.overflow = 'hidden';
        answer.style.transition = 'max-height 0.3s ease';
        
        question.addEventListener('click', () => {
            // Toggle active class
            item.classList.toggle('active');
            
            // Toggle answer visibility
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0';
            }
            
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = '0';
                }
            });
        });
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize testimonial slider
    initTestimonialSlider();
    
    // Initialize course animations
    initCourseAnimations();
    
    // Initialize stat counter
    initStatCounter();
    
    // Initialize FAQ accordion if present
    if (document.querySelector('.faq-item')) {
        initFaqAccordion();
    }
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});