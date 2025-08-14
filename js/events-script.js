// Events Page JavaScript

// Sample Events Data
const upcomingEvents = [
    {
        id: 1,
        title: "GIS Technology Summit 2024",
        description: "Join industry leaders for the latest in GIS technology, featuring keynote speakers, workshops, and networking opportunities.",
        date: "2024-03-15",
        time: "09:00 AM",
        location: "Tech Convention Center, San Francisco",
        category: "conference",
        price: 299,
        image: "/placeholder.svg?height=200&width=350&text=GIS+Summit",
        capacity: 500,
        registered: 342,
        featured: true,
        details: {
            duration: "2 days",
            speakers: ["Dr. Sarah Johnson", "Mark Thompson", "Lisa Chen"],
            agenda: [
                "Opening Keynote: Future of GIS",
                "Workshop: Advanced Mapping Techniques",
                "Panel: Industry Trends and Innovations",
                "Networking Lunch",
                "Technical Sessions",
                "Closing Ceremony"
            ],
            requirements: "Basic knowledge of GIS systems recommended",
            includes: "Conference materials, lunch, networking reception"
        }
    },
    {
        id: 2,
        title: "Infrastructure Planning Workshop",
        description: "Hands-on workshop covering modern infrastructure planning methodologies and best practices.",
        date: "2024-03-22",
        time: "10:00 AM",
        location: "TGIS Training Center, Austin",
        category: "workshop",
        price: 149,
        image: "/placeholder.svg?height=200&width=350&text=Infrastructure+Workshop",
        capacity: 50,
        registered: 28,
        featured: false,
        details: {
            duration: "1 day",
            speakers: ["John Davis", "Maria Rodriguez"],
            agenda: [
                "Introduction to Modern Planning",
                "Case Study Analysis",
                "Hands-on Planning Exercise",
                "Group Discussions",
                "Best Practices Review"
            ],
            requirements: "Engineering or planning background preferred",
            includes: "Workshop materials, certificate of completion"
        }
    },
    {
        id: 3,
        title: "Real Estate Technology Seminar",
        description: "Explore the latest technologies transforming the real estate industry, from virtual tours to AI-powered analytics.",
        date: "2024-04-05",
        time: "02:00 PM",
        location: "Downtown Business Center, Chicago",
        category: "seminar",
        price: 0,
        image: "/placeholder.svg?height=200&width=350&text=Real+Estate+Tech",
        capacity: 100,
        registered: 67,
        featured: true,
        details: {
            duration: "4 hours",
            speakers: ["Alex Thompson", "Jennifer Lee"],
            agenda: [
                "Technology Trends in Real Estate",
                "Virtual Reality Applications",
                "AI and Machine Learning",
                "Q&A Session"
            ],
            requirements: "None",
            includes: "Presentation materials, refreshments"
        }
    },
    {
        id: 4,
        title: "Networking Mixer: Tech Professionals",
        description: "Connect with fellow technology professionals in a relaxed networking environment.",
        date: "2024-04-12",
        time: "06:00 PM",
        location: "Rooftop Lounge, Seattle",
        category: "networking",
        price: 25,
        image: "/placeholder.svg?height=200&width=350&text=Networking+Mixer",
        capacity: 80,
        registered: 45,
        featured: false,
        details: {
            duration: "3 hours",
            speakers: [],
            agenda: [
                "Welcome Reception",
                "Networking Activities",
                "Industry Discussions",
                "Closing Remarks"
            ],
            requirements: "None",
            includes: "Appetizers, drinks, networking materials"
        }
    },
    {
        id: 5,
        title: "Advanced Survey Techniques Training",
        description: "Comprehensive training on advanced surveying techniques using the latest equipment and software.",
        date: "2024-04-18",
        time: "08:30 AM",
        location: "TGIS Field Training Site, Denver",
        category: "training",
        price: 399,
        image: "/placeholder.svg?height=200&width=350&text=Survey+Training",
        capacity: 30,
        registered: 18,
        featured: true,
        details: {
            duration: "3 days",
            speakers: ["Robert Wilson", "Sarah Martinez"],
            agenda: [
                "Equipment Overview",
                "Field Techniques",
                "Data Processing",
                "Quality Control",
                "Certification Exam"
            ],
            requirements: "Basic surveying experience required",
            includes: "Training materials, equipment use, certification"
        }
    },
    {
        id: 6,
        title: "Digital Transformation Conference",
        description: "Learn how digital transformation is reshaping industries and discover strategies for successful implementation.",
        date: "2024-05-03",
        time: "09:00 AM",
        location: "Convention Center, New York",
        category: "conference",
        price: 449,
        image: "/placeholder.svg?height=200&width=350&text=Digital+Transformation",
        capacity: 300,
        registered: 156,
        featured: false,
        details: {
            duration: "2 days",
            speakers: ["Michael Brown", "Emily Davis", "David Kim"],
            agenda: [
                "Digital Strategy Development",
                "Technology Implementation",
                "Change Management",
                "Case Studies",
                "Future Trends"
            ],
            requirements: "Management or IT background preferred",
            includes: "Conference materials, meals, networking events"
        }
    }
];

