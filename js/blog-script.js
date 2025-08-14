// Blog specific JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeBlogSearch();
    initializeBlogFilters();
    initializeArticleModals();
    initializeNewsletterForm();
    initializeLoadMore();
    initializeCommentForm();
    initializeSocialSharing();
});

// Blog Search Functionality
function initializeBlogSearch() {
    const searchInput = document.getElementById('blog-search');
    const searchBtn = document.querySelector('.search-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    
    let searchTimeout;
    
    function performSearch(query) {
        const searchTerm = query.toLowerCase().trim();
        
        blogCards.forEach(card => {
            const title = card.querySelector('.card-title').textContent.toLowerCase();
            const excerpt = card.querySelector('.card-excerpt').textContent.toLowerCase();
            const category = card.querySelector('.category').textContent.toLowerCase();
            const author = card.querySelector('.author-name').textContent.toLowerCase();
            
            const isMatch = title.includes(searchTerm) || 
                          excerpt.includes(searchTerm) || 
                          category.includes(searchTerm) || 
                          author.includes(searchTerm);
            
            if (isMatch || searchTerm === '') {
                card.style.display = 'block';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show no results message if needed
        const visibleCards = Array.from(blogCards).filter(card => 
            card.style.display !== 'none'
        );
        
        showNoResultsMessage(visibleCards.length === 0 && searchTerm !== '');
    }
    
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        const query = this.value;
        
        searchTimeout = setTimeout(() => {
            performSearch(query);
        }, 300);
    });
    
    searchBtn.addEventListener('click', function() {
        performSearch(searchInput.value);
    });
    
    // Enter key search
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            performSearch(this.value);
        }
    });
}

// Blog Category Filters
function initializeBlogFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    const featuredArticle = document.querySelector('.featured-article');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active filter
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Filter articles
            blogCards.forEach((card, index) => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
            
            // Handle featured article
            if (category === 'all' || category === 'industry-news') {
                featuredArticle.style.display = 'block';
            } else {
                featuredArticle.style.display = 'none';
            }
            
            // Clear search
            const searchInput = document.getElementById('blog-search');
            searchInput.value = '';
            hideNoResultsMessage();
        });
    });
}

