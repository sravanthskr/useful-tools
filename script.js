// Global variables
let allTools = [];
let filteredTools = [];
let currentCategory = '';
let currentSearchTerm = '';

// DOM elements
const toolsGrid = document.getElementById('toolsGrid');
const loadingSpinner = document.getElementById('loadingSpinner');
const noResults = document.getElementById('noResults');
const searchInput = document.getElementById('searchInput');
const mobileSearchInput = document.getElementById('mobileSearchInput');
const categoryFilter = document.getElementById('categoryFilter');
const mobileCategoryFilter = document.getElementById('mobileCategoryFilter');
const darkModeToggle = document.getElementById('darkModeToggle');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const contactForm = document.getElementById('contactForm');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeDarkMode();
    setupEventListeners();
    
    // Only fetch tools if we're on the homepage
    if (window.location.pathname === '/' || window.location.pathname.includes('index.html') || window.location.pathname === '/index.html') {
        fetchTools();
    }
});

// Dark mode functionality
function initializeDarkMode() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateDarkModeIcon(savedTheme);
}

function toggleDarkMode() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateDarkModeIcon(newTheme);
}

function updateDarkModeIcon(theme) {
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    
    if (theme === 'light') {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    } else {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    }
}

// Event listeners setup
function setupEventListeners() {
    // Dark mode toggle
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }
    
    // Mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }
    
    if (mobileSearchInput) {
        mobileSearchInput.addEventListener('input', debounce(handleMobileSearch, 300));
        mobileSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleMobileSearch();
            }
        });
    }
    
    // Category filtering
    if (categoryFilter) {
        categoryFilter.addEventListener('change', handleCategoryFilter);
    }
    
    if (mobileCategoryFilter) {
        mobileCategoryFilter.addEventListener('change', handleMobileCategoryFilter);
    }
    
    // Contact form
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenu && !mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });
}

// Mobile menu functionality
function toggleMobileMenu() {
    mobileMenu.classList.toggle('show');
    mobileMenuToggle.classList.toggle('active');
}

function closeMobileMenu() {
    mobileMenu.classList.remove('show');
    mobileMenuToggle.classList.remove('active');
}

// API data fetching
async function fetchTools() {
    try {
        showLoading(true);
        
        const response = await fetch('https://script.google.com/macros/s/AKfycbwjsI-s78wz8R4kD9zOkTBtTyot67TIP7l1Xc_Li5YppCnFWpvmV7csONK7OzmhBK8O-g/exec');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data && Array.isArray(data) && data.length > 0) {
            allTools = data.reverse(); // Show latest tools first
            filteredTools = [...allTools];
            populateCategories();
            displayTools();
        } else {
            throw new Error('No tools data received');
        }
        
    } catch (error) {
        console.error('Error fetching tools:', error);
        showError('Failed to load AI tools. Please try again later.');
    } finally {
        showLoading(false);
    }
}

// Display tools in the grid
function displayTools() {
    if (!toolsGrid) return;
    
    if (filteredTools.length === 0) {
        toolsGrid.innerHTML = '';
        showNoResults(true);
        return;
    }
    
    showNoResults(false);
    
    const toolsHTML = filteredTools.map((tool, index) => `
        <div class="tool-card" style="animation-delay: ${index * 0.1}s">
            <div class="tool-category">${escapeHtml(tool.Category || 'General')}</div>
            <h3 class="tool-name">${escapeHtml(tool['Tool Name'] || 'Unknown Tool')}</h3>
            <p class="tool-description">${escapeHtml(tool.Description || 'No description available.')}</p>
            <a href="${escapeHtml(tool.Link || '#')}" target="_blank" rel="noopener noreferrer" class="visit-btn">
                <span>Visit Tool</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M7 17L17 7M17 7H7M17 7V17"/>
                </svg>
            </a>
        </div>
    `).join('');
    
    toolsGrid.innerHTML = toolsHTML;
}

// Populate category filter options
function populateCategories() {
    const categories = [...new Set(allTools.map(tool => tool.Category).filter(Boolean))].sort();
    
    const categoryOptions = categories.map(category => 
        `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`
    ).join('');
    
    if (categoryFilter) {
        categoryFilter.innerHTML = '<option value="">All Categories</option>' + categoryOptions;
    }
    
    if (mobileCategoryFilter) {
        mobileCategoryFilter.innerHTML = '<option value="">All Categories</option>' + categoryOptions;
    }
}

// Search functionality
function handleSearch() {
    currentSearchTerm = searchInput.value.toLowerCase().trim();
    if (mobileSearchInput) {
        mobileSearchInput.value = searchInput.value;
    }
    filterTools();
}

function handleMobileSearch() {
    currentSearchTerm = mobileSearchInput.value.toLowerCase().trim();
    if (searchInput) {
        searchInput.value = mobileSearchInput.value;
    }
    filterTools();
    closeMobileMenu();
}

