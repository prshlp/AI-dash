/**
 * AI-dash Alumni Portal - Main Application
 * Senior Frontend Engineer Implementation
 */

class AlumniPortal {
    constructor() {
        this.currentSection = 'dashboard';
        this.alumniData = [];
        this.chatHistory = [];
        this.isLoading = false;
        this.user = {
            name: 'Alumni User',
            initials: 'AL',
            class: '2020',
            email: '',
            location: ''
        };
        
        // Constructor complete - methods will be bound via arrow functions in event listeners
    }

    /**
     * Initialize the application
     */
    async init() {
        try {
            console.log('Initializing Alumni Portal...');
            
            // Hide loading screen
            this.hideLoadingScreen();
            
            // Set up event listeners
            this.setupEventListeners();
            
            // Load initial data
            await this.loadInitialData();
            
            // Update UI
            this.updateDashboard();
            this.updateProfile();
            
            console.log('Alumni Portal initialized successfully');
        } catch (error) {
            console.error('Failed to initialize Alumni Portal:', error);
            this.showError('Failed to initialize the application. Please refresh and try again.');
        }
    }

    /**
     * Hide the loading screen and show the app
     */
    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        const app = document.getElementById('app');
        
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }
        if (app) {
            app.style.display = 'block';
        }
    }

    /**
     * Set up all event listeners
     */
    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const section = e.target.dataset.section;
                this.navigateToSection(section);
            });
        });

        // Search functionality
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', this.debounce((e) => this.handleSearch(e), 300));
        }

        // Filter changes
        document.querySelectorAll('.filter-select').forEach(select => {
            select.addEventListener('change', () => this.handleFilterChange());
        });

        // Chat functionality
        const chatInput = document.getElementById('chat-input');
        const sendBtn = document.getElementById('send-btn');
        
        if (chatInput) {
            chatInput.addEventListener('input', () => this.handleChatInput());
            chatInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
        }
        
        if (sendBtn) {
            sendBtn.addEventListener('click', () => this.sendMessage());
        }

        // Settings button
        const settingsBtn = document.getElementById('settings-btn');
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => {
                alert('Settings functionality coming soon!');
            });
        }
    }

    /**
     * Load initial data for the portal
     */
    async loadInitialData() {
        try {
            // Load sample alumni data
            this.alumniData = await this.loadAlumniData();
            
            // Populate filters
            this.populateFilters();
            
            // Load activity feed
            this.loadActivityFeed();
            
        } catch (error) {
            console.error('Error loading initial data:', error);
        }
    }

    /**
     * Load alumni data (mock data for demo)
     */
    async loadAlumniData() {
        // In a real application, this would fetch from an API
        return [
            {
                id: 1,
                name: 'Sarah Johnson',
                class: '2018',
                company: 'Google',
                position: 'Software Engineer',
                industry: 'Technology',
                location: 'San Francisco, CA',
                email: 'sarah.johnson@example.com',
                linkedin: 'linkedin.com/in/sarahjohnson',
                initials: 'SJ'
            },
            {
                id: 2,
                name: 'Michael Chen',
                class: '2016',
                company: 'McKinsey & Company',
                position: 'Senior Consultant',
                industry: 'Consulting',
                location: 'New York, NY',
                email: 'michael.chen@example.com',
                linkedin: 'linkedin.com/in/michaelchen',
                initials: 'MC'
            },
            {
                id: 3,
                name: 'Emily Rodriguez',
                class: '2019',
                company: 'Doctors Without Borders',
                position: 'Program Manager',
                industry: 'Non-profit',
                location: 'Geneva, Switzerland',
                email: 'emily.rodriguez@example.com',
                linkedin: 'linkedin.com/in/emilyrodriguez',
                initials: 'ER'
            },
            {
                id: 4,
                name: 'David Kim',
                class: '2015',
                company: 'Goldman Sachs',
                position: 'Vice President',
                industry: 'Finance',
                location: 'London, UK',
                email: 'david.kim@example.com',
                linkedin: 'linkedin.com/in/davidkim',
                initials: 'DK'
            },
            {
                id: 5,
                name: 'Lisa Wang',
                class: '2020',
                company: 'Tesla',
                position: 'Design Engineer',
                industry: 'Automotive',
                location: 'Austin, TX',
                email: 'lisa.wang@example.com',
                linkedin: 'linkedin.com/in/lisawang',
                initials: 'LW'
            }
        ];
    }

    /**
     * Navigate to a specific section
     */
    navigateToSection(section) {
        // Update navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-section="${section}"]`).classList.add('active');

        // Update content sections
        document.querySelectorAll('.content-section').forEach(sec => {
            sec.classList.remove('active');
        });
        document.getElementById(`${section}-section`).classList.add('active');

        this.currentSection = section;

        // Load section-specific data
        if (section === 'directory') {
            this.renderAlumniDirectory();
        } else if (section === 'ai-assistant') {
            this.focusChatInput();
        }
    }

    /**
     * Handle search input
     */
    handleSearch(event) {
        const query = event.target.value.toLowerCase().trim();
        this.filterAlumni({ search: query });
    }

    /**
     * Handle filter changes
     */
    handleFilterChange() {
        const classFilter = document.getElementById('class-filter').value;
        const industryFilter = document.getElementById('industry-filter').value;
        const locationFilter = document.getElementById('location-filter').value;
        const searchQuery = document.getElementById('search-input').value.toLowerCase().trim();

        this.filterAlumni({
            search: searchQuery,
            class: classFilter,
            industry: industryFilter,
            location: locationFilter
        });
    }

    /**
     * Filter alumni based on criteria
     */
    filterAlumni(filters) {
        let filtered = [...this.alumniData];

        if (filters.search) {
            filtered = filtered.filter(alumni => 
                alumni.name.toLowerCase().includes(filters.search) ||
                alumni.company.toLowerCase().includes(filters.search) ||
                alumni.position.toLowerCase().includes(filters.search) ||
                alumni.industry.toLowerCase().includes(filters.search)
            );
        }

        if (filters.class) {
            filtered = filtered.filter(alumni => alumni.class === filters.class);
        }

        if (filters.industry) {
            filtered = filtered.filter(alumni => alumni.industry === filters.industry);
        }

        if (filters.location) {
            filtered = filtered.filter(alumni => 
                alumni.location.toLowerCase().includes(filters.location.toLowerCase())
            );
        }

        this.renderAlumniDirectory(filtered);
    }

    /**
     * Populate filter dropdowns
     */
    populateFilters() {
        const classes = [...new Set(this.alumniData.map(a => a.class))].sort();
        const industries = [...new Set(this.alumniData.map(a => a.industry))].sort();
        const locations = [...new Set(this.alumniData.map(a => a.location))].sort();

        this.populateSelect('class-filter', classes);
        this.populateSelect('industry-filter', industries);
        this.populateSelect('location-filter', locations);
    }

    /**
     * Populate a select element with options
     */
    populateSelect(selectId, options) {
        const select = document.getElementById(selectId);
        if (!select) return;

        // Keep the default "All" option
        const defaultOption = select.querySelector('option[value=""]');
        select.innerHTML = '';
        if (defaultOption) {
            select.appendChild(defaultOption);
        }

        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = option;
            select.appendChild(optionElement);
        });
    }

    /**
     * Render the alumni directory
     */
    renderAlumniDirectory(alumni = null) {
        const container = document.getElementById('directory-results');
        if (!container) return;

        const dataToRender = alumni || this.alumniData;
        
        if (dataToRender.length === 0) {
            container.innerHTML = '<div class="no-results">No alumni found matching your criteria.</div>';
            return;
        }

        container.innerHTML = dataToRender.map(alumni => `
            <div class="alumni-card" data-id="${alumni.id}">
                <div class="alumni-avatar">
                    <span>${alumni.initials}</span>
                </div>
                <div class="alumni-info">
                    <h3>${alumni.name}</h3>
                    <p class="alumni-position">${alumni.position}</p>
                    <p class="alumni-company">${alumni.company}</p>
                    <div class="alumni-meta">
                        <span class="alumni-class">Class of ${alumni.class}</span>
                        <span class="alumni-location">${alumni.location}</span>
                    </div>
                    <div class="alumni-tags">
                        <span class="tag">${alumni.industry}</span>
                    </div>
                </div>
                <div class="alumni-actions">
                    <button class="btn-secondary btn-sm" onclick="AlumniPortal.connectWithAlumni(${alumni.id})">
                        Connect
                    </button>
                    <button class="btn-link btn-sm" onclick="AlumniPortal.viewAlumniProfile(${alumni.id})">
                        View Profile
                    </button>
                </div>
            </div>
        `).join('');
    }

    /**
     * Connect with an alumni
     */
    connectWithAlumni(alumniId) {
        const alumni = this.alumniData.find(a => a.id === alumniId);
        if (alumni) {
            alert(`Connection request sent to ${alumni.name}!`);
        }
    }

    /**
     * View alumni profile
     */
    viewAlumniProfile(alumniId) {
        const alumni = this.alumniData.find(a => a.id === alumniId);
        if (alumni) {
            alert(`Viewing profile for ${alumni.name}\n\nPosition: ${alumni.position}\nCompany: ${alumni.company}\nLocation: ${alumni.location}\nEmail: ${alumni.email}`);
        }
    }

    /**
     * Load activity feed
     */
    loadActivityFeed() {
        const feed = document.getElementById('activity-feed');
        if (!feed) return;

        const activities = [
            { type: 'connection', text: 'Sarah Johnson accepted your connection request', time: '2 hours ago' },
            { type: 'event', text: 'New networking event: Tech Alumni Meetup', time: '1 day ago' },
            { type: 'update', text: 'Michael Chen updated his profile', time: '2 days ago' },
            { type: 'message', text: 'You have 3 new messages', time: '3 days ago' }
        ];

        feed.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon ${activity.type}"></div>
                <div class="activity-content">
                    <p>${activity.text}</p>
                    <span class="activity-time">${activity.time}</span>
                </div>
            </div>
        `).join('');
    }

    /**
     * Update dashboard statistics
     */
    updateDashboard() {
        const connectionsCount = document.getElementById('connections-count');
        const eventsCount = document.getElementById('events-count');

        if (connectionsCount) {
            connectionsCount.textContent = this.alumniData.length.toString();
        }
        if (eventsCount) {
            eventsCount.textContent = '3'; // Mock data
        }
    }

    /**
     * Update profile information
     */
    updateProfile() {
        document.getElementById('user-initials').textContent = this.user.initials;
        document.getElementById('profile-initials').textContent = this.user.initials;
        document.getElementById('profile-name').textContent = this.user.name;
        document.getElementById('profile-class').textContent = `Class of ${this.user.class}`;
    }

    /**
     * Handle chat input changes
     */
    handleChatInput() {
        const input = document.getElementById('chat-input');
        const sendBtn = document.getElementById('send-btn');
        
        if (input && sendBtn) {
            const hasText = input.value.trim().length > 0;
            sendBtn.disabled = !hasText || this.isLoading;
        }
    }

    /**
     * Send a message to the AI assistant
     */
    async sendMessage() {
        const input = document.getElementById('chat-input');
        if (!input || this.isLoading) return;

        const message = input.value.trim();
        if (!message) return;

        this.isLoading = true;
        this.updateSendButton();

        try {
            // Add user message to chat
            this.addMessageToChat(message, 'user');
            
            // Clear input
            input.value = '';
            this.handleChatInput();

            // Show typing indicator
            this.showTypingIndicator();

            // Send to AI API
            const response = await this.callAI(message);
            
            // Remove typing indicator
            this.hideTypingIndicator();
            
            // Add AI response to chat
            this.addMessageToChat(response, 'ai');

        } catch (error) {
            console.error('Error sending message:', error);
            this.hideTypingIndicator();
            this.addMessageToChat('Sorry, I encountered an error processing your request. Please try again.', 'ai', true);
        } finally {
            this.isLoading = false;
            this.updateSendButton();
            this.focusChatInput();
        }
    }

    /**
     * Send a suggested message
     */
    sendSuggestion(message) {
        const input = document.getElementById('chat-input');
        if (input) {
            input.value = message;
            this.handleChatInput();
            this.sendMessage();
        }
    }

    /**
     * Call the AI API
     */
    async callAI(message) {
        try {
            const response = await fetch(CONFIG.API_URL, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: message })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.response || data.message || 'I received your message but couldn\'t generate a proper response.';

        } catch (error) {
            console.error('AI API call failed:', error);
            throw new Error('Failed to get response from AI assistant');
        }
    }

    /**
     * Add a message to the chat
     */
    addMessageToChat(message, sender, isError = false) {
        const chatMessages = document.getElementById('chat-messages');
        if (!chatMessages) return;

        const messageElement = document.createElement('div');
        messageElement.className = `message ${sender}-message${isError ? ' error-message' : ''}`;
        
        const avatar = sender === 'user' ? this.user.initials : '🤖';
        const avatarClass = sender === 'user' ? 'user-avatar' : 'ai-avatar';

        messageElement.innerHTML = `
            <div class="message-avatar ${avatarClass}">${avatar}</div>
            <div class="message-content">
                <p>${this.formatMessage(message)}</p>
                <span class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            </div>
        `;

        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Store in chat history
        this.chatHistory.push({ message, sender, timestamp: new Date() });
    }

    /**
     * Format message text (basic markdown-like formatting)
     */
    formatMessage(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');
    }

    /**
     * Show typing indicator
     */
    showTypingIndicator() {
        const chatMessages = document.getElementById('chat-messages');
        if (!chatMessages) return;

        const typingElement = document.createElement('div');
        typingElement.id = 'typing-indicator';
        typingElement.className = 'message ai-message typing';
        typingElement.innerHTML = `
            <div class="message-avatar ai-avatar">🤖</div>
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;

        chatMessages.appendChild(typingElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    /**
     * Hide typing indicator
     */
    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    /**
     * Update send button state
     */
    updateSendButton() {
        const sendBtn = document.getElementById('send-btn');
        if (sendBtn) {
            sendBtn.disabled = this.isLoading;
            if (this.isLoading) {
                sendBtn.innerHTML = '<div class="loading-spinner-small"></div>';
            } else {
                sendBtn.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22,2 15,22 11,13 2,9"></polygon>
                    </svg>
                `;
            }
        }
    }

    /**
     * Focus chat input
     */
    focusChatInput() {
        setTimeout(() => {
            const input = document.getElementById('chat-input');
            if (input) {
                input.focus();
            }
        }, 100);
    }

    /**
     * Show AI Assistant section
     */
    showAIAssistant() {
        this.navigateToSection('ai-assistant');
    }

    /**
     * Show error modal
     */
    showError(message) {
        const modal = document.getElementById('error-modal');
        const messageElement = document.getElementById('error-message');
        
        if (modal && messageElement) {
            messageElement.textContent = message;
            modal.style.display = 'flex';
        }
    }

    /**
     * Hide error modal
     */
    hideError() {
        const modal = document.getElementById('error-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    /**
     * Utility: Debounce function
     */
    debounce(func, wait) {
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
}

// Create global instance safely
try {
    window.AlumniPortal = new AlumniPortal();
    console.log('✅ AlumniPortal instance created successfully');
} catch (error) {
    console.error('❌ Failed to create AlumniPortal instance:', error);
    window.AlumniPortal = {
        init: function() {
            console.error('AlumniPortal failed to initialize properly');
            alert('There was an error loading the portal. Please refresh the page.');
        }
    };
}

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AlumniPortal;
}
