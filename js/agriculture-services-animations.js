/**
 * Agriculture Services Animations - Enhanced Version
 * Advanced animations and interactive elements for the agriculture services page
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS with enhanced settings
    AOS.init({
        duration: 1200,
        easing: 'ease-in-out',
        once: false,
        mirror: false,
        offset: 50,
        anchorPlacement: 'top-bottom',
        delay: 100
    });
    
    // Initialize loading screen
    initLoadingScreen();
    
    // Initialize advanced agriculture animations
    initAdvancedAgricultureAnimations();
    
    // Custom cursor implementation
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.innerHTML = `
        <div class="cursor-dot"></div>
        <div class="cursor-outline"></div>
    `;
    document.body.appendChild(cursor);
    
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    document.addEventListener('mousemove', e => {
        // Move the cursor elements to follow the mouse
        gsap.to(cursorDot, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: 'power1.out'
        });
        
        gsap.to(cursorOutline, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.15,
            ease: 'power1.out'
        });
    });
    
    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .app-item, .tab-btn, .technology-card, .case-study-item, .faq-item, input, select, textarea');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
        });
    });
    
    // Hide cursor when leaving the window
    document.addEventListener('mouseleave', () => {
        cursorDot.style.opacity = '0';
        cursorOutline.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '1';
    });
    
    // Add cursor styles
    const style = document.createElement('style');
    style.textContent = `
        .custom-cursor {
            position: fixed;
            pointer-events: none;
            z-index: 9999;
        }
        
        .cursor-dot {
            position: absolute;
            top: -4px;
            left: -4px;
            width: 8px;
            height: 8px;
            background-color: #4CAF50;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            transition: opacity 0.2s ease-in-out;
        }
        
        .cursor-outline {
            position: absolute;
            top: -16px;
            left: -16px;
            width: 32px;
            height: 32px;
            border: 2px solid rgba(76, 175, 80, 0.5);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            transition: all 0.1s ease-in-out;
        }
        
        .cursor-hover .cursor-dot {
            transform: translate(-50%, -50%) scale(1.5);
            background-color: #2E7D32;
        }
        
        .cursor-hover .cursor-outline {
            transform: translate(-50%, -50%) scale(1.5);
            border-color: rgba(46, 125, 50, 0.8);
            background-color: rgba(76, 175, 80, 0.1);
        }
    `;
    document.head.appendChild(style);
    
    // Initialize particles.js for background effects with enhanced settings
    if (document.getElementById('particles-agriculture')) {
        particlesJS('particles-agriculture', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#4CAF50'
                },
                shape: {
                    type: ['circle', 'triangle', 'polygon'],
                    stroke: {
                        width: 0,
                        color: '#000000'
                    },
                    polygon: {
                        nb_sides: 5
                    },
                    image: {
                        src: 'placeholder.svg?text=🌱',
                        width: 100,
                        height: 100
                    }
                },
                opacity: {
                    value: 0.3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#4CAF50',
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
                    attract: {
                        enable: true,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 3
                    }
                }
            },
            retina_detect: true
        });
    }
    
    // Enhanced tab switching animations
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabToActivate = button.getAttribute('data-tab');
            const targetPanel = document.getElementById(tabToActivate);
            
            // Animate out current active panel
            const activePanel = document.querySelector('.tab-panel.active');
            if (activePanel && activePanel !== targetPanel) {
                gsap.to(activePanel, {
                    opacity: 0,
                    y: 20,
                    duration: 0.3,
                    ease: 'power2.in',
                    onComplete: () => {
                        activePanel.classList.remove('active');
                        
                        // Animate in new panel
                        targetPanel.classList.add('active');
                        gsap.fromTo(targetPanel, 
                            { opacity: 0, y: 20 },
                            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
                        );
                        
                        // Refresh AOS animations
                        if (typeof AOS !== 'undefined') {
                            AOS.refresh();
                        }
                    }
                });
            }
            
            // Update active button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Add button animation
            gsap.fromTo(button, 
                { scale: 0.95 },
                { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.5)' }
            );
        });
    });
    
    // Enhanced animations for service cards
    const appItems = document.querySelectorAll('.app-item');
    appItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('i');
            gsap.to(icon, {
                scale: 1.3,
                rotate: '15deg',
                duration: 0.4,
                ease: 'back.out'
            });
            
            gsap.to(item, {
                backgroundColor: 'rgba(76, 175, 80, 0.25)',
                y: -5,
                duration: 0.3,
                ease: 'power1.out'
            });
        });
        
        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('i');
            gsap.to(icon, {
                scale: 1,
                rotate: '0deg',
                duration: 0.4,
                ease: 'power1.out'
            });
            
            gsap.to(item, {
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                y: 0,
                duration: 0.3,
                ease: 'power1.out'
            });
        });
    });
    
    // Animate statistics when they come into view
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const value = stat.textContent;
            let startValue = 0;
            let endValue;
            let suffix = '';
            
            // Extract numeric value and suffix
            if (value.includes('+')) {
                endValue = parseInt(value.replace(/,/g, '').replace('+', ''));
                suffix = '+';
            } else if (value.includes('%')) {
                endValue = parseInt(value.replace('%', ''));
                suffix = '%';
            } else if (value.includes('/')) {
                // For values like 24/7
                stat.style.opacity = '1';
                return; // Skip animation for non-numeric values
            } else {
                endValue = parseInt(value.replace(/,/g, ''));
            }
            
            // Determine animation duration and increment based on value size
            const duration = Math.min(2, Math.max(1, endValue / 500));
            const increment = endValue / (duration * 60); // 60fps
            
            // Start counter animation
            let currentValue = startValue;
            const counter = setInterval(() => {
                currentValue += increment;
                
                if (currentValue >= endValue) {
                    clearInterval(counter);
                    currentValue = endValue;
                }
                
                // Format number with commas
                const formattedValue = Math.floor(currentValue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                stat.textContent = formattedValue + suffix;
            }, 16); // ~60fps
            
            // Add scale animation
            gsap.from(stat, {
                scale: 0.5,
                opacity: 0,
                duration: 0.8,
                ease: 'back.out'
            });
        });
    }
    
    // Observe stats section
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
    
    // Enhanced feature list animations
    const featureItems = document.querySelectorAll('.features-list li');
    if (featureItems.length > 0) {
        const featureObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry, index) => {
                if (!entry.isIntersecting) return;
                
                // Add a staggered animation class
                setTimeout(() => {
                    gsap.fromTo(entry.target,
                        { x: -30, opacity: 0 },
                        { x: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
                    );
                    
                    // Animate the check icon
                    const icon = entry.target.querySelector('i');
                    if (icon) {
                        gsap.fromTo(icon,
                            { scale: 0, rotate: '-45deg' },
                            { scale: 1, rotate: '0deg', duration: 0.5, delay: 0.2, ease: 'back.out(1.7)' }
                        );
                    }
                    
                    featureObserver.unobserve(entry.target);
                }, index * 150);
            });
        }, { threshold: 0.2 });
        
        featureItems.forEach(item => {
            featureObserver.observe(item);
        });
    }
    
    // Add parallax effect to header background with enhanced smoothness
    const header = document.querySelector('.agriculture-header');
    if (header) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            const headerBg = header.querySelector('.service-header-bg');
            if (headerBg) {
                // Smooth parallax effect with scale
                gsap.to(headerBg, {
                    y: scrollPosition * 0.2,
                    scale: 1 + scrollPosition * 0.0005,
                    duration: 0.5,
                    ease: 'power1.out'
                });
            }
            
            // Parallax for floating shapes
            const shapes = header.querySelectorAll('.shape');
            shapes.forEach((shape, index) => {
                const speed = 0.1 + (index * 0.05);
                const direction = index % 2 === 0 ? 1 : -1;
                
                gsap.to(shape, {
                    y: scrollPosition * speed * direction,
                    duration: 0.5,
                    ease: 'power1.out'
                });
            });
        });
    }
    
    // 3D tilt effect for technology cards
    const techCards = document.querySelectorAll('.technology-card');
    techCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            
            const mouseX = e.clientX - cardCenterX;
            const mouseY = e.clientY - cardCenterY;
            
            const rotateX = mouseY / -10;
            const rotateY = mouseX / 10;
            
            gsap.to(card, {
                rotateX: rotateX,
                rotateY: rotateY,
                duration: 0.3,
                ease: 'power1.out',
                transformPerspective: 1000,
                transformOrigin: 'center center'
            });
            
            // Move icon slightly for 3D effect
            const icon = card.querySelector('.technology-icon');
            if (icon) {
                gsap.to(icon, {
                    x: mouseX / 20,
                    y: mouseY / 20,
                    duration: 0.3,
                    ease: 'power1.out'
                });
            }
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.5,
                ease: 'power1.out'
            });
            
            // Reset icon position
            const icon = card.querySelector('.technology-icon');
            if (icon) {
                gsap.to(icon, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: 'power1.out'
                });
            }
        });
    });
    
    // Scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
    
    // Add scroll progress bar styles
    const progressStyle = document.createElement('style');
    progressStyle.textContent = `
        .scroll-progress {
            position: fixed;
            top: 0;
            left: 0;
            height: 4px;
            background: linear-gradient(to right, #4CAF50, #2E7D32);
            z-index: 9999;
            width: 0%;
        }
        
        @keyframes sprayEffect {
            0% { transform: translateX(-50%) scale(0); opacity: 0; }
            50% { transform: translateX(-50%) scale(1.5); opacity: 0.6; }
            100% { transform: translateX(-50%) scale(2); opacity: 0; }
        }
        
        @keyframes dataTransmit {
            0% { height: 0; opacity: 1; }
            100% { height: 30px; opacity: 0; }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateX(-50%) translateY(10px); }
            to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        
        @keyframes connectionPulse {
            0%, 100% { stroke-dasharray: 0, 100; }
            50% { stroke-dasharray: 50, 50; }
        }
        
        @keyframes waterSpray {
            0% { opacity: 0; transform: scale(0.5); }
            50% { opacity: 1; transform: scale(1); }
            100% { opacity: 0; transform: scale(1.5); }
        }
    `;
    document.head.appendChild(progressStyle);
    
    // Back to top button with enhanced animation
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                gsap.to(backToTopButton, {
                    opacity: 1,
                    visibility: 'visible',
                    y: 0,
                    duration: 0.3,
                    ease: 'power1.out'
                });
            } else {
                gsap.to(backToTopButton, {
                    opacity: 0,
                    y: 20,
                    duration: 0.3,
                    ease: 'power1.in',
                    onComplete: () => {
                        backToTopButton.style.visibility = 'hidden';
                    }
                });
            }
        });
        
        backToTopButton.addEventListener('click', e => {
            e.preventDefault();
            
            // Animate scroll to top
            gsap.to(window, {
                scrollTo: {
                    y: 0,
                    autoKill: false
                },
                duration: 1,
                ease: 'power2.inOut'
            });
            
            // Button animation
            gsap.to(backToTopButton, {
                scale: 0.8,
                duration: 0.1,
                ease: 'power1.in',
                onComplete: () => {
                    gsap.to(backToTopButton, {
                        scale: 1,
                        duration: 0.3,
                        ease: 'back.out'
                    });
                }
            });
        });
    }
    
    // Enhanced FAQ accordion animations
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    gsap.to(otherItem.querySelector('.faq-answer'), {
                        height: 0,
                        opacity: 0,
                        duration: 0.3,
                        ease: 'power2.inOut'
                    });
                    
                    // Rotate icon
                    const icon = otherItem.querySelector('.faq-icon');
                    gsap.to(icon, {
                        rotation: 0,
                        duration: 0.3,
                        ease: 'power1.inOut'
                    });
                }
            });
            
            // Toggle current item
            if (isOpen) {
                gsap.to(answer, {
                    height: 0,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power2.inOut',
                    onComplete: () => {
                        item.classList.remove('active');
                    }
                });
                
                // Rotate icon
                const icon = item.querySelector('.faq-icon');
                gsap.to(icon, {
                    rotation: 0,
                    duration: 0.3,
                    ease: 'power1.inOut'
                });
            } else {
                item.classList.add('active');
                gsap.fromTo(answer, 
                    { height: 0, opacity: 0 },
                    { 
                        height: 'auto', 
                        opacity: 1, 
                        duration: 0.5, 
                        ease: 'power2.out'
                    }
                );
                
                // Rotate icon
                const icon = item.querySelector('.faq-icon');
                gsap.to(icon, {
                    rotation: 180,
                    duration: 0.3,
                    ease: 'power1.inOut'
                });
            }
        });
    });
});

// Loading screen
function initLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    if (!loadingScreen) return;
    
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }, 3000);
}

// Advanced Agriculture Animations
function initAdvancedAgricultureAnimations() {
    initAgricultureDrones();
    initFarmFields();
    initIoTSensors();
    initIrrigationSystem();
    initDataVisualization();
}

// Agriculture Drones
function initAgricultureDrones() {
    const drones = document.querySelectorAll('.agriculture-drone');
    
    drones.forEach((drone, index) => {
        // Add interactive hover effects
        drone.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
            this.style.transform += ' scale(1.2)';
            
            // Show drone info popup
            showDroneInfo(this, {
                id: `Drone-${index + 1}`,
                status: 'Active',
                battery: Math.floor(Math.random() * 40) + 60 + '%',
                altitude: Math.floor(Math.random() * 50) + 50 + 'm',
                speed: Math.floor(Math.random() * 20) + 10 + 'km/h'
            });
        });
        
        drone.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
            this.style.transform = this.style.transform.replace(' scale(1.2)', '');
            hideDroneInfo();
        });
        
        // Add spray effect periodically
        setInterval(() => {
            createSprayEffect(drone);
        }, 8000 + (index * 2000));
    });
}

function createSprayEffect(drone) {
    const spray = document.createElement('div');
    spray.className = 'drone-spray';
    spray.style.cssText = `
        position: absolute;
        bottom: -20px;
        left: 50%;
        transform: translateX(-50%);
        width: 60px;
        height: 60px;
        background: radial-gradient(circle, rgba(76, 175, 80, 0.4) 0%, transparent 70%);
        border-radius: 50%;
        animation: sprayEffect 3s ease-out forwards;
        pointer-events: none;
    `;
    
    drone.appendChild(spray);
    
    setTimeout(() => {
        spray.remove();
    }, 3000);
}

// Farm Fields
function initFarmFields() {
    const fieldRows = document.querySelectorAll('.field-row');
    
    fieldRows.forEach((row, index) => {
        // Add growth animation
        row.style.animationDelay = (index * 0.2) + 's';
        
        // Add click interaction
        row.addEventListener('click', function() {
            const cropType = this.dataset.crop || 'generic';
            showCropInfo(this, cropType);
        });
    });
}

// IoT Sensors
function initIoTSensors() {
    const sensors = document.querySelectorAll('.iot-sensor');
    
    sensors.forEach((sensor, index) => {
        // Add data transmission effect
        setInterval(() => {
            createDataTransmission(sensor);
        }, 5000 + (index * 1000));
        
        // Add hover interaction
        sensor.addEventListener('mouseenter', function() {
            showSensorData(this, {
                id: `Sensor-${index + 1}`,
                temperature: Math.floor(Math.random() * 15) + 20 + '°C',
                humidity: Math.floor(Math.random() * 30) + 50 + '%',
                soilMoisture: Math.floor(Math.random() * 40) + 30 + '%',
                ph: (Math.random() * 2 + 6).toFixed(1)
            });
        });
        
        sensor.addEventListener('mouseleave', function() {
            hideSensorData();
        });
    });
}

function createDataTransmission(sensor) {
    const transmission = document.createElement('div');
    transmission.className = 'data-transmission';
    transmission.style.cssText = `
        position: absolute;
        top: -40px;
        left: 50%;
        transform: translateX(-50%);
        width: 4px;
        height: 30px;
        background: linear-gradient(to top, #00ff00, transparent);
        animation: dataTransmit 2s ease-out forwards;
        pointer-events: none;
    `;
    
    sensor.appendChild(transmission);
    
    setTimeout(() => {
        transmission.remove();
    }, 2000);
}

// Irrigation System
function initIrrigationSystem() {
    const sprinklers = document.querySelectorAll('.irrigation-sprinkler');
    
    sprinklers.forEach((sprinkler, index) => {
        // Activate sprinklers periodically
        setInterval(() => {
            activateSprinkler(sprinkler);
        }, 10000 + (index * 3000));
    });
}

function activateSprinkler(sprinkler) {
    const waterSpray = sprinkler.querySelector('.water-spray');
    if (waterSpray) {
        waterSpray.style.animation = 'none';
        setTimeout(() => {
            waterSpray.style.animation = 'waterSpray 4s infinite';
        }, 100);
    }
}

// Data Visualization
function initDataVisualization() {
    const dataPoints = document.querySelectorAll('.data-point');
    
    dataPoints.forEach((point, index) => {
        // Add pulsing effect
        point.style.animationDelay = (index * 0.5) + 's';
        
        // Add click interaction
        point.addEventListener('click', function() {
            const dataType = this.dataset.type;
            showDataDetails(this, dataType);
        });
    });
    
    // Create connecting lines between data points
    createDataConnections();
}

function createDataConnections() {
    const visualization = document.querySelector('.data-visualization');
    if (!visualization) return;
    
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M20 20 L80 60 L40 100');
    path.setAttribute('stroke', 'rgba(255, 255, 255, 0.5)');
    path.setAttribute('stroke-width', '2');
    path.setAttribute('fill', 'none');
    path.style.animation = 'connectionPulse 4s infinite';
    
    svg.appendChild(path);
    visualization.appendChild(svg);
}

// Popup functions
function showDroneInfo(drone, info) {
    const popup = document.createElement('div');
    popup.className = 'drone-info-popup';
    popup.innerHTML = `
        <h4>${info.id}</h4>
        <p>Status: ${info.status}</p>
        <p>Battery: ${info.battery}</p>
        <p>Altitude: ${info.altitude}</p>
        <p>Speed: ${info.speed}</p>
    `;
    popup.style.cssText = `
        position: absolute;
        top: -120px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 10px;
        border-radius: 8px;
        font-size: 12px;
        white-space: nowrap;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
    `;
    
    drone.appendChild(popup);
}

function hideDroneInfo() {
    const popup = document.querySelector('.drone-info-popup');
    if (popup) popup.remove();
}

function showSensorData(sensor, data) {
    const popup = document.createElement('div');
    popup.className = 'sensor-data-popup';
    popup.innerHTML = `
        <h4>${data.id}</h4>
        <p>Temp: ${data.temperature}</p>
        <p>Humidity: ${data.humidity}</p>
        <p>Soil: ${data.soilMoisture}</p>
        <p>pH: ${data.ph}</p>
    `;
    popup.style.cssText = `
        position: absolute;
        top: -100px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 8px;
        border-radius: 6px;
        font-size: 11px;
        white-space: nowrap;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
    `;
    
    sensor.appendChild(popup);
}

function hideSensorData() {
    const popup = document.querySelector('.sensor-data-popup');
    if (popup) popup.remove();
}

function showCropInfo(field, cropType) {
    const info = {
        corn: { name: 'Corn Field', growth: '75%', health: 'Excellent' },
        wheat: { name: 'Wheat Field', growth: '60%', health: 'Good' },
        soy: { name: 'Soybean Field', growth: '80%', health: 'Very Good' },
        generic: { name: 'Crop Field', growth: '70%', health: 'Good' }
    };
    
    const cropInfo = info[cropType] || info.generic;
    alert(`${cropInfo.name}\nGrowth: ${cropInfo.growth}\nHealth: ${cropInfo.health}`);
}

function showDataDetails(point, dataType) {
    const details = {
        temperature: 'Temperature monitoring shows optimal growing conditions',
        humidity: 'Humidity levels are within ideal range for crop development',
        'soil-moisture': 'Soil moisture indicates good irrigation efficiency'
    };
    
    alert(details[dataType] || 'Data point information');
}