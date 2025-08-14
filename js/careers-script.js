// Careers Page JavaScript

// Job Data
const jobsData = [
    {
        id: 1,
        title: "Senior Land Surveyor",
        department: "surveying",
        location: "headquarters",
        type: "full-time",
        salary: "$75,000 - $95,000",
        posted: "2 days ago",
        description: "We are seeking an experienced Senior Land Surveyor to lead surveying projects and mentor junior staff. The ideal candidate will have extensive experience in boundary surveys, topographic mapping, and construction layout.",
        requirements: [
            "Professional Land Surveyor (PLS) license required",
            "Minimum 8 years of surveying experience",
            "Proficiency with Trimble, Leica, or similar equipment",
            "Strong knowledge of AutoCAD and surveying software",
            "Excellent communication and leadership skills",
            "Valid driver's license and reliable transportation"
        ],
        responsibilities: [
            "Perform complex boundary and topographic surveys",
            "Review and approve survey calculations and drawings",
            "Supervise and train junior surveyors and technicians",
            "Coordinate with clients, engineers, and project managers",
            "Ensure compliance with state regulations and standards",
            "Prepare legal descriptions and survey reports"
        ],
        benefits: [
            "Competitive salary with performance bonuses",
            "Comprehensive health, dental, and vision insurance",
            "401(k) with company matching",
            "Professional development opportunities",
            "Company vehicle and equipment provided",
            "Flexible work arrangements"
        ]
    },
    {
        id: 2,
        title: "GIS Analyst",
        department: "gis",
        location: "remote",
        type: "full-time",
        salary: "$55,000 - $70,000",
        posted: "1 week ago",
        description: "Join our GIS team to analyze spatial data, create maps, and support various projects across multiple industries. This role offers the opportunity to work with cutting-edge GIS technology and contribute to innovative solutions.",
        requirements: [
            "Bachelor's degree in GIS, Geography, or related field",
            "3+ years of GIS analysis experience",
            "Proficiency in ArcGIS, QGIS, and spatial databases",
            "Experience with Python, R, or other scripting languages",
            "Strong analytical and problem-solving skills",
            "Excellent written and verbal communication"
        ],
        responsibilities: [
            "Perform spatial analysis and data modeling",
            "Create high-quality maps and visualizations",
            "Maintain and update GIS databases",
            "Develop automated workflows and tools",
            "Support field data collection activities",
            "Collaborate with cross-functional teams"
        ],
        benefits: [
            "Remote work flexibility",
            "Professional certification support",
            "Latest GIS software and hardware",
            "Conference and training opportunities",
            "Health and wellness programs",
            "Collaborative team environment"
        ]
    },
    {
        id: 3,
        title: "CAD Technician",
        department: "engineering",
        location: "headquarters",
        type: "full-time",
        salary: "$45,000 - $60,000",
        posted: "3 days ago",
        description: "We're looking for a detail-oriented CAD Technician to prepare technical drawings and support our engineering and surveying teams. This is an excellent opportunity for someone looking to grow their career in the geospatial industry.",
        requirements: [
            "Associate degree in CAD, Engineering, or related field",
            "2+ years of CAD experience, preferably in surveying/engineering",
            "Proficiency in AutoCAD, Civil 3D, and MicroStation",
            "Knowledge of surveying principles and practices",
            "Strong attention to detail and accuracy",
            "Ability to work independently and meet deadlines"
        ],
        responsibilities: [
            "Prepare technical drawings from field survey data",
            "Create topographic maps and site plans",
            "Draft construction drawings and details",
            "Maintain drawing standards and templates",
            "Coordinate with surveyors and engineers",
            "Perform quality control on completed drawings"
        ],
        benefits: [
            "Comprehensive training program",
            "Career advancement opportunities",
            "Modern CAD software and workstations",
            "Mentorship from experienced professionals",
            "Competitive benefits package",
            "Stable work environment"
        ]
    },
    {
        id: 4,
        title: "Project Manager",
        department: "admin",
        location: "hybrid",
        type: "full-time",
        salary: "$70,000 - $90,000",
        posted: "5 days ago",
        description: "Lead and coordinate surveying and engineering projects from initiation to completion. The ideal candidate will have strong organizational skills and experience managing technical projects in the AEC industry.",
        requirements: [
            "Bachelor's degree in Engineering, Construction Management, or related field",
            "PMP certification preferred",
            "5+ years of project management experience",
            "Experience in surveying, engineering, or construction industry",
            "Strong leadership and communication skills",
            "Proficiency in project management software"
        ],
        responsibilities: [
            "Plan, execute, and close projects successfully",
            "Manage project budgets, schedules, and resources",
            "Coordinate with clients, vendors, and internal teams",
            "Monitor project progress and quality",
            "Prepare project reports and presentations",
            "Identify and mitigate project risks"
        ],
        benefits: [
            "Hybrid work arrangement",
            "Performance-based bonuses",
            "Professional development budget",
            "Leadership training programs",
            "Comprehensive insurance coverage",
            "Retirement planning assistance"
        ]
    },
    {
        id: 5,
        title: "Field Survey Technician",
        department: "surveying",
        location: "field",
        type: "full-time",
        salary: "$40,000 - $55,000",
        posted: "1 day ago",
        description: "Join our field crew to collect survey data using state-of-the-art equipment. This hands-on role is perfect for someone who enjoys working outdoors and wants to learn the surveying profession.",
        requirements: [
            "High school diploma or equivalent",
            "1+ years of surveying experience preferred",
            "Ability to work outdoors in various weather conditions",
            "Physical ability to carry equipment and walk long distances",
            "Valid driver's license with clean driving record",
            "Willingness to learn and follow safety protocols"
        ],
        responsibilities: [
            "Operate surveying instruments and GPS equipment",
            "Collect field measurements and data",
            "Set up and maintain survey control points",
            "Assist with boundary and topographic surveys",
            "Maintain equipment and vehicles",
            "Follow safety procedures and protocols"
        ],
        benefits: [
            "On-the-job training provided",
            "Equipment and vehicle provided",
            "Overtime opportunities",
            "Health insurance after 90 days",
            "Paid time off and holidays",
            "Career growth potential"
        ]
    },
    {
        id: 6,
        title: "IT Systems Administrator",
        department: "it",
        location: "headquarters",
        type: "full-time",
        salary: "$60,000 - $75,000",
        posted: "1 week ago",
        description: "Maintain and support our IT infrastructure, including servers, networks, and specialized surveying software. This role requires someone with strong technical skills and experience in enterprise IT environments.",
        requirements: [
            "Bachelor's degree in IT, Computer Science, or related field",
            "3+ years of systems administration experience",
            "Experience with Windows Server, Active Directory, and networking",
            "Knowledge of surveying/CAD software preferred",
            "Strong troubleshooting and problem-solving skills",
            "Excellent customer service orientation"
        ],
        responsibilities: [
            "Maintain servers, networks, and IT infrastructure",
            "Support users with technical issues and training",
            "Implement security policies and procedures",
            "Manage software licenses and updates",
            "Plan and execute system upgrades",
            "Document IT processes and procedures"
        ],
        benefits: [
            "Latest technology and equipment",
            "Certification reimbursement program",
            "Flexible work schedule",
            "Professional development opportunities",
            "Comprehensive benefits package",
            "Collaborative IT team environment"
        ]
    },
    {
        id: 7,
        title: "Survey Intern",
        department: "surveying",
        location: "headquarters",
        type: "internship",
        salary: "$15 - $18/hour",
        posted: "2 weeks ago",
        description: "Gain hands-on experience in the surveying profession through our comprehensive internship program. This is an excellent opportunity for students or recent graduates to learn from experienced professionals.",
        requirements: [
            "Currently enrolled in or recent graduate of surveying program",
            "Basic knowledge of surveying principles",
            "Familiarity with AutoCAD or similar software",
            "Strong work ethic and eagerness to learn",
            "Reliable transportation",
            "Ability to work both in office and field environments"
        ],
        responsibilities: [
            "Assist with field data collection",
            "Learn to operate surveying equipment",
            "Help prepare drawings and calculations",
            "Support project teams with various tasks",
            "Participate in training sessions",
            "Maintain organized project files"
        ],
        benefits: [
            "Mentorship from licensed surveyors",
            "Exposure to various project types",
            "Potential for full-time employment",
            "Flexible schedule for students",
            "Real-world experience",
            "Professional networking opportunities"
        ]
    },
    {
        id: 8,
        title: "Business Development Manager",
        department: "admin",
        location: "hybrid",
        type: "full-time",
        salary: "$65,000 - $85,000 + Commission",
        posted: "4 days ago",
        description: "Drive business growth by identifying new opportunities, building client relationships, and expanding our market presence. The ideal candidate will have experience in the AEC industry and strong sales skills.",
        requirements: [
            "Bachelor's degree in Business, Marketing, or related field",
            "5+ years of business development or sales experience",
            "Experience in surveying, engineering, or construction industry",
            "Strong presentation and negotiation skills",
            "Excellent relationship-building abilities",
            "Self-motivated with proven track record of success"
        ],
        responsibilities: [
            "Identify and pursue new business opportunities",
            "Build and maintain client relationships",
            "Prepare proposals and presentations",
            "Attend industry events and networking functions",
            "Collaborate with technical teams on project scoping",
            "Track and report on sales activities and results"
        ],
        benefits: [
            "Competitive base salary plus commission",
            "Company car allowance",
            "Expense account for client entertainment",
            "Professional development support",
            "Flexible work arrangements",
            "Performance recognition programs"
        ]
    }
];

