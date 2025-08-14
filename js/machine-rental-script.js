// Machine Rental Specific JavaScript

// Global variables
let currentStep = 1;
let selectedEquipment = null;
let bookingData = {};
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

// Equipment data
const equipmentData = {
    'trimble-r12': {
        name: 'Trimble R12 GPS',
        dailyRate: 125,
        weeklyRate: 750,
        monthlyRate: 2500,
        category: 'gps',
        description: 'High-precision GNSS receiver with RTK capabilities',
        specs: ['Multi-constellation GNSS', '±1cm accuracy', '12-hour battery life', 'Bluetooth connectivity'],
        features: ['Real-time kinematic positioning', 'Multi-frequency tracking', 'Advanced multipath rejection', 'Integrated UHF radio'],
        applications: ['Boundary surveys', 'Construction layout', 'Topographic mapping', 'GIS data collection']
    },
    'leica-gs18': {
        name: 'Leica GS18 T',
        dailyRate: 150,
        weeklyRate: 900,
        monthlyRate: 3000,
        category: 'gps',
        description: 'Tilt-compensated GNSS smart antenna',
        specs: ['Tilt compensation up to 30°', '±2cm accuracy', 'Wireless connectivity', 'All-weather operation'],
        features: ['Visual positioning technology', 'Immune to magnetic interference', 'Self-learning tilt compensation', 'Smart antenna technology'],
        applications: ['Difficult terrain surveys', 'Urban environments', 'Forest surveys', 'Mining applications']
    },
    'leica-ts16': {
        name: 'Leica TS16',
        dailyRate: 200,
        weeklyRate: 1200,
        monthlyRate: 4000,
        category: 'total-stations',
        description: 'Self-learning total station with PowerSearch',
        specs: ['1" angular accuracy', 'PowerSearch technology', 'ATR (Automatic Target Recognition)', '1000m range'],
        features: ['Self-learning algorithms', 'Automatic target search', 'High-speed measurements', 'Captivate software'],
        applications: ['Construction stakeout', 'Monitoring surveys', 'Industrial measurements', 'Infrastructure projects']
    },
    'trimble-s9': {
        name: 'Trimble S9',
        dailyRate: 250,
        weeklyRate: 1500,
        monthlyRate: 5000,
        category: 'total-stations',
        description: 'High-precision robotic total station',
        specs: ['0.5" angular accuracy', 'Robotic operation', '5000m range', 'Dual-axis compensation'],
        features: ['Robotic tracking', 'Long-range EDM', 'Advanced optics', 'Trimble Access software'],
        applications: ['Large construction projects', 'Mining surveys', 'Deformation monitoring', 'Precision engineering']
    },
    'leica-na2': {
        name: 'Leica NA2',
        dailyRate: 75,
        weeklyRate: 450,
        monthlyRate: 1500,
        category: 'levels',
        description: 'Automatic level with precise compensator',
        specs: ['±0.7mm accuracy', '32x magnification', 'Automatic compensator', 'Robust construction'],
        features: ['Precise leveling', 'Easy operation', 'Reliable compensator', 'Weather resistant'],
        applications: ['Building construction', 'Road construction', 'Site preparation', 'Elevation surveys']
    },
    'topcon-rl-sv2s': {
        name: 'Topcon RL-SV2S',
        dailyRate: 100,
        weeklyRate: 600,
        monthlyRate: 2000,
        category: 'levels',
        description: 'Dual slope laser level with remote control',
        specs: ['±1.5mm accuracy', 'Dual slope capability', 'Remote control', '600m range'],
        features: ['Dual slope laser', 'Remote operation', 'Self-leveling', 'Long battery life'],
        applications: ['Grading work', 'Excavation', 'Concrete work', 'Drainage systems']
    },
    'prism-set': {
        name: 'Prism Set',
        dailyRate: 25,
        weeklyRate: 150,
        monthlyRate: 500,
        category: 'accessories',
        description: 'Complete prism set with tripod and pole',
        specs: ['Multi-prism configuration', 'Adjustable pole', 'Tripod included', 'Carrying case'],
        features: ['Multiple prism options', 'Adjustable height', 'Stable tripod', 'Complete kit'],
        applications: ['Total station surveys', 'Distance measurements', 'Angle observations', 'Construction layout']
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeMachineRental();
});