// Article Modals
function initializeArticleModals() {
    const modal = document.getElementById('article-modal');
    const modalContent = document.getElementById('article-content');
    const closeBtn = document.querySelector('.modal-close');
    const readMoreBtns = document.querySelectorAll('.read-more-link, .read-more-btn');
    
    // Article data
    const articles = {
        'featured': {
            title: 'The Future of Surveying: How AI and Machine Learning are Revolutionizing Land Surveying',
            image: '/placeholder.svg?height=400&width=800&text=AI+Surveying+Technology',
            category: 'Industry News',
            date: 'December 15, 2024',
            author: {
                name: 'Dr. Sarah Johnson',
                title: 'Senior Survey Engineer',
                avatar: '/placeholder.svg?height=60&width=60&text=SJ'
            },
            content: `
                <p>The surveying industry is experiencing a technological revolution that promises to transform how we measure, map, and understand our world. Artificial Intelligence (AI) and Machine Learning (ML) are at the forefront of this transformation, offering unprecedented accuracy, efficiency, and insights.</p>
                
                <h2>The Current State of Surveying Technology</h2>
                <p>Traditional surveying methods, while reliable, often require significant time investment and manual processing. Modern surveying teams are increasingly adopting technologies like GPS, LiDAR, and drone-based systems. However, the real game-changer lies in how AI and ML can process and interpret the vast amounts of data these tools generate.</p>
                
                <h2>AI-Powered Data Processing</h2>
                <p>One of the most significant advantages of AI in surveying is its ability to process large datasets quickly and accurately. Machine learning algorithms can:</p>
                <ul>
                    <li>Automatically identify and classify terrain features</li>
                    <li>Detect anomalies and potential errors in survey data</li>
                    <li>Generate predictive models for land use planning</li>
                    <li>Optimize survey routes and data collection strategies</li>
                </ul>
                
                <blockquote>"AI is not replacing surveyors; it's empowering them to work more efficiently and accurately than ever before." - Dr. Sarah Johnson</blockquote>
                
                <h2>Real-World Applications</h2>
                <p>Several companies are already implementing AI-driven surveying solutions:</p>
                
                <h3>Automated Feature Recognition</h3>
                <p>AI algorithms can automatically identify buildings, roads, vegetation, and other features from aerial imagery and LiDAR data, significantly reducing manual digitization time.</p>
                
                <h3>Quality Control and Error Detection</h3>
                <p>Machine learning models can identify inconsistencies and potential errors in survey data, helping maintain high accuracy standards while reducing human oversight requirements.</p>
                
                <h3>Predictive Analytics</h3>
                <p>AI can analyze historical survey data to predict future changes in terrain, helping with long-term planning and risk assessment.</p>
                
                <h2>Challenges and Considerations</h2>
                <p>While the potential is enormous, there are challenges to consider:</p>
                <ul>
                    <li>Training requirements for survey professionals</li>
                    <li>Initial investment in AI-capable hardware and software</li>
                    <li>Data privacy and security concerns</li>
                    <li>Regulatory compliance and industry standards</li>
                </ul>
                
                <h2>The Future Outlook</h2>
                <p>As AI and ML technologies continue to evolve, we can expect to see even more sophisticated applications in surveying. The integration of IoT sensors, real-time data processing, and cloud-based AI services will create a more connected and intelligent surveying ecosystem.</p>
                
                <p>At TGIS, we're committed to staying at the forefront of these technological advances, ensuring our clients benefit from the most accurate, efficient, and cost-effective surveying solutions available.</p>
            `,
            tags: ['AI', 'Machine Learning', 'Technology', 'Innovation', 'Future'],
            comments: 12
        },
        '1': {
            title: 'Downtown Development Project: Phase 2 Completion',
            image: '/placeholder.svg?height=400&width=800&text=Downtown+Development',
            category: 'Project Updates',
            date: 'December 12, 2024',
            author: {
                name: 'Michael Rodriguez',
                title: 'Project Manager',
                avatar: '/placeholder.svg?height=60&width=60&text=MR'
            },
            content: `
                <p>We're thrilled to announce the successful completion of Phase 2 of the Downtown Development Project, marking a significant milestone in our largest urban surveying initiative to date.</p>
                
                <h2>Project Overview</h2>
                <p>The Downtown Development Project encompasses 15 acres of mixed-use commercial and residential development in the heart of the city. Phase 2 focused on the commercial district, including:</p>
                <ul>
                    <li>Topographic surveying of 8 commercial lots</li>
                    <li>Boundary determination for property consolidation</li>
                    <li>Utility mapping and infrastructure assessment</li>
                    <li>Environmental impact surveying</li>
                </ul>
                
                <h2>Challenges Overcome</h2>
                <p>This phase presented unique challenges that our team successfully navigated:</p>
                
                <h3>Urban Environment Complexities</h3>
                <p>Working in a busy downtown area required careful coordination with city officials, business owners, and pedestrian traffic. Our team implemented early morning survey schedules and used advanced GPS technology to minimize disruption.</p>
                
                <h3>Historical Property Boundaries</h3>
                <p>Several properties had unclear historical boundaries dating back to the 1920s. Our research team spent weeks in city archives, ultimately resolving all boundary disputes through careful documentation and stakeholder collaboration.</p>
                
                <h2>Technology Utilized</h2>
                <p>Phase 2 showcased our commitment to cutting-edge surveying technology:</p>
                <ul>
                    <li>High-precision RTK GPS systems</li>
                    <li>3D laser scanning for detailed building documentation</li>
                    <li>Drone-based aerial photography and mapping</li>
                    <li>Ground-penetrating radar for utility detection</li>
                </ul>
                
                <h2>Results and Impact</h2>
                <p>The completion of Phase 2 has provided the development team with comprehensive data needed to move forward with construction. Key deliverables included:</p>
                <ul>
                    <li>Detailed topographic maps with 0.1-foot contour intervals</li>
                    <li>Precise boundary surveys for all 8 commercial lots</li>
                    <li>Complete utility mapping showing existing infrastructure</li>
                    <li>Environmental assessment reports</li>
                </ul>
                
                <h2>Looking Ahead</h2>
                <p>With Phase 2 complete, we're now preparing for Phase 3, which will focus on the residential component of the development. This phase will present new challenges, including working around existing residential structures and coordinating with multiple utility companies.</p>
                
                <p>We're grateful for the opportunity to contribute to this transformative project and look forward to seeing the positive impact it will have on the downtown community.</p>
            `,
            tags: ['Project Update', 'Urban Development', 'Commercial', 'Downtown'],
            comments: 8
        },
        '2': {
            title: 'Understanding RTK GPS: Precision in Real-Time Surveying',
            image: '/placeholder.svg?height=400&width=800&text=RTK+GPS+Technology',
            category: 'Technical Articles',
            date: 'December 10, 2024',
            author: {
                name: 'James Chen',
                title: 'Senior Survey Technician',
                avatar: '/placeholder.svg?height=60&width=60&text=JC'
            },
            content: `
                <p>Real-Time Kinematic (RTK) GPS technology has revolutionized the surveying industry by providing centimeter-level accuracy in real-time. This comprehensive guide explores how RTK GPS works and its applications in modern surveying.</p>
                
                <h2>What is RTK GPS?</h2>
                <p>RTK GPS is a satellite navigation technique that enhances the precision of position data derived from satellite-based positioning systems. It uses measurements of the phase of the signal's carrier wave in addition to the information content of the signal.</p>
                
                <h2>How RTK GPS Works</h2>
                <p>The RTK system consists of three main components:</p>
                
                <h3>Base Station</h3>
                <p>A stationary receiver placed at a known location that collects GPS data and calculates correction information. The base station continuously monitors satellite signals and determines the errors in the GPS measurements.</p>
                
                <h3>Rover Unit</h3>
                <p>A mobile GPS receiver that receives both satellite signals and correction data from the base station. The rover applies these corrections to achieve high-precision positioning.</p>
                
                <h3>Communication Link</h3>
                <p>A radio or cellular connection that transmits correction data from the base station to the rover in real-time. This communication link is essential for achieving the high accuracy that RTK GPS provides.</p>
                
                <h2>Accuracy and Performance</h2>
                <p>RTK GPS can achieve remarkable accuracy levels:</p>
                <ul>
                    <li>Horizontal accuracy: ±1-2 centimeters</li>
                    <li>Vertical accuracy: ±2-3 centimeters</li>
                    <li>Real-time positioning updates</li>
                    <li>Reliable performance in various weather conditions</li>
                </ul>
                
                <h2>Applications in Surveying</h2>
                <p>RTK GPS technology is widely used across various surveying applications:</p>
                
                <h3>Boundary Surveys</h3>
                <p>RTK GPS enables surveyors to establish property boundaries with exceptional precision, reducing disputes and ensuring accurate legal descriptions.</p>
                
                <h3>Construction Layout</h3>
                <p>Construction teams use RTK GPS to position building corners, utilities, and other infrastructure elements according to design specifications.</p>
                
                <h3>Topographic Mapping</h3>
                <p>The technology allows for rapid collection of elevation data and terrain features, significantly reducing field time compared to traditional methods.</p>
                
                <h2>Advantages of RTK GPS</h2>
                <ul>
                    <li><strong>Real-time results:</strong> No need for post-processing data</li>
                    <li><strong>High productivity:</strong> Faster data collection than conventional methods</li>
                    <li><strong>Single operator:</strong> Can be operated by one person</li>
                    <li><strong>All-weather capability:</strong> Works in various environmental conditions</li>
                    <li><strong>Consistent accuracy:</strong> Maintains precision throughout the day</li>
                </ul>
                
                <h2>Limitations and Considerations</h2>
                <p>While RTK GPS is highly effective, there are some limitations to consider:</p>
                <ul>
                    <li>Limited range from base station (typically 10-20 km)</li>
                    <li>Requires clear sky view for satellite reception</li>
                    <li>Can be affected by multipath errors near reflective surfaces</li>
                    <li>Initial setup time for base station establishment</li>
                </ul>
                
                <h2>Future Developments</h2>
                <p>The future of RTK GPS looks promising with developments in:</p>
                <ul>
                    <li>Network RTK systems reducing the need for local base stations</li>
                    <li>Integration with other positioning technologies</li>
                    <li>Improved satellite constellations providing better coverage</li>
                    <li>Enhanced software for better error correction</li>
                </ul>
                
                <p>At TGIS, we utilize the latest RTK GPS technology to ensure our clients receive the most accurate and efficient surveying services available. Our team is trained on the latest equipment and techniques to maximize the benefits of this powerful technology.</p>
            `,
            tags: ['RTK GPS', 'Technology', 'Precision', 'Surveying Equipment'],
            comments: 15
        }
        // Additional articles would be defined here...
    };
    
    // Open modal
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const articleId = this.getAttribute('data-article');
            const article = articles[articleId];
            
            if (article) {
                displayArticle(article);
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Close modal on outside click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    function displayArticle(article) {
        modalContent.innerHTML = `
            <div class="article-full">
                <div class="article-header">
                    <div class="article-meta">
                        <span class="category ${article.category.toLowerCase().replace(' ', '-')}">${article.category}</span>
                        <span class="date">${article.date}</span>
                    </div>
                    <h1 class="article-title">${article.title}</h1>
                    <div class="article-author">
                        <img src="${article.author.avatar}" alt="${article.author.name}" class="author-avatar">
                        <div class="author-info">
                            <span class="author-name">${article.author.name}</span>
                            <span class="author-title">${article.author.title}</span>
                        </div>
                    </div>
                </div>
                <img src="${article.image}" alt="${article.title}" class="article-image">
                <div class="article-content">
                    ${article.content}
                </div>
                <div class="article-tags">
                    ${article.tags.map(tag => `<a href="#" class="tag">${tag}</a>`).join('')}
                </div>
                <div class="article-share">
                    <span>Share this article:</span>
                    <a href="#" class="share-btn facebook" data-platform="facebook"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" class="share-btn twitter" data-platform="twitter"><i class="fab fa-twitter"></i></a>
                    <a href="#" class="share-btn linkedin" data-platform="linkedin"><i class="fab fa-linkedin-in"></i></a>
                    <a href="#" class="share-btn email" data-platform="email"><i class="fas fa-envelope"></i></a>
                </div>
                <div class="comments-section">
                    <div class="comments-header">
                        <h3 class="comments-count">${article.comments} Comments</h3>
                    </div>
                    <div class="comment-form">
                        <h3>Leave a Comment</h3>
                        <form id="comment-form">
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="comment-name">Name *</label>
                                    <input type="text" id="comment-name" required>
                                </div>
                                <div class="form-group">
                                    <label for="comment-email">Email *</label>
                                    <input type="email" id="comment-email" required>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="comment-message">Comment *</label>
                                <textarea id="comment-message" required placeholder="Share your thoughts..."></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary">Post Comment</button>
                        </form>
                    </div>
                    <div class="comments-list">
                        ${generateSampleComments(article.comments)}
                    </div>
                </div>
            </div>
        `;
        
        // Initialize comment form for this article
        initializeCommentForm();
        initializeSocialSharing();
    }
    
    function generateSampleComments(count) {
        const sampleComments = [
            {
                name: 'John Smith',
                avatar: '/placeholder.svg?height=50&width=50&text=JS',
                date: '2 days ago',
                text: 'Great article! This technology is really changing how we approach surveying projects.'
            },
            {
                name: 'Maria Garcia',
                avatar: '/placeholder.svg?height=50&width=50&text=MG',
                date: '3 days ago',
                text: 'Very informative. We\'ve been considering implementing RTK GPS in our workflow.'
            },
            {
                name: 'David Lee',
                avatar: '/placeholder.svg?height=50&width=50&text=DL',
                date: '1 week ago',
                text: 'The accuracy improvements are impressive. Thanks for sharing your expertise!'
            }
        ];
        
        return sampleComments.slice(0, Math.min(count, 3)).map(comment => `
            <div class="comment-item">
                <div class="comment-header">
                    <img src="${comment.avatar}" alt="${comment.name}" class="comment-avatar">
                    <div class="comment-info">
                        <h4>${comment.name}</h4>
                        <span class="comment-date">${comment.date}</span>
                    </div>
                </div>
                <p class="comment-text">${comment.text}</p>
                <div class="comment-actions">
                    <button class="comment-action"><i class="fas fa-thumbs-up"></i> Like</button>
                    <button class="comment-action"><i class="fas fa-reply"></i> Reply</button>
                </div>
            </div>
        `).join('');
    }
}

// Newsletter Form
function initializeNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    const emailInput = document.getElementById('newsletter-email');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        if (validateEmail(email)) {
            // Simulate newsletter subscription
            showNotification('Thank you for subscribing to our newsletter!', 'success');
            emailInput.value = '';
        } else {
            showNotification('Please enter a valid email address.', 'error');
        }
    });
}