// DOM Elements
let currentJobsDisplayed = 4;
let filteredJobs = [...jobsData];

// Initialize careers page
document.addEventListener('DOMContentLoaded', function() {
    initializeCareersPage();
});

function initializeCareersPage() {
    renderJobListings();
    initializeFilters();
    initializeGallery();
    initializeTestimonials();
    initializeApplicationForm();
    initializeModals();
    initializeNotifications();
}

// Job Listings
function renderJobListings() {
    const jobListingsContainer = document.getElementById('job-listings');
    const loadMoreBtn = document.getElementById('load-more-jobs');
    
    if (!jobListingsContainer) return;
    
    // Clear existing listings
    jobListingsContainer.innerHTML = '';
    
    // Get jobs to display
    const jobsToShow = filteredJobs.slice(0, currentJobsDisplayed);
    
    jobsToShow.forEach(job => {
        const jobCard = createJobCard(job);
        jobListingsContainer.appendChild(jobCard);
    });
    
    // Show/hide load more button
    if (loadMoreBtn) {
        if (currentJobsDisplayed >= filteredJobs.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }
}

function createJobCard(job) {
    const jobCard = document.createElement('div');
    jobCard.className = 'job-card';
    jobCard.setAttribute('data-job-id', job.id);
    
    jobCard.innerHTML = `
        <div class="job-header">
            <div>
                <h3 class="job-title">${job.title}</h3>
                <span class="job-department">${getDepartmentName(job.department)}</span>
            </div>
        </div>
        <div class="job-meta">
            <div class="job-meta-item">
                <i class="fas fa-map-marker-alt"></i>
                <span>${getLocationName(job.location)}</span>
            </div>
            <div class="job-meta-item">
                <i class="fas fa-clock"></i>
                <span>${getTypeName(job.type)}</span>
            </div>
            <div class="job-meta-item">
                <i class="fas fa-dollar-sign"></i>
                <span>${job.salary}</span>
            </div>
        </div>
        <div class="job-description">
            ${job.description.substring(0, 200)}...
        </div>
        <div class="job-requirements">
            <h4>Key Requirements:</h4>
            <div class="requirements-list">
                ${job.requirements.slice(0, 3).map(req => `<span class="requirement-tag">${req}</span>`).join('')}
                ${job.requirements.length > 3 ? `<span class="requirement-tag">+${job.requirements.length - 3} more</span>` : ''}
            </div>
        </div>
        <div class="job-actions">
            <span class="job-posted">Posted ${job.posted}</span>
            <button class="apply-btn" onclick="openJobModal(${job.id})">View Details</button>
        </div>
    `;
    
    return jobCard;
}

// Filters
function initializeFilters() {
    const departmentFilter = document.getElementById('department-filter');
    const locationFilter = document.getElementById('location-filter');
    const typeFilter = document.getElementById('type-filter');
    const loadMoreBtn = document.getElementById('load-more-jobs');
    
    if (departmentFilter) {
        departmentFilter.addEventListener('change', applyFilters);
    }
    
    if (locationFilter) {
        locationFilter.addEventListener('change', applyFilters);
    }
    
    if (typeFilter) {
        typeFilter.addEventListener('change', applyFilters);
    }
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreJobs);
    }
}