// Category filtering
function handleCategoryFilter() {
    currentCategory = categoryFilter.value;
    if (mobileCategoryFilter) {
        mobileCategoryFilter.value = currentCategory;
    }
    filterTools();
}

function handleMobileCategoryFilter() {
    currentCategory = mobileCategoryFilter.value;
    if (categoryFilter) {
        categoryFilter.value = currentCategory;
    }
    filterTools();
    closeMobileMenu();
}

// Filter tools based on search and category
function filterTools() {
    filteredTools = allTools.filter(tool => {
        const matchesSearch = !currentSearchTerm || 
            (tool['Tool Name'] && tool['Tool Name'].toLowerCase().includes(currentSearchTerm)) ||
            (tool.Description && tool.Description.toLowerCase().includes(currentSearchTerm)) ||
            (tool.Category && tool.Category.toLowerCase().includes(currentSearchTerm));
        
        const matchesCategory = !currentCategory || tool.Category === currentCategory;
        
        return matchesSearch && matchesCategory;
    });
    
    displayTools();
}

// Contact form handling
function handleContactForm(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Show loading state on button
    const submitBtn = form.querySelector('.submit-btn');
    const originalBtnText = submitBtn.querySelector('.btn-text').textContent;
    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-text').textContent = 'Sending...';
    
    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Hide the form
            form.style.display = 'none';
            // Show the thank-you message
            const thankYouDiv = document.getElementById('thank-you');
            if (thankYouDiv) {
                thankYouDiv.style.display = 'block';
            }
            // Show success notification
            showSuccessMessage('Your message has been sent successfully! We\'ll get back to you within 24 hours.');
            // Reset form
            form.reset();
            // Reset floating labels
            const formInputs = form.querySelectorAll('.form-input');
            formInputs.forEach(input => {
                input.blur();
            });
        } else {
            return response.json().then(data => {
                throw new Error(data.error || 'Form submission failed');
            });
        }
    })
    .catch(error => {
        console.error('Error submitting form:', error);
        showSuccessMessage(`Error: ${error.message}. Please try again later.`, 'error');
    })
    .finally(() => {
        // Restore button state
        submitBtn.disabled = false;
        submitBtn.querySelector('.btn-text').textContent = originalBtnText;
    });
}

// Utility functions
function showLoading(show) {
    if (loadingSpinner) {
        loadingSpinner.style.display = show ? 'flex' : 'none';
    }
}

function showNoResults(show) {
    if (noResults) {
        noResults.style.display = show ? 'block' : 'none';
    }
}

function showError(message) {
    if (toolsGrid) {
        toolsGrid.innerHTML = `
            <div class="error-message" style="
                grid-column: 1 / -1;
                text-align: center;
                padding: 60px 20px;
                color: var(--text-secondary);
            ">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 20px; opacity: 0.5;">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
                <h3 style="font-size: 24px; margin-bottom: 12px; color: var(--text-primary);">Error Loading Tools</h3>
                <p style="font-size: 16px;">${escapeHtml(message)}</p>
                <button onclick="fetchTools()" style="
                    margin-top: 20px;
                    padding: 12px 24px;
                    background: var(--accent-color);
                    color: var(--bg-primary);
                    border: none;
                    border-radius: 25px;
                    cursor: pointer;
                    font-weight: 500;
                ">Try Again</button>
            </div>
        `;
    }
    showLoading(false);
}

// function showSuccessMessage(message) {
//     // Create success notification
//     const notification = document.createElement('div');
//     notification.style.cssText = `
//         position: fixed;
//         top: 20px;
//         right: 20px;
//         background: #10b981;
//         color: white;
//         padding: 16px 24px;
//         border-radius: 12px;
//         box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
//         z-index: 10000;
//         font-weight: 500;
//         max-width: 400px;
//         transform: translateX(100%);
//         transition: transform 0.3s ease;
//     `;
//     notification.textContent = message;
    
//     document.body.appendChild(notification);
    
//     // Animate in
//     setTimeout(() => {
//         notification.style.transform = 'translateX(0)';
//     }, 100);
    
//     // Remove after 5 seconds
//     setTimeout(() => {
//         notification.style.transform = 'translateX(100%)';
//         setTimeout(() => {
//             document.body.removeChild(notification);
//         }, 300);
//     }, 5000);
// }

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

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

// Service Worker for offline caching (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Performance optimization - lazy loading for images if needed
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if needed
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Handle browser back/forward navigation
window.addEventListener('popstate', () => {
    // Handle navigation state if needed
    console.log('Navigation state changed');
});

// Add keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    // Handle escape key to close mobile menu
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('show')) {
        closeMobileMenu();
    }
    
    // Handle enter key for buttons
    if (e.key === 'Enter' && e.target.classList.contains('visit-btn')) {
        e.target.click();
    }
});

// Smooth scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button if needed
window.addEventListener('scroll', () => {
    const scrollButton = document.getElementById('scrollToTop');
    if (scrollButton) {
        if (window.pageYOffset > 300) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }
    }
});