const pastEvents = [
    {
        id: 101,
        title: "Annual GIS Conference 2023",
        date: "2023-11-15",
        location: "Los Angeles Convention Center",
        image: "/placeholder.svg?height=250&width=300&text=GIS+Conference+2023",
        description: "Our biggest conference yet with over 800 attendees from around the world.",
        year: "2023",
        attendees: 800
    },
    {
        id: 102,
        title: "Infrastructure Innovation Summit",
        date: "2023-09-22",
        location: "Boston Tech Hub",
        image: "/placeholder.svg?height=250&width=300&text=Infrastructure+Summit",
        description: "Exploring the future of infrastructure with cutting-edge technologies.",
        year: "2023",
        attendees: 450
    },
    {
        id: 103,
        title: "Real Estate Tech Expo",
        date: "2023-08-10",
        location: "Miami Beach Convention Center",
        image: "/placeholder.svg?height=250&width=300&text=Real+Estate+Expo",
        description: "Showcasing the latest innovations in real estate technology.",
        year: "2023",
        attendees: 600
    },
    {
        id: 104,
        title: "Survey Technology Workshop",
        date: "2023-06-18",
        location: "Phoenix Training Center",
        image: "/placeholder.svg?height=250&width=300&text=Survey+Workshop",
        description: "Hands-on training with the latest surveying equipment and techniques.",
        year: "2023",
        attendees: 75
    },
    {
        id: 105,
        title: "Digital Mapping Seminar",
        date: "2022-12-05",
        location: "Atlanta Business Center",
        image: "/placeholder.svg?height=250&width=300&text=Digital+Mapping",
        description: "Advanced techniques in digital mapping and spatial analysis.",
        year: "2022",
        attendees: 120
    },
    {
        id: 106,
        title: "Tech Innovation Forum",
        date: "2022-10-14",
        location: "Silicon Valley Tech Park",
        image: "/placeholder.svg?height=250&width=300&text=Tech+Forum",
        description: "Bringing together innovators and thought leaders in technology.",
        year: "2022",
        attendees: 350
    }
];

// Global variables
let currentFilter = 'all';
let currentGalleryFilter = 'all';
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let currentGalleryIndex = 0;
let filteredGalleryItems = [];

// Initialize events page
document.addEventListener('DOMContentLoaded', function() {
    initializeEventsPage();
    initializeCalendar();
    initializeModals();
    initializeFilters();
    initializeRegistration();
    initializeNotifications();
});

function initializeEventsPage() {
    renderUpcomingEvents();
    renderPastEventsGallery();
    populateEventSelect();
    
    // Load more buttons
    document.getElementById('load-more-upcoming').addEventListener('click', loadMoreUpcomingEvents);
    document.getElementById('load-more-gallery').addEventListener('click', loadMoreGalleryItems);
    
    // Newsletter form
    document.getElementById('newsletter-form').addEventListener('submit', handleNewsletterSubmission);
    
    // Floating action button
    document.getElementById('floating-btn').addEventListener('click', openRegistrationModal);
}

function renderUpcomingEvents() {
    const grid = document.getElementById('upcoming-events-grid');
    const filteredEvents = currentFilter === 'all' 
        ? upcomingEvents 
        : upcomingEvents.filter(event => event.category === currentFilter);
    
    grid.innerHTML = '';
    
    filteredEvents.forEach(event => {
        const eventCard = createEventCard(event);
        grid.appendChild(eventCard);
    });
    
    // Add AOS animation
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}

