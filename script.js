// Date and Time Configuration
const BIRTHDAY_DATE = new Date(); // Set this to Bipasha's actual birthday
BIRTHDAY_DATE.setFullYear(2026); // Year 2026
BIRTHDAY_DATE.setMonth(0); // January (0-indexed, so 0 = January)
BIRTHDAY_DATE.setDate(7); // 7th day
BIRTHDAY_DATE.setHours(0, 0, 0, 0);

// Cheesy lines array
const cheesyLines = [
    "Simple smile, my love is a star ✨",
    "Basic day, my heart is yours 💖",
    "Two words: You're amazing 🌟",
    "One look, my world is complete 💫",
    "Simple truth: You're perfect ⭐",
    "Basic fact: You're beautiful 🌸",
    "Two hearts, one love 💕",
    "One smile, infinite joy 😊",
    "Simple soda, my love is gorgeous 🥤",
    "Basic drink, my heart is yours 🍹",
    "Two dollars, my world is complete 💰",
    "One glance, my life is perfect 👀"
];

// Smooth scrolling for better UX
document.addEventListener('DOMContentLoaded', function() {
    initializeTimeFeatures();
    initializeSecretSpace();
    initializeScrollAnimations();
    initializeInteractiveEffects();
    initializeNavigation();
    initializeCheesyLines();
    initializeHeaderTimer();
    initializeWhiteboard();
    initializeHeroSlideshow();
    initializeBirthdayMessages();
    initializeCursorTrail();
    initializeTreeOnScroll();
});

// Initialize navigation smooth scrolling
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Only handle hash links (internal page anchors)
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerOffset = 70;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
            // For external links (like developers-note.html), let them work normally
            // Don't prevent default, so the browser will navigate normally
        });
    });
}

