// Contact Page Scripts - Clean Version

// Enhanced Contact Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }
    
    // Enhanced form functionality
    initContactForm();
    initFloatingLabels();
    initFormValidation();
    initMapInteractions();
    initScrollAnimations();
});

// Contact Form Initialization
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    const submitBtn = contactForm.querySelector('.btn-submit');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm(contactForm)) {
            submitForm(contactForm, submitBtn);
        }
    });
    
    // Add ripple effect to submit button
    if (submitBtn) {
        submitBtn.addEventListener('click', createRippleEffect);
    }
}

// Floating Labels
function initFloatingLabels() {
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        const input = group.querySelector('input, select, textarea');
        const label = group.querySelector('label');
        
        if (!input || !label) return;
        
        // Check initial state
        if (input.value) {
            input.classList.add('has-value');
        }
        
        // Handle focus and blur events
        input.addEventListener('focus', () => {
            input.classList.add('has-value');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.classList.remove('has-value');
            }
        });
        
        input.addEventListener('input', () => {
            if (input.value) {
                input.classList.add('has-value');
            } else {
                input.classList.remove('has-value');
            }
            
            // Clear error state on input
            clearFieldError(group);
        });
    });
}

// Form Validation
function initFormValidation() {
    const inputs = document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
    });
}

// Validate individual field
function validateField(field) {
    const formGroup = field.closest('.form-group');
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Clear previous errors
    clearFieldError(formGroup);
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    }
    
    if (!isValid) {
        showFieldError(formGroup, errorMessage);
    }
    
    return isValid;
}

// Validate entire form
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Show field error
function showFieldError(formGroup, message) {
    formGroup.classList.add('error');
    
    // Remove existing error message
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    formGroup.appendChild(errorDiv);
}

// Clear field error
function clearFieldError(formGroup) {
    formGroup.classList.remove('error');
    const errorMessage = formGroup.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Submit form
function submitForm(form, submitBtn) {
    // Add loading state
    form.classList.add('form-loading');
    submitBtn.innerHTML = `
        <i class="fas fa-spinner fa-spin"></i>
        <span>Sending...</span>
    `;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Success state
        submitBtn.innerHTML = `
            <i class="fas fa-check"></i>
            <span>Message Sent!</span>
        `;
        submitBtn.style.background = 'linear-gradient(135deg, #48bb78, #38a169)';
        
        // Show success message
        showSuccessMessage();
        
        // Reset form after delay
        setTimeout(() => {
            form.reset();
            form.classList.remove('form-loading');
            
            // Reset floating labels
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.classList.remove('has-value');
            });
            
            // Reset button
            submitBtn.innerHTML = `
                <span>Send Message</span>
                <i class="fas fa-paper-plane"></i>
            `;
            submitBtn.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
        }, 3000);
    }, 2000);
}

// Show success message
function showSuccessMessage() {
    // Remove existing success message
    const existing = document.querySelector('.success-message');
    if (existing) {
        existing.remove();
    }
    
    // Create success message
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <h3>Message Sent Successfully!</h3>
        <p>Thank you for contacting us. We'll get back to you soon.</p>
    `;
    
    document.body.appendChild(successDiv);
    
    // Show with animation
    setTimeout(() => {
        successDiv.classList.add('show');
    }, 100);
    
    // Hide after delay
    setTimeout(() => {
        successDiv.classList.remove('show');
        setTimeout(() => {
            successDiv.remove();
        }, 300);
    }, 4000);
}

// Create ripple effect
function createRippleEffect(e) {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('span');
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Map interactions
function initMapInteractions() {
    const mapContainer = document.querySelector('.map-container');
    if (!mapContainer) return;
    
    const iframe = mapContainer.querySelector('iframe');
    if (!iframe) return;
    
    // Prevent scroll hijacking
    mapContainer.addEventListener('click', () => {
        iframe.style.pointerEvents = 'auto';
    });
    
    mapContainer.addEventListener('mouseleave', () => {
        iframe.style.pointerEvents = 'none';
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animateElements = document.querySelectorAll('.contact-info-item, .form-group, .map-container');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add CSS animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Function to open directions
function openDirections(location) {
    let coordinates;
    
    if (location === 'sankhamul') {
        coordinates = '27.7172,85.3240'; // Sankhamul coordinates
    } else if (location === 'pokhara') {
        coordinates = '28.2096,83.9856'; // Pokhara coordinates
    }
    
    if (coordinates) {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${coordinates}`;
        window.open(url, '_blank');
    }
}

