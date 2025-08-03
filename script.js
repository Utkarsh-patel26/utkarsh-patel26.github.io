
document.addEventListener('DOMContentLoaded', () => {

    const BOOT_TEXTS = ["INITIATING BIOS...", "MEMORY CHECK...", "LOADING KERNEL...", "MOUNTING CORE...", "DECRYPTING UI...", "SYSTEM ONLINE", "THE MATRIX IS REAL"];
    const SKILLS_DATA = {
        "LANGUAGES": [
            { name: "Python", level: 90 }, { name: "JavaScript / TS", level: 85 }, 
            { name: "Java", level: 75 }, { name: "C", level: 60 }, { name: "SQL", level: 80 }
        ],
        "TECHNOLOGIES": [
            { name: "React", level: 85 }, { name: "Node.js", level: 80 }, 
            { name: "Docker", level: 70 }, { name: "Spring Boot", level: 70 }
        ],
        "DATABASES": [
            { name: "PostgreSQL", level: 80 }, { name: "MongoDB", level: 75 }
        ],
        "CONCEPTS": [
            { name: "System Design", level: 85 }, { name: "Data Structures", level: 90 }
        ]
    };
    const PROJECTS_DATA = [
        { title: "Halem-Pegasis-Evaluator", desc: "A simulation and evaluation tool for comparing the standard PEGASIS protocol with the novel HALEM-PEGASIS protocol in Wireless Sensor Networks (WSNs).", tags: ["Java", "Python"], link: "https://github.com/Utkarsh-patel26/halem-pegasis-evaluator" },
        { title: "Pub_Collectors", desc: "A data analysis tool for processing publication records from Excel.", tags: ["Python", "Flask"], link: "https://github.com/Colluded-Projects/pub_collectors" },
        { title: "Crime Justice System", desc: "A streamlined incident reporting and community safety platform.", tags: ["JS", "Firebase"], link: "https://github.com/Utkarsh-patel26/crime-justice" },
        { title: "1D Elastic Collision", desc: "An interactive physics simulation for educational purposes.", tags: ["JS", "HTML", "CSS"], link: "https://github.com/Utkarsh-patel26/1D-Elastic-Collision" }
        
    ];

    // --- INITIALIZATION ---
    async function init() {
        safelyRun(startMatrixBackground, 'startMatrixBackground');
        await runBootSequence();

        const loader = document.getElementById('loader');
        const mainInterface = document.getElementById('main-interface');

        if (!loader || !mainInterface) {
            console.error("CRITICAL ERROR: #loader or #main-interface element not found.");
            return;
        }

        loader.style.opacity = '0';

        setTimeout(() => {
            loader.style.display = 'none';
            mainInterface.style.opacity = '1';
            document.body.style.overflow = 'auto';
            
            safelyRun(populateSkills, 'populateSkills');
            safelyRun(populateProjects, 'populateProjects');
            safelyRun(setupScrollAnimations, 'setupScrollAnimations');
            safelyRun(setupNavHighlighting, 'setupNavHighlighting');
            safelyRun(startSystemTime, 'startSystemTime');
            safelyRun(setupInteractiveText, 'setupInteractiveText');
            safelyRun(runHeroDecode, 'runHeroDecode');

        }, 1000);
    }

    function safelyRun(fn, name) {
        try { fn(); } catch (error) { console.error(`Error in function "${name}":`, error); }
    }

    function runBootSequence() {
        const loaderText = document.getElementById('loader-text');
        if (!loaderText) return Promise.resolve();
        const totalDuration = 2500;
        const delay = totalDuration / BOOT_TEXTS.length;
        
        return new Promise(resolve => {
            let i = 0;
            const interval = setInterval(() => {
                if (i < BOOT_TEXTS.length) {
                    loaderText.textContent = BOOT_TEXTS[i];
                    i++;
                } else {
                    clearInterval(interval);
                    resolve();
                }
            }, delay);
        });
    }

    // --- MATRIX BACKGROUND ---
    function startMatrixBackground() {
        const canvas = document.getElementById('matrix-background');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789アカサタナハマヤラワイキシチニヒミリウクスツヌフムユルエケセテネヘメレオコソトノホモヨロ';
        const fontSize = 20;
        const columns = Math.ceil(width / fontSize);
        const rainDrops = Array.from({ length: columns }).map(() => Math.floor(Math.random() * height / fontSize));

        const draw = () => {
            ctx.fillStyle = 'rgba(3, 10, 5, 0.04)';
            ctx.fillRect(0, 0, width, height);
            ctx.fillStyle = 'rgba(0, 255, 127, 0.7)';
            ctx.font = fontSize + 'px monospace';
            rainDrops.forEach((y, i) => {
                const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
                ctx.fillText(text, i * fontSize, y * fontSize);
                if (y * fontSize > height && Math.random() > 0.975) rainDrops[i] = 0;
                rainDrops[i]++;
            });
        };
        setInterval(draw, 50);
        window.addEventListener('resize', () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; });
    }

    // --- DYNAMIC CONTENT ---
    function populateSkills() {
        const container = document.getElementById('skills-grid');
        if (!container) return;
        container.innerHTML = Object.entries(SKILLS_DATA).map(([category, skills]) => `
            <div class="skill-category">
                <h3 class="skill-category-title" data-text="${category}">${category}</h3>
                <ul class="skill-list">
                    ${skills.map(skill => `<li class="skill-item">${skill.name}<div class="skill-bar"><div class="skill-bar-fill" style="--skill-level: ${skill.level}%"></div></div></li>`).join('')}
                </ul>
            </div>
        `).join('');
    }

    function populateProjects() {
        const grid = document.getElementById('projects-grid');
        if (!grid) return;
        grid.innerHTML = PROJECTS_DATA.map(p => `
            <a href="${p.link}" target="_blank" class="project-card" rel="noopener noreferrer">
                <div class="project-header">
                    <h3 class="project-title">${p.title}</h3>
                    <span class="project-status">Online</span>
                </div>
                <div class="project-content">
                    <p class="project-desc">${p.desc}</p>
                    <div class="project-tags">${p.tags.map(tag => `<span class="project-tag">#${tag}</span>`).join(' ')}</div>
                </div>
            </a>
        `).join('');
    }

    // --- UI & INTERACTIVITY ---
    function setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.content-section').forEach(el => observer.observe(el));
    }

    function setupNavHighlighting() {
        const navItems = document.querySelectorAll('.nav-item');
        const sections = document.querySelectorAll('.content-section');
        if (navItems.length === 0 || sections.length === 0) return;
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navItems.forEach(nav => nav.classList.toggle('active', nav.getAttribute('href') === `#${id}`));
                }
            });
        }, { rootMargin: '-50% 0px -50% 0px' });
        sections.forEach(s => observer.observe(s));
    }

    function startSystemTime() {
        const timeEl = document.getElementById('system-time');
        if (!timeEl) return;
        const updateTime = () => {
            const now = new Date();
            timeEl.textContent = `[${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}]`;
        };
        updateTime();
        setInterval(updateTime, 1000);
    }
    
    // --- TEXT DECODING EFFECT ---
    const scrambleChars = '!<>-_\\/[]{}—=+*^?#';

    function runHeroDecode() {
        document.querySelectorAll('.decode-text').forEach(el => {
            const originalText = el.dataset.value;
            let iteration = 0;
            const interval = setInterval(() => {
                el.textContent = originalText.split('').map((char, index) => {
                    if (index < iteration) return originalText[index];
                    if (char === ' ') return ' ';
                    return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
                }).join('');
                if (iteration >= originalText.length) clearInterval(interval);
                iteration += originalText.length / 40; 
            }, 30);
        });
    }

    function setupInteractiveText() {
        document.querySelectorAll('[data-text]').forEach(el => {
            const originalText = el.dataset.text;
            let animationFrameId;

            el.addEventListener('mouseenter', () => {
                let iteration = 0;
                cancelAnimationFrame(animationFrameId);
                
                const animate = () => {
                    el.textContent = originalText.split('').map((char, index) => {
                        if (index < iteration) return originalText[index];
                        if (char === ' ') return ' ';
                        return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
                    }).join('');

                    if (iteration < originalText.length) {
                        iteration += 1;
                        animationFrameId = requestAnimationFrame(animate);
                    } else {
                        el.textContent = originalText;
                    }
                };
                animationFrameId = requestAnimationFrame(animate);
            });

            el.addEventListener('mouseleave', () => {
                cancelAnimationFrame(animationFrameId);
                el.textContent = originalText;
            });
        });
    }

    init();
});
