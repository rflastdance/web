// DOM Elements
const header = document.querySelector('.header');
const navLinks = document.querySelectorAll('.nav-link');
const raceCards = document.querySelectorAll('.race-card');
const featureCards = document.querySelectorAll('.feature-card');
const statNumbers = document.querySelectorAll('.stat-number');
const downloadButtons = document.querySelectorAll('.download-btn');

// Global variables
let isScrolling = false;
let lastScrollTop = 0;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    initializeSmoothScrolling();
    initializeHeaderEffects();
    initializeAnimations();
    initializeParticleEffect();
    initializeCounterAnimations();
    initializeRaceCardEffects();
});

// Initialize all event listeners
function initializeEventListeners() {
    // Navigation events
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
        link.addEventListener('mouseenter', handleNavHover);
    });
    
    // Race card interactions
    raceCards.forEach(card => {
        card.addEventListener('mouseenter', handleRaceCardHover);
        card.addEventListener('mouseleave', handleRaceCardLeave);
        card.addEventListener('click', handleRaceCardClick);
    });
    
    // Feature card interactions
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', handleFeatureCardHover);
    });
    
    // Download button interactions
    downloadButtons.forEach(button => {
        button.addEventListener('click', handleDownloadClick);
    });
    
    // Scroll events
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    // Keyboard events for gaming feel
    document.addEventListener('keydown', handleKeyPress);
}

// Smooth scrolling for navigation
function initializeSmoothScrolling() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Add active state
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });
}

// Header scroll effects
function initializeHeaderEffects() {
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
            header.style.webkitBackdropFilter = 'blur(20px)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
            header.style.webkitBackdropFilter = 'blur(10px)';
            header.style.backdropFilter = 'blur(10px)';
        }
        
        // Hide/show header on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Initialize animations
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special handling for stat counters
                if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.race-card, .feature-card, .stat-card, .improvement-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Particle effect for hero section
function initializeParticleEffect() {
    const heroSection = document.querySelector('.hero');
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    heroSection.appendChild(particleContainer);
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        createParticle(particleContainer);
    }
}

// Create individual particle
function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 3 + 1;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, rgba(255, 107, 53, 0.8) 0%, transparent 70%);
        border-radius: 50%;
        left: ${x}%;
        top: ${y}%;
        animation: float ${duration}s ${delay}s infinite linear;
    `;
    
    container.appendChild(particle);
    
    // Remove and recreate particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
            createParticle(container);
        }
    }, (duration + delay) * 1000);
}

// Counter animations for stats
function initializeCounterAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
        }
        
        .animate-in {
            animation: slideInUp 0.8s ease-out forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .race-card.animate-in {
            animation: raceCardIn 1s ease-out forwards;
        }
        
        @keyframes raceCardIn {
            from {
                opacity: 0;
                transform: translateY(30px) scale(0.9);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
    `;
    document.head.appendChild(style);
}

// Animate counter numbers
function animateCounter(element) {
    const target = element.textContent;
    const numericValue = parseInt(target.replace(/[^\d]/g, ''));
    const suffix = target.replace(/[\d,]/g, '');
    
    if (isNaN(numericValue)) return;
    
    let current = 0;
    const increment = numericValue / 60; // 60 frames for smooth animation
    const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
            current = numericValue;
            clearInterval(timer);
        }
        
        const displayValue = Math.floor(current);
        element.textContent = displayValue.toLocaleString() + suffix;
    }, 16); // ~60fps
}