function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-category', event.category);
    
    const eventDate = new Date(event.date);
    const formattedDate = eventDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const availableSpots = event.capacity - event.registered;
    const priceDisplay = event.price === 0 ? 'FREE' : `$${event.price}`;
    
    card.innerHTML = `
        <img src="${event.image}" alt="${event.title}" class="event-image">
        <div class="event-content">
            <div class="event-meta">
                <span class="event-date">${formattedDate}</span>
                <span class="event-category">${event.category.charAt(0).toUpperCase() + event.category.slice(1)}</span>
            </div>
            <h3 class="event-title">${event.title}</h3>
            <p class="event-description">${event.description}</p>
            <div class="event-details">
                <div class="event-detail">
                    <i class="fas fa-clock"></i>
                    <span>${event.time}</span>
                </div>
                <div class="event-detail">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${event.location}</span>
                </div>
                <div class="event-detail">
                    <i class="fas fa-users"></i>
                    <span>${availableSpots} spots available</span>
                </div>
            </div>
            <div class="event-actions">
                <span class="event-price ${event.price === 0 ? 'free' : ''}">${priceDisplay}</span>
                <button class="btn-register" onclick="registerForEvent(${event.id})">Register</button>
                <button class="btn-details" onclick="showEventDetails(${event.id})">Details</button>
            </div>
        </div>
    `;
    
    return card;
}

function renderPastEventsGallery() {
    const gallery = document.getElementById('past-events-gallery');
    const filteredEvents = currentGalleryFilter === 'all' 
        ? pastEvents 
        : pastEvents.filter(event => event.year === currentGalleryFilter);
    
    filteredGalleryItems = filteredEvents;
    gallery.innerHTML = '';
    
    filteredEvents.forEach((event, index) => {
        const galleryItem = createGalleryItem(event, index);
        gallery.appendChild(galleryItem);
    });
    
    // Add AOS animation
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}

function createGalleryItem(event, index) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.setAttribute('data-aos', 'fade-up');
    item.setAttribute('data-year', event.year);
    
    const eventDate = new Date(event.date);
    const formattedDate = eventDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    item.innerHTML = `
        <img src="${event.image}" alt="${event.title}" class="gallery-image">
        <div class="gallery-overlay">
            <div class="gallery-info">
                <h3>${event.title}</h3>
                <p>${event.description}</p>
                <div class="gallery-date">${formattedDate} • ${event.attendees} attendees</div>
            </div>
        </div>
    `;
    
    item.addEventListener('click', () => openGalleryModal(index));
    
    return item;
}

function initializeCalendar() {
    renderCalendar();
    
    document.getElementById('prev-month').addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });
    
    document.getElementById('next-month').addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });
}

function renderCalendar() {
    const calendarTitle = document.getElementById('calendar-title');
    const calendarGrid = document.getElementById('calendar-grid');
    
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    calendarTitle.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    
    // Clear calendar
    calendarGrid.innerHTML = '';
    
    // Add day headers
    dayNames.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day-header';
        dayHeader.textContent = day;
        calendarGrid.appendChild(dayHeader);
    });
    
    // Get first day of month and number of days
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day other-month';
        calendarGrid.appendChild(emptyDay);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        
        const currentDate = new Date(currentYear, currentMonth, day);
        const dateString = currentDate.toISOString().split('T')[0];
        
        // Check if there are events on this day
        const dayEvents = upcomingEvents.filter(event => event.date === dateString);
        
        if (dayEvents.length > 0) {
            dayElement.classList.add('has-event');
        }
        
        dayElement.innerHTML = `
            <div class="calendar-day-number">${day}</div>
            ${dayEvents.map(event => `<div class="calendar-event">${event.title}</div>`).join('')}
        `;
        
        dayElement.addEventListener('click', () => {
            if (dayEvents.length > 0) {
                showEventDetails(dayEvents[0].id);
            }
        });
        
        calendarGrid.appendChild(dayElement);
    }
}

function initializeFilters() {
    // Event category filters
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.getAttribute('data-filter');
            renderUpcomingEvents();
        });
    });
    
    // Gallery year filters
    const galleryFilterButtons = document.querySelectorAll('.gallery-filter-btn');
    galleryFilterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            galleryFilterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentGalleryFilter = this.getAttribute('data-year');
            renderPastEventsGallery();
        });
    });
}