function initializeMachineRental() {
    initializeQuickBooking();
    initializeEquipmentFilters();
    initializeBookingForm();
    initializeAvailabilityCalendar();
    initializePriceCalculator();
    setupEventListeners();
    setMinDates();
}

// Quick Booking Functions
function initializeQuickBooking() {
    const quickStartDate = document.getElementById('quick-start-date');
    const quickEndDate = document.getElementById('quick-end-date');
    
    if (quickStartDate && quickEndDate) {
        const today = new Date().toISOString().split('T')[0];
        quickStartDate.min = today;
        quickEndDate.min = today;
        
        quickStartDate.addEventListener('change', function() {
            quickEndDate.min = this.value;
            if (quickEndDate.value && quickEndDate.value < this.value) {
                quickEndDate.value = this.value;
            }
        });
    }
}

function quickQuote() {
    const equipment = document.getElementById('quick-equipment').value;
    const startDate = document.getElementById('quick-start-date').value;
    const endDate = document.getElementById('quick-end-date').value;
    
    if (!equipment || !startDate || !endDate) {
        showNotification('Please fill in all fields', 'warning', 'Incomplete Information');
        return;
    }
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    
    if (days < 1) {
        showNotification('End date must be after start date', 'error', 'Invalid Dates');
        return;
    }
    
    const equipmentInfo = equipmentData[equipment];
    if (!equipmentInfo) {
        showNotification('Equipment not found', 'error', 'Error');
        return;
    }
    
    let cost = 0;
    if (days >= 30) {
        cost = equipmentInfo.monthlyRate * Math.ceil(days / 30);
    } else if (days >= 7) {
        cost = equipmentInfo.weeklyRate * Math.ceil(days / 7);
    } else {
        cost = equipmentInfo.dailyRate * days;
    }
    
    const tax = cost * 0.085;
    const total = cost + tax;
    
    showNotification(
        `${equipmentInfo.name} for ${days} days: $${total.toFixed(2)} (including tax)`,
        'success',
        'Quick Quote'
    );
    
    // Scroll to booking section
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
}

// Equipment Filter Functions
function initializeEquipmentFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const equipmentCards = document.querySelectorAll('.equipment-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter equipment cards
            equipmentCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (category === 'all' || cardCategory === category) {
                    card.classList.remove('hidden');
                    card.style.display = 'block';
                } else {
                    card.classList.add('hidden');
                    card.style.display = 'none';
                }
            });
            
            // Animate visible cards
            setTimeout(() => {
                const visibleCards = document.querySelectorAll('.equipment-card:not(.hidden)');
                visibleCards.forEach((card, index) => {
                    card.style.animationDelay = `${index * 0.1}s`;
                    card.style.animation = 'fadeInUp 0.6s ease forwards';
                });
            }, 100);
        });
    });
}

// Booking Functions
function bookEquipment(equipmentId) {
    selectedEquipment = equipmentId;
    const equipmentSelect = document.getElementById('equipment-select');
    if (equipmentSelect) {
        equipmentSelect.value = equipmentId;
        updatePriceCalculator();
    }
    
    // Scroll to booking section
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
    
    showNotification(
        `${equipmentData[equipmentId].name} selected for booking`,
        'success',
        'Equipment Selected'
    );
}