function applyFilters() {
    const departmentFilter = document.getElementById('department-filter');
    const locationFilter = document.getElementById('location-filter');
    const typeFilter = document.getElementById('type-filter');
    
    const selectedDepartment = departmentFilter ? departmentFilter.value : 'all';
    const selectedLocation = locationFilter ? locationFilter.value : 'all';
    const selectedType = typeFilter ? typeFilter.value : 'all';
    
    filteredJobs = jobsData.filter(job => {
        const departmentMatch = selectedDepartment === 'all' || job.department === selectedDepartment;
        const locationMatch = selectedLocation === 'all' || job.location === selectedLocation;
        const typeMatch = selectedType === 'all' || job.type === selectedType;
        
        return departmentMatch && locationMatch && typeMatch;
    });
    
    currentJobsDisplayed = 4;
    renderJobListings();
    
    // Show notification if no jobs found
    if (filteredJobs.length === 0) {
        showNotification('No jobs found matching your criteria. Try adjusting your filters.', 'warning');
    }
}

function loadMoreJobs() {
    currentJobsDisplayed += 4;
    renderJobListings();
}

// Gallery
function initializeGallery() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const galleryImages = document.querySelectorAll('.gallery-image');
    
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            // Remove active class from all thumbnails and images
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            galleryImages.forEach(img => img.classList.remove('active'));
            
            // Add active class to clicked thumbnail and corresponding image
            thumbnail.classList.add('active');
            galleryImages[index].classList.add('active');
        });
    });
}