// Load More Functionality
function initializeLoadMore() {
    const loadMoreBtn = document.querySelector('.load-more-btn');
    let currentPage = 1;
    const articlesPerPage = 6;
    
    // Sample additional articles data
    const additionalArticles = [
        {
            title: 'Sustainable Surveying Practices for Environmental Protection',
            category: 'industry-news',
            image: '/placeholder.svg?height=250&width=400&text=Environmental+Surveying',
            excerpt: 'Exploring eco-friendly surveying methods and their impact on environmental conservation efforts.',
            author: 'Emma Wilson',
            date: 'November 28, 2024',
            views: '1.5K',
            comments: '9'
        },
        {
            title: 'BIM Integration in Modern Surveying Workflows',
            category: 'technical',
            image: '/placeholder.svg?height=250&width=400&text=BIM+Integration',
            excerpt: 'How Building Information Modeling is transforming surveying data management and project collaboration.',
            author: 'Alex Thompson',
            date: 'November 25, 2024',
            views: '2.3K',
            comments: '16'
        },
        {
            title: 'Residential Complex Survey: Overcoming Unique Challenges',
            category: 'project-updates',
            image: '/placeholder.svg?height=250&width=400&text=Residential+Survey',
            excerpt: 'Case study of our recent 200-unit residential complex survey and the innovative solutions we implemented.',
            author: 'Sarah Davis',
            date: 'November 22, 2024',
            views: '1.8K',
            comments: '11'
        }
    ];
    
    loadMoreBtn.addEventListener('click', function() {
        const blogGrid = document.querySelector('.blog-grid');
        
        // Show loading state
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        this.disabled = true;
        
        // Simulate loading delay
        setTimeout(() => {
            additionalArticles.forEach((article, index) => {
                const articleElement = createArticleElement(article, currentPage * articlesPerPage + index + 1);
                blogGrid.appendChild(articleElement);
                
                // Animate in
                setTimeout(() => {
                    articleElement.style.opacity = '1';
                    articleElement.style.transform = 'translateY(0)';
                }, index * 100);
            });
            
            currentPage++;
            
            // Reset button
            this.innerHTML = 'Load More Articles';
            this.disabled = false;
            
            // Hide button if no more articles
            if (currentPage >= 3) {
                this.style.display = 'none';
            }
            
            showNotification('More articles loaded successfully!', 'success');
        }, 1000);
    });
    
    function createArticleElement(article, id) {
        const articleEl = document.createElement('article');
        articleEl.className = 'blog-card';
        articleEl.setAttribute('data-category', article.category);
        articleEl.style.opacity = '0';
        articleEl.style.transform = 'translateY(30px)';
        articleEl.style.transition = 'all 0.6s ease';
        
        articleEl.innerHTML = `
            <div class="card-image">
                <img src="${article.image}" alt="${article.title}">
                <div class="card-overlay">
                    <a href="#" class="read-more-link" data-article="${id}">Read More</a>
                </div>
            </div>
            <div class="card-content">
                <div class="article-meta">
                    <span class="category ${article.category}">${article.category.replace('-', ' ')}</span>
                    <span class="date">${article.date}</span>
                </div>
                <h3 class="card-title">${article.title}</h3>
                <p class="card-excerpt">${article.excerpt}</p>
                <div class="article-author">
                    <img src="/placeholder.svg?height=30&width=30&text=${article.author.split(' ').map(n => n[0]).join('')}" alt="${article.author}" class="author-avatar">
                    <span class="author-name">${article.author}</span>
                </div>
                <div class="card-stats">
                    <span><i class="fas fa-eye"></i> ${article.views} views</span>
                    <span><i class="fas fa-comment"></i> ${article.comments} comments</span>
                </div>
            </div>
        `;
        
        return articleEl;
    }
}