function viewDetails(equipmentId) {
    const equipment = equipmentData[equipmentId];
    if (!equipment) return;
    
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    modalTitle.textContent = equipment.name;
    
    modalBody.innerHTML = `
        <div class="equipment-details-modal">
            <div class="detail-section">
                <h4>Description</h4>
                <p>${equipment.description}</p>
            </div>
            
            <div class="detail-section">
                <h4>Specifications</h4>
                <ul class="spec-list">
                    ${equipment.specs.map(spec => `<li><i class="fas fa-check"></i> ${spec}</li>`).join('')}
                </ul>
            </div>
            
            <div class="detail-section">
                <h4>Key Features</h4>
                <ul class="feature-list">
                    ${equipment.features.map(feature => `<li><i class="fas fa-star"></i> ${feature}</li>`).join('')}
                </ul>
            </div>
            
            <div class="detail-section">
                <h4>Applications</h4>
                <ul class="application-list">
                    ${equipment.applications.map(app => `<li><i class="fas fa-arrow-right"></i> ${app}</li>`).join('')}
                </ul>
            </div>
            
            <div class="detail-section">
                <h4>Pricing</h4>
                <div class="pricing-table">
                    <div class="price-row">
                        <span>Daily Rate:</span>
                        <span class="price">$${equipment.dailyRate}</span>
                    </div>
                    <div class="price-row">
                        <span>Weekly Rate:</span>
                        <span class="price">$${equipment.weeklyRate}</span>
                    </div>
                    <div class="price-row">
                        <span>Monthly Rate:</span>
                        <span class="price">$${equipment.monthlyRate}</span>
                    </div>
                </div>
            </div>
            
            <div class="modal-actions">
                <button class="btn btn-primary" onclick="bookEquipment('${equipmentId}'); closeModal();">
                    Book This Equipment
                </button>
                <button class="btn btn-secondary" onclick="closeModal();">
                    Close
                </button>
            </div>
        </div>
    `;
    
    showModal();
}

function showModal() {
    const modal = document.getElementById('equipment-modal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('equipment-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Booking Form Functions
function initializeBookingForm() {
    const form = document.getElementById('booking-form');
    const deliveryMethod = document.getElementById('delivery-method');
    const deliveryAddress = document.querySelector('.delivery-address');
    
    // Handle delivery method change
    if (deliveryMethod && deliveryAddress) {
        deliveryMethod.addEventListener('change', function() {
            if (this.value === 'delivery' || this.value === 'courier') {
                deliveryAddress.style.display = 'block';
                deliveryAddress.querySelector('textarea').required = true;
            } else {
                deliveryAddress.style.display = 'none';
                deliveryAddress.querySelector('textarea').required = false;
            }
            updatePriceCalculator();
        });
    }
    
    // Handle form submission
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            submitBooking();
        });
    }
}

function nextStep() {
    if (validateCurrentStep()) {
        if (currentStep < 4) {
            currentStep++;
            updateFormStep();
            updateProgressIndicator();
            if (currentStep === 4) {
                generateBookingSummary();
            }
        }
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        updateFormStep();
        updateProgressIndicator();
    }
}