// Testimonials
function initializeTestimonials() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let slideInterval;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    
    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    function stopSlideshow() {
        clearInterval(slideInterval);
    }
    
    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', () => {
        nextSlide();
        stopSlideshow();
        startSlideshow();
    });
    
    if (prevBtn) prevBtn.addEventListener('click', () => {
        prevSlide();
        stopSlideshow();
        startSlideshow();
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            stopSlideshow();
            startSlideshow();
        });
    });
    
    // Pause on hover
    const testimonialSection = document.querySelector('.testimonials-carousel');
    if (testimonialSection) {
        testimonialSection.addEventListener('mouseenter', stopSlideshow);
        testimonialSection.addEventListener('mouseleave', startSlideshow);
    }
    
    // Start slideshow
    if (slides.length > 0) {
        startSlideshow();
    }
}

// Application Form
function initializeApplicationForm() {
    const applicationForm = document.getElementById('quick-application-form');
    const fileInput = document.getElementById('resume');
    const fileLabel = document.querySelector('.file-upload-label span');
    
    if (fileInput && fileLabel) {
        fileInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                fileLabel.textContent = this.files[0].name;
            } else {
                fileLabel.textContent = 'Choose file or drag here';
            }
        });
    }
    
    if (applicationForm) {
        applicationForm.addEventListener('submit', handleApplicationSubmit);
    }
}

function handleApplicationSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const applicationData = {};
    
    // Collect form data
    for (let [key, value] of formData.entries()) {
        applicationData[key] = value;
    }
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'resume', 'privacy'];
    const missingFields = requiredFields.filter(field => !applicationData[field] || applicationData[field] === '');
    
    if (missingFields.length > 0) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Validate email
    if (!isValidEmail(applicationData.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Submitting your application...', 'info');
    
    setTimeout(() => {
        showSuccessModal();
        e.target.reset();
        document.querySelector('.file-upload-label span').textContent = 'Choose file or drag here';
    }, 2000);
}

// Modals
function initializeModals() {
    const jobModalOverlay = document.getElementById('job-modal-overlay');
    const successModalOverlay = document.getElementById('success-modal-overlay');
    const closeJobModal = document.getElementById('close-job-modal');
    const closeSuccessModal = document.getElementById('close-success-modal');
    
    if (closeJobModal) {
        closeJobModal.addEventListener('click', closeJobModalHandler);
    }
    
    if (closeSuccessModal) {
        closeSuccessModal.addEventListener('click', closeSuccessModalHandler);
    }
    
    if (jobModalOverlay) {
        jobModalOverlay.addEventListener('click', function(e) {
            if (e.target === jobModalOverlay) {
                closeJobModalHandler();
            }
        });
    }
    
    if (successModalOverlay) {
        successModalOverlay.addEventListener('click', function(e) {
            if (e.target === successModalOverlay) {
                closeSuccessModalHandler();
            }
        });
    }
    
    // ESC key to close modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeJobModalHandler();
            closeSuccessModalHandler();
        }
    });
}