// Initialize whiteboard
function initializeWhiteboard() {
    const canvas = document.getElementById('whiteboard-canvas');
    const canvasWrapper = document.getElementById('canvas-wrapper');
    if (!canvas || !canvasWrapper) return;
    
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let isPanning = false;
    let panStartX = 0;
    let panStartY = 0;
    
    // Canvas dimensions - make it large
    const CANVAS_WIDTH = 2000;
    const CANVAS_HEIGHT = 1500;
    
    // Zoom and pan state
    let zoomLevel = 1;
    let panX = 0;
    let panY = 0;
    const MIN_ZOOM = 0.1;
    const MAX_ZOOM = 5;
    const ZOOM_STEP = 0.1;
    
    // Set canvas size
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    
    // Drawing state
    let currentColor = '#000000';
    let currentBrushSize = 5;
    
    // Get controls
    const brushSizeInput = document.getElementById('brush-size');
    const brushSizeValue = document.getElementById('brush-size-value');
    const brushColorInput = document.getElementById('brush-color');
    const clearBtn = document.getElementById('clear-btn');
    const saveBtn = document.getElementById('save-btn');
    const zoomInBtn = document.getElementById('zoom-in-btn');
    const zoomOutBtn = document.getElementById('zoom-out-btn');
    const resetZoomBtn = document.getElementById('reset-zoom-btn');
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const zoomLevelDisplay = document.getElementById('zoom-level');
    
    // Update zoom display
    function updateZoomDisplay() {
        if (zoomLevelDisplay) {
            zoomLevelDisplay.textContent = Math.round(zoomLevel * 100) + '%';
        }
    }
    
    // Apply zoom and pan transform
    function applyTransform() {
        canvasWrapper.style.transform = `translate(${panX}px, ${panY}px) scale(${zoomLevel})`;
        canvasWrapper.style.transformOrigin = 'top left';
    }
    
    // Zoom functions
    function zoomIn() {
        if (zoomLevel < MAX_ZOOM) {
            zoomLevel = Math.min(zoomLevel + ZOOM_STEP, MAX_ZOOM);
            applyTransform();
            updateZoomDisplay();
        }
    }
    
    function zoomOut() {
        if (zoomLevel > MIN_ZOOM) {
            zoomLevel = Math.max(zoomLevel - ZOOM_STEP, MIN_ZOOM);
            applyTransform();
            updateZoomDisplay();
        }
    }
    
    function resetZoom() {
        zoomLevel = 1;
        panX = 0;
        panY = 0;
        applyTransform();
        updateZoomDisplay();
    }
    
    // Zoom with mouse wheel
    canvasWrapper.addEventListener('wheel', (e) => {
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            const rect = canvasWrapper.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            const zoomBefore = zoomLevel;
            if (e.deltaY < 0) {
                zoomIn();
            } else {
                zoomOut();
            }
            
            // Adjust pan to zoom towards mouse position
            const zoomAfter = zoomLevel;
            const zoomChange = zoomAfter / zoomBefore;
            panX = mouseX - (mouseX - panX) * zoomChange;
            panY = mouseY - (mouseY - panY) * zoomChange;
            applyTransform();
        }
    });
    
    // Pan with middle mouse button or space + drag
    let isSpacePressed = false;
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && !e.repeat) {
            isSpacePressed = true;
            canvas.style.cursor = 'grab';
        }
    });
    
    document.addEventListener('keyup', (e) => {
        if (e.code === 'Space') {
            isSpacePressed = false;
            canvas.style.cursor = 'crosshair';
        }
    });
    
    // Fullscreen functionality
    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            canvasWrapper.requestFullscreen().catch(err => {
                console.error('Error attempting to enable fullscreen:', err);
            });
        } else {
            document.exitFullscreen();
        }
    }
    
    // Update fullscreen button on change
    document.addEventListener('fullscreenchange', () => {
        if (fullscreenBtn) {
            fullscreenBtn.textContent = document.fullscreenElement ? '⛶' : '⛶';
        }
    });
    
    // Button event listeners
    if (zoomInBtn) zoomInBtn.addEventListener('click', zoomIn);
    if (zoomOutBtn) zoomOutBtn.addEventListener('click', zoomOut);
    if (resetZoomBtn) resetZoomBtn.addEventListener('click', resetZoom);
    if (fullscreenBtn) fullscreenBtn.addEventListener('click', toggleFullscreen);
    
    // Update brush size display
    if (brushSizeInput && brushSizeValue) {
        brushSizeInput.addEventListener('input', function() {
            currentBrushSize = parseInt(this.value);
            brushSizeValue.textContent = currentBrushSize;
        });
    }
    
    // Update color
    if (brushColorInput) {
        brushColorInput.addEventListener('change', function() {
            currentColor = this.value;
        });
    }
    
    // Clear canvas
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to clear the whiteboard?')) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                saveWhiteboard();
            }
        });
    }
    
    // Save whiteboard
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            saveWhiteboard();
            const originalText = saveBtn.textContent;
            saveBtn.textContent = 'Saved!';
            saveBtn.style.background = '#4caf50';
            setTimeout(() => {
                saveBtn.textContent = originalText;
                saveBtn.style.background = '';
            }, 2000);
        });
    }
    
    // Get coordinates from event (accounting for zoom and pan)
    function getCoordinates(e) {
        // Use canvas element's bounding rect, which accounts for all transforms
        const canvasRect = canvas.getBoundingClientRect();
        
        let clientX, clientY;
        if (e.touches) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }
        
        // Get position relative to canvas (after all transforms)
        const relativeX = clientX - canvasRect.left;
        const relativeY = clientY - canvasRect.top;
        
        // Map the relative position to canvas pixel coordinates
        // canvas.width and canvas.height are the actual pixel dimensions (2000x1500)
        // canvasRect.width and canvasRect.height are the visual display size (after transforms)
        const canvasX = (relativeX / canvasRect.width) * canvas.width;
        const canvasY = (relativeY / canvasRect.height) * canvas.height;
        
        return { x: canvasX, y: canvasY };
    }
    
    // Start drawing or panning
    function startDrawing(e) {
        if (isSpacePressed || e.button === 1) {
            // Middle mouse button or space = pan
            isPanning = true;
            panStartX = e.clientX - panX;
            panStartY = e.clientY - panY;
            canvas.style.cursor = 'grabbing';
            return;
        }
        
        if (e.button === 0 || e.touches) {
            // Left mouse button or touch = draw
            isDrawing = true;
            const coords = getCoordinates(e);
            lastX = coords.x;
            lastY = coords.y;
        }
    }
    
    // Draw or pan
    function draw(e) {
        if (isPanning) {
            e.preventDefault();
            panX = e.clientX - panStartX;
            panY = e.clientY - panStartY;
            applyTransform();
            return;
        }
        
        if (!isDrawing) return;
        
        e.preventDefault();
        const coords = getCoordinates(e);
        
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(coords.x, coords.y);
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = currentBrushSize / zoomLevel; // Adjust brush size with zoom
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
        
        lastX = coords.x;
        lastY = coords.y;
    }
    
    // Stop drawing or panning
    function stopDrawing(e) {
        if (isPanning) {
            isPanning = false;
            canvas.style.cursor = isSpacePressed ? 'grab' : 'crosshair';
        }
        
        if (isDrawing) {
            isDrawing = false;
            debounceSave();
        }
    }
    
    // Debounce save function
    let saveTimeout;
    function debounceSave() {
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(() => {
            saveWhiteboard();
        }, 1000);
    }
    
    // Mouse events
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    canvas.addEventListener('contextmenu', (e) => e.preventDefault()); // Prevent right-click menu
    
    // Touch events
    let touchStartDistance = 0;
    let touchStartZoom = 1;
    let touchStartPanX = 0;
    let touchStartPanY = 0;
    let touchStartX = 0;
    let touchStartY = 0;
    
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (e.touches.length === 2) {
            // Pinch to zoom
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            touchStartDistance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
            touchStartZoom = zoomLevel;
            touchStartPanX = panX;
            touchStartPanY = panY;
        } else if (e.touches.length === 1) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            startDrawing(e);
        }
    });
    
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        if (e.touches.length === 2) {
            // Pinch to zoom
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            const distance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
            const scale = distance / touchStartDistance;
            zoomLevel = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, touchStartZoom * scale));
            updateZoomDisplay();
            applyTransform();
        } else if (e.touches.length === 1 && !isDrawing) {
            // Pan with one finger (when not drawing)
            const touch = e.touches[0];
            panX = touchStartPanX + (touch.clientX - touchStartX);
            panY = touchStartPanY + (touch.clientY - touchStartY);
            applyTransform();
        } else {
            draw(e);
        }
    });
    
    canvas.addEventListener('touchend', (e) => {
        e.preventDefault();
        stopDrawing(e);
    });
    
    // Save whiteboard to server
    function saveWhiteboard() {
        const imageData = canvas.toDataURL('image/png');
        
        fetch('/api/whiteboard/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ imageData: imageData })
        }).catch(error => {
            console.error('Error saving whiteboard:', error);
        });
    }
    
    // Load whiteboard from server
    function loadWhiteboard(force = false) {
        // Don't load if user is currently drawing unless forced
        if (!force && (isDrawing || isPanning)) {
            return;
        }
        
        fetch('/api/whiteboard/load')
            .then(response => response.json())
            .then(data => {
                if (data.success && data.imageData) {
                    const img = new Image();
                    img.onload = function() {
                        // Only clear and reload if not currently drawing
                        if (!isDrawing && !isPanning) {
                            ctx.clearRect(0, 0, canvas.width, canvas.height);
                            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                        }
                    };
                    img.src = data.imageData;
                }
            })
            .catch(error => {
                console.error('Error loading whiteboard:', error);
            });
    }
    
    // Initialize
    applyTransform();
    updateZoomDisplay();
    loadWhiteboard(true); // Force initial load
    
    // Auto-refresh whiteboard every 5 seconds (only when not drawing)
    setInterval(() => {
        if (!isDrawing && !isPanning) {
            loadWhiteboard();
        }
    }, 5000);
}

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
        greeting = 'Good Morning, Beautiful!';
    } else if (hour >= 12 && hour < 17) {
        greeting = 'Good Afternoon, My Love!';
    } else if (hour >= 17 && hour < 21) {
        greeting = 'Good Evening, Sweetheart!';
    } else {
        greeting = 'Good Night, Beautiful!';
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
        birthdayWish.textContent = 'Today is Your Special Day!';
    } else if (daysUntilBirthday === 1) {
        birthdayWish.textContent = 'Your Birthday is Tomorrow!';
    } else if (daysUntilBirthday > 0 && daysUntilBirthday <= 7) {
        birthdayWish.textContent = `Only ${daysUntilBirthday} days until your birthday!`;
    } else if (daysUntilBirthday < 0) {
        const daysSince = Math.abs(daysUntilBirthday);
        if (daysSince <= 7) {
            birthdayWish.textContent = `Your birthday was ${daysSince} day${daysSince > 1 ? 's' : ''} ago! Still celebrating!`;
        } else {
            birthdayWish.textContent = 'Today is Your Special Day!';
        }
    } else {
        birthdayWish.textContent = 'Today is Your Special Day!';
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

// Initialize rotating cheesy lines
function initializeCheesyLines() {
    const cheesyLineElement = document.getElementById('cheesy-line');
    if (!cheesyLineElement) return;
    
    let currentIndex = 0;
    
    // Function to change cheesy line with fade effect
    function changeCheesyLine() {
        if (!cheesyLineElement) return;
        
        // Fade out
        cheesyLineElement.style.opacity = '0';
        cheesyLineElement.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            // Change text
            currentIndex = (currentIndex + 1) % cheesyLines.length;
            cheesyLineElement.textContent = cheesyLines[currentIndex];
            
            // Fade in
            cheesyLineElement.style.opacity = '1';
            cheesyLineElement.style.transform = 'translateY(0)';
        }, 500);
    }
    
    // Change cheesy line every 4 seconds
    setInterval(changeCheesyLine, 4000);
    
    // Initial fade in
    setTimeout(() => {
        cheesyLineElement.style.opacity = '1';
    }, 2000);
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


