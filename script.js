// DOM Elements
const emailForm = document.getElementById('emailForm');
const emailInput = document.getElementById('email');
const successMessage = document.getElementById('successMessage');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Form submission handler
emailForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    
    // Validate email
    if (!email) {
        showError('Please enter your email address');
        return;
    }
    
    if (!emailRegex.test(email)) {
        showError('Please enter a valid email address');
        return;
    }
    
    // Simulate form submission
    submitEmail(email);
});

// Email submission function
function submitEmail(email) {
    // Add loading state to button
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // Hide form and show success message
        emailForm.style.display = 'none';
        successMessage.classList.add('show');
        
        // Reset button after delay
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1000);
        
        // Store email in localStorage (for demo purposes)
        // In a real application, you would send this to your backend
        storeEmail(email);
        
    }, 1500);
}

// Error handling
function showError(message) {
    // Remove any existing error messages
    removeExistingErrors();
    
    // Create error message element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        background: var(--error);
        color: white;
        padding: var(--space-sm);
        border-radius: var(--radius-sm);
        text-align: center;
        font-size: 14px;
        margin-top: var(--space-sm);
        animation: fadeIn 300ms ease-in-out;
    `;
    
    // Insert error message after the form
    emailForm.appendChild(errorDiv);
    
    // Remove error message after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.remove();
        }
    }, 5000);
    
    // Focus on email input
    emailInput.focus();
}

function removeExistingErrors() {
    const existingErrors = emailForm.querySelectorAll('.error-message');
    existingErrors.forEach(error => error.remove());
}

// Store email function (demo purposes)
function storeEmail(email) {
    try {
        // Get existing emails from localStorage
        const existingEmails = JSON.parse(localStorage.getItem('hotelSubscribers') || '[]');
        
        // Add new email if not already present
        if (!existingEmails.includes(email)) {
            existingEmails.push(email);
            localStorage.setItem('hotelSubscribers', JSON.stringify(existingEmails));
        }
        
        console.log('Email stored successfully:', email);
    } catch (error) {
        console.error('Error storing email:', error);
    }
}

// Input validation on blur
emailInput.addEventListener('blur', function() {
    const email = emailInput.value.trim();
    
    if (email && !emailRegex.test(email)) {
        showError('Please enter a valid email address');
    }
});

// Clear validation on input focus
emailInput.addEventListener('focus', function() {
    removeExistingErrors();
});

// Add smooth scrolling for any anchor links (if added later)
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

// Add intersection observer for animations (if needed for scroll-triggered animations)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation (if needed)
// document.querySelectorAll('.coming-soon-message, .signup-form-container').forEach(el => {
//     observer.observe(el);
// });

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Handle Enter key on form submission
    if (e.key === 'Enter' && e.target === emailInput) {
        emailForm.dispatchEvent(new Event('submit'));
    }
    
    // Handle Escape key to clear form or close modals
    if (e.key === 'Escape') {
        removeExistingErrors();
    }
});

// Performance optimization: Debounce input validation
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

// Add debounced email validation
const debouncedEmailValidation = debounce((email) => {
    if (email && !emailRegex.test(email)) {
        // Could add real-time validation feedback here
        console.log('Email format validation:', email);
    }
}, 500);

emailInput.addEventListener('input', function() {
    debouncedEmailValidation(this.value.trim());
});

// Console welcome message for developers
console.log('%c🏨 Grand Luxury Hotel', 'color: #A18A68; font-size: 20px; font-weight: bold;');
console.log('%cComing Soon Landing Page v1.0', 'color: #6B6B6B; font-size: 12px;');
console.log('%cEmail submissions are stored in localStorage for demo purposes', 'color: #999; font-size: 11px;');

// Service Worker registration (for future PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when service worker is implemented
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}