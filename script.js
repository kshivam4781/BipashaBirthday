// Date and Time Configuration
const BIRTHDAY_DATE = new Date(); // Set this to Bipasha's actual birthday
BIRTHDAY_DATE.setMonth(11); // December (0-indexed, so 11 = December)
BIRTHDAY_DATE.setDate(25); // Change to actual birthday date
BIRTHDAY_DATE.setHours(0, 0, 0, 0);

// Smooth scrolling for better UX
document.addEventListener('DOMContentLoaded', function() {
    initializeTimeFeatures();
    initializeSecretSpace();
    initializeScrollAnimations();
    initializeInteractiveEffects();
});

// Initialize date and time based features
function initializeTimeFeatures() {
    updateTimeGreeting();
    updateCurrentTime();
    updateFooterDateTime();
    applyTimeBasedTheme();
    updateBirthdayMessage();
    
    // Update time every minute
    setInterval(() => {
        updateCurrentTime();
        updateFooterDateTime();
        updateTimeGreeting();
        applyTimeBasedTheme();
    }, 60000);
    
    // Update time display every second
    setInterval(() => {
        updateCurrentTime();
        updateFooterDateTime();
    }, 1000);
}

// Update greeting based on time of day
function updateTimeGreeting() {
    const now = new Date();
    const hour = now.getHours();
    const greetingElement = document.getElementById('time-greeting');
    
    let greeting = 'A Special Day for a Special Person';
    
    if (hour >= 5 && hour < 12) {
        greeting = 'Good Morning, Beautiful! ☀️';
    } else if (hour >= 12 && hour < 17) {
        greeting = 'Good Afternoon, My Love! 🌤️';
    } else if (hour >= 17 && hour < 21) {
        greeting = 'Good Evening, Sweetheart! 🌅';
    } else {
        greeting = 'Good Night, Beautiful! 🌙';
    }
    
    if (greetingElement) {
        greetingElement.textContent = greeting;
    }
}

// Update current time display
function updateCurrentTime() {
    const now = new Date();
    const timeElement = document.getElementById('current-time');
    
    if (timeElement) {
        const timeString = now.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            second: '2-digit',
            hour12: true 
        });
        const dateString = now.toLocaleDateString('en-US', { 
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        timeElement.textContent = `${dateString} • ${timeString}`;
    }
}

// Update footer date and time
function updateFooterDateTime() {
    const now = new Date();
    const footerTime = document.getElementById('footer-time');
    
    if (footerTime) {
        const timeString = now.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
        footerTime.textContent = `Current Time: ${timeString}`;
    }
}

// Apply theme based on time of day
function applyTimeBasedTheme() {
    const now = new Date();
    const hour = now.getHours();
    const hero = document.querySelector('.hero');
    
    if (!hero) return;
    
    // Remove existing theme classes
    hero.classList.remove('morning-theme', 'afternoon-theme', 'evening-theme', 'night-theme');
    
    if (hour >= 5 && hour < 12) {
        hero.classList.add('morning-theme');
    } else if (hour >= 12 && hour < 17) {
        hero.classList.add('afternoon-theme');
    } else if (hour >= 17 && hour < 21) {
        hero.classList.add('evening-theme');
    } else {
        hero.classList.add('night-theme');
    }
}

// Update birthday message based on date
function updateBirthdayMessage() {
    const now = new Date();
    const birthdayWish = document.querySelector('.birthday-wish');
    
    if (!birthdayWish) return;
    
    const daysUntilBirthday = getDaysUntilBirthday();
    
    if (daysUntilBirthday === 0) {
        birthdayWish.textContent = '🎂 Today is Your Special Day! 🎂';
    } else if (daysUntilBirthday === 1) {
        birthdayWish.textContent = '🎉 Your Birthday is Tomorrow! 🎉';
    } else if (daysUntilBirthday > 0 && daysUntilBirthday <= 7) {
        birthdayWish.textContent = `🎈 Only ${daysUntilBirthday} days until your birthday! 🎈`;
    } else if (daysUntilBirthday < 0) {
        const daysSince = Math.abs(daysUntilBirthday);
        if (daysSince <= 7) {
            birthdayWish.textContent = `🎊 Your birthday was ${daysSince} day${daysSince > 1 ? 's' : ''} ago! Still celebrating! 🎊`;
        } else {
            birthdayWish.textContent = 'Today is Your Special Day! 🎂';
        }
    } else {
        birthdayWish.textContent = 'Today is Your Special Day! 🎂';
    }
}

// Calculate days until birthday
function getDaysUntilBirthday() {
    const now = new Date();
    const currentYear = now.getFullYear();
    
    // Create birthday date for this year
    const thisYearBirthday = new Date(BIRTHDAY_DATE);
    thisYearBirthday.setFullYear(currentYear);
    
    // If birthday has passed this year, calculate for next year
    if (thisYearBirthday < now) {
        thisYearBirthday.setFullYear(currentYear + 1);
    }
    
    const diffTime = thisYearBirthday - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
}