function initializeModals() {
    // Event details modal
    const eventModal = document.getElementById('event-modal');
    const closeEventModal = document.getElementById('close-event-modal');
    
    closeEventModal.addEventListener('click', () => {
        eventModal.classList.remove('active');
    });
    
    // Registration modal
    const registrationModal = document.getElementById('registration-modal');
    const closeRegistrationModal = document.getElementById('close-registration-modal');
    const cancelRegistration = document.getElementById('cancel-registration');
    
    closeRegistrationModal.addEventListener('click', () => {
        registrationModal.classList.remove('active');
    });
    
    cancelRegistration.addEventListener('click', () => {
        registrationModal.classList.remove('active');
    });
    
    // Gallery modal
    const galleryModal = document.getElementById('gallery-modal');
    const closeGalleryModal = document.getElementById('close-gallery-modal');
    const galleryPrev = document.getElementById('gallery-prev');
    const galleryNext = document.getElementById('gallery-next');
    
    closeGalleryModal.addEventListener('click', () => {
        galleryModal.classList.remove('active');
    });
    
    galleryPrev.addEventListener('click', () => {
        currentGalleryIndex = (currentGalleryIndex - 1 + filteredGalleryItems.length) % filteredGalleryItems.length;
        updateGalleryModal();
    });
    
    galleryNext.addEventListener('click', () => {
        currentGalleryIndex = (currentGalleryIndex + 1) % filteredGalleryItems.length;
        updateGalleryModal();
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === eventModal) {
            eventModal.classList.remove('active');
        }
        if (event.target === registrationModal) {
            registrationModal.classList.remove('active');
        }
        if (event.target === galleryModal) {
            galleryModal.classList.remove('active');
        }
    });
}

