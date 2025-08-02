document.addEventListener('DOMContentLoaded', () => {

    const matrixGreen = '#20C20E';

    const introOverlay = document.getElementById('intro-overlay');
    const terminalTextElement = document.getElementById('typed-text');
    const mainContent = document.getElementById('main-content');
    const bodyElement = document.body;
    const matrixCanvas = document.getElementById('matrix-canvas');
    const ctx = matrixCanvas ? matrixCanvas.getContext('2d') : null;

    if (!introOverlay || !terminalTextElement || !mainContent || !bodyElement) {
        if(mainContent) mainContent.style.opacity = '1';
        if(bodyElement) bodyElement.classList.remove('no-scroll');
        loadParticles();
        setupProjectCarousel();
        return;
    }

    const textToType = "> connect::utkarsh_patel_portfolio_v2.0 ... AUTH_OK ... Rendering Interface ...";
    let typingIndex = 0;
    const typingSpeed = 80;
    const matrixPause = 200;
    const matrixDuration = 2500;
    const fadeOutDuration = 600;
    let animationFrameId;
    let introEnded = false;

    function typeCharacter() {
        if (introEnded) return;
        if (typingIndex < textToType.length) {
            terminalTextElement.textContent += textToType.charAt(typingIndex);
            typingIndex++;
            setTimeout(typeCharacter, typingSpeed);
        } else {
            const cursor = document.querySelector('.terminal-cursor');
            if (cursor) cursor.style.display = 'none';
            if (ctx) {
                setTimeout(startMatrixEffect, matrixPause);
            } else {
                setTimeout(endIntro, matrixPause + matrixDuration);
            }
        }
    }

    function startMatrixEffect() {
        if (introEnded || !ctx) {
             if(!introEnded) endIntro();
             return;
        }
        matrixCanvas.width = window.innerWidth;
        matrixCanvas.height = window.innerHeight;
        matrixCanvas.style.opacity = '0.7';

        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ';
        const fontSize = 16;
        const columns = Math.ceil(matrixCanvas.width / fontSize);
        const drops = Array(columns).fill(1);
        const targetFrames = (matrixDuration / 1000) * 60;
        let frameCount = 0;

        function drawMatrix() {
            if (introEnded) {
                 if (animationFrameId) cancelAnimationFrame(animationFrameId);
                 return;
            }

            ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
            ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

            ctx.fillStyle = matrixGreen;
            ctx.font = fontSize + 'px Roboto Mono';

            for (let i = 0; i < drops.length; i++) {
                const text = characters[Math.floor(Math.random() * characters.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }

            frameCount++;
            if (frameCount < targetFrames && !introEnded) {
                animationFrameId = requestAnimationFrame(drawMatrix);
            } else if (!introEnded) {
                endIntro();
            }
        }
        drawMatrix();
        setTimeout(() => { if (!introEnded) { endIntro(); } }, matrixDuration + 500);
    }

    function endIntro() {
        if (introEnded) return;
        introEnded = true;
        if (animationFrameId) { cancelAnimationFrame(animationFrameId); animationFrameId = null; }
        if (matrixCanvas) matrixCanvas.style.opacity = '0';
        introOverlay.style.opacity = '0';
        setTimeout(() => {
            introOverlay.style.display = 'none';
            mainContent.style.opacity = '1';
            bodyElement.classList.remove('no-scroll');
            loadParticles();
            setupProjectCarousel();
            initializeHeroAnimations(); // Initialize Hero animations after intro
        }, fadeOutDuration);
       }

    function loadParticles() {
        if (typeof tsParticles === 'undefined') { return; }
        tsParticles.load("tsparticles", {
            fpsLimit: 60,
            particles: {
                number: { value: 130, density: { enable: true, value_area: 800 } },
                color: { value: matrixGreen },
                shape: { type: "character", character: { value: ["0", "1"], font: "Roboto Mono", style: "", weight: "400", fill: true } },
                opacity: { value: { min: 0.2, max: 0.6 }, random: true, anim: { enable: true, speed: 0.9, opacity_min: 0.1, sync: false } },
                size: { value: 10, random: false }, links: { enable: false },
                move: { enable: true, speed: 2.5, direction: "bottom", random: false, straight: true, out_mode: "out", bounce: false, attract: { enable: false } }
            },
            interactivity: { detect_on: "canvas", events: { onhover: { enable: false }, onclick: { enable: false }, resize: true }, },
            detectRetina: true, background: { color: '#000000', }
        }).catch(error => console.error("tsParticles loading error:", error));
       }

    let carouselIntervalId;
    const autoSlideInterval = 3000;
    const visibleCards = 3;

    function setupProjectCarousel() {
        const container = document.querySelector('.projects-carousel-container');
        const track = document.querySelector('.projects-track');
        if (!track || !container) { return; }

        const originalCards = Array.from(track.querySelectorAll('.project-card-item:not(.is-clone)'));
        if (originalCards.length <= visibleCards) {
            container.style.overflow = 'visible';
             if (container.querySelector('.carousel-arrow.left')) container.querySelector('.carousel-arrow.left').style.display = 'none';
             if (container.querySelector('.carousel-arrow.right')) container.querySelector('.carousel-arrow.right').style.display = 'none';
            return;
        }

        const cardWidth = originalCards[0].offsetWidth;
        const gap = 24;
        track.style.gap = `${gap}px`;
        const cardWidthWithGap = cardWidth + gap;

        // Clear existing clones before adding new ones
        track.querySelectorAll('.is-clone').forEach(clone => clone.remove());


        const cardsToCloneStart = originalCards.slice(0, visibleCards);
        const cardsToCloneEnd = originalCards.slice(-visibleCards);

        cardsToCloneEnd.slice().reverse().forEach(card => { // Use slice to avoid modifying original
            const clone = card.cloneNode(true);
            clone.classList.add('is-clone');
            track.insertBefore(clone, track.firstChild);
        });

        cardsToCloneStart.forEach(card => {
            const clone = card.cloneNode(true);
            clone.classList.add('is-clone');
            track.appendChild(clone);
        });

        const allCards = Array.from(track.children);

        let currentIndex = 0;
        let currentTranslate = -(visibleCards * cardWidthWithGap);
        track.style.transform = `translateX(${currentTranslate}px)`;
        track.style.transition = 'none';

        const nextButton = container.querySelector('.carousel-arrow.right');
        const prevButton = container.querySelector('.carousel-arrow.left');
        if (!nextButton || !prevButton) { return; }

        let isTransitioning = false;

        const updateCenterCard = () => {
            allCards.forEach(card => card.classList.remove('is-center'));
            const centerPhysicalIndex = visibleCards + currentIndex + Math.floor(visibleCards / 2);
            if (centerPhysicalIndex >= 0 && centerPhysicalIndex < allCards.length) {
                 allCards[centerPhysicalIndex].classList.add('is-center');
            }
        };


        const moveTo = (logicalIndex) => {
            if (isTransitioning) return;
            isTransitioning = true;

            const physicalIndex = logicalIndex + visibleCards;
            currentTranslate = -(physicalIndex * cardWidthWithGap);

            track.style.transition = 'transform 0.5s ease-in-out';
            track.style.transform = `translateX(${currentTranslate}px)`;
            currentIndex = logicalIndex;
        };

        track.addEventListener('transitionend', () => {
            isTransitioning = false;

            let jumpNeeded = false;
            let newLogicalIndex = currentIndex;

            if (currentIndex < 0) {
                newLogicalIndex = currentIndex + originalCards.length;
                jumpNeeded = true;
            } else if (currentIndex >= originalCards.length) {
                newLogicalIndex = currentIndex - originalCards.length;
                jumpNeeded = true;
            }

            if (jumpNeeded) {
                const physicalIndex = newLogicalIndex + visibleCards;
                currentTranslate = -(physicalIndex * cardWidthWithGap);
                track.style.transition = 'none';
                track.style.transform = `translateX(${currentTranslate}px)`;
                currentIndex = newLogicalIndex;
            }

            updateCenterCard();
        });

        nextButton.addEventListener('click', () => {
            moveTo(currentIndex + 1);
            resetAutoSlide();
        });
        prevButton.addEventListener('click', () => {
            moveTo(currentIndex - 1);
            resetAutoSlide();
        });

        const startAutoSlide = () => {
            stopAutoSlide();
            if (originalCards.length > visibleCards) { // Only start if enough cards
                 carouselIntervalId = setInterval(() => {
                     moveTo(currentIndex + 1);
                 }, autoSlideInterval);
             }
        };
        const stopAutoSlide = () => {
            clearInterval(carouselIntervalId);
        };
        const resetAutoSlide = () => {
            stopAutoSlide();
            startAutoSlide();
        };

        container.addEventListener('mouseenter', stopAutoSlide);
        container.addEventListener('mouseleave', startAutoSlide);

        setTimeout(() => {
            track.style.transition = 'transform 0.5s ease-in-out';
            updateCenterCard();
            startAutoSlide();
        }, 100);

    }

    function initializeHeroAnimations() {
        const heroSection = document.querySelector('.hero-section-interactive');
        if (heroSection) {
            // Triggering reflow to ensure animations restart if needed,
            // though primarily handled by opacity change now.
            void heroSection.offsetWidth;
        }
    }

    document.querySelectorAll('a.cta-button[href^="#"], a.scroll-smooth-button[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) { targetElement.scrollIntoView({ behavior: 'smooth' }); }
        });
    });

    const sections = document.querySelectorAll('.fade-in-section');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
        });
    }, { threshold: 0.1 });
    sections.forEach(section => { observer.observe(section); });

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
           // Re-setup carousel on resize to adjust widths
            setupProjectCarousel();
        }, 250);
    });

    setTimeout(typeCharacter, 500);

});