function updateFormStep() {
    const steps = document.querySelectorAll('.form-step');
    steps.forEach((step, index) => {
        if (index + 1 === currentStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
}

function updateProgressIndicator() {
    const progressSteps = document.querySelectorAll('.progress-step');
    progressSteps.forEach((step, index) => {
        if (index + 1 <= currentStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
}

function validateCurrentStep() {
    const currentStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    const requiredFields = currentStepElement.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#dc3545';
            isValid = false;
        } else {
            field.style.borderColor = '#e0e0e0';
        }
    });
    
    if (!isValid) {
        showNotification('Please fill in all required fields', 'error', 'Validation Error');
    }
    
    return isValid;
}

function generateBookingSummary() {
    const summaryContainer = document.getElementById('booking-summary');
    const formData = new FormData(document.getElementById('booking-form'));
    
    const equipment = formData.get('equipment');
    const startDate = formData.get('startDate');
    const endDate = formData.get('endDate');
    const quantity = formData.get('quantity') || 1;
    const deliveryMethod = formData.get('deliveryMethod');
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const company = formData.get('company');
    
    const equipmentInfo = equipmentData[equipment];
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    
    let equipmentCost = 0;
    if (days >= 30) {
        equipmentCost = equipmentInfo.monthlyRate * Math.ceil(days / 30) * quantity;
    } else if (days >= 7) {
        equipmentCost = equipmentInfo.weeklyRate * Math.ceil(days / 7) * quantity;
    } else {
        equipmentCost = equipmentInfo.dailyRate * days * quantity;
    }
    
    let deliveryCost = 0;
    if (deliveryMethod === 'delivery') deliveryCost = 50;
    if (deliveryMethod === 'courier') deliveryCost = 100;
    
    const subtotal = equipmentCost + deliveryCost;
    const tax = subtotal * 0.085;
    const total = subtotal + tax;
    
    summaryContainer.innerHTML = `
        <div class="summary-section">
            <h4>Equipment Details</h4>
            <div class="summary-item">
                <span class="summary-label">Equipment:</span>
                <span class="summary-value">${equipmentInfo.name}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Quantity:</span>
                <span class="summary-value">${quantity}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Rental Period:</span>
                <span class="summary-value">${startDate} to ${endDate} (${days} days)</span>
            </div>
        </div>
        
        <div class="summary-section">
            <h4>Delivery Information</h4>
            <div class="summary-item">
                <span class="summary-label">Method:</span>
                <span class="summary-value">${getDeliveryMethodText(deliveryMethod)}</span>
            </div>
        </div>
        
        <div class="summary-section">
            <h4>Contact Information</h4>
            <div class="summary-item">
                <span class="summary-label">Name:</span>
                <span class="summary-value">${firstName} ${lastName}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Email:</span>
                <span class="summary-value">${email}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Phone:</span>
                <span class="summary-value">${phone}</span>
            </div>
            ${company ? `
            <div class="summary-item">
                <span class="summary-label">Company:</span>
                <span class="summary-value">${company}</span>
            </div>
            ` : ''}
        </div>
        
        <div class="summary-section">
            <h4>Pricing Summary</h4>
            <div class="summary-item">
                <span class="summary-label">Equipment Cost:</span>
                <span class="summary-value">$${equipmentCost.toFixed(2)}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Delivery Cost:</span>
                <span class="summary-value">$${deliveryCost.toFixed(2)}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Subtotal:</span>
                <span class="summary-value">$${subtotal.toFixed(2)}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Tax (8.5%):</span>
                <span class="summary-value">$${tax.toFixed(2)}</span>
            </div>
            <div class="summary-item" style="font-weight: 600; font-size: 1.1rem; border-top: 2px solid var(--primary-blue); padding-top: 10px; margin-top: 10px;">
                <span class="summary-label">Total:</span>
                <span class="summary-value">$${total.toFixed(2)}</span>
            </div>
        </div>
    `;
}

function getDeliveryMethodText(method) {
    switch (method) {
        case 'pickup': return 'Pickup at Office (Free)';
        case 'delivery': return 'Standard Delivery (+$50)';
        case 'courier': return 'Express Courier (+$100)';
        default: return method;
    }
}

function submitBooking() {
    const termsAgreement = document.getElementById('terms-agreement');
    if (!termsAgreement.checked) {
        showNotification('Please agree to the terms and conditions', 'error', 'Terms Required');
        return;
    }
    
    // Simulate booking submission
    showNotification('Processing your booking...', 'info', 'Please Wait');
    
    setTimeout(() => {
        const bookingId = 'TGIS-' + Date.now().toString().slice(-6);
        showNotification(
            `Booking confirmed! Your booking ID is ${bookingId}. You will receive a confirmation email shortly.`,
            'success',
            'Booking Confirmed'
        );
        
        // Reset form
        document.getElementById('booking-form').reset();
        currentStep = 1;
        updateFormStep();
        updateProgressIndicator();
        updatePriceCalculator();
    }, 2000);
}

// Price Calculator Functions
function initializePriceCalculator() {
    const equipmentSelect = document.getElementById('equipment-select');
    const startDate = document.getElementById('start-date');
    const endDate = document.getElementById('end-date');
    const quantity = document.getElementById('quantity');
    const deliveryMethod = document.getElementById('delivery-method');
    
    [equipmentSelect, startDate, endDate, quantity, deliveryMethod].forEach(element => {
        if (element) {
            element.addEventListener('change', updatePriceCalculator);
        }
    });
}

function updatePriceCalculator() {
    const equipmentSelect = document.getElementById('equipment-select');
    const startDate = document.getElementById('start-date');
    const endDate = document.getElementById('end-date');
    const quantity = document.getElementById('quantity');
    const deliveryMethod = document.getElementById('delivery-method');
    
    const equipmentCostEl = document.getElementById('equipment-cost');
    const durationEl = document.getElementById('duration-days');
    const deliveryCostEl = document.getElementById('delivery-cost');
    const subtotalEl = document.getElementById('subtotal');
    const taxAmountEl = document.getElementById('tax-amount');
    const totalCostEl = document.getElementById('total-cost');
    
    if (!equipmentSelect || !startDate || !endDate || !quantity) return;
    
    const equipment = equipmentSelect.value;
    const start = startDate.value;
    const end = endDate.value;
    const qty = parseInt(quantity.value) || 1;
    const delivery = deliveryMethod ? deliveryMethod.value : 'pickup';
    
    if (!equipment || !start || !end) {
        resetPriceCalculator();
        return;
    }
    
    const equipmentInfo = equipmentData[equipment];
    if (!equipmentInfo) {
        resetPriceCalculator();
        return;
    }
    
    const startDateObj = new Date(start);
    const endDateObj = new Date(end);
    const days = Math.ceil((endDateObj - startDateObj) / (1000 * 60 * 60 * 24)) + 1;
    
    if (days < 1) {
        resetPriceCalculator();
        return;
    }
    
    let equipmentCost = 0;
    if (days >= 30) {
        equipmentCost = equipmentInfo.monthlyRate * Math.ceil(days / 30) * qty;
    } else if (days >= 7) {
        equipmentCost = equipmentInfo.weeklyRate * Math.ceil(days / 7) * qty;
    } else {
        equipmentCost = equipmentInfo.dailyRate * days * qty;
    }
    
    let deliveryCost = 0;
    if (delivery === 'delivery') deliveryCost = 50;
    if (delivery === 'courier') deliveryCost = 100;
    
    const subtotal = equipmentCost + deliveryCost;
    const tax = subtotal * 0.085;
    const total = subtotal + tax;
    
    if (equipmentCostEl) equipmentCostEl.textContent = `$${equipmentCost.toFixed(2)}`;
    if (durationEl) durationEl.textContent = `${days} day${days !== 1 ? 's' : ''}`;
    if (deliveryCostEl) deliveryCostEl.textContent = `$${deliveryCost.toFixed(2)}`;
    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (taxAmountEl) taxAmountEl.textContent = `$${tax.toFixed(2)}`;
    if (totalCostEl) totalCostEl.textContent = `$${total.toFixed(2)}`;
}

function resetPriceCalculator() {
    const elements = [
        'equipment-cost', 'duration-days', 'delivery-cost',
        'subtotal', 'tax-amount', 'total-cost'
    ];
    
    elements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            if (id === 'duration-days') {
                element.textContent = '0 days';
            } else {
                element.textContent = '$0.00';
            }
        }
    });
}