// Function to call office
function callOffice(office) {
    let phoneNumber;
    
    if (office === 'main') {
        phoneNumber = '+977-1-1234567';
    } else if (office === 'branch') {
        phoneNumber = '+977-1-9876543';
    }
    
    if (phoneNumber) {
        window.location.href = `tel:${phoneNumber}`;
    }
}

// Map fallback function
function showMapFallback() {
    const mapFrame = document.getElementById('interactive-map');
    if (mapFrame) {
        mapFrame.innerHTML = `
            <div class="map-fallback">
                <div class="fallback-content">
                    <i class="fas fa-map-marker-alt"></i>
                    <h4>Our Location</h4>
                    <p><strong>Sankhamul, New Baneshwor</strong><br>
                    Kathmandu 44600, Nepal</p>
                    <a href="https://maps.google.com/?q=Sankhamul,Kathmandu,Nepal" 
                       target="_blank" 
                       class="btn-view-map">
                        <i class="fas fa-external-link-alt"></i>
                        View on Google Maps
                    </a>
                </div>
            </div>
        `;
    }
}

// Form validation functions
function showError(field, message) {
    if (!field) return;
    
    removeError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#e53e3e';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    
    field.style.borderColor = '#e53e3e';
    field.parentNode.appendChild(errorDiv);
}

function removeError(field) {
    if (!field) return;
    
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
    field.style.borderColor = '';
}

function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div style="
            background: linear-gradient(45deg, #48bb78, #38a169);
            color: white;
            padding: 1rem;
            border-radius: 0.5rem;
            margin: 1rem 0;
            text-align: center;
            animation: slideIn 0.3s ease-out;
        ">
            <i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i>
            Thank you! Your message has been sent successfully.
        </div>
    `;
    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.parentNode.insertBefore(successDiv, contactForm);
        
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }
}

// Google Maps initialization
function initMap() {
    const mapContainer = document.getElementById('map');
    if (!mapContainer || typeof google === 'undefined') {
        console.log('Google Maps not available or map container not found');
        return;
    }
    
    try {
        const companyLocation = { lat: 27.7172, lng: 85.3240 }; // Sankhamul coordinates
        
        const map = new google.maps.Map(mapContainer, {
            center: companyLocation,
            zoom: 15,
            styles: [
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [{"color": "#e9e9e9"}, {"lightness": 17}]
                },
                {
                    "featureType": "landscape",
                    "elementType": "geometry",
                    "stylers": [{"color": "#f5f5f5"}, {"lightness": 20}]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [{"color": "#ffffff"}, {"lightness": 17}]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [{"color": "#f5f5f5"}, {"lightness": 21}]
                }
            ]
        });
        
        const marker = new google.maps.Marker({
            position: companyLocation,
            map: map,
            title: 'TGIS Headquarters - Sankhamul',
            animation: google.maps.Animation.DROP
        });
        
        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div style="padding: 10px;">
                    <h3>TGIS Headquarters</h3>
                    <p><strong>Sankhamul, New Baneshwor</strong><br>
                    Kathmandu 44600, Nepal</p>
                    <p>Your trusted GIS solutions partner</p>
                    <a href="https://maps.google.com/maps?daddr=27.7172,85.3240" target="_blank" 
                       style="color: #4299e1; text-decoration: none;">
                        <i class="fas fa-directions"></i> Get Directions
                    </a>
                </div>
            `
        });
        
        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });
        
        console.log('Google Maps initialized successfully');
    } catch (error) {
        console.error('Error initializing Google Maps:', error);
        showMapFallback();
    }
}

// Initialize map when Google Maps API is loaded
if (typeof google !== 'undefined' && google.maps) {
    initMap();
} else {
    // Wait for Google Maps API to load
    window.initMap = initMap;
    console.log('Waiting for Google Maps API to load...');
}