// Wait for the DOM to be fully loaded before executing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Theme toggling functionality
    initThemeToggle();
    
    // Modal functionality
    initModals();
    
    // Product filtering and search
    initProductFilters();
    
    // Shopping cart functionality
    initShoppingCart();
    
    // Pagination
    initPagination();
    
    // Newsletter subscription
    initNewsletterForm();
});

/**
 * Theme Toggle Functionality
 */
function initThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference or use default
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    
    themeToggleBtn.addEventListener('click', function() {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

/**
 * Modal Functionality
 */
function initModals() {
    // Modal elements
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const forgotPasswordLink = document.getElementById('forgot-password');
    const showRegisterModalLink = document.getElementById('show-register-modal');
    const showLoginModalLink = document.getElementById('show-login-modal');
    const backToLoginLink = document.getElementById('back-to-login');
    
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');
    const forgotPasswordModal = document.getElementById('forgot-password-modal');
    
    const closeButtons = document.querySelectorAll('.close-modal');
    
    // Open modals
    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        openModal(loginModal);
    });
    
    registerBtn.addEventListener('click', function(e) {
        e.preventDefault();
        openModal(registerModal);
    });
    
    forgotPasswordLink.addEventListener('click', function(e) {
        e.preventDefault();
        closeModal(loginModal);
        openModal(forgotPasswordModal);
    });
    
    showRegisterModalLink.addEventListener('click', function(e) {
        e.preventDefault();
        closeModal(loginModal);
        openModal(registerModal);
    });
    
    showLoginModalLink.addEventListener('click', function(e) {
        e.preventDefault();
        closeModal(registerModal);
        openModal(loginModal);
    });
    
    backToLoginLink.addEventListener('click', function(e) {
        e.preventDefault();
        closeModal(forgotPasswordModal);
        openModal(loginModal);
    });
    
    // Close modals with X button
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });
    
    // Form submission handlers
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const forgotPasswordForm = document.getElementById('forgot-password-form');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Get form data
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const rememberMe = document.getElementById('remember-me').checked;
        
        // Here you would normally send this data to a server
        console.log('Login attempt:', { email, password, rememberMe });
        
        // Simulate successful login
        alert('Login successful!');
        closeModal(loginModal);
        updateNavForLoggedInUser(email);
    });
    
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Validate passwords match
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;
        
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        // Get form data
        const firstName = document.getElementById('register-fname').value;
        const lastName = document.getElementById('register-lname').value;
        const email = document.getElementById('register-email').value;
        
        // Here you would normally send this data to a server
        console.log('Registration attempt:', { firstName, lastName, email });
        
        // Simulate successful registration
        alert('Registration successful! You can now log in.');
        closeModal(registerModal);
        openModal(loginModal);
    });
    
    forgotPasswordForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('reset-email').value;
        
        // Here you would normally send this to a server
        console.log('Password reset requested for:', email);
        
        // Simulate successful request
        alert(`Password reset link sent to ${email}`);
        closeModal(forgotPasswordModal);
    });
}

/**
 * Helper functions for modals
 */
function openModal(modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

function updateNavForLoggedInUser(email) {
    const navButtons = document.querySelector('.nav-buttons');
    navButtons.innerHTML = `
        <div class="user-dropdown">
            <button class="user-dropdown-btn">
                <i class="fas fa-user-circle"></i> ${email.split('@')[0]}
            </button>
            <div class="user-dropdown-content">
                <a href="profile.html">My Profile</a>
                <a href="orders.html">My Orders</a>
                <a href="#" id="logout-btn">Logout</a>
            </div>
        </div>
    `;
    
    // Add logout functionality
    document.getElementById('logout-btn').addEventListener('click', function(e) {
        e.preventDefault();
        // Reset nav
        const navButtons = document.querySelector('.nav-buttons');
        navButtons.innerHTML = `
            <a href="#" class="btn-login" id="login-btn">Login</a>
            <a href="#" class="btn-register" id="register-btn">Register</a>
        `;
        
        // Re-initialize button event listeners
        document.getElementById('login-btn').addEventListener('click', function(e) {
            e.preventDefault();
            openModal(document.getElementById('login-modal'));
        });
        
        document.getElementById('register-btn').addEventListener('click', function(e) {
            e.preventDefault();
            openModal(document.getElementById('register-modal'));
        });
        
        alert('Logged out successfully');
    });
}

/**
 * Product Filtering and Search Functionality
 */
function initProductFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const searchInput = document.getElementById('search-products');
    const searchBtn = document.getElementById('search-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    // Filter by category
    categoryFilter.addEventListener('change', function() {
        filterProducts();
    });
    
    // Search functionality
    searchBtn.addEventListener('click', function() {
        filterProducts();
    });
    
    // Also filter on Enter key
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            filterProducts();
        }
    });
    
    function filterProducts() {
        const category = categoryFilter.value;
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        productCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const cardTitle = card.querySelector('h4').innerText.toLowerCase();
            const cardDescription = card.querySelector('.description').innerText.toLowerCase();
            
            // Check if card matches both category and search term
            const matchesCategory = category === 'all' || cardCategory === category;
            const matchesSearch = searchTerm === '' || 
                                 cardTitle.includes(searchTerm) || 
                                 cardDescription.includes(searchTerm);
            
            if (matchesCategory && matchesSearch) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }
}

/**
 * Shopping Cart Functionality
 */
function initShoppingCart() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartNotification = document.getElementById('cart-notification');
    
    // Initialize cart in local storage if it doesn't exist
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productId = productCard.getAttribute('data-id');
            const productName = productCard.querySelector('h4').innerText;
            const productPrice = productCard.querySelector('.price').innerText;
            const productImage = productCard.querySelector('img').getAttribute('src');
            
            // Get current cart
            const cart = JSON.parse(localStorage.getItem('cart'));
            
            // Check if product is already in cart
            const existingProductIndex = cart.findIndex(item => item.id === productId);
            
            if (existingProductIndex >= 0) {
                // Increment quantity if already in cart
                cart[existingProductIndex].quantity += 1;
            } else {
                // Add new product to cart
                cart.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    quantity: 1
                });
            }
            
            // Save updated cart
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Show notification
            showCartNotification();
        });
    });
    
    function showCartNotification() {
        cartNotification.style.display = 'block';
        setTimeout(() => {
            cartNotification.style.display = 'none';
        }, 3000);
    }
}

/**
 * Pagination Functionality
 */
function initPagination() {
    const paginationButtons = document.querySelectorAll('.page-link');
    
    paginationButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            paginationButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Here you would normally fetch the next page of products
            // For demo purposes, we'll just log the page number
            const pageNumber = this.innerText;
            console.log(`Navigating to page: ${pageNumber}`);
            
            if (!this.classList.contains('next')) {
                // Simulate page change (in a real app, you'd fetch new products)
                alert(`Showing page ${pageNumber} products`);
            } else {
                // Handle next button
                let activePage = document.querySelector('.page-link.active:not(.next)');
                if (activePage) {
                    let nextPage = parseInt(activePage.innerText) + 1;
                    console.log(`Navigating to next page: ${nextPage}`);
                    alert(`Showing page ${nextPage} products`);
                }
            }
        });
    });
}

/**
 * Newsletter Subscription Form
 */
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        // Here you would normally send this to a server
        console.log('Newsletter subscription:', email);
        
        // Simulate successful subscription
        alert(`Thank you for subscribing to our newsletter with ${email}!`);
        this.reset();
    });
}