// Availability Calendar Functions
function initializeAvailabilityCalendar() {
    generateCalendar();
    setupCalendarNavigation();
    setupEquipmentSelection();
}

function generateCalendar() {
    const calendarGrid = document.getElementById('calendar-grid');
    const calendarMonth = document.getElementById('calendar-month');
    
    if (!calendarGrid || !calendarMonth) return;
    
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    calendarMonth.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    
    // Clear existing calendar
    calendarGrid.innerHTML = '';
    
    // Add day headers
    dayNames.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day header';
        dayHeader.textContent = day;
        calendarGrid.appendChild(dayHeader);
    });
    
    // Get first day of month and number of days
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day';
        calendarGrid.appendChild(emptyDay);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;
        
        // Simulate availability (random for demo)
        const availability = getAvailabilityForDate(currentYear, currentMonth, day);
        dayElement.classList.add(availability);
        
        if (availability !== 'unavailable') {
            dayElement.addEventListener('click', function() {
                selectCalendarDate(this, currentYear, currentMonth, day);
            });
        }
        
        calendarGrid.appendChild(dayElement);
    }
}

function getAvailabilityForDate(year, month, day) {
    // Simulate availability based on date (for demo purposes)
    const date = new Date(year, month, day);
    const today = new Date();
    
    if (date < today) {
        return 'unavailable';
    }
    
    const dayOfWeek = date.getDay();
    const random = Math.random();
    
    // Weekends have different availability
    if (dayOfWeek === 0 || dayOfWeek === 6) {
        return random > 0.7 ? 'unavailable' : 'limited';
    }
    
    // Weekdays
    if (random > 0.9) return 'unavailable';
    if (random > 0.7) return 'limited';
    return 'available';
}

