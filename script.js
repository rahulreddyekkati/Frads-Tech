// ===================================
// FRADS TECH - INTERACTIVE JAVASCRIPT
// ===================================

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 14, 39, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 14, 39, 0.8)';
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// ===== MOBILE MENU TOGGLE =====
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.querySelector('.nav-links');

mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== NEW PORTFOLIO TOGGLE SWITCH =====
const portfolioToggle = document.getElementById('portfolioToggle');
const beforeView = document.getElementById('beforeView');
const afterView = document.getElementById('afterView');

if (portfolioToggle && beforeView && afterView) {
    portfolioToggle.addEventListener('change', () => {
        if (portfolioToggle.checked) {
            beforeView.classList.add('hidden');
            afterView.classList.remove('hidden');
        } else {
            beforeView.classList.remove('hidden');
            afterView.classList.add('hidden');
        }
    });
}

// ===== RESUME TOGGLE (OLD) =====
const toggleBtns = document.querySelectorAll('.toggle-btn');
const resumeViews = document.querySelectorAll('.resume-view');

toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const viewType = btn.getAttribute('data-view');

        // Update active button
        toggleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Update active view
        resumeViews.forEach(view => {
            view.classList.remove('active');
            if (view.classList.contains(`${viewType}-view`)) {
                view.classList.add('active');
            }
        });
    });
});

// ===== ROI CALCULATOR =====
const printingCostInput = document.getElementById('printingCost');
const menuUpdatesInput = document.getElementById('menuUpdates');
const paybackPeriodDisplay = document.getElementById('paybackPeriod');
const annualSavingsDisplay = document.getElementById('annualSavings');

function calculateROI() {
    const printingCost = parseFloat(printingCostInput.value) || 0;
    const menuUpdates = parseFloat(menuUpdatesInput.value) || 0;

    // Assuming digital menu costs $500 one-time + $50/month
    const digitalMenuCost = 500;
    const monthlyFee = 50;

    const monthlySavings = printingCost - monthlyFee;
    const annualSavings = monthlySavings * 12;

    // Calculate payback period in days
    let paybackDays = 0;
    if (monthlySavings > 0) {
        paybackDays = Math.ceil((digitalMenuCost / monthlySavings) * 30);
    }

    // Update display
    if (paybackDays > 0 && paybackDays < 1000) {
        paybackPeriodDisplay.textContent = `${paybackDays} days`;
    } else if (monthlySavings <= 0) {
        paybackPeriodDisplay.textContent = 'N/A';
    } else {
        paybackPeriodDisplay.textContent = '> 3 years';
    }

    if (annualSavings > 0) {
        annualSavingsDisplay.textContent = `$${annualSavings.toLocaleString()}`;
    } else {
        annualSavingsDisplay.textContent = '$0';
    }
}

if (printingCostInput && menuUpdatesInput) {
    printingCostInput.addEventListener('input', calculateROI);
    menuUpdatesInput.addEventListener('input', calculateROI);

    // Initial calculation
    calculateROI();
}

// ===== PILLAR CARDS INTERACTION =====
const pillarCards = document.querySelectorAll('.pillar-card');

pillarCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        // Add subtle animation
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
const animatedElements = document.querySelectorAll('.pillar-card, .lab-item, .feature-card, .question-card, .benefit-item');

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== DASHBOARD CHART ANIMATION =====
const bars = document.querySelectorAll('.bar');

const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            bars.forEach((bar, index) => {
                setTimeout(() => {
                    bar.style.transform = 'scaleY(1)';
                }, index * 100);
            });
        }
    });
}, { threshold: 0.5 });

const barChart = document.querySelector('.bar-chart');
if (barChart) {
    bars.forEach(bar => {
        bar.style.transformOrigin = 'bottom';
        bar.style.transform = 'scaleY(0)';
        bar.style.transition = 'transform 0.5s ease';
    });
    chartObserver.observe(barChart);
}

// ===== CONTACT FORM HANDLING =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // In a real application, you would send this to a server
    console.log('Form submitted:', data);

    // Show success message
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitted! ✓';
    submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

    // Reset form
    setTimeout(() => {
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
    }, 3000);
});

// ===== FLOATING CARDS ANIMATION =====
const floatingCards = document.querySelectorAll('.floating-card');

floatingCards.forEach((card, index) => {
    // Add random movement on mouse move
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;

        card.style.transform = `translate(${x * (index + 1)}px, ${y * (index + 1)}px)`;
    });
});

// ===== TECH STACK ICONS ROTATION =====
const techIcons = document.querySelectorAll('.tech-icon');

techIcons.forEach((icon, index) => {
    icon.addEventListener('mouseenter', () => {
        const circle = icon.querySelector('.icon-circle');
        circle.style.transform = 'scale(1.1) rotate(360deg)';
        circle.style.transition = 'transform 0.5s ease';
    });

    icon.addEventListener('mouseleave', () => {
        const circle = icon.querySelector('.icon-circle');
        circle.style.transform = 'scale(1) rotate(0deg)';
    });
});

// ===== MENU ITEMS HOVER EFFECT =====
const menuItems = document.querySelectorAll('.menu-item');

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        // Add a subtle pulse effect
        item.style.animation = 'pulse 0.3s ease';
        setTimeout(() => {
            item.style.animation = '';
        }, 300);
    });
});