// Initialize secret space
function initializeSecretSpace() {
    // Create hidden trigger element
    const trigger = document.createElement('div');
    trigger.className = 'secret-trigger';
    trigger.title = 'Secret Space';
    document.body.appendChild(trigger);
    
    // Secret access methods
    let clickCount = 0;
    let lastClickTime = 0;
    const secretCode = 'BIPASHA'; // Secret code
    let typedCode = '';
    
    // Method 1: Click trigger 5 times quickly
    trigger.addEventListener('click', function() {
        const now = Date.now();
        if (now - lastClickTime < 2000) {
            clickCount++;
        } else {
            clickCount = 1;
        }
        lastClickTime = now;
        
        if (clickCount >= 5) {
            toggleSecretSpace();
            clickCount = 0;
        }
    });
    
    // Method 2: Type secret code
    document.addEventListener('keydown', function(e) {
        typedCode += e.key.toUpperCase();
        if (typedCode.length > secretCode.length) {
            typedCode = typedCode.slice(-secretCode.length);
        }
        
        if (typedCode === secretCode) {
            toggleSecretSpace();
            typedCode = '';
        }
    });
    
    // Method 3: Triple click on footer
    const footer = document.querySelector('.footer');
    if (footer) {
        let footerClicks = 0;
        footer.addEventListener('click', function() {
            footerClicks++;
            setTimeout(() => {
                if (footerClicks >= 3) {
                    toggleSecretSpace();
                }
                footerClicks = 0;
            }, 1000);
        });
    }
    
    // Update secret space content based on date/time
    updateSecretSpaceContent();
    setInterval(updateSecretSpaceContent, 60000);
}

// Toggle secret space visibility
function toggleSecretSpace() {
    const secretSection = document.getElementById('secret-section');
    if (secretSection) {
        secretSection.classList.toggle('active');
        
        if (secretSection.classList.contains('active')) {
            // Scroll to secret section
            secretSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            updateSecretSpaceContent();
        }
    }
}

// Update secret space content based on date/time
function updateSecretSpaceContent() {
    const now = new Date();
    const secretDateMessage = document.getElementById('secret-date-message');
    
    if (secretDateMessage) {
        const hour = now.getHours();
        const dayOfWeek = now.toLocaleDateString('en-US', { weekday: 'long' });
        const dateStr = now.toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
        });
        
        let timeMessage = '';
        if (hour >= 5 && hour < 12) {
            timeMessage = 'A beautiful morning to think about you!';
        } else if (hour >= 12 && hour < 17) {
            timeMessage = 'Hope your afternoon is as bright as your smile!';
        } else if (hour >= 17 && hour < 21) {
            timeMessage = 'Evening thoughts are all about you!';
        } else {
            timeMessage = 'Dreaming of you this night!';
        }
        
        secretDateMessage.textContent = `Today is ${dayOfWeek}, ${dateStr}. ${timeMessage}`;
    }
}

// Initialize scroll animations
function initializeScrollAnimations() {
    // Add smooth scroll behavior
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }
    
    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Initialize interactive effects
function initializeInteractiveEffects() {
    // Add interactive hover effects
    const qualityItems = document.querySelectorAll('.quality-item');
    qualityItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add celebration animation on load
    setTimeout(() => {
        const celebrationItems = document.querySelectorAll('.celebration-item');
        celebrationItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.animation = 'bounce 0.6s ease';
            }, index * 100);
        });
    }, 500);
}

// Optional: API Functions (only works with Netlify/Vercel serverless functions)
// Uncomment and modify if you want to use APIs

/*
// Example: Fetch data from serverless function
async function fetchFromAPI(endpoint) {
    try {
        // If using Netlify, functions are at /.netlify/functions/function-name
        // If using Vercel, functions are at /api/function-name
        const response = await fetch(`/.netlify/functions/${endpoint}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API call failed:', error);
        return null;
    }
}

// Example: Get weather (requires serverless function)
async function getWeather(city) {
    const data = await fetchFromAPI('weather');
    if (data) {
        // Display weather in secret section or elsewhere
        console.log('Weather:', data);
    }
}

// Example: Get special message (requires serverless function)
async function getSpecialMessage() {
    const data = await fetchFromAPI('special-message');
    if (data && data.message) {
        // Display message somewhere on the page
        const secretMessage = document.getElementById('secret-date-message');
        if (secretMessage) {
            secretMessage.textContent += ` ${data.message}`;
        }
    }
}

// Uncomment to use API features:
// getSpecialMessage();
*/