function showEventDetails(eventId) {
    const event = upcomingEvents.find(e => e.id === eventId);
    if (!event) return;
    
    const modal = document.getElementById('event-modal');
    const title = document.getElementById('modal-event-title');
    const body = document.getElementById('modal-event-body');
    
    title.textContent = event.title;
    
    const eventDate = new Date(event.date);
    const formattedDate = eventDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const availableSpots = event.capacity - event.registered;
    const priceDisplay = event.price === 0 ? 'FREE' : `$${event.price}`;
    
    body.innerHTML = `
        <div class="event-detail-content">
            <img src="${event.image}" alt="${event.title}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 20px;">
            
            <div class="event-meta-info">
                <div class="meta-item">
                    <strong>Date:</strong> ${formattedDate}
                </div>
                <div class="meta-item">
                    <strong>Time:</strong> ${event.time}
                </div>
                <div class="meta-item">
                    <strong>Location:</strong> ${event.location}
                </div>
                <div class="meta-item">
                    <strong>Duration:</strong> ${event.details.duration}
                </div>
                <div class="meta-item">
                    <strong>Price:</strong> ${priceDisplay}
                </div>
                <div class="meta-item">
                    <strong>Available Spots:</strong> ${availableSpots} of ${event.capacity}
                </div>
            </div>
            
            <div class="event-description">
                <h4>Description</h4>
                <p>${event.description}</p>
            </div>
            
            ${event.details.speakers.length > 0 ? `
                <div class="event-speakers">
                    <h4>Speakers</h4>
                    <ul>
                        ${event.details.speakers.map(speaker => `<li>${speaker}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
            
            <div class="event-agenda">
                <h4>Agenda</h4>
                <ul>
                    ${event.details.agenda.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
            
            <div class="event-requirements">
                <h4>Requirements</h4>
                <p>${event.details.requirements}</p>
            </div>
            
            <div class="event-includes">
                <h4>Includes</h4>
                <p>${event.details.includes}</p>
            </div>
            
            <div class="event-actions" style="margin-top: 30px; text-align: center;">
                <button class="btn btn-primary btn-large" onclick="registerForEvent(${event.id})">Register Now</button>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
}

function registerForEvent(eventId) {
    const event = upcomingEvents.find(e => e.id === eventId);
    if (!event) return;
    
    // Close event details modal if open
    document.getElementById('event-modal').classList.remove('active');
    
    // Pre-select the event in the registration form
    const eventSelect = document.getElementById('reg-event');
    eventSelect.value = eventId;
    
    openRegistrationModal();
}

function openRegistrationModal() {
    const modal = document.getElementById('registration-modal');
    modal.classList.add('active');
}

function openGalleryModal(index) {
    currentGalleryIndex = index;
    const modal = document.getElementById('gallery-modal');
    updateGalleryModal();
    modal.classList.add('active');
}

function updateGalleryModal() {
    const event = filteredGalleryItems[currentGalleryIndex];
    const image = document.getElementById('gallery-modal-image');
    const title = document.getElementById('gallery-modal-title');
    const description = document.getElementById('gallery-modal-description');
    
    image.src = event.image;
    image.alt = event.title;
    title.textContent = event.title;
    
    const eventDate = new Date(event.date);
    const formattedDate = eventDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    description.innerHTML = `
        <p><strong>Date:</strong> ${formattedDate}</p>
        <p><strong>Location:</strong> ${event.location}</p>
        <p><strong>Attendees:</strong> ${event.attendees}</p>
        <p>${event.description}</p>
    `;
}

function initializeRegistration() {
    const form = document.getElementById('event-registration-form');
    form.addEventListener('submit', handleRegistrationSubmission);
}

function populateEventSelect() {
    const select = document.getElementById('reg-event');
    select.innerHTML = '<option value="">Choose an event...</option>';
    
    upcomingEvents.forEach(event => {
        const option = document.createElement('option');
        option.value = event.id;
        option.textContent = `${event.title} - ${new Date(event.date).toLocaleDateString()}`;
        select.appendChild(option);
    });
}

function handleRegistrationSubmission(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const registrationData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        company: formData.get('company'),
        position: formData.get('position'),
        event: formData.get('event'),
        dietary: formData.get('dietary'),
        comments: formData.get('comments'),
        newsletter: formData.get('newsletter') === 'on',
        terms: formData.get('terms') === 'on'
    };
    
    // Validate required fields
    if (!registrationData.firstName || !registrationData.lastName || 
        !registrationData.email || !registrationData.event || !registrationData.terms) {
        showNotification('Please fill in all required fields and accept the terms.', 'error');
        return;
    }
    
    // Simulate registration process
    setTimeout(() => {
        // Close modal
        document.getElementById('registration-modal').classList.remove('active');
        
        // Show success notification
        showNotification('Registration successful! You will receive a confirmation email shortly.', 'success');
        
        // Reset form
        event.target.reset();
        
        // Update event registration count (simulation)
        const selectedEvent = upcomingEvents.find(e => e.id == registrationData.event);
        if (selectedEvent && selectedEvent.registered < selectedEvent.capacity) {
            selectedEvent.registered++;
            renderUpcomingEvents();
        }
    }, 1000);
}

function handleNewsletterSubmission(event) {
    event.preventDefault();
    
    const email = event.target.querySelector('input[type="email"]').value;
    
    if (!email) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate newsletter subscription
    setTimeout(() => {
        showNotification('Successfully subscribed to our newsletter!', 'success');
        event.target.reset();
    }, 500);
}

function loadMoreUpcomingEvents() {
    // Simulate loading more events
    showNotification('No more events to load at this time.', 'info');
}

function loadMoreGalleryItems() {
    // Simulate loading more gallery items
    showNotification('No more gallery items to load.', 'info');
}

function initializeNotifications() {
    // Auto-hide notifications after 5 seconds
    document.addEventListener('notificationShown', function() {
        setTimeout(() => {
            const notification = document.getElementById('notification');
            notification.classList.remove('show');
        }, 5000);
    });
}

function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const messageElement = notification.querySelector('.notification-message');
    const icon = notification.querySelector('i');
    
    messageElement.textContent = message;
    
    // Update notification style based on type
    notification.className = 'notification';
    if (type === 'error') {
        notification.style.background = '#dc3545';
        icon.className = 'fas fa-exclamation-circle';
    } else if (type === 'info') {
        notification.style.background = '#17a2b8';
        icon.className = 'fas fa-info-circle';
    } else {
        notification.style.background = '#28a745';
        icon.className = 'fas fa-check-circle';
    }
    
    notification.classList.add('show');
    
    // Dispatch custom event
    document.dispatchEvent(new CustomEvent('notificationShown'));
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
}

// Initialize AOS animations
document.addEventListener('DOMContentLoaded', function() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
});
