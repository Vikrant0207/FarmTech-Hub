// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle Functionality
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const htmlElement = document.documentElement;
    
    themeToggleBtn.addEventListener('click', function() {
        if (htmlElement.getAttribute('data-theme') === 'light') {
            htmlElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            htmlElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    }
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navElement = document.querySelector('nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        navElement.classList.toggle('active');
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navElement.classList.remove('active');
            }
        });
    });
    
    // Marketplace tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            this.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
    
    // Modal functionality
    const loginBtn = document.querySelector('.btn-login');
    const registerBtn = document.querySelector('.btn-register');
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const showRegisterModalBtn = document.getElementById('show-register-modal');
    const showLoginModalBtn = document.getElementById('show-login-modal');
    
    // Open login modal
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.style.display = 'flex';
        });
    }
    
    // Open register modal
    if (registerBtn) {
        registerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            registerModal.style.display = 'flex';
        });
    }
    
    // Close modals
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            loginModal.style.display = 'none';
            registerModal.style.display = 'none';
        });
    });
    
    // Switch between login and register modals
    if (showRegisterModalBtn) {
        showRegisterModalBtn.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.style.display = 'none';
            registerModal.style.display = 'flex';
        });
    }
    
    if (showLoginModalBtn) {
        showLoginModalBtn.addEventListener('click', function(e) {
            e.preventDefault();
            registerModal.style.display = 'none';
            loginModal.style.display = 'flex';
        });
    }
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
        }
        if (e.target === registerModal) {
            registerModal.style.display = 'none';
        }
    });
    
    // Form submissions
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const productListingForm = document.getElementById('product-listing-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            // Simulate login API call
            console.log('Login attempt with:', email);
            alert('Login functionality would be implemented with a backend API');
            
            // Close modal after submission
            loginModal.style.display = 'none';
        });
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const firstName = document.getElementById('register-fname').value;
            const lastName = document.getElementById('register-lname').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;
            
            // Validate password match
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            // Simulate register API call
            console.log('Registration attempt for:', firstName, lastName, email);
            alert('Registration functionality would be implemented with a backend API');
            
            // Close modal after submission
            registerModal.style.display = 'none';
        });
    }
    
    if (productListingForm) {
        productListingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const productName = document.getElementById('product-name').value;
            const category = document.getElementById('product-category').value;
            const description = document.getElementById('product-description').value;
            const price = document.getElementById('product-price').value;
            const quantity = document.getElementById('product-quantity').value;
            
            // Simulate product listing API call
            console.log('New product listing:', { productName, category, description, price, quantity });
            alert('Your product has been listed successfully!');
            
            // Reset form
            productListingForm.reset();
        });
    }
    
    // Disease detection tool functionality
    const diseaseUploadArea = document.getElementById('disease-upload-area');
    const diseaseImageUpload = document.getElementById('disease-image-upload');
    const diseaseResult = document.getElementById('disease-result');
    
    if (diseaseUploadArea && diseaseImageUpload) {
        // Trigger file input when clicking on upload area
        diseaseUploadArea.addEventListener('click', function() {
            diseaseImageUpload.click();
        });
        
        // Handle drag and drop
        diseaseUploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('active');
        });
        
        diseaseUploadArea.addEventListener('dragleave', function() {
            this.classList.remove('active');
        });
        
        diseaseUploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('active');
            
            if (e.dataTransfer.files.length) {
                diseaseImageUpload.files = e.dataTransfer.files;
                handleDiseaseImageUpload(e.dataTransfer.files[0]);
            }
        });
        
        // Handle file selection
        diseaseImageUpload.addEventListener('change', function() {
            if (this.files.length) {
                handleDiseaseImageUpload(this.files[0]);
            }
        });
        
        function handleDiseaseImageUpload(file) {
            if (!file.type.match('image.*')) {
                alert('Please upload an image file');
                return;
            }
            
            const reader = new FileReader();
            
            reader.onload = function(e) {
                // Display uploaded image
                diseaseUploadArea.innerHTML = `<img src="${e.target.result}" alt="Uploaded Image" style="max-width: 100%; max-height: 200px;">`;
                
                // Simulate AI analysis
                setTimeout(() => {
                    // Replace with actual disease detection API integration
                    const mockResults = {
                        disease: 'Foot-and-Mouth Disease',
                        probability: 0.87,
                        recommendations: [
                            'Isolate affected animals immediately',
                            'Contact your veterinarian',
                            'Implement biosecurity measures'
                        ]
                    };
                    
                    showDiseaseResults(mockResults);
                }, 1500);
            };
            
            reader.readAsDataURL(file);
        }
        
        function showDiseaseResults(results) {
            let recommendationsHTML = '';
            
            results.recommendations.forEach(rec => {
                recommendationsHTML += `<li>${rec}</li>`;
            });
            
            diseaseResult.innerHTML = `
                <h4>Analysis Results</h4>
                <div class="result-content">
                    <div class="result-item">
                        <span class="result-label">Detected Disease:</span>
                        <span class="result-value">${results.disease}</span>
                    </div>
                    <div class="result-item">
                        <span class="result-label">Confidence:</span>
                        <span class="result-value">${(results.probability * 100).toFixed(1)}%</span>
                        <div class="confidence-bar">
                            <div class="confidence-level" style="width: ${results.probability * 100}%"></div>
                        </div>
                    </div>
                    <div class="result-item">
                        <span class="result-label">Recommendations:</span>
                        <ul class="recommendations-list">
                            ${recommendationsHTML}
                        </ul>
                    </div>
                </div>
            `;
        }
    }
    
    // AI Assistant chat functionality
    const chatMessages = document.getElementById('chat-messages');
    const userMessageInput = document.getElementById('user-message');
    const sendMessageBtn = document.getElementById('send-message-btn');
    const voiceInputBtn = document.getElementById('voice-input-btn');
    
    if (chatMessages && userMessageInput && sendMessageBtn) {
        sendMessageBtn.addEventListener('click', function() {
            sendUserMessage();
        });
        
        userMessageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendUserMessage();
            }
        });
        
        if (voiceInputBtn) {
            voiceInputBtn.addEventListener('click', function() {
                // Check if browser supports speech recognition
                if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
                    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                    const recognition = new SpeechRecognition();
                    
                    recognition.lang = 'en-US';
                    recognition.interimResults = false;
                    
                    recognition.onstart = function() {
                        voiceInputBtn.classList.add('listening');
                        userMessageInput.placeholder = 'Listening...';
                    };
                    
                    recognition.onresult = function(event) {
                        const transcript = event.results[0][0].transcript;
                        userMessageInput.value = transcript;
                    };
                    
                    recognition.onend = function() {
                        voiceInputBtn.classList.remove('listening');
                        userMessageInput.placeholder = 'Type your question here...';
                        setTimeout(() => {
                            sendUserMessage();
                        }, 500);
                    };
                    
                    recognition.start();
                } else {
                    alert('Speech recognition is not supported in your browser.');
                }
            });
        }
        
        function sendUserMessage() {
            const message = userMessageInput.value.trim();
            
            if (message === '') return;
            
            // Add user message to chat
            addMessageToChat('user', message);
            
            // Clear input
            userMessageInput.value = '';
            
            // Simulate AI response (replace with actual API call)
            setTimeout(() => {
                processAIResponse(message);
            }, 1000);
        }
        
        function addMessageToChat(sender, content) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender}`;
            
            messageDiv.innerHTML = `
                <div class="message-content">
                    <p>${content}</p>
                </div>
            `;
            
            chatMessages.appendChild(messageDiv);
            
            // Scroll to bottom of chat
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        
        function processAIResponse(userMessage) {
            // Simple rule-based responses (replace with actual AI implementation)
            let response;
            
            const lowerCaseMessage = userMessage.toLowerCase();
            
            if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
                response = "Hello! How can I help you with your farming needs today?";
            } else if (lowerCaseMessage.includes('disease') || lowerCaseMessage.includes('sick') || lowerCaseMessage.includes('health')) {
                response = "To help with animal health issues, please provide details about the symptoms you've observed. You can also use our Disease Detection tool in the Veterinary section to upload images for analysis.";
            } else if (lowerCaseMessage.includes('breed') || lowerCaseMessage.includes('breeding')) {
                response = "Our AI-powered breeding recommendations are based on genetic analysis. Would you like information about specific livestock breeding techniques?";
            } else if (lowerCaseMessage.includes('market') || lowerCaseMessage.includes('sell') || lowerCaseMessage.includes('buy')) {
                response = "Our marketplace offers various equipment and supplies. You can browse available items or list your own products. What specific items are you looking for?";
            } else if (lowerCaseMessage.includes('course') || lowerCaseMessage.includes('learn') || lowerCaseMessage.includes('train')) {
                response = "We offer various training modules for farming techniques, livestock management, and veterinary skills. Would you like me to recommend a course based on your interests?";
            } else {
                response = "Thank you for your message. How can I assist you with your farming needs today? I can help with livestock management, disease detection, marketplace listings, or connect you with our training programs.";
            }
            
            addMessageToChat('assistant', response);
        }
    }
    
    // Interactive learning modules functionality
    const moduleButtons = document.querySelectorAll('[data-module]');
    
    moduleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const moduleType = this.getAttribute('data-module');
            // Redirect to module page or open modal with module content
            alert(`Opening ${moduleType} module. This would link to the full learning content.`);
        });
    });
    
    // Veterinary program enrollment
    const programButtons = document.querySelectorAll('[data-program]');
    
    programButtons.forEach(button => {
        button.addEventListener('click', function() {
            const programType = this.getAttribute('data-program');
            // Redirect to program enrollment page
            alert(`Redirecting to ${programType} program enrollment. This would connect to the enrollment system.`);
        });
    });
    
    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email === '') {
                alert('Please enter your email address');
                return;
            }
            
            // Simulate newsletter subscription API call
            console.log('Newsletter subscription for:', email);
            alert('Thank you for subscribing to our newsletter!');
            
            // Reset form
            this.reset();
        });
    }
    
    // Intersection Observer for animations
    const observeElements = document.querySelectorAll('.feature-card, .vet-program-card, .assistant-card, .product-card');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        });
    }, observerOptions);
    
    observeElements.forEach(element => {
        appearOnScroll.observe(element);
    });
    
    // Add active class to navigation based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Cart functionality
    const cartTabBtn = document.querySelector('[data-tab="cart"]');
    const cartTabPane = document.getElementById('cart-tab');
    const cartCount = document.querySelector('.cart-count');
    const cartItemsContainer = cartTabPane.querySelector('.cart-items');
    const cartEmptyMessage = cartTabPane.querySelector('.cart-empty-message');
    const cartSubtotal = cartTabPane.querySelector('.cart-subtotal');
    const cartTotal = cartTabPane.querySelector('.cart-total');
    const addToCartButtons = document.querySelectorAll('.product-card .btn-primary');

    let cart = [];

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h4').textContent;
            const productPrice = parseFloat(productCard.querySelector('.product-price').textContent.replace('$', ''));
            const productImage = productCard.querySelector('img').src;

            const existingProduct = cart.find(item => item.name === productName);

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({ name: productName, price: productPrice, image: productImage, quantity: 1 });
            }

            updateCart();
            alert(`${productName} has been added to your cart.`);
        });
    });

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let subtotal = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;

            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrease">-</button>
                    <input type="number" value="${item.quantity}" min="1" max="99">
                    <button class="quantity-btn increase">+</button>
                </div>
                <div class="cart-item-total">
                    <p>$${itemTotal.toFixed(2)}</p>
                </div>
                <button class="remove-item-btn">
                    <i class="fas fa-trash"></i>
                </button>
            `;

            cartItemsContainer.appendChild(cartItem);

            // Add event listeners for quantity buttons and remove button
            cartItem.querySelector('.decrease').addEventListener('click', () => updateQuantity(item.name, -1));
            cartItem.querySelector('.increase').addEventListener('click', () => updateQuantity(item.name, 1));
            cartItem.querySelector('.remove-item-btn').addEventListener('click', () => removeItem(item.name));
        });

        cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
        cartTotal.textContent = `$${subtotal.toFixed(2)}`;
        cartCount.textContent = cart.length;

        cartEmptyMessage.style.display = cart.length === 0 ? 'block' : 'none';
    }

    function updateQuantity(productName, change) {
        const product = cart.find(item => item.name === productName);
        if (product) {
            product.quantity += change;
            if (product.quantity <= 0) {
                removeItem(productName);
            } else {
                updateCart();
            }
        }
    }

    function removeItem(productName) {
        cart = cart.filter(item => item.name !== productName);
        updateCart();
    }
})
