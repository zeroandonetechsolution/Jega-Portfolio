/**
 * ZERO & ONE STUDIO
 * Portfolio Controller — Royal Vintage Suite
 */

class StudioPortfolio {
    constructor() {
        this.dashboard = document.getElementById('dashboard');
        this.init();
    }

    init() {
        // Ensure dashboard is visible immediately with a graceful fade-in
        if (this.dashboard) {
            this.dashboard.style.opacity = '0';
            this.dashboard.style.display = 'flex';
            gsap.to(this.dashboard, { opacity: 1, duration: 1.2, ease: 'power2.out' });
        }

        this.initSidebar();
        this.initClock();
        this.initAnimations();
        this.initParallax();
    }

    // --- Sidebar Active State ---
    initSidebar() {
        const path = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-icons li').forEach(li => {
            const link = li.getAttribute('data-link');
            li.classList.toggle('active', link === path);
        });
    }

    // --- Elegant Live Clock ---
    initClock() {
        const clockEl = document.getElementById('system-clock');
        if (!clockEl) return;
        const tick = () => {
            const now = new Date();
            clockEl.textContent = now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });
        };
        tick();
        setInterval(tick, 1000);
    }

    // --- Page Entrance Animations ---
    initAnimations() {
        // Staggered entrance for panel content
        const heading = document.querySelector('.glitch');
        const panelP = document.querySelector('.panel-content > p');
        const panelHeader = document.querySelector('.panel-header');

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        if (panelHeader) {
            tl.from(panelHeader, { y: -20, opacity: 0, duration: 0.8 }, '+=0.2');
        }
        if (heading) {
            tl.from(heading, { y: 40, opacity: 0, duration: 1.2 }, '-=0.4');
        }
        if (panelP) {
            tl.from(panelP, { y: 20, opacity: 0, duration: 1 }, '-=0.8');
        }

        // Founder page counter animation
        if (window.location.pathname.includes('founder.html')) {
            this.runCounters();
            // Animate the profile frame
            gsap.from('.profile-frame', { x: -60, opacity: 0, duration: 1.2, ease: 'power3.out', delay: 0.5 });
            gsap.from('.founder-info', { x: 60, opacity: 0, duration: 1.2, ease: 'power3.out', delay: 0.7 });
        }

        // Skills page - stagger the skill categories
        if (window.location.pathname.includes('skills.html')) {
            gsap.from('.skill-category', {
                y: 40, opacity: 0, duration: 0.8, stagger: 0.15,
                ease: 'power3.out', delay: 0.5
            });
        }

        // Projects page - stagger the cards
        if (window.location.pathname.includes('projects.html')) {
            gsap.from('.p-card', {
                y: 50, opacity: 0, duration: 1, stagger: 0.25,
                ease: 'power3.out', delay: 0.6
            });
        }

        // Architecture page
        if (window.location.pathname.includes('architecture.html')) {
            gsap.from('.arch-node', {
                scale: 0.8, opacity: 0, duration: 0.6, stagger: 0.2,
                ease: 'back.out(1.7)', delay: 0.6
            });
        }
    }

    // --- Stat Counters (Founder Page) ---
    runCounters() {
        document.querySelectorAll('.stat-val').forEach(v => {
            const raw = v.getAttribute('data-target');
            if (!raw) return;
            const target = parseInt(raw);
            gsap.to({ val: 0 }, {
                val: target,
                duration: 2.5,
                ease: 'power2.out',
                delay: 1,
                onUpdate: function () {
                    v.textContent = Math.floor(this.targets()[0].val);
                }
            });
        });
    }

    // --- Subtle Parallax on Mouse Move ---
    initParallax() {
        const heading = document.querySelector('.glitch');
        if (!heading) return;

        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 8;
            const y = (e.clientY / window.innerHeight - 0.5) * 8;
            gsap.to(heading, { x, y, duration: 2, ease: 'power1.out' });
        });
    }
}

// Bootstrap
window.addEventListener('DOMContentLoaded', () => {
    new StudioPortfolio();
});
