// Portfolio Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializePortfolioFilter();
    initializeViewToggle();
    initializeLoadMore();
    initializeModals();
    initializeCounters();
    initializeAnimations();
});

// Portfolio Filter Functionality
function initializePortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.classList.add('hidden');
                    }, 300);
                }
            });
            
            // Update URL hash
            window.history.replaceState(null, null, `#${filter}`);
        });
    });
    
    // Initialize filter from URL hash
    const urlHash = window.location.hash.substring(1);
    if (urlHash) {
        const targetButton = document.querySelector(`[data-filter="${urlHash}"]`);
        if (targetButton) {
            targetButton.click();
        }
    }
}

// View Toggle Functionality
function initializeViewToggle() {
    const viewButtons = document.querySelectorAll('.view-btn');
    const portfolioGrid = document.getElementById('portfolio-grid');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const view = this.getAttribute('data-view');
            
            // Update active button
            viewButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update grid view
            portfolioGrid.className = `portfolio-grid ${view}-view`;
            
            // Trigger re-animation
            const portfolioItems = document.querySelectorAll('.portfolio-item:not(.hidden)');
            portfolioItems.forEach((item, index) => {
                item.style.animation = 'none';
                setTimeout(() => {
                    item.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s both`;
                }, 50);
            });
        });
    });
}

// Load More Functionality
function initializeLoadMore() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    const portfolioGrid = document.getElementById('portfolio-grid');
    let currentPage = 1;
    const itemsPerPage = 6;
    
    // Hide items beyond first page initially
    const allItems = document.querySelectorAll('.portfolio-item');
    allItems.forEach((item, index) => {
        if (index >= itemsPerPage) {
            item.style.display = 'none';
        }
    });
    
    loadMoreBtn.addEventListener('click', function() {
        const hiddenItems = Array.from(allItems).filter(item => 
            item.style.display === 'none' && !item.classList.contains('hidden')
        );
        
        const itemsToShow = hiddenItems.slice(0, itemsPerPage);
        
        itemsToShow.forEach((item, index) => {
            setTimeout(() => {
                item.style.display = 'block';
                item.style.opacity = '0';
                item.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 100);
            }, index * 100);
        });
        
        // Hide load more button if no more items
        const remainingHidden = hiddenItems.length - itemsToShow.length;
        if (remainingHidden === 0) {
            loadMoreBtn.style.display = 'none';
        }
        
        // Update button text
        if (remainingHidden > 0) {
            loadMoreBtn.querySelector('span').textContent = `Load More Projects (${remainingHidden} remaining)`;
        }
    });
}

// Modal Functionality
function initializeModals() {
    // Create modal container if it doesn't exist
    if (!document.getElementById('modal-container')) {
        const modalContainer = document.createElement('div');
        modalContainer.id = 'modal-container';
        document.body.appendChild(modalContainer);
    }
}

// Project Modal
function openProjectModal(projectId) {
    const projectData = getProjectData(projectId);
    if (!projectData) return;
    
    const modalHTML = `
        <div class="modal-overlay" id="project-modal">
            <div class="modal-content project-modal">
                <div class="modal-header">
                    <h2>${projectData.title}</h2>
                    <button class="modal-close" onclick="closeModal('project-modal')">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="project-details">
                        <div class="project-image-section">
                            <img src="${projectData.image}" alt="${projectData.title}" class="project-main-image">
                            <div class="project-meta">
                                <div class="meta-item">
                                    <i class="fas fa-calendar"></i>
                                    <span>Completed: ${projectData.date}</span>
                                </div>
                                <div class="meta-item">
                                    <i class="fas fa-map-marker-alt"></i>
                                    <span>Location: ${projectData.location}</span>
                                </div>
                                <div class="meta-item">
                                    <i class="fas fa-clock"></i>
                                    <span>Duration: ${projectData.duration}</span>
                                </div>
                            </div>
                        </div>
                        <div class="project-info-section">
                            <div class="project-overview">
                                <h3>Project Overview</h3>
                                <p>${projectData.description}</p>
                            </div>
                            <div class="project-challenges">
                                <h3>Challenges & Solutions</h3>
                                <ul>
                                    ${projectData.challenges.map(challenge => `<li>${challenge}</li>`).join('')}
                                </ul>
                            </div>
                            <div class="project-technologies">
                                <h3>Technologies Used</h3>
                                <div class="tech-tags">
                                    ${projectData.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                                </div>
                            </div>
                            <div class="project-results">
                                <h3>Results & Impact</h3>
                                <div class="results-grid">
                                    ${projectData.results.map(result => `
                                        <div class="result-item">
                                            <div class="result-value">${result.value}</div>
                                            <div class="result-label">${result.label}</div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="closeModal('project-modal')">Close</button>
                    <button class="btn btn-primary" onclick="openImageGallery('${projectId}')">View Gallery</button>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('modal-container').innerHTML = modalHTML;
    document.body.style.overflow = 'hidden';
    
    // Add modal styles
    addModalStyles();
}

// Image Gallery Modal
function openImageGallery(projectId) {
    const galleryData = getGalleryData(projectId);
    if (!galleryData) return;
    
    const modalHTML = `
        <div class="modal-overlay" id="gallery-modal">
            <div class="modal-content gallery-modal">
                <div class="modal-header">
                    <h2>${galleryData.title} - Gallery</h2>
                    <button class="modal-close" onclick="closeModal('gallery-modal')">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="gallery-container">
                        <div class="gallery-main">
                            <img src="${galleryData.images[0]}" alt="Gallery Image" id="gallery-main-image" class="gallery-main-image">
                            <div class="gallery-controls">
                                <button class="gallery-btn prev-btn" onclick="previousImage()">
                                    <i class="fas fa-chevron-left"></i>
                                </button>
                                <button class="gallery-btn next-btn" onclick="nextImage()">
                                    <i class="fas fa-chevron-right"></i>
                                </button>
                            </div>
                        </div>
                        <div class="gallery-thumbnails">
                            ${galleryData.images.map((image, index) => `
                                <img src="${image}" alt="Thumbnail ${index + 1}" 
                                     class="gallery-thumbnail ${index === 0 ? 'active' : ''}" 
                                     onclick="selectImage(${index})">
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('modal-container').innerHTML = modalHTML;
    document.body.style.overflow = 'hidden';
    
    // Initialize gallery
    window.currentGalleryImages = galleryData.images;
    window.currentImageIndex = 0;
    
    addModalStyles();
}

// Case Study Modal
function openCaseStudy(caseStudyId) {
    const caseStudyData = getCaseStudyData(caseStudyId);
    if (!caseStudyData) return;
    
    const modalHTML = `
        <div class="modal-overlay" id="case-study-modal">
            <div class="modal-content case-study-modal">
                <div class="modal-header">
                    <h2>${caseStudyData.title}</h2>
                    <button class="modal-close" onclick="closeModal('case-study-modal')">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="case-study-content">
                        <div class="case-study-intro">
                            <h3>Challenge</h3>
                            <p>${caseStudyData.challenge}</p>
                        </div>
                        <div class="case-study-solution">
                            <h3>Our Solution</h3>
                            <p>${caseStudyData.solution}</p>
                        </div>
                        <div class="case-study-implementation">
                            <h3>Implementation</h3>
                            <ul>
                                ${caseStudyData.implementation.map(step => `<li>${step}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="case-study-results">
                            <h3>Results</h3>
                            <div class="results-showcase">
                                ${caseStudyData.results.map(result => `
                                    <div class="result-showcase-item">
                                        <div class="result-icon">
                                            <i class="${result.icon}"></i>
                                        </div>
                                        <div class="result-content">
                                            <div class="result-value">${result.value}</div>
                                            <div class="result-description">${result.description}</div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="closeModal('case-study-modal')">Close</button>
                    <a href="contact.html" class="btn btn-primary">Start Similar Project</a>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('modal-container').innerHTML = modalHTML;
    document.body.style.overflow = 'hidden';
    
    addModalStyles();
}

// Gallery Navigation
function previousImage() {
    if (window.currentImageIndex > 0) {
        window.currentImageIndex--;
        updateGalleryImage();
    }
}

function nextImage() {
    if (window.currentImageIndex < window.currentGalleryImages.length - 1) {
        window.currentImageIndex++;
        updateGalleryImage();
    }
}

function selectImage(index) {
    window.currentImageIndex = index;
    updateGalleryImage();
}

function updateGalleryImage() {
    const mainImage = document.getElementById('gallery-main-image');
    const thumbnails = document.querySelectorAll('.gallery-thumbnail');
    
    mainImage.src = window.currentGalleryImages[window.currentImageIndex];
    
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === window.currentImageIndex);
    });
}

// Close Modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            document.getElementById('modal-container').innerHTML = '';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Counter Animation
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const increment = target / 100;
                let current = 0;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current);
                        setTimeout(updateCounter, 20);
                    } else {
                        counter.textContent = target + (target > 50 ? '+' : '');
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

// Enhanced Animations
function initializeAnimations() {
    // Staggered animation for portfolio items
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Testimonial card hover effects
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Award item animations
    const awardItems = document.querySelectorAll('.award-item');
    awardItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) rotate(2deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg)';
        });
    });
}

// Data Functions
function getProjectData(projectId) {
    const projectsData = {
        'highway-survey': {
            title: 'Highway Construction Survey',
            image: '/placeholder.svg?height=400&width=600&text=Highway+Survey+Details',
            date: 'March 2024',
            location: 'Interstate 95 Expansion',
            duration: '6 months',
            description: 'Comprehensive topographic and boundary survey for a 15-mile highway expansion project. This project required precise measurements and coordination with multiple stakeholders to ensure accurate data collection for the construction phase.',
            challenges: [
                'Surveying active traffic areas safely',
                'Coordinating with multiple construction phases',
                'Maintaining accuracy across large distances',
                'Weather-dependent drone operations'
            ],
            technologies: ['DJI Matrice 300', 'Leica TS16 Total Station', 'Trimble R12 GNSS', 'AutoCAD Civil 3D'],
            results: [
                { value: '15 miles', label: 'Survey Coverage' },
                { value: '99.9%', label: 'Accuracy Rate' },
                { value: '30 days', label: 'Time Saved' },
                { value: '$200K', label: 'Cost Savings' }
            ]
        },
        'mining-survey': {
            title: 'Mining Site Survey',
            image: '/placeholder.svg?height=400&width=600&text=Mining+Survey+Details',
            date: 'January 2024',
            location: 'Colorado Mining Facility',
            duration: '3 months',
            description: 'Advanced volumetric analysis and safety mapping for active mining operations using cutting-edge UAV technology and 3D modeling techniques.',
            challenges: [
                'Operating in hazardous mining environment',
                'Precise volume calculations for inventory',
                'Real-time safety monitoring',
                'Integration with existing mining systems'
            ],
            technologies: ['senseFly eBee X', '3D Point Cloud Processing', 'Volume Analysis Software', 'Safety Mapping Tools'],
            results: [
                { value: '500 acres', label: 'Area Surveyed' },
                { value: '±2cm', label: 'Volume Accuracy' },
                { value: '75%', label: 'Time Reduction' },
                { value: '100%', label: 'Safety Compliance' }
            ]
        },
        'ecommerce-platform': {
            title: 'E-commerce Platform',
            image: '/placeholder.svg?height=400&width=600&text=Ecommerce+Platform+Details',
            date: 'February 2024',
            location: 'Remote Development',
            duration: '4 months',
            description: 'Full-stack e-commerce solution with modern UI/UX design, advanced inventory management, and comprehensive analytics dashboard.',
            challenges: [
                'Scalable architecture design',
                'Payment gateway integration',
                'Real-time inventory management',
                'Mobile-responsive design'
            ],
            technologies: ['React.js', 'Node.js', 'MongoDB', 'Stripe API', 'AWS Cloud Services'],
            results: [
                { value: '300%', label: 'Sales Increase' },
                { value: '50%', label: 'Load Time Improvement' },
                { value: '95%', label: 'User Satisfaction' },
                { value: '24/7', label: 'Uptime Achieved' }
            ]
        }
    };
    
    return projectsData[projectId];
}

function getGalleryData(projectId) {
    const galleryData = {
        'highway-survey': {
            title: 'Highway Construction Survey',
            images: [
                '/placeholder.svg?height=600&width=800&text=Highway+Survey+Image+1',
                '/placeholder.svg?height=600&width=800&text=Highway+Survey+Image+2',
                '/placeholder.svg?height=600&width=800&text=Highway+Survey+Image+3',
                '/placeholder.svg?height=600&width=800&text=Highway+Survey+Image+4',
                '/placeholder.svg?height=600&width=800&text=Highway+Survey+Image+5'
            ]
        },
        'mining-survey': {
            title: 'Mining Site Survey',
            images: [
                '/placeholder.svg?height=600&width=800&text=Mining+Survey+Image+1',
                '/placeholder.svg?height=600&width=800&text=Mining+Survey+Image+2',
                '/placeholder.svg?height=600&width=800&text=Mining+Survey+Image+3',
                '/placeholder.svg?height=600&width=800&text=Mining+Survey+Image+4'
            ]
        }
    };
    
    return galleryData[projectId];
}

function getCaseStudyData(caseStudyId) {
    const caseStudyData = {
        'bridge-monitoring': {
            title: 'Bridge Construction Monitoring',
            challenge: 'A major infrastructure project required continuous monitoring of bridge construction progress while maintaining traffic flow and ensuring worker safety. Traditional surveying methods were time-consuming and posed safety risks.',
            solution: 'We implemented an advanced drone monitoring system with real-time data processing and automated reporting. This solution provided continuous oversight without disrupting construction or traffic.',
            implementation: [
                'Deployed automated drone flight paths for consistent data collection',
                'Integrated real-time data processing with construction management systems',
                'Established safety protocols for drone operations in active construction zones',
                'Created automated reporting dashboards for stakeholders'
            ],
            results: [
                {
                    icon: 'fas fa-clock',
                    value: '75%',
                    description: 'Reduction in survey time compared to traditional methods'
                },
                {
                    icon: 'fas fa-dollar-sign',
                    value: '$50K',
                    description: 'Cost savings through improved efficiency and reduced labor'
                },
                {
                    icon: 'fas fa-shield-alt',
                    value: '100%',
                    description: 'Safety compliance with zero incidents during monitoring'
                },
                {
                    icon: 'fas fa-chart-line',
                    value: '99.9%',
                    description: 'Data accuracy maintained throughout the project'
                }
            ]
        },
        'digital-transformation': {
            title: 'Digital Transformation Success',
            challenge: 'A traditional surveying company needed to modernize their operations, moving from paper-based processes to digital workflows while maintaining accuracy and client satisfaction.',
            solution: 'We developed a comprehensive digital transformation strategy including custom software development, staff training, and gradual implementation to ensure smooth transition.',
            implementation: [
                'Analyzed existing workflows and identified digitization opportunities',
                'Developed custom field data collection mobile applications',
                'Implemented cloud-based data management and collaboration tools',
                'Provided comprehensive staff training and ongoing support'
            ],
            results: [
                {
                    icon: 'fas fa-rocket',
                    value: '300%',
                    description: 'Increase in operational efficiency and productivity'
                },
                {
                    icon: 'fas fa-piggy-bank',
                    value: '40%',
                    description: 'Reduction in operational costs through automation'
                },
                {
                    icon: 'fas fa-calendar-check',
                    value: '6 Months',
                    description: 'Return on investment achieved within timeline'
                },
                {
                    icon: 'fas fa-users',
                    value: '98%',
                    description: 'Staff adoption rate of new digital tools'
                }
            ]
        }
    };
    
    return caseStudyData[caseStudyId];
}

// Add Modal Styles
function addModalStyles() {
    if (document.getElementById('modal-styles')) return;
    
    const modalStyles = `
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 1;
            transition: opacity 0.3s ease;
        }
        
        .modal-content {
            background: white;
            border-radius: 12px;
            max-width: 90%;
            max-height: 90%;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            animation: modalSlideIn 0.3s ease;
        }
        
        .project-modal {
            width: 1000px;
        }
        
        .gallery-modal {
            width: 900px;
        }
        
        .case-study-modal {
            width: 800px;
        }
        
        .modal-header {
            padding: 25px 30px;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: linear-gradient(135deg, var(--primary-blue), var(--dark-blue));
            color: white;
        }
        
        .modal-header h2 {
            margin: 0;
            font-size: 1.8rem;
        }
        
        .modal-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 8px;
            border-radius: 50%;
            transition: background 0.3s ease;
        }
        
        .modal-close:hover {
            background: rgba(255, 255, 255, 0.2);
        }
        
        .modal-body {
            padding: 30px;
        }
        
        .modal-footer {
            padding: 20px 30px;
            border-top: 1px solid #eee;
            display: flex;
            justify-content: flex-end;
            gap: 15px;
        }
        
        .project-details {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
        }
        
        .project-main-image {
            width: 100%;
            height: 250px;
            object-fit: cover;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        
        .project-meta {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        
        .meta-item {
            display: flex;
            align-items: center;
            gap: 10px;
            color: #666;
        }
        
        .meta-item i {
            color: var(--primary-blue);
            width: 16px;
        }
        
        .project-overview h3,
        .project-challenges h3,
        .project-technologies h3,
        .project-results h3 {
            color: var(--text-color);
            margin-bottom: 15px;
            font-size: 1.3rem;
        }
        
        .project-challenges ul {
            list-style: none;
            padding: 0;
        }
        
        .project-challenges li {
            padding: 8px 0;
            position: relative;
            padding-left: 20px;
            color: #666;
        }
        
        .project-challenges li::before {
            content: '▶';
            position: absolute;
            left: 0;
            color: var(--primary-blue);
        }
        
        .tech-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }
        
        .tech-tag {
            background: var(--light-blue);
            color: var(--dark-blue);
            padding: 6px 12px;
            border-radius: 15px;
            font-size: 0.85rem;
            font-weight: 500;
        }
        
        .results-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
        }
        
        .result-item {
            text-align: center;
            padding: 20px;
            background: var(--light-gray);
            border-radius: 8px;
        }
        
        .result-value {
            font-size: 2rem;
            font-weight: 700;
            color: var(--dark-blue);
            margin-bottom: 5px;
        }
        
        .result-label {
            color: #666;
            font-size: 0.9rem;
        }
        
        .gallery-container {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        
        .gallery-main {
            position: relative;
        }
        
        .gallery-main-image {
            width: 100%;
            height: 400px;
            object-fit: cover;
            border-radius: 8px;
        }
        
        .gallery-controls {
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            display: flex;
            justify-content: space-between;
            padding: 0 20px;
            transform: translateY(-50%);
        }
        
        .gallery-btn {
            width: 50px;
            height: 50px;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.2rem;
            transition: background 0.3s ease;
        }
        
        .gallery-btn:hover {
            background: var(--primary-blue);
        }
        
        .gallery-thumbnails {
            display: flex;
            gap: 10px;
            overflow-x: auto;
            padding: 10px 0;
        }
        
        .gallery-thumbnail {
            width: 80px;
            height: 60px;
            object-fit: cover;
            border-radius: 4px;
            cursor: pointer;
            opacity: 0.6;
            transition: opacity 0.3s ease;
            flex-shrink: 0;
        }
        
        .gallery-thumbnail.active,
        .gallery-thumbnail:hover {
            opacity: 1;
            border: 2px solid var(--primary-blue);
        }
        
        .case-study-content h3 {
            color: var(--text-color);
            margin-bottom: 15px;
            font-size: 1.3rem;
        }
        
        .case-study-content p {
            color: #666;
            line-height: 1.7;
            margin-bottom: 25px;
        }
        
        .case-study-implementation ul {
            list-style: none;
            padding: 0;
        }
        
        .case-study-implementation li {
            padding: 10px 0;
            position: relative;
            padding-left: 25px;
            color: #666;
        }
        
        .case-study-implementation li::before {
            content: '✓';
            position: absolute;
            left: 0;
            color: var(--primary-blue);
            font-weight: bold;
        }
        
        .results-showcase {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
        }
        
        .result-showcase-item {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 20px;
            background: var(--light-gray);
            border-radius: 8px;
        }
        
        .result-icon {
            width: 50px;
            height: 50px;
            background: var(--primary-blue);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
        }
        
        .result-content .result-value {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--dark-blue);
            margin-bottom: 5px;
        }
        
        .result-content .result-description {
            color: #666;
            font-size: 0.9rem;
        }
        
        @keyframes modalSlideIn {
            from {
                opacity: 0;
                transform: translateY(-50px) scale(0.9);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        @media (max-width: 768px) {
            .modal-content {
                width: 95%;
                margin: 20px;
            }
            
            .project-details {
                grid-template-columns: 1fr;
                gap: 20px;
            }
            
            .results-grid,
            .results-showcase {
                grid-template-columns: 1fr;
            }
            
            .gallery-main-image {
                height: 250px;
            }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.id = 'modal-styles';
    styleSheet.textContent = modalStyles;
    document.head.appendChild(styleSheet);
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal-overlay');
        if (activeModal) {
            closeModal(activeModal.id);
        }
    }
    
    if (document.getElementById('gallery-modal')) {
        if (e.key === 'ArrowLeft') {
            previousImage();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        }
    }
});

// Close modal on overlay click
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-overlay')) {
        closeModal(e.target.id);
    }
});

// Performance optimization
const debouncedResize = debounce(function() {
    const isMobile = window.innerWidth <= 768;
    const filterControls = document.querySelector('.filter-controls');
    
    if (isMobile && filterControls) {
        filterControls.style.flexDirection = 'column';
        filterControls.style.alignItems = 'center';
    } else if (filterControls) {
        filterControls.style.flexDirection = 'row';
        filterControls.style.alignItems = 'flex-start';
    }
}, 250);

window.addEventListener('resize', debouncedResize);

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