function openJobModal(jobId) {
    const job = jobsData.find(j => j.id === jobId);
    if (!job) return;
    
    const modalContent = document.getElementById('job-modal-content');
    const modalOverlay = document.getElementById('job-modal-overlay');
    
    if (!modalContent || !modalOverlay) return;
    
    modalContent.innerHTML = `
        <div class="modal-job-header">
            <h2 class="modal-job-title">${job.title}</h2>
            <div class="modal-job-meta">
                <div class="job-meta-item">
                    <i class="fas fa-building"></i>
                    <span>${getDepartmentName(job.department)}</span>
                </div>
                <div class="job-meta-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${getLocationName(job.location)}</span>
                </div>
                <div class="job-meta-item">
                    <i class="fas fa-clock"></i>
                    <span>${getTypeName(job.type)}</span>
                </div>
                <div class="job-meta-item">
                    <i class="fas fa-dollar-sign"></i>
                    <span>${job.salary}</span>
                </div>
            </div>
        </div>
        
        <div class="modal-job-description">
            <h3>Job Description</h3>
            <p>${job.description}</p>
        </div>
        
        <div class="modal-job-requirements">
            <h3>Requirements</h3>
            <ul>
                ${job.requirements.map(req => `<li>${req}</li>`).join('')}
            </ul>
        </div>
        
        <div class="modal-job-requirements">
            <h3>Responsibilities</h3>
            <ul>
                ${job.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
            </ul>
        </div>
        
        <div class="modal-job-requirements">
            <h3>Benefits</h3>
            <ul>
                ${job.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
            </ul>
        </div>
        
        <div class="modal-apply-section">
            <h3>Ready to Apply?</h3>
            <p>Join our team and be part of something amazing. We look forward to hearing from you!</p>
            <a href="#apply-now" class="btn btn-primary btn-large" onclick="closeJobModalHandler()">Apply Now</a>
        </div>
    `;
    
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeJobModalHandler() {
    const modalOverlay = document.getElementById('job-modal-overlay');
    if (modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function showSuccessModal() {
    const modalOverlay = document.getElementById('success-modal-overlay');
    if (modalOverlay) {
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeSuccessModalHandler() {
    const modalOverlay = document.getElementById('success-modal-overlay');
    if (modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Notifications
function initializeNotifications() {
    // Notification system is ready
}

function showNotification(message, type = 'info') {
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
            <i class="notification-icon ${iconMap[type]}"></i>
            <span class="notification-text">${message}</span>
            <button class="notification-close" onclick="closeNotification(this)">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    container.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        closeNotification(notification.querySelector('.notification-close'));
    }, 5000);
}

function closeNotification(button) {
    const notification = button.closest('.notification');
    if (notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }
}

// Utility Functions
function getDepartmentName(department) {
    const departments = {
        surveying: 'Surveying',
        gis: 'GIS & Mapping',
        it: 'IT & Technology',
        engineering: 'Engineering',
        admin: 'Administration'
    };
    return departments[department] || department;
}

function getLocationName(location) {
    const locations = {
        headquarters: 'Headquarters',
        remote: 'Remote',
        field: 'Field Work',
        hybrid: 'Hybrid'
    };
    return locations[location] || location;
}

function getTypeName(type) {
    const types = {
        'full-time': 'Full-time',
        'part-time': 'Part-time',
        contract: 'Contract',
        internship: 'Internship'
    };
    return types[type] || type;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Animation on Scroll
function initializeAOS() {
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
    
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

// Initialize AOS when page loads
document.addEventListener('DOMContentLoaded', initializeAOS);

// Global function to make it accessible from HTML
window.openJobModal = openJobModal;
window.closeNotification = closeNotification;