// Initialize header timer
function initializeHeaderTimer() {
    const timerElement = document.getElementById('header-timer');
    if (!timerElement) return;
    
    const daysElement = document.getElementById('timer-days');
    const hoursElement = document.getElementById('timer-hours');
    const minutesElement = document.getElementById('timer-minutes');
    const secondsElement = document.getElementById('timer-seconds');
    const specialMessageElement = document.getElementById('special-message-text');
    
    let previousDays = -1;
    let previousHours = -1;
    let previousMinutes = -1;
    let previousSeconds = -1;
    
    function updateTimer() {
        const now = new Date();
        
        // Get IST date components using Intl API
        const istFormatter = new Intl.DateTimeFormat('en-US', {
            timeZone: 'Asia/Kolkata',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false
        });
        
        const istParts = istFormatter.formatToParts(now);
        const istDateObj = {};
        istParts.forEach(part => {
            istDateObj[part.type] = part.value;
        });
        
        const currentYear = parseInt(istDateObj.year);
        const currentMonth = parseInt(istDateObj.month) - 1; // 0-indexed
        const currentDate = parseInt(istDateObj.day);
        const currentHour = parseInt(istDateObj.hour);
        const currentMinute = parseInt(istDateObj.minute);
        const currentSecond = parseInt(istDateObj.second);
        
        // Check if it's the target date (January 7 in IST)
        const isTargetDate = currentMonth === 0 && currentDate === 7 && currentYear === 2026;
        
        // Check if it's 8 days after target date (January 15, 2026 in IST)
        const is8thDay = currentMonth === 0 && currentDate === 15 && currentYear === 2026;
        
        if (isTargetDate) {
            timerElement.classList.add('special-message');
            if (specialMessageElement) {
                specialMessageElement.textContent = 'Yaay today is the birthday';
            }
            timerElement.style.background = 'rgba(255, 107, 157, 0.3)';
            timerElement.style.borderColor = 'rgba(255, 107, 157, 0.5)';
        } else if (is8thDay) {
            timerElement.classList.add('special-message');
            if (specialMessageElement) {
                specialMessageElement.textContent = 'Still celebrating the amazing you!';
            }
            timerElement.style.background = 'rgba(248, 181, 0, 0.3)';
            timerElement.style.borderColor = 'rgba(248, 181, 0, 0.5)';
        } else {
            timerElement.classList.remove('special-message');
            if (specialMessageElement) {
                specialMessageElement.textContent = '';
            }
            
            // Create current IST time as Date object
            // Format: YYYY-MM-DDTHH:mm:ss+05:30
            const currentISTStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(currentDate).padStart(2, '0')}T${String(currentHour).padStart(2, '0')}:${String(currentMinute).padStart(2, '0')}:${String(currentSecond).padStart(2, '0')}+05:30`;
            const currentIST = new Date(currentISTStr);
            
            // Create target date in IST (January 7, 2026, 00:00:00)
            const targetDateStr = `2026-01-07T00:00:00+05:30`;
            const targetDate = new Date(targetDateStr);
            
            // Calculate time difference (both in IST, so comparison is correct)
            const diffTime = targetDate.getTime() - currentIST.getTime();
            
            if (diffTime <= 0) {
                updateDigit(daysElement, 0, previousDays);
                updateDigit(hoursElement, 0, previousHours);
                updateDigit(minutesElement, 0, previousMinutes);
                updateDigit(secondsElement, 0, previousSeconds);
                previousDays = 0;
                previousHours = 0;
                previousMinutes = 0;
                previousSeconds = 0;
                timerElement.style.background = 'rgba(255, 107, 157, 0.3)';
                timerElement.style.borderColor = 'rgba(255, 107, 157, 0.5)';
            } else {
                const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
                const diffSeconds = Math.floor((diffTime % (1000 * 60)) / 1000);
                
                // Update each digit individually with flip animation
                updateDigit(daysElement, diffDays, previousDays);
                updateDigit(hoursElement, diffHours, previousHours);
                updateDigit(minutesElement, diffMinutes, previousMinutes);
                updateDigit(secondsElement, diffSeconds, previousSeconds);
                
                previousDays = diffDays;
                previousHours = diffHours;
                previousMinutes = diffMinutes;
                previousSeconds = diffSeconds;
                
                timerElement.style.background = 'rgba(255, 255, 255, 0.1)';
                timerElement.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }
        }
    }
    
    function updateDigit(element, newValue, oldValue) {
        if (!element) return;
        
        const newStr = String(newValue).padStart(2, '0');
        const oldStr = oldValue >= 0 ? String(oldValue).padStart(2, '0') : null;
        
        // Only animate if value changed
        if (oldStr !== newStr) {
            element.classList.add('flip');
            setTimeout(() => {
                element.textContent = newStr;
                element.classList.remove('flip');
            }, 200);
        } else {
            element.textContent = newStr;
        }
    }
    
    // Update immediately
    updateTimer();
    
    // Update every second
    setInterval(updateTimer, 1000);
}

// Initialize Hero Slideshow - switches between hero sections every 5 seconds
// Tree animation state
let treeAnimation = null;
let treeAnimationInterval = null;
let treeInstance = null;

function initializeTreeAnimation() {
    const canvas = document.getElementById('tree-canvas');
    if (!canvas) {
        console.error('Tree canvas element not found');
        return;
    }
    
    if (!canvas.getContext) {
        console.error('Canvas context not supported');
        return;
    }

    // Get canvas dimensions (use actual canvas size, not CSS size)
    const width = canvas.width || 1100;
    const height = canvas.height || 680;
    
    // Ensure canvas has proper dimensions
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    
    // Clear canvas first
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height);
    
    console.log('Initializing tree animation with dimensions:', width, 'x', height);
    
    const opts = {
        seed: {
            x: width / 2 - 20,
            color: "rgb(190, 26, 37)",
            scale: 2
        },
        branch: [
            [535, 680, 570, 250, 500, 200, 30, 100, [
                [540, 500, 455, 417, 340, 400, 13, 100, [
                    [450, 435, 434, 430, 394, 395, 2, 40]
                ]],
                [550, 445, 600, 356, 680, 345, 12, 100, [
                    [578, 400, 648, 409, 661, 426, 3, 80]
                ]],
                [539, 281, 537, 248, 534, 217, 3, 40],
                [546, 397, 413, 247, 328, 244, 9, 80, [
                    [427, 286, 383, 253, 371, 205, 2, 40],
                    [498, 345, 435, 315, 395, 330, 4, 60]
                ]],
                [546, 357, 608, 252, 678, 221, 6, 100, [
                    [590, 293, 646, 277, 648, 271, 2, 80]
                ]]
            ]] 
        ],
        bloom: {
            num: 700,
            width: 1080,
            height: 650,
        },
        footer: {
            width: 1200,
            height: 5,
            speed: 10,
        }
    };

    // Check if Tree class is available
    if (typeof Tree === 'undefined') {
        console.error('Tree class not found. Make sure tree-animation.js is loaded.');
        return;
    }
    
    // Reset and create new tree instance
    if (treeInstance) {
        treeInstance.reset();
    }
    
    try {
        treeInstance = new Tree(canvas, width, height, opts);
        console.log('Tree instance created successfully');
    } catch (error) {
        console.error('Error creating tree instance:', error);
        return;
    }
    
    const seed = treeInstance.seed;
    const foot = treeInstance.footer;
    let hold = 1;
    let animationPhase = 'seed'; // 'seed', 'grow', 'flower', 'done'

    // Clear any existing animation
    if (treeAnimationInterval) {
        clearInterval(treeAnimationInterval);
    }

    // Seed animation phase - draw immediately
    try {
        seed.draw();
        console.log('Seed drawn successfully');
    } catch (error) {
        console.error('Error drawing seed:', error);
        return;
    }
    
    treeAnimationInterval = setInterval(function() {
        if (animationPhase === 'seed') {
            if (hold) {
                // Wait for seed to be clicked or auto-proceed
                hold = 0; // Auto-proceed after a short delay
            } else if (seed.canScale()) {
                seed.scale(0.95);
            } else if (seed.canMove()) {
                seed.move(0, 2);
                foot.draw();
            } else {
                animationPhase = 'grow';
            }
        } else if (animationPhase === 'grow') {
            if (treeInstance.canGrow()) {
                treeInstance.grow();
            } else {
                animationPhase = 'flower';
            }
        } else if (animationPhase === 'flower') {
            if (treeInstance.canFlower()) {
                treeInstance.flower(2);
            } else {
                // Check if there are more blooms in cache
                if (treeInstance.bloomsCache && treeInstance.bloomsCache.length > 0) {
                    // Continue adding blooms from cache
                    treeInstance.flower(2);
                } else {
                    animationPhase = 'done';
                    // Animation complete, tree stays visible
                    if (treeAnimationInterval) {
                        clearInterval(treeAnimationInterval);
                        treeAnimationInterval = null;
                    }
                }
            }
        }
    }, 10);
}

function resetTreeAnimation() {
    // Clear any running animation
    if (treeAnimationInterval) {
        clearInterval(treeAnimationInterval);
        treeAnimationInterval = null;
    }
    
    // Clear canvas
    const canvas = document.getElementById('tree-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    
    treeInstance = null;
}

function initializeHeroSlideshow() {
    const heroSlides = document.querySelectorAll('.hero-slide');
    
    if (heroSlides.length < 2) return;
    
    let currentSlide = 0;
    
    // Function to switch slides
    function switchSlide() {
        // Remove active class from all slides
        heroSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Add active class to current slide
        heroSlides[currentSlide].classList.add('active');
        
        // Tree animation is now in About Bipasha section, not in hero slides
        
        // Update timer for the active slide
        if (currentSlide === 0) {
            // Update timer for first hero
            updateHeroTimer('timer-days', 'timer-hours', 'timer-minutes', 'timer-seconds', 'special-message-text');
        } else if (currentSlide === 1) {
            // Update timer for second hero
            updateHeroTimer('timer-days-2', 'timer-hours-2', 'timer-minutes-2', 'timer-seconds-2', 'special-message-text-2');
        } else {
            // Update timer for third hero
            updateHeroTimer('timer-days-3', 'timer-hours-3', 'timer-minutes-3', 'timer-seconds-3', 'special-message-text-3');
        }
        
        // Move to next slide
        currentSlide = (currentSlide + 1) % heroSlides.length;
    }
    
    // Function to update timer for a specific hero
    function updateHeroTimer(daysId, hoursId, minutesId, secondsId, messageId) {
        const now = new Date();
        
        // Get IST date components using Intl API
        const istFormatter = new Intl.DateTimeFormat('en-US', {
            timeZone: 'Asia/Kolkata',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false
        });
        
        const istParts = istFormatter.formatToParts(now);
        const istDateObj = {};
        istParts.forEach(part => {
            istDateObj[part.type] = part.value;
        });
        
        const currentYear = parseInt(istDateObj.year);
        const currentMonth = parseInt(istDateObj.month) - 1; // 0-indexed
        const currentDate = parseInt(istDateObj.day);
        const currentHour = parseInt(istDateObj.hour);
        const currentMinute = parseInt(istDateObj.minute);
        const currentSecond = parseInt(istDateObj.second);
        
        // Create current IST time as Date object
        const currentISTStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(currentDate).padStart(2, '0')}T${String(currentHour).padStart(2, '0')}:${String(currentMinute).padStart(2, '0')}:${String(currentSecond).padStart(2, '0')}+05:30`;
        const currentIST = new Date(currentISTStr);
        
        // Create target date in IST (January 7, 2026, 00:00:00)
        const targetDateStr = `2026-01-07T00:00:00+05:30`;
        const targetDate = new Date(targetDateStr);
        
        // Calculate time difference (both in IST, so comparison is correct)
        const diffTime = targetDate.getTime() - currentIST.getTime();
        
        if (diffTime <= 0) {
            // Birthday has passed
            const days = 0;
            const hours = 0;
            const minutes = 0;
            const seconds = 0;
            
            const daysEl = document.getElementById(daysId);
            const hoursEl = document.getElementById(hoursId);
            const minutesEl = document.getElementById(minutesId);
            const secondsEl = document.getElementById(secondsId);
            const messageEl = document.getElementById(messageId);
            
            if (daysEl) daysEl.textContent = '00';
            if (hoursEl) hoursEl.textContent = '00';
            if (minutesEl) minutesEl.textContent = '00';
            if (secondsEl) secondsEl.textContent = '00';
            
            if (messageEl) {
                messageEl.textContent = "It's happening now! 🎉";
                messageEl.parentElement.classList.add('special-message');
            }
            return;
        }
        
        const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diffTime % (1000 * 60)) / 1000);
        
        const daysEl = document.getElementById(daysId);
        const hoursEl = document.getElementById(hoursId);
        const minutesEl = document.getElementById(minutesId);
        const secondsEl = document.getElementById(secondsId);
        const messageEl = document.getElementById(messageId);
        
        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
        
        // Check for special messages
        if (messageEl) {
            if (days === 0 && hours === 0 && minutes === 0 && seconds < 60) {
                messageEl.textContent = "It's happening now! 🎉";
                messageEl.parentElement.classList.add('special-message');
            } else if (days === 0 && hours === 0 && minutes < 5) {
                messageEl.textContent = "Almost there! ⏰";
                messageEl.parentElement.classList.add('special-message');
            } else {
                messageEl.textContent = "";
                messageEl.parentElement.classList.remove('special-message');
            }
        }
    }
    
    // Initialize: show first slide
    switchSlide();
    
    // Switch slides every 10 seconds (10000ms)
    setInterval(switchSlide, 10000);
    
    // Also update timers every second for the active slide
    setInterval(() => {
        const activeSlide = document.querySelector('.hero-slide.active');
        if (activeSlide) {
            const slideIndex = Array.from(heroSlides).indexOf(activeSlide);
            if (slideIndex === 0) {
                updateHeroTimer('timer-days', 'timer-hours', 'timer-minutes', 'timer-seconds', 'special-message-text');
            } else if (slideIndex === 1) {
                updateHeroTimer('timer-days-2', 'timer-hours-2', 'timer-minutes-2', 'timer-seconds-2', 'special-message-text-2');
            } else {
                updateHeroTimer('timer-days-3', 'timer-hours-3', 'timer-minutes-3', 'timer-seconds-3', 'special-message-text-3');
            }
        }
    }, 1000);
}