// Add pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
`;
document.head.appendChild(style);

// ===== GRADIENT ORBS PARALLAX =====
const orbs = document.querySelectorAll('.gradient-orb');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    orbs.forEach((orb, index) => {
        const speed = 0.5 + (index * 0.2);
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== DASHBOARD FILTER INTERACTION =====
const filterSelect = document.querySelector('.filter-select');

if (filterSelect) {
    filterSelect.addEventListener('change', (e) => {
        // Animate metrics update
        const metrics = document.querySelectorAll('.metric-value');

        metrics.forEach(metric => {
            metric.style.opacity = '0.5';
            metric.style.transform = 'scale(0.95)';

            setTimeout(() => {
                metric.style.opacity = '1';
                metric.style.transform = 'scale(1)';
            }, 200);
        });

        // Animate bars
        bars.forEach((bar, index) => {
            bar.style.transform = 'scaleY(0)';
            setTimeout(() => {
                const randomHeight = Math.random() * 50 + 40;
                bar.style.height = `${randomHeight}%`;
                bar.style.transform = 'scaleY(1)';
            }, index * 100);
        });
    });
}

// ===== TESTIMONIAL AUTO-ROTATION (if multiple testimonials added) =====
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');

function rotateTestimonials() {
    if (testimonials.length > 1) {
        testimonials[currentTestimonial].classList.remove('active');
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        testimonials[currentTestimonial].classList.add('active');
    }
}

// Auto-rotate every 5 seconds if there are multiple testimonials
if (testimonials.length > 1) {
    setInterval(rotateTestimonials, 5000);
}

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
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

// Apply debounce to scroll-heavy operations
const debouncedScroll = debounce(() => {
    // Any heavy scroll operations can go here
}, 100);

window.addEventListener('scroll', debouncedScroll);

// ===== CONSOLE WELCOME MESSAGE =====
console.log('%c🚀 Welcome to Frads Tech!', 'color: #00f5ff; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with modern web technologies and attention to detail.', 'color: #b4b9d6; font-size: 12px;');

// ===== LOADING ANIMATION =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== PARTICLE SYSTEM =====
class ParticleSystem {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 50;

        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1';
        this.canvas.style.opacity = '0.6';

        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.appendChild(this.canvas);
        }

        this.resize();
        this.init();
        this.animate();

        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            if (particle.x < 0 || particle.x > this.canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.speedY *= -1;

            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(0, 245, 255, ${particle.opacity})`;
            this.ctx.fill();
        });

        // Draw connections
        this.particles.forEach((p1, i) => {
            this.particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(0, 245, 255, ${0.2 * (1 - distance / 150)})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            });
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particle system
new ParticleSystem();

// ===== MAGNETIC BUTTON EFFECT =====
const magneticButtons = document.querySelectorAll('.btn');

magneticButtons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = '';
    });
});

// ===== CARD TILT EFFECT =====
const tiltCards = document.querySelectorAll('.pillar-card, .feature-card, .lab-card');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ===== SMOOTH SCROLL WITH EASING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;

            // Smooth scroll with custom easing
            const startPosition = window.pageYOffset;
            const distance = offsetTop - startPosition;
            const duration = 1000;
            let start = null;

            function animation(currentTime) {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const run = ease(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }

            function ease(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }

            requestAnimationFrame(animation);
        }
    });
});

// ===== ENHANCED SCROLL REVEAL =====
const revealElements = document.querySelectorAll('.pillar-card, .lab-item, .feature-card, .question-card, .benefit-item');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }, index * 100);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px) scale(0.9)';
    el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    revealObserver.observe(el);
});

// ===== CURSOR GLOW EFFECT =====
const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0, 245, 255, 0.6), transparent);
    pointer-events: none;
    z-index: 9999;
    filter: blur(10px);
    transform: translate(-50%, -50%);
    transition: width 0.2s, height 0.2s;
`;
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button, .pillar-card, .feature-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorGlow.style.width = '40px';
        cursorGlow.style.height = '40px';
    });

    el.addEventListener('mouseleave', () => {
        cursorGlow.style.width = '20px';
        cursorGlow.style.height = '20px';
    });
});

// ===== FORM INPUT ENHANCEMENTS =====
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');

formInputs.forEach(input => {
    // Add focus ripple effect
    input.addEventListener('focus', function () {
        this.style.transform = 'scale(1.01)';
    });

    input.addEventListener('blur', function () {
        this.style.transform = 'scale(1)';
    });

    // Add typing animation
    input.addEventListener('input', function () {
        this.style.borderColor = 'var(--color-accent)';
        setTimeout(() => {
            if (!this.matches(':focus')) {
                this.style.borderColor = '';
            }
        }, 300);
    });
});

// ===== SECTION REVEAL ON SCROLL =====
const sections = document.querySelectorAll('.pillars, .specialized-page, .trust-builder, .contact-section');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 1s ease, transform 1s ease';
    sectionObserver.observe(section);
});

// ===== NUMBER COUNTER ANIMATION =====
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = Math.round(target);
            clearInterval(timer);
        } else {
            element.textContent = Math.round(start);
        }
    }, 16);
};

// Apply to any elements with data-counter attribute
document.querySelectorAll('[data-counter]').forEach(el => {
    const target = parseInt(el.getAttribute('data-counter'));
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(el, target);
                observer.unobserve(el);
            }
        });
    });
    observer.observe(el);
});