function selectCalendarDate(element, year, month, day) {
    // Remove previous selection
    document.querySelectorAll('.calendar-day.selected').forEach(el => {
        el.classList.remove('selected');
    });
    
    // Add selection to clicked date
    element.classList.add('selected');
    
    const selectedDate = new Date(year, month, day);
    const dateString = selectedDate.toISOString().split('T')[0];
    
    showNotification(
        `Selected date: ${selectedDate.toLocaleDateString()}`,
        'info',
        'Date Selected'
    );
}

function setupCalendarNavigation() {
    const prevBtn = document.getElementById('prev-month');
    const nextBtn = document.getElementById('next-month');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            generateCalendar();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            generateCalendar();
        });
    }
}

function setupEquipmentSelection() {
    const equipmentItems = document.querySelectorAll('.equipment-item');
    
    equipmentItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            equipmentItems.forEach(el => el.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Update calendar based on selected equipment
            generateCalendar();
        });
    });
}

// Utility Functions
function setMinDates() {
    const today = new Date().toISOString().split('T')[0];
    const startDateInputs = document.querySelectorAll('input[type="date"]');
    
    startDateInputs.forEach(input => {
        if (input.id.includes('start') || input.id.includes('quick')) {
            input.min = today;
        }
    });
    
    // Set up date validation
    const startDate = document.getElementById('start-date');
    const endDate = document.getElementById('end-date');
    
    if (startDate && endDate) {
        startDate.addEventListener('change', function() {
            endDate.min = this.value;
            if (endDate.value && endDate.value < this.value) {
                endDate.value = this.value;
            }
            updatePriceCalculator();
        });
        
        endDate.addEventListener('change', function() {
            updatePriceCalculator();
        });
    }
}

function setupEventListeners() {
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('equipment-modal');
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Notification System
function showNotification(message, type = 'info', title = '') {
    const container = document.getElementById('notification-container');
    if (!container) return;
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const iconMap = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                <i class="${iconMap[type] || iconMap.info}"></i>
            </div>
            <div class="notification-text">
                ${title ? `<div class="notification-title">${title}</div>` : ''}
                <div class="notification-message">${message}</div>
            </div>
        </div>
    `;
    
    container.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Export functions for global access
window.quickQuote = quickQuote;
window.bookEquipment = bookEquipment;
window.viewDetails = viewDetails;
window.closeModal = closeModal;
window.nextStep = nextStep;
window.prevStep = prevStep;
