// About Page Animations

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Counter Animation for Achievement Numbers
    const counterElements = document.querySelectorAll('.achievement-number');
    
    // Function to animate counters when they come into view
    const animateCounters = () => {
        counterElements.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const count = +counter.innerText;
            
            // Calculate the increment per frame
            const inc = target / 100;
            
            // If the current count is less than the target, increment it
            if (count < target) {
                // Update the counter value
                counter.innerText = Math.ceil(count + inc);
                // Call the function again after a short delay
                setTimeout(animateCounters, 20);
            } else {
                // Ensure the final value is exactly the target
                counter.innerText = target;
            }
        });
    };

    // Use Intersection Observer to trigger counter animation when in view
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                // Unobserve after triggering the animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // If there are counter elements, observe the first one
    if (counterElements.length > 0) {
        observer.observe(document.querySelector('.achievements-section'));
    }

    // Floating animation for shapes in header
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach(shape => {
        // Add random movement to shapes
        setInterval(() => {
            const randomX = Math.random() * 10 - 5; // Random value between -5 and 5
            const randomY = Math.random() * 10 - 5; // Random value between -5 and 5
            
            shape.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }, 3000);
    });

    // Parallax effect for page header
    const pageHeader = document.querySelector('.page-header');
    if (pageHeader) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition < 600) { // Only apply effect near the top of the page
                const translateY = scrollPosition * 0.3;
                pageHeader.querySelector('.page-header-bg').style.transform = `translateY(${translateY}px)`;
                pageHeader.querySelector('.page-header-content').style.transform = `translateY(${translateY * 0.5}px)`;
            }
        });
    }

    // Team member hover effects enhancement
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', () => {
            member.querySelector('.member-image img').style.transform = 'scale(1.1)';
            member.querySelector('.member-overlay').style.opacity = '1';
        });
        
        member.addEventListener('mouseleave', () => {
            member.querySelector('.member-image img').style.transform = 'scale(1)';
            member.querySelector('.member-overlay').style.opacity = '0';
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to top button functionality
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});