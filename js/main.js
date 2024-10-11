document.addEventListener('DOMContentLoaded', initializeApp);

function initializeApp() {
    loadSections().then(() => {
        initializeSkillsCarousel();
        initializeMobileMenu();
        initializeParticles();
        initializeAnimations();
    });

    // Effet de défilement pour le header
    window.addEventListener('scroll', handleHeaderScroll);
}

function loadSections() {
    const sections = ['header', 'mobile-menu', 'hero', 'about', 'skills', 'projects', 'services', 'formations', 'experiences', 'footer'];
    return Promise.all(sections.map(loadSection));
}

function loadSection(section) {
    return fetch(`sections/${section}.html`)
        .then(response => response.text())
        .then(data => {
            document.getElementById(section).innerHTML = data;
            return section;
        });
}

function initializeSkillsCarousel() {
    const skillsCarousel = document.querySelector('.skills-carousel > div');
    const prevSkillBtn = document.getElementById('prevSkill');
    const nextSkillBtn = document.getElementById('nextSkill');
    let currentSkillIndex = 0;
    let intervalId;

    if (!(skillsCarousel && prevSkillBtn && nextSkillBtn)) return;

    function showSkills(index) {
        const skillItems = skillsCarousel.querySelectorAll('.skill-item');
        const maxIndex = skillItems.length - 4;
        currentSkillIndex = Math.max(0, Math.min(index, maxIndex));
        const translateX = currentSkillIndex * -25;
        skillsCarousel.style.transform = `translateX(${translateX}%)`;
    }

    function startCarousel() {
        intervalId = setInterval(() => showSkills(currentSkillIndex + 1), 3000);
    }

    function stopCarousel() {
        clearInterval(intervalId);
    }

    prevSkillBtn.addEventListener('click', () => {
        showSkills(currentSkillIndex - 1);
        stopCarousel();
        startCarousel();
    });

    nextSkillBtn.addEventListener('click', () => {
        showSkills(currentSkillIndex + 1);
        stopCarousel();
        startCarousel();
    });

    skillsCarousel.addEventListener('mouseenter', stopCarousel);
    skillsCarousel.addEventListener('mouseleave', startCarousel);

    showSkills(0);
    startCarousel();
}

function initializeMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMobileMenuButton = document.getElementById('close-mobile-menu');
    const mobileMenu = document.getElementById('mobile-menu');

    console.log('mobileMenuButton:', mobileMenuButton);
    console.log('closeMobileMenuButton:', closeMobileMenuButton);
    console.log('mobileMenu:', mobileMenu);

    if (!(mobileMenuButton && closeMobileMenuButton && mobileMenu)) {
        console.error('Mobile menu elements not found');
        return;
    }

    mobileMenuButton.addEventListener('click', () => {
        console.log('Opening mobile menu');
        console.log('Before:', mobileMenu.classList);
        mobileMenu.classList.toggle('translate-x-full');
        console.log('After:', mobileMenu.classList);
    });

    closeMobileMenuButton.addEventListener('click', () => {
        console.log('Closing mobile menu');
        mobileMenu.classList.add('translate-x-full');
    });

    // Fermer le menu mobile lorsqu'un lien est cliqué
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            console.log('Link clicked, closing menu');
            mobileMenu.classList.add('translate-x-full');
        });
    });
}

function initializeParticles() {
    particlesJS('particles-js', {
        particles: {
            number: { value: 50, density: { enable: true, value_area: 800 } },
            color: { value: "#6366f1" },
            opacity: { value: 0.1, random: false },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#6366f1", opacity: 0.2, width: 1 },
            move: { enable: true, speed: 2, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
        },
        interactivity: {
            detect_on: "canvas",
            events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true },
            modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
        },
        retina_detect: true
    });
}

function initializeAnimations() {
    const animateOnScroll = (elements, animationClass) => {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(animationClass);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2, rootMargin: "0px 0px -50px 0px" });

        elements.forEach(element => observer.observe(element));
    };

    setTimeout(() => {
        animateOnScroll(document.querySelectorAll('.skill-item'), 'animate-fade-in-up');
        animateOnScroll(document.querySelectorAll('.project-card'), 'animate-fade-in-up');
        animateOnScroll(document.querySelectorAll('.service-item'), 'animate-fade-in-up');
    }, 1000);
}

function handleHeaderScroll() {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('bg-white', 'shadow-md');
        } else {
            header.classList.remove('bg-white', 'shadow-md');
        }
    }
}