// Comment Form
function initializeCommentForm() {
    const commentForm = document.getElementById('comment-form');
    
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('comment-name').value.trim();
            const email = document.getElementById('comment-email').value.trim();
            const message = document.getElementById('comment-message').value.trim();
            
            if (name && validateEmail(email) && message) {
                // Simulate comment submission
                showNotification('Thank you for your comment! It will be reviewed before publishing.', 'success');
                commentForm.reset();
            } else {
                showNotification('Please fill in all required fields correctly.', 'error');
            }
        });
    }
}

// Social Sharing
function initializeSocialSharing() {
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const platform = this.getAttribute('data-platform');
            const title = document.querySelector('.article-title').textContent;
            const url = window.location.href;
            
            let shareUrl = '';
            
            switch (platform) {
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
                    break;
                case 'email':
                    shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent('Check out this article: ' + url)}`;
                    break;
            }
            
            if (shareUrl) {
                if (platform === 'email') {
                    window.location.href = shareUrl;
                } else {
                    window.open(shareUrl, '_blank', 'width=600,height=400');
                }
                
                showNotification('Thanks for sharing!', 'success');
            }
        });
    });
}

// Utility Functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNoResultsMessage(show) {
    let noResultsMsg = document.querySelector('.no-results-message');
    
    if (show && !noResultsMsg) {
        noResultsMsg = document.createElement('div');
        noResultsMsg.className = 'no-results-message';
        noResultsMsg.innerHTML = `
            <div style="text-align: center; padding: 60px 20px; color: #666;">
                <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 20px; opacity: 0.5;"></i>
                <h3>No articles found</h3>
                <p>Try adjusting your search terms or browse our categories.</p>
            </div>
        `;
        document.querySelector('.blog-grid').appendChild(noResultsMsg);
    } else if (!show && noResultsMsg) {
        noResultsMsg.remove();
    }
}

function hideNoResultsMessage() {
    showNoResultsMessage(false);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 15px;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Keyboard navigation for accessibility
document.addEventListener('keydown', function(e) {
    const modal = document.getElementById('article-modal');
    
    if (modal.style.display === 'block' && e.key === 'Escape') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Performance optimization - lazy load images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}