// Initialize birthday messages
function initializeBirthdayMessages() {
    const messageForm = document.getElementById('message-form');
    const messageName = document.getElementById('message-name');
    const messageText = document.getElementById('message-text');
    const charCount = document.getElementById('char-count');
    const submitBtn = document.getElementById('submit-message-btn');
    const messagesList = document.getElementById('messages-list');
    
    if (!messageForm || !messagesList) return;
    
    // Character counter
    if (messageText && charCount) {
        messageText.addEventListener('input', function() {
            const currentLength = this.value.length;
            charCount.textContent = currentLength;
            
            if (currentLength > 450) {
                charCount.style.color = '#f5576c';
            } else {
                charCount.style.color = 'var(--text-light)';
            }
        });
    }
    
    // Form submission
    messageForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const name = messageName.value.trim();
        const message = messageText.value.trim();
        
        if (!name || !message) {
            alert('Please fill in both name and message fields.');
            return;
        }
        
        // Disable form during submission
        submitBtn.disabled = true;
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        if (btnText) btnText.style.display = 'none';
        if (btnLoading) btnLoading.style.display = 'inline';
        
        try {
            const response = await fetch('/api/messages/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    message: message
                })
            });
            
            const data = await response.json();
            
            if (data.success) {
                // Clear form
                messageName.value = '';
                messageText.value = '';
                if (charCount) charCount.textContent = '0';
                
                // Show success message
                showMessageNotification('Message submitted successfully!', 'success');
                
                // Reload messages
                loadMessages();
            } else {
                showMessageNotification('Failed to submit message. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Error submitting message:', error);
            showMessageNotification('Error submitting message. Please try again.', 'error');
        } finally {
            // Re-enable form
            submitBtn.disabled = false;
            if (btnText) btnText.style.display = 'inline';
            if (btnLoading) btnLoading.style.display = 'none';
        }
    });
    
    // Load messages on page load
    loadMessages();
    
    // Auto-refresh messages every 10 seconds
    setInterval(loadMessages, 10000);
    
    // Load messages function
    function loadMessages() {
        // Only proceed if messagesList exists
        if (!messagesList) return;
        
        fetch('/api/messages/load')
            .then(response => {
                // Check if response is actually JSON
                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    // If not JSON, try to read as text to see what we got
                    return response.text().then(text => {
                        throw new Error('Server returned non-JSON response. Make sure the server is running.');
                    });
                }
                return response.json();
            })
            .then(data => {
                if (data && data.success && data.messages) {
                    displayMessages(data.messages);
                } else {
                    if (messagesList) {
                        messagesList.innerHTML = '<div class="no-messages">No messages yet. Be the first to leave a wish!</div>';
                    }
                }
            })
            .catch(error => {
                // Only log error, don't show in console repeatedly if server is not running
                if (error.message && !error.message.includes('JSON')) {
                    console.error('Error loading messages:', error);
                }
                // Only show error message if messagesList exists (i.e., we're on the messages page)
                if (messagesList) {
                    messagesList.innerHTML = '<div class="no-messages">Unable to load messages. Please make sure the server is running.</div>';
                }
            });
    }
    
    // Display messages
    function displayMessages(messages) {
        if (!messages || messages.length === 0) {
            messagesList.innerHTML = '<div class="no-messages">No messages yet. Be the first to leave a wish!</div>';
            return;
        }
        
        // Sort messages by date (newest first)
        messages.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        messagesList.innerHTML = messages.map(msg => {
            const date = new Date(msg.date);
            const formattedDate = date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            
            return `
                <div class="message-item">
                    <div class="message-name">${escapeHtml(msg.name)}</div>
                    <div class="message-text">${escapeHtml(msg.message)}</div>
                    <div class="message-date">${formattedDate}</div>
                </div>
            `;
        }).join('');
    }
    
    // Escape HTML to prevent XSS
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // Show notification
    function showMessageNotification(message, type) {
        // Remove existing notification if any
        const existing = document.querySelector('.message-notification');
        if (existing) existing.remove();
        
        const notification = document.createElement('div');
        notification.className = `message-notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 15px 25px;
            background: ${type === 'success' ? '#4caf50' : '#f5576c'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
            font-weight: 500;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize tree animation when About Bipasha section is visible
function initializeTreeOnScroll() {
    const aboutSection = document.getElementById('about');
    if (!aboutSection) {
        console.log('About section not found');
        return;
    }
    
    const treeCanvas = document.getElementById('tree-canvas');
    if (!treeCanvas) {
        console.log('Tree canvas not found');
        return;
    }
    
    let hasAnimated = false;
    
    // Function to start animation
    function startTreeAnimation() {
        if (!hasAnimated) {
            console.log('Starting tree animation');
            initializeTreeAnimation();
            hasAnimated = true;
        }
    }
    
    // Use Intersection Observer to detect when section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                // Section is visible, start tree animation
                setTimeout(() => {
                    startTreeAnimation();
                }, 300);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of section is visible (lower threshold)
    });
    
    observer.observe(aboutSection);
    
    // Also check if section is already visible on page load
    setTimeout(() => {
        const rect = aboutSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (isVisible && !hasAnimated) {
            setTimeout(() => {
                startTreeAnimation();
            }, 500);
        }
    }, 1000);
    
    // Fallback: if still not started after 2 seconds, start anyway
    setTimeout(() => {
        if (!hasAnimated) {
            console.log('Fallback: Starting tree animation');
            startTreeAnimation();
        }
    }, 2000);
}

// Initialize emoji cursor trail
function initializeCursorTrail() {
    const emojis = ['✨', '💫', '⭐', '🌟', '💖', '💕', '🌸', '💝'];
    const trail = [];
    let mouseX = 0;
    let mouseY = 0;
    let lastMouseX = 0;
    let lastMouseY = 0;
    
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Create emoji element
        const emoji = document.createElement('div');
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.cssText = `
            position: fixed;
            left: ${mouseX}px;
            top: ${mouseY}px;
            pointer-events: none;
            z-index: 9999;
            font-size: ${20 + Math.random() * 10}px;
            opacity: 1;
            transform: translate(-50%, -50%);
            transition: opacity 0.5s ease-out, transform 0.5s ease-out;
        `;
        
        document.body.appendChild(emoji);
        trail.push(emoji);
        
        // Fade out and remove
        setTimeout(() => {
            emoji.style.opacity = '0';
            emoji.style.transform = 'translate(-50%, -50%) scale(0.5)';
            setTimeout(() => {
                if (emoji.parentNode) {
                    emoji.parentNode.removeChild(emoji);
                }
                const index = trail.indexOf(emoji);
                if (index > -1) {
                    trail.splice(index, 1);
                }
            }, 500);
        }, 100);
        
        lastMouseX = mouseX;
        lastMouseY = mouseY;
    });
}
