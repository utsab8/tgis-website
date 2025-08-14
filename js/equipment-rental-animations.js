// Equipment & Rental Services Animations

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    const loadingProgress = document.querySelector('.loading-progress');
    
    // Simulate loading progress
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    initAdvancedEquipmentAnimations();
                }, 500);
            }, 500);
        }
        loadingProgress.style.width = progress + '%';
    }, 100);
}

// Navbar Effects
function initNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Service Card Interactive Effects
function initServiceCardEffects() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        // Add ripple effect
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: radial-gradient(circle, rgba(78, 205, 196, 0.3) 0%, transparent 70%);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 1;
            `;
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Advanced Equipment Animations
function initAdvancedEquipmentAnimations() {
    initSurveyEquipmentAnimation();
    initDroneFleetAnimation();
    initHeavyMachineryAnimation();
    initLaboratoryEquipmentAnimation();
    initTestingEquipmentAnimation();
    initRentalStatusAnimation();
}

// Survey Equipment Animation
function initSurveyEquipmentAnimation() {
    const surveyEquipment = document.querySelector('.survey-equipment');
    if (!surveyEquipment) return;
    
    // Add interactive elements
    const totalStation = surveyEquipment.querySelector('.total-station');
    const gpsRover = surveyEquipment.querySelector('.gps-rover');
    
    // Total Station click interaction
    totalStation.addEventListener('click', () => {
        showEquipmentInfo('Total Station', {
            model: 'Leica TS16',
            accuracy: '1" angular, 1mm + 1.5ppm distance',
            range: '1000m reflectorless',
            features: ['Automatic target recognition', 'Bluetooth connectivity', 'Onboard apps']
        });
    });
    
    // GPS Rover click interaction
    gpsRover.addEventListener('click', () => {
        showEquipmentInfo('GPS/GNSS Rover', {
            model: 'Trimble R12',
            accuracy: 'Sub-centimeter RTK',
            constellations: 'GPS, GLONASS, Galileo, BeiDou',
            features: ['Real-time corrections', 'Long-range radio', 'Rugged design']
        });
    });
    
    // Add measurement simulation
    setInterval(() => {
        const angleDisplay = surveyEquipment.querySelector('.angle');
        const distanceDisplay = surveyEquipment.querySelector('.distance');
        
        if (angleDisplay && distanceDisplay) {
            const angle = Math.floor(Math.random() * 360);
            const minutes = Math.floor(Math.random() * 60);
            const seconds = Math.floor(Math.random() * 60);
            const distance = (Math.random() * 500 + 50).toFixed(2);
            
            angleDisplay.textContent = `${angle}°${minutes}'${seconds}"`;
            distanceDisplay.textContent = `${distance}m`;
        }
    }, 3000);
}