// Race card effects
function initializeRaceCardEffects() {
    raceCards.forEach(card => {
        // Add glow effect on hover
        card.addEventListener('mouseenter', function() {
            const race = this.classList.contains('bellato') ? 'bellato' : 
                        this.classList.contains('cora') ? 'cora' : 'accretia';
            
            this.style.transform = 'translateY(-15px) scale(1.02)';
            
            // Add sound effect simulation
            playHoverSound();
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Event Handlers
function handleNavClick(e) {
    // Add click effect
    const link = e.target;
    link.style.transform = 'scale(0.95)';
    setTimeout(() => {
        link.style.transform = 'scale(1)';
    }, 150);
    
    playClickSound();
}

function handleNavHover(e) {
    const link = e.target;
    link.style.textShadow = '0 0 10px rgba(255, 107, 53, 0.8)';
    
    setTimeout(() => {
        link.style.textShadow = '';
    }, 300);
}

function handleRaceCardHover(e) {
    const card = e.target.closest('.race-card');
    if (!card) return;
    
    // Add dynamic glow based on race
    const race = card.classList.contains('bellato') ? 'orange' : 
                card.classList.contains('cora') ? 'blue' : 'yellow';
    
    const glowColor = race === 'orange' ? 'rgba(255, 107, 53, 0.4)' :
                     race === 'blue' ? 'rgba(0, 212, 255, 0.4)' :
                     'rgba(255, 215, 0, 0.4)';
    
    card.style.boxShadow = `0 20px 40px ${glowColor}`;
}

function handleRaceCardLeave(e) {
    const card = e.target.closest('.race-card');
    if (!card) return;
    
    card.style.boxShadow = '';
}

function handleRaceCardClick(e) {
    const card = e.target.closest('.race-card');
    if (!card) return;
    
    // Show race selection modal (simulated)
    showRaceModal(card);
    playClickSound();
}

function handleFeatureCardHover(e) {
    const card = e.target.closest('.feature-card');
    if (!card) return;
    
    // Add pulse effect
    card.style.animation = 'pulse 0.6s ease-in-out';
    setTimeout(() => {
        card.style.animation = '';
    }, 600);
}

function handleDownloadClick(e) {
    e.preventDefault();
    const button = e.target.closest('.download-btn');
    if (!button) return;
    
    // Simulate download process
    simulateDownload(button);
    playClickSound();
}

function handleScroll() {
    if (!isScrolling) {
        window.requestAnimationFrame(updateScrollEffects);
        isScrolling = true;
    }
}

function handleResize() {
    // Recalculate particle positions on resize
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
    });
}

function handleKeyPress(e) {
    // Easter egg: Konami code or special key combinations
    if (e.code === 'KeyG' && e.ctrlKey) {
        e.preventDefault();
        activateGodMode();
    }
    
    // ESC key to close modals
    if (e.code === 'Escape') {
        closeAllModals();
    }
}

// Utility Functions
function updateScrollEffects() {
    // Add parallax effect to hero background
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    isScrolling = false;
}

function showRaceModal(card) {
    const raceName = card.querySelector('h3').textContent;
    const raceDescription = card.querySelector('p').textContent;
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'race-modal';
    modal.style.cssText = `
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
        -webkit-backdrop-filter: blur(10px);
        backdrop-filter: blur(10px);
    `;
    
    modal.innerHTML = `
        <div class="modal-content" style="
            background: linear-gradient(135deg, var(--secondary-dark) 0%, var(--accent-dark) 100%);
            padding: 3rem;
            border-radius: 15px;
            border: 2px solid var(--highlight-orange);
            max-width: 500px;
            text-align: center;
            box-shadow: 0 0 50px rgba(255, 107, 53, 0.5);
        ">
            <h2 style="color: var(--highlight-orange); margin-bottom: 1rem; font-family: var(--font-heading);">${raceName}</h2>
            <p style="color: var(--text-light); margin-bottom: 2rem; line-height: 1.6;">${raceDescription}</p>
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button class="select-race-btn" style="
                    background: linear-gradient(45deg, var(--highlight-orange), var(--warning-color));
                    color: white;
                    border: none;
                    padding: 1rem 2rem;
                    border-radius: 8px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s ease;
                ">SELECT RACE</button>
                <button class="close-modal-btn" style="
                    background: transparent;
                    color: var(--text-light);
                    border: 2px solid var(--text-light);
                    padding: 1rem 2rem;
                    border-radius: 8px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s ease;
                ">CLOSE</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listeners
    modal.querySelector('.close-modal-btn').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.querySelector('.select-race-btn').addEventListener('click', () => {
        showNotification(`${raceName} selected! Ready for battle!`, 'success');
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function simulateDownload(button) {
    const originalContent = button.innerHTML;
    const downloadType = button.querySelector('.btn-title').textContent;
    
    // Show progress
    button.innerHTML = `
        <i class="fas fa-spinner fa-spin"></i>
        <div class="btn-content">
            <span class="btn-title">DOWNLOADING...</span>
            <span class="btn-subtitle">0%</span>
        </div>
    `;
    
    button.style.pointerEvents = 'none';
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            button.innerHTML = `
                <i class="fas fa-check"></i>
                <div class="btn-content">
                    <span class="btn-title">COMPLETED</span>
                    <span class="btn-subtitle">Ready to install</span>
                </div>
            `;
            
            setTimeout(() => {
                button.innerHTML = originalContent;
                button.style.pointerEvents = 'auto';
                showNotification(`${downloadType} download completed!`, 'success');
            }, 2000);
        } else {
            button.querySelector('.btn-subtitle').textContent = Math.round(progress) + '%';
        }
    }, 200);
}

function activateGodMode() {
    // Easter egg: Add special effects
    document.body.style.filter = 'hue-rotate(180deg)';
    showNotification('GOD MODE ACTIVATED!', 'warning');
    
    setTimeout(() => {
        document.body.style.filter = '';
    }, 5000);
}

function closeAllModals() {
    const modals = document.querySelectorAll('.race-modal, .notification');
    modals.forEach(modal => modal.remove());
}

function playHoverSound() {
    // Simulate sound effect with visual feedback
    const soundIndicator = document.createElement('div');
    soundIndicator.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(255, 107, 53, 0.8);
        color: white;
        padding: 0.5rem;
        border-radius: 4px;
        font-size: 0.8rem;
        z-index: 10000;
        pointer-events: none;
    `;
    soundIndicator.textContent = 'HOVER';
    document.body.appendChild(soundIndicator);
    
    setTimeout(() => soundIndicator.remove(), 500);
}

function playClickSound() {
    // Simulate sound effect with visual feedback
    const soundIndicator = document.createElement('div');
    soundIndicator.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0, 212, 255, 0.8);
        color: white;
        padding: 0.5rem;
        border-radius: 4px;
        font-size: 0.8rem;
        z-index: 10000;
        pointer-events: none;
    `;
    soundIndicator.textContent = 'CLICK';
    document.body.appendChild(soundIndicator);
    
    setTimeout(() => soundIndicator.remove(), 500);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    
    const colors = {
        success: 'rgba(0, 255, 136, 0.9)',
        warning: 'rgba(255, 149, 0, 0.9)',
        error: 'rgba(255, 51, 51, 0.9)',
        info: 'rgba(0, 212, 255, 0.9)'
    };
    
    const icons = {
        success: 'fa-check-circle',
        warning: 'fa-exclamation-triangle',
        error: 'fa-times-circle',
        info: 'fa-info-circle'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;
    
    notification.innerHTML = `
        <i class="fas ${icons[type] || icons.info}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Initialize server status checker (simulated)
function initializeServerStatus() {
    const statusIndicator = document.createElement('div');
    statusIndicator.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: rgba(0, 255, 136, 0.9);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 600;
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;
    
    statusIndicator.innerHTML = `
        <div style="width: 8px; height: 8px; background: #00ff88; border-radius: 50%; animation: pulse 2s infinite;"></div>
        SERVER ONLINE
    `;
    
    document.body.appendChild(statusIndicator);
}

// Initialize server status on load
setTimeout(initializeServerStatus, 2000);