// Drone Fleet Animation
function initDroneFleetAnimation() {
    const droneFleet = document.querySelector('.drone-fleet');
    if (!droneFleet) return;
    
    const drones = droneFleet.querySelectorAll('.drone');
    
    drones.forEach((drone, index) => {
        drone.addEventListener('click', () => {
            const droneType = drone.classList.contains('mapping-drone') ? 'Mapping Drone' : 'Inspection Drone';
            const droneData = {
                'Mapping Drone': {
                    model: 'DJI Phantom 4 RTK',
                    flightTime: '30 minutes',
                    camera: '20MP 1" CMOS sensor',
                    features: ['RTK positioning', 'Obstacle avoidance', 'Automated flight planning']
                },
                'Inspection Drone': {
                    model: 'DJI Matrice 300 RTK',
                    flightTime: '55 minutes',
                    camera: 'Thermal + RGB cameras',
                    features: ['Thermal imaging', 'Zoom capabilities', 'Weather resistance']
                }
            };
            
            showEquipmentInfo(droneType, droneData[droneType]);
        });
        
        // Add random flight path updates
        setInterval(() => {
            const flightPath = drone.querySelector('.flight-path');
            if (flightPath) {
                flightPath.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`;
            }
        }, 5000 + index * 1000);
    });
}

// Heavy Machinery Animation
function initHeavyMachineryAnimation() {
    const heavyMachinery = document.querySelector('.heavy-machinery');
    if (!heavyMachinery) return;
    
    const excavator = heavyMachinery.querySelector('.excavator');
    const crane = heavyMachinery.querySelector('.crane');
    
    excavator.addEventListener('click', () => {
        showEquipmentInfo('Excavator', {
            model: 'Caterpillar 320',
            weight: '20 tons',
            reach: '9.5 meters',
            features: ['Hydraulic system', 'GPS guidance', 'Fuel efficient engine']
        });
    });
    
    crane.addEventListener('click', () => {
        showEquipmentInfo('Mobile Crane', {
            model: 'Liebherr LTM 1050',
            capacity: '50 tons',
            height: '48 meters',
            features: ['Telescopic boom', 'All-terrain capability', 'Load monitoring']
        });
    });
}

// Laboratory Equipment Animation
function initLaboratoryEquipmentAnimation() {
    const labEquipment = document.querySelector('.laboratory-equipment');
    if (!labEquipment) return;
    
    const microscope = labEquipment.querySelector('.microscope');
    const spectrometer = labEquipment.querySelector('.spectrometer');
    
    microscope.addEventListener('click', () => {
        showEquipmentInfo('Digital Microscope', {
            model: 'Olympus BX53',
            magnification: '40x - 1000x',
            resolution: '0.2 μm',
            features: ['Digital imaging', 'Fluorescence capability', 'Automated stage']
        });
    });
    
    spectrometer.addEventListener('click', () => {
        showEquipmentInfo('XRF Spectrometer', {
            model: 'Bruker EZ200',
            elements: 'Mg to U',
            accuracy: '±0.1%',
            features: ['Non-destructive analysis', 'Portable design', 'Real-time results']
        });
    });
    
    // Simulate spectrum analysis
    setInterval(() => {
        const spectrumLines = labEquipment.querySelectorAll('.spectrum-line');
        spectrumLines.forEach(line => {
            const height = Math.random() * 15 + 5;
            line.style.height = height + 'px';
        });
    }, 2000);
}

// Testing Equipment Animation
function initTestingEquipmentAnimation() {
    const testingEquipment = document.querySelector('.testing-equipment');
    if (!testingEquipment) return;
    
    const soilTester = testingEquipment.querySelector('.soil-tester');
    const waterAnalyzer = testingEquipment.querySelector('.water-analyzer');
    
    soilTester.addEventListener('click', () => {
        showEquipmentInfo('Soil Testing Kit', {
            model: 'Hanna HI-9813',
            parameters: 'pH, EC, TDS, Temperature',
            accuracy: '±0.1 pH, ±2% EC',
            features: ['Waterproof design', 'Auto-calibration', 'Data logging']
        });
    });
    
    waterAnalyzer.addEventListener('click', () => {
        showEquipmentInfo('Water Quality Analyzer', {
            model: 'YSI ProDSS',
            parameters: 'DO, pH, Turbidity, Conductivity',
            depth: '200 meters',
            features: ['Multi-parameter probe', 'GPS logging', 'Wireless data transfer']
        });
    });
    
    // Simulate sensor readings
    setInterval(() => {
        const moistureMeter = testingEquipment.querySelector('.moisture-meter');
        const resultBars = testingEquipment.querySelectorAll('.result-bar');
        
        if (moistureMeter) {
            const width = Math.random() * 25 + 10;
            moistureMeter.style.width = width + 'px';
        }
        
        resultBars.forEach(bar => {
            const height = Math.random() * 15 + 5;
            bar.style.height = height + 'px';
        });
    }, 3000);
}

// Rental Status Animation
function initRentalStatusAnimation() {
    const rentalStatus = document.querySelector('.rental-status');
    if (!rentalStatus) return;
    
    const statusBoard = rentalStatus.querySelector('.status-board');
    
    statusBoard.addEventListener('click', () => {
        showRentalStatus();
    });
    
    // Update status numbers periodically
    setInterval(() => {
        const statusItems = rentalStatus.querySelectorAll('.status-item span');
        const statuses = [
            `Available: ${Math.floor(Math.random() * 10) + 10}`,
            `Rented: ${Math.floor(Math.random() * 15) + 5}`,
            `Maintenance: ${Math.floor(Math.random() * 5) + 1}`
        ];
        
        statusItems.forEach((item, index) => {
            if (statuses[index]) {
                item.textContent = statuses[index];
            }
        });
    }, 10000);
}

// Equipment Info Popup
function showEquipmentInfo(title, data) {
    const popup = document.createElement('div');
    popup.className = 'equipment-popup';
    popup.innerHTML = `
        <div class="popup-content">
            <div class="popup-header">
                <h3>${title}</h3>
                <button class="popup-close">&times;</button>
            </div>
            <div class="popup-body">
                <div class="equipment-details">
                    <div class="detail-item">
                        <strong>Model:</strong> ${data.model}
                    </div>
                    ${data.accuracy ? `<div class="detail-item"><strong>Accuracy:</strong> ${data.accuracy}</div>` : ''}
                    ${data.range ? `<div class="detail-item"><strong>Range:</strong> ${data.range}</div>` : ''}
                    ${data.flightTime ? `<div class="detail-item"><strong>Flight Time:</strong> ${data.flightTime}</div>` : ''}
                    ${data.camera ? `<div class="detail-item"><strong>Camera:</strong> ${data.camera}</div>` : ''}
                    ${data.weight ? `<div class="detail-item"><strong>Weight:</strong> ${data.weight}</div>` : ''}
                    ${data.capacity ? `<div class="detail-item"><strong>Capacity:</strong> ${data.capacity}</div>` : ''}
                    ${data.magnification ? `<div class="detail-item"><strong>Magnification:</strong> ${data.magnification}</div>` : ''}
                    ${data.parameters ? `<div class="detail-item"><strong>Parameters:</strong> ${data.parameters}</div>` : ''}
                </div>
                <div class="equipment-features">
                    <h4>Key Features:</h4>
                    <ul>
                        ${data.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                <div class="rental-info">
                    <div class="rental-price">Daily Rate: $${Math.floor(Math.random() * 500) + 100}</div>
                    <div class="rental-availability">Available: ${Math.floor(Math.random() * 5) + 1} units</div>
                </div>
            </div>
            <div class="popup-footer">
                <button class="btn btn-primary">Request Quote</button>
                <button class="btn btn-outline-secondary">Add to Cart</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(popup);
    
    // Close popup functionality
    const closeBtn = popup.querySelector('.popup-close');
    closeBtn.addEventListener('click', () => {
        popup.remove();
    });
    
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.remove();
        }
    });
    
    // Add popup styles
    if (!document.querySelector('#equipment-popup-styles')) {
        const styles = document.createElement('style');
        styles.id = 'equipment-popup-styles';
        styles.textContent = `
            .equipment-popup {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }
            
            .popup-content {
                background: white;
                border-radius: 15px;
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                animation: slideIn 0.3s ease;
            }
            
            .popup-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem;
                border-bottom: 1px solid #eee;
                background: linear-gradient(45deg, #4ecdc4, #44a08d);
                color: white;
                border-radius: 15px 15px 0 0;
            }
            
            .popup-header h3 {
                margin: 0;
                font-family: 'Orbitron', monospace;
                font-weight: 600;
            }
            
            .popup-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                color: white;
                cursor: pointer;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background 0.3s ease;
            }
            
            .popup-close:hover {
                background: rgba(255, 255, 255, 0.2);
            }
            
            .popup-body {
                padding: 1.5rem;
            }
            
            .equipment-details {
                margin-bottom: 1.5rem;
            }
            
            .detail-item {
                padding: 0.5rem 0;
                border-bottom: 1px solid #f0f0f0;
                font-family: 'Poppins', sans-serif;
            }
            
            .detail-item:last-child {
                border-bottom: none;
            }
            
            .equipment-features h4 {
                color: #2c3e50;
                margin-bottom: 1rem;
                font-family: 'Poppins', sans-serif;
                font-weight: 600;
            }
            
            .equipment-features ul {
                list-style: none;
                padding: 0;
            }
            
            .equipment-features li {
                padding: 0.3rem 0;
                position: relative;
                padding-left: 1.5rem;
            }
            
            .equipment-features li::before {
                content: '✓';
                position: absolute;
                left: 0;
                color: #4ecdc4;
                font-weight: bold;
            }
            
            .rental-info {
                background: #f8f9fa;
                padding: 1rem;
                border-radius: 10px;
                margin-top: 1.5rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .rental-price {
                font-weight: 600;
                color: #2c3e50;
                font-size: 1.1rem;
            }
            
            .rental-availability {
                color: #27ae60;
                font-weight: 500;
            }
            
            .popup-footer {
                padding: 1.5rem;
                border-top: 1px solid #eee;
                display: flex;
                gap: 1rem;
                justify-content: flex-end;
            }
            
            .popup-footer .btn {
                padding: 0.7rem 1.5rem;
                border-radius: 25px;
                border: none;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .popup-footer .btn-primary {
                background: linear-gradient(45deg, #4ecdc4, #44a08d);
                color: white;
            }
            
            .popup-footer .btn-outline-secondary {
                background: transparent;
                border: 2px solid #6c757d;
                color: #6c757d;
            }
            
            .popup-footer .btn:hover {
                transform: translateY(-2px);
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideIn {
                from { transform: translateY(-50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(styles);
    }
}

// Rental Status Popup
function showRentalStatus() {
    const popup = document.createElement('div');
    popup.className = 'equipment-popup';
    popup.innerHTML = `
        <div class="popup-content">
            <div class="popup-header">
                <h3>Equipment Rental Status</h3>
                <button class="popup-close">&times;</button>
            </div>
            <div class="popup-body">
                <div class="status-overview">
                    <div class="status-card available">
                        <div class="status-number">${Math.floor(Math.random() * 10) + 15}</div>
                        <div class="status-label">Available</div>
                    </div>
                    <div class="status-card rented">
                        <div class="status-number">${Math.floor(Math.random() * 15) + 8}</div>
                        <div class="status-label">Currently Rented</div>
                    </div>
                    <div class="status-card maintenance">
                        <div class="status-number">${Math.floor(Math.random() * 5) + 2}</div>
                        <div class="status-label">Under Maintenance</div>
                    </div>
                </div>
                <div class="equipment-categories">
                    <h4>Equipment Categories</h4>
                    <div class="category-list">
                        <div class="category-item">
                            <span class="category-name">Survey Equipment</span>
                            <span class="category-count">12 units</span>
                        </div>
                        <div class="category-item">
                            <span class="category-name">Drones & UAVs</span>
                            <span class="category-count">8 units</span>
                        </div>
                        <div class="category-item">
                            <span class="category-name">Heavy Machinery</span>
                            <span class="category-count">6 units</span>
                        </div>
                        <div class="category-item">
                            <span class="category-name">Laboratory Equipment</span>
                            <span class="category-count">15 units</span>
                        </div>
                        <div class="category-item">
                            <span class="category-name">Testing Equipment</span>
                            <span class="category-count">10 units</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="popup-footer">
                <button class="btn btn-primary">View Full Inventory</button>
                <button class="btn btn-outline-secondary">Request Catalog</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(popup);
    
    // Close popup functionality
    const closeBtn = popup.querySelector('.popup-close');
    closeBtn.addEventListener('click', () => {
        popup.remove();
    });
    
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.remove();
        }
    });
    
    // Add additional styles for status popup
    if (!document.querySelector('#status-popup-styles')) {
        const styles = document.createElement('style');
        styles.id = 'status-popup-styles';
        styles.textContent = `
            .status-overview {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                gap: 1rem;
                margin-bottom: 2rem;
            }
            
            .status-card {
                text-align: center;
                padding: 1.5rem;
                border-radius: 10px;
                color: white;
            }
            
            .status-card.available {
                background: linear-gradient(45deg, #27ae60, #2ecc71);
            }
            
            .status-card.rented {
                background: linear-gradient(45deg, #f39c12, #e67e22);
            }
            
            .status-card.maintenance {
                background: linear-gradient(45deg, #e74c3c, #c0392b);
            }
            
            .status-number {
                font-size: 2rem;
                font-weight: 700;
                font-family: 'Orbitron', monospace;
            }
            
            .status-label {
                font-size: 0.9rem;
                opacity: 0.9;
                margin-top: 0.5rem;
            }
            
            .equipment-categories h4 {
                color: #2c3e50;
                margin-bottom: 1rem;
                font-family: 'Poppins', sans-serif;
                font-weight: 600;
            }
            
            .category-list {
                background: #f8f9fa;
                border-radius: 10px;
                padding: 1rem;
            }
            
            .category-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0.7rem 0;
                border-bottom: 1px solid #e9ecef;
            }
            
            .category-item:last-child {
                border-bottom: none;
            }
            
            .category-name {
                font-weight: 500;
                color: #2c3e50;
            }
            
            .category-count {
                color: #4ecdc4;
                font-weight: 600;
                font-family: 'Fira Code', monospace;
            }
        `;
        document.head.appendChild(styles);
    }
}

// Add ripple animation CSS
function addRippleAnimation() {
    if (!document.querySelector('#ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation';
        style.textContent = `
            @keyframes ripple {
                0% {
                    transform: scale(0);
                    opacity: 1;
                }
                100% {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Equipment Performance Monitoring
function initPerformanceMonitoring() {
    const equipmentTips = [
        "Regular maintenance extends equipment lifespan by 40%",
        "Proper calibration ensures measurement accuracy within specifications",
        "Environmental protection increases equipment reliability",
        "Operator training reduces equipment damage by 60%",
        "Preventive maintenance is 5x more cost-effective than repairs"
    ];
    
    let tipIndex = 0;
    
    setInterval(() => {
        console.log(`Equipment Tip: ${equipmentTips[tipIndex]}`);
        tipIndex = (tipIndex + 1) % equipmentTips.length;
    }, 30000);
}

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initLoadingScreen();
    initNavbarEffects();
    initServiceCardEffects();
    addRippleAnimation();
    initPerformanceMonitoring();
    
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
});

// Export functions for external use
window.EquipmentAnimations = {
    initLoadingScreen,
    initAdvancedEquipmentAnimations,
    showEquipmentInfo,
    showRentalStatus
};