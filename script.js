document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-black/80', 'backdrop-blur-xl', 'border-b', 'border-cyan-400/30', 'shadow-lg', 'shadow-cyan-400/20');
        } else {
            navbar.classList.remove('bg-black/80', 'backdrop-blur-xl', 'border-b', 'border-cyan-400/30', 'shadow-lg', 'shadow-cyan-400/20');
        }
    });

    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex'); // Show as flex column
        });

        // Close mobile menu when a link is clicked
        mobileMenu.querySelectorAll('button[data-section]').forEach(button => {
            button.addEventListener('click', () => {
                if (!mobileMenu.classList.contains('hidden')) { // Only close if it's open
                    mobileMenu.classList.add('hidden');
                    mobileMenu.classList.remove('flex');
                }
            });
        });
    }

    // --- Smooth Scrolling for Navbar Links and Buttons ---
    document.querySelectorAll('nav button[data-section], #view-projects-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            let sectionId;
            if (e.currentTarget.id === 'view-projects-btn') {
                sectionId = 'projects';
            } else {
                sectionId = e.currentTarget.dataset.section;
            }
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- Hire Me Button Scroll to Contact ---
    const hireMeBtn = document.querySelector('.hero-content button:first-child'); // Assuming "Hire Me" is the first button in hero-content
    if (hireMeBtn) {
        hireMeBtn.addEventListener('click', () => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // --- Animated Text Component ---
    function animateText(element) {
        const text = element.dataset.text;
        const delay = parseInt(element.dataset.delay || '0');
        let i = 0;
        let displayText = '';
        element.style.opacity = '0'; // Start hidden

        setTimeout(() => {
            element.style.opacity = '1';
            const interval = setInterval(() => {
                displayText = text.slice(0, i + 1);
                element.textContent = displayText;
                // Add blinking cursor
                element.innerHTML += '<span class="animate-pulse-custom">|</span>';
                i++;
                if (i >= text.length) {
                    clearInterval(interval);
                    // Remove blinking cursor after animation
                    element.innerHTML = text;
                }
            }, 50);
        }, delay);
    }

    document.querySelectorAll('.animated-text').forEach(animateText);

    // --- Floating Particles Background ---
    function ParticleBackground(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Clear existing particles if any, to prevent duplicates on re-init
        container.innerHTML = '';

        const particles = Array.from({ length: 50 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 0.1, // Reduced speed for smoother movement
            speedY: (Math.random() - 0.5) * 0.1, // Reduced speed for smoother movement
            element: null
        }));

        particles.forEach(p => {
            const div = document.createElement('div');
            div.className = "absolute bg-cyan-400/20 rounded-full animate-pulse-custom";
            div.style.width = `${p.size}px`;
            div.style.height = `${p.size}px`;
            div.style.left = `${p.x}%`;
            div.style.top = `${p.y}%`;
            p.element = div;
            container.appendChild(div);
        });

        function animateParticles() {
            particles.forEach(p => {
                p.x = (p.x + p.speedX + 100) % 100;
                p.y = (p.y + p.speedY + 100) % 100;
                p.element.style.left = `${p.x}%`;
                p.element.style.top = `${p.y}%`;
            });
            requestAnimationFrame(animateParticles);
        }
        requestAnimationFrame(animateParticles);
    }
    // Initialize for home, skills, and achievements sections. Ensure these elements exist.
    ParticleBackground('particle-background-container'); // for home section
    ParticleBackground('particle-background-container-skills'); // for skills section
    ParticleBackground('particle-background-container-achievements'); // for achievements section
    ParticleBackground('particle-background-container-education'); // for education section


    // --- Matrix Rain Effect ---
    function MatrixRain(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Clear existing drops if any
        container.innerHTML = '';

        const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        const drops = Array.from({ length: 15 }, (_, i) => {
            const div = document.createElement('div');
            div.className = "absolute text-cyan-400 text-xs font-mono matrix-drop";
            div.style.left = `${Math.random() * 100}%`;
            div.style.top = '0%';
            div.style.animationDuration = `${Math.random() * 5 + 5}s`; // Vary animation duration
            div.style.animationDelay = `${Math.random() * -5}s`; // Stagger animation start

            let chars = '';
            for (let j = 0; j < 20; j++) {
                chars += `<div class="opacity-70">${characters[Math.floor(Math.random() * characters.length)]}</div>`;
            }
            div.innerHTML = chars;
            container.appendChild(div);
            return { element: div, characters: chars.split(/(<div class="opacity-70">|<\/div>)/).filter(Boolean) };
        });

        let lastFrameTime = 0;
        const frameInterval = 300; // Update characters every 300ms

        function animateMatrix(currentTime) {
            if (currentTime - lastFrameTime > frameInterval) {
                drops.forEach(drop => {
                    let newChars = '';
                    for (let j = 0; j < 20; j++) {
                        newChars += `<div class="opacity-70">${characters[Math.floor(Math.random() * characters.length)]}</div>`;
                    }
                    drop.element.innerHTML = newChars;
                });
                lastFrameTime = currentTime;
            }
            requestAnimationFrame(animateMatrix);
        }
        requestAnimationFrame(animateMatrix);
    }
    MatrixRain('matrix-rain-container'); // for home section


    // --- Mouse Orb Effect - remains fixed as it is meant to be global ---
    const mouseOrb = document.getElementById('mouse-orb');
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentOrbX = 0;
    let currentOrbY = 0;
    const easingFactor = 0.1; // Controls how quickly the orb follows the mouse

    if (mouseOrb) {
        window.addEventListener('mousemove', (e) => {
            targetMouseX = e.clientX;
            targetMouseY = e.clientY;
        });

        function animateOrb() {
            currentOrbX += (targetMouseX - currentOrbX) * easingFactor;
            currentOrbY += (targetMouseY - currentOrbY) * easingFactor;
            
            // Positions the fixed orb relative to the viewport
            mouseOrb.style.left = `${currentOrbX - mouseOrb.offsetWidth / 2}px`;
            mouseOrb.style.top = `${currentOrbY - mouseOrb.offsetHeight / 2}px`;
            
            requestAnimationFrame(animateOrb);
        }
        requestAnimationFrame(animateOrb);
    }

    // --- Section Visibility with Intersection Observer ---
    const sectionObserverOptions = {
        root: null, // observe the viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the section is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionContent = entry.target.querySelector('.section-content') || entry.target.querySelector('.hero-content');
                const heroAvatar = entry.target.querySelector('.hero-avatar');

                if (sectionContent) {
                    sectionContent.classList.remove('opacity-0', 'translate-y-10', '-translate-x-10', 'translate-x-10');
                    sectionContent.classList.add('opacity-100', 'translate-y-0', 'translate-x-0');
                }
                if (heroAvatar) {
                    heroAvatar.classList.remove('opacity-0', 'translate-x-10');
                    heroAvatar.classList.add('opacity-100', 'translate-x-0');
                }
                
                // Animate skill bars and individual skill items when skills section is visible
                if (entry.target.id === 'skills') {
                    document.querySelectorAll('#skills .skill-bar-level').forEach((bar, index) => {
                        const level = parseInt(bar.dataset.level);
                        setTimeout(() => {
                            bar.style.width = `${level}%`;
                        }, index * 100 + 500); // Stagger animation for skill bars
                    });
                    // Animate individual skill cards
                    document.querySelectorAll('#skills .grid > div').forEach((skillCard, index) => {
                        setTimeout(() => {
                            skillCard.classList.remove('opacity-0', 'translate-y-10');
                            skillCard.classList.add('opacity-100', 'translate-y-0');
                        }, index * 100 + 200); // Stagger the reveal of each skill card
                    });
                }
                
                // Animate individual project items when projects section is visible
                if (entry.target.id === 'projects') {
                    document.querySelectorAll('#projects-container > div').forEach((projectCard, index) => {
                        setTimeout(() => {
                            projectCard.classList.remove('opacity-0', 'translate-y-10');
                            projectCard.classList.add('opacity-100', 'translate-y-0');
                        }, index * 100 + 200); // Stagger the reveal of each project card
                    });
                }

                // Animate individual achievement items when achievements section is visible
                if (entry.target.id === 'achievements') {
                    document.querySelectorAll('#achievements-container > div').forEach((achievementCard, index) => {
                        setTimeout(() => {
                            achievementCard.classList.remove('opacity-0', 'translate-y-10');
                            achievementCard.classList.add('opacity-100', 'translate-y-0');
                        }, index * 100 + 200); // Stagger the reveal of each achievement card
                    });
                }

                // Animate individual timeline items when education section is visible
                if (entry.target.id === 'education') {
                    document.querySelectorAll('#education-timeline-container .timeline-item').forEach((timelineItem, index) => {
                        setTimeout(() => {
                            timelineItem.classList.remove('opacity-0', 'translate-x-20', '-translate-x-20'); // Remove initial translation
                            timelineItem.classList.add('opacity-100', 'translate-x-0'); // Add the final state
                        }, index * 150 + 200); // Stagger the reveal of each timeline item
                    });
                }

                // Animate individual social links when contact section is visible
                if (entry.target.id === 'contact') {
                    document.querySelectorAll('#social-links > a').forEach((socialLink, index) => {
                        setTimeout(() => {
                            socialLink.classList.remove('opacity-0', 'translate-y-10');
                            socialLink.classList.add('opacity-100', 'translate-y-0');
                        }, index * 100 + 200); // Stagger the reveal of each social link
                    });
                }

                // Unobserve sections once they've animated in to save resources
                // Commented out to allow re-animation on scroll up/down if section becomes hidden then visible again.
                // observer.unobserve(entry.target); 
            } else {
                // If section is not intersecting, reset its state to hidden for re-animation on scroll back
                const sectionContent = entry.target.querySelector('.section-content') || entry.target.querySelector('.hero-content');
                const heroAvatar = entry.target.querySelector('.hero-avatar');

                if (sectionContent && entry.target.id !== 'hero') { // Don't hide hero content when scrolling down
                    sectionContent.classList.add('opacity-0', 'translate-y-10');
                }
                if (heroAvatar) {
                    heroAvatar.classList.add('opacity-0', 'translate-x-10');
                }

                if (entry.target.id === 'skills') {
                    document.querySelectorAll('#skills .skill-bar-level').forEach(bar => {
                        bar.style.width = '0%'; // Reset skill bar width
                    });
                    document.querySelectorAll('#skills .grid > div').forEach(skillCard => {
                        skillCard.classList.add('opacity-0', 'translate-y-10'); // Reset skill card position
                    });
                }

                if (entry.target.id === 'projects') {
                    document.querySelectorAll('#projects-container > div').forEach(projectCard => {
                        projectCard.classList.add('opacity-0', 'translate-y-10');
                    });
                }

                if (entry.target.id === 'achievements') {
                    document.querySelectorAll('#achievements-container > div').forEach(achievementCard => {
                        achievementCard.classList.add('opacity-0', 'translate-y-10');
                    });
                }

                if (entry.target.id === 'education') {
                    document.querySelectorAll('#education-timeline-container .timeline-item').forEach((timelineItem, index) => {
                        const isLeft = index % 2 === 0;
                        const translateClass = isLeft ? '-translate-x-20' : 'translate-x-20';
                        timelineItem.classList.add('opacity-0', translateClass);
                    });
                }

                if (entry.target.id === 'contact') {
                    document.querySelectorAll('#social-links > a').forEach(socialLink => {
                        socialLink.classList.add('opacity-0', 'translate-y-10');
                    });
                }
            }
        });
    }, sectionObserverOptions);
        // --- Skills Data (NEW) ---
    const skillsData = [
        { name: "Python", image: "https://placehold.co/150x150/333/FFF?text=Python" },
        { name: "HTML/CSS", image: "https://placehold.co/150x150/333/FFF?text=HTML/CSS" },
        { name: "React", image: "https://placehold.co/150x150/333/FFF?text=React" },
        { name: "TensorFlow", image: "https://placehold.co/150x150/333/FFF?text=TensorFlow" },
        { name: "OpenCV", image: "https://placehold.co/150x150/333/FFF?text=OpenCV" },
        { name: "Power BI", image: "https://placehold.co/150x150/333/FFF?text=Power+BI" }
    ];

    function populateSkillsSlider() {
        const skillsSliderTrack = document.getElementById('skills-slider-track');
        if (!skillsSliderTrack) return;
        skillsSliderTrack.innerHTML = ''; // Clear existing content

        // Duplicate skills for seamless infinite scroll
        const allSkills = [...skillsData, ...skillsData]; // Duplicate the array

        allSkills.forEach(skill => {
            const img = document.createElement('img');
            img.src = skill.image;
            img.alt = skill.name;
            img.onerror = function() { this.src = `https://placehold.co/150x150/333/FFF?text=${encodeURIComponent(skill.name)}`; };
            skillsSliderTrack.appendChild(img);
        });
    }

    // Observe all sections that need animation on scroll
    document.querySelectorAll('.snap-section').forEach(section => {
        sectionObserver.observe(section);
    });

    // --- Populate Projects Section ---
    const projectsData = [
        {
            title: "RC Car using NRF2041",
            desc: "Wireless controlled car using NRF module for IoT & robotics applications with real-time communication.",
            tech: ["IoT", "NRF2041", "C++"],
            icon: "🚗",
            color: "from-purple-400 to-pink-400"
        },
        {
            title: "IoT Smart Container",
            desc: "A sensor-based container system connected via IoT for smart monitoring and automated alerts.",
            tech: ["IoT", "Sensors", "Python"],
            icon: "📦",
            color: "from-green-400 to-blue-400"
        },
        {
            title: "Sales Forecasting Dashboard",
            desc: "Prophet-powered forecasting system visualized in Power BI for comprehensive business analytics.",
            tech: ["Python", "Prophet", "Power BI"],
            icon: "📈",
            color: "from-yellow-400 to-orange-400"
        },
        {
            title: "Churn Prediction System",
            desc: "Advanced machine learning model predicting telecom customer churn with 95% accuracy using ensemble methods.",
            tech: ["Python", "Scikit-learn", "ML"],
            icon: "🎯",
            color: "from-red-400 to-purple-400"
        },
    ];

    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer) {
        projectsData.forEach((proj, index) => {
            const projectDiv = document.createElement('div');
            projectDiv.className = `group relative bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg border border-cyan-400/30 hover:border-cyan-400 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-400/30 cursor-pointer translate-y-10 opacity-0`; // Initial hidden state
            
            const techBadges = proj.tech.map(tech => `
                <span class="bg-cyan-400/10 text-cyan-400 px-3 py-1 rounded-full text-xs font-medium border border-cyan-400/30 hover:bg-cyan-400/20 transition-all duration-300 transform hover:scale-105">
                    ${tech}
                </span>
            `).join('');

            projectDiv.innerHTML = `
                <div class="absolute inset-0 bg-gradient-to-br ${proj.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-lg"></div>
                
                <div class="relative z-10">
                    <div class="flex justify-between items-start mb-4">
                        <div class="flex items-center gap-3">
                            <div class="text-2xl">${proj.icon}</div>
                            <h3 class="text-xl text-cyan-400 font-semibold font-mono group-hover:text-white transition-colors duration-300">
                                ${proj.title}
                            </h3>
                        </div>
                        <a href="#" target="_blank" rel="noopener noreferrer" class="external-link-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-gray-400 hover:text-cyan-400 cursor-pointer transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-12"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                        </a>
                    </div>
                    
                    <p class="text-gray-300 text-sm mb-4 text-left leading-relaxed">
                        ${proj.desc}
                    </p>
                    
                    <div class="flex flex-wrap gap-2">
                        ${techBadges}
                    </div>
                </div>
                
                <div class="absolute inset-0 bg-gradient-to-t from-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg pointer-events-none"></div>
            `;
            projectsContainer.appendChild(projectDiv);
        });
    }

    // --- Populate Achievements Section ---
    const achievementsData = [
        {
            title: "Google AI/ML Certification",
            description: "Completed the Google AI/ML Professional Certificate, mastering advanced machine learning concepts and applications.",
            icon: "🏆", // Trophy emoji
            color: "from-blue-500 to-indigo-500"
        },
        {
            title: "Hackathon Winner 2023",
            description: "Led a team to victory in the annual university hackathon, developing an innovative solution for smart city logistics.",
            icon: "🥇", // Gold medal emoji
            color: "from-yellow-500 to-orange-500"
        },
        {
            title: "Published Research Paper",
            description: "Co-authored a research paper on predictive analytics for renewable energy, published in a peer-reviewed journal.",
            icon: "📄", // Document emoji
            color: "from-green-500 to-teal-500"
        },
        {
            title: "Community Service Award",
            description: "Recognized for significant contributions to local community tech initiatives, providing free coding workshops.",
            icon: "🙌", // Hands clapping emoji
            color: "from-red-500 to-pink-500"
        }
    ];

    const achievementsContainer = document.getElementById('achievements-container');
    if (achievementsContainer) {
        achievementsData.forEach((achievement, index) => {
            const achievementDiv = document.createElement('div');
            achievementDiv.className = `group relative bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg border border-cyan-400/30 hover:border-cyan-400 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-400/30 cursor-pointer translate-y-10 opacity-0`; // Initial hidden state
            
            achievementDiv.innerHTML = `
                <div class="absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-lg"></div>
                
                <div class="relative z-10 text-center">
                    <div class="text-4xl mb-4">${achievement.icon}</div>
                    <h3 class="text-xl text-cyan-400 font-semibold font-mono group-hover:text-white transition-colors duration-300 mb-2">
                        ${achievement.title}
                    </h3>
                    <p class="text-gray-300 text-sm leading-relaxed">
                        ${achievement.description}
                    </p>
                </div>
            `;
            achievementsContainer.appendChild(achievementDiv);
        });
    }

    // --- Populate Education Section (Timeline Effect) ---
    const educationData = [
        {
            degree: "B.Tech CSE (AI/ML)",
            institution: "Brainware University, Barasat",
            period: "2023 - Present",
            description: "Currently pursuing a Bachelor of Technology in Computer Science with specialization in Artificial Intelligence and Machine Learning.",
            icon: "🎓"
        },
        {
            degree: "PCM (With Computer Science)",
            institution: "Delhi Public School, Durgapur",
            period: "2022 - 2023",
            description: "Completed Higher Secondary Education with a focus on Physics, Chemistry, Mathematics, and Computer Science.",
            icon: "📚"
        }
    ];

    const educationTimelineContainer = document.getElementById('education-timeline-container');
    if (educationTimelineContainer) {
        educationData.forEach((entry, index) => {
            const isLeft = index % 2 === 0; // Alternate left/right alignment
            const contentAlignClass = isLeft ? 'md:text-right' : 'md:text-left';
            const contentMarginClass = isLeft ? 'md:mr-10' : 'md:ml-10'; // Margin to push content away from center line
            const arrowClass = isLeft ? 'md:border-l-8 md:border-l-gray-800/80 md:right-full md:translate-x-full' : 'md:border-r-8 md:border-r-gray-800/80 md:left-full md:-translate-x-full';
            const translateClass = isLeft ? '-translate-x-20' : 'translate-x-20'; // Initial animation direction, increased for visibility
            const flexOrderClass = isLeft ? 'md:flex-row-reverse' : 'md:flex-row'; // For desktop flex ordering

            const timelineItemDiv = document.createElement('div');
            timelineItemDiv.className = `timeline-item flex flex-col items-center mb-16 last:mb-0 relative transition-all duration-700 ${translateClass} opacity-0 ${flexOrderClass}`;
            
            timelineItemDiv.innerHTML = `
                <div class="flex-shrink-0 w-full md:w-auto flex justify-center mb-4 md:mb-0 md:absolute md:left-1/2 md:-translate-x-1/2 md:z-10">
                    <div class="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 text-white border-2 border-blue-200/50 shadow-lg">
                        <span class="text-xl">${entry.icon}</span>
                    </div>
                </div>

                <div class="timeline-content w-full md:w-1/2 p-6 sm:p-8 rounded-lg bg-gray-800/80 backdrop-blur-sm border border-blue-400/30 hover:border-blue-400/60 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-400/20 relative ${contentMarginClass} ${contentAlignClass}">
                    <div class="absolute w-0 h-0 border-t-8 border-b-8 border-t-transparent border-b-transparent top-1/2 -translate-y-1/2 hidden md:block ${arrowClass}"></div>
                    
                    <h3 class="font-semibold text-white text-lg sm:text-xl mb-1">${entry.degree}</h3>
                    <p class="text-sm sm:text-base text-gray-400 mb-2">${entry.institution} - ${entry.period}</p>
                    <p class="text-sm sm:text-base text-gray-300 leading-relaxed">${entry.description}</p>
                </div>
            `;
            
            educationTimelineContainer.appendChild(timelineItemDiv);
        });
    }


    // --- Populate Social Links in Footer ---
    const socialLinksData = [
        { href: "https://www.linkedin.com/in/karan-jogi-4592b0285/", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 transition-transform duration-300 group-hover:rotate-12"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`, label: "LinkedIn" },
        { href: "https://www.instagram.com/itskaran00007", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 transition-transform duration-300 group-hover:rotate-12"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.5" y1="6.5" y2="6.5"/></svg>`, label: "Instagram" },
        { href: "https://github.com/KARAN-1309", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="0" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 transition-transform duration-300 group-hover:rotate-12"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.835 2.809 1.305 3.492.998.108-.77.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.399.006 0 .012 0 .018 0 1.02-.001 2.046.133 3.004.399 2.292-1.552 3.299-1.23 3.299-1.23.653 1.653.242 2.873.118 3.176.767.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.923.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.8.576C20.566 22.186 24 17.684 24 12c0-6.627-5.373-12-12-12z"/></svg>`, label: "GitHub" },
        { href: "mailto:karan@example.com", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 transition-transform duration-300 group-hover:rotate-12"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`, label: "Email" }
    ];

    const socialLinksContainer = document.getElementById('social-links');
    if (socialLinksContainer) {
        socialLinksData.forEach((social, index) => {
            const anchor = document.createElement('a');
            anchor.href = social.href;
            anchor.target = "_blank";
            anchor.rel = "noopener noreferrer";
            anchor.className = `group relative bg-gray-800/80 backdrop-blur-sm p-4 rounded-full border border-cyan-400/30 hover:border-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-cyan-400/50 translate-y-10 opacity-0`; // Initial hidden state
            anchor.innerHTML = `
                ${social.icon}
                <span class="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    ${social.label}
                </span>
            `;
            socialLinksContainer.appendChild(anchor);
        });
    }

});
// ... (your existing JavaScript code) ...

// Data for skills
const skillsData = [
    { name: "Python", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
    { name: "TensorFlow", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg" },
    { name: "PyTorch", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg" },
    { name: "Scikit-learn", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg" },
    { name: "Pandas", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg" },
    { name: "NumPy", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg" },
    { name: "OpenCV", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg" },
    { name: "Jupyter", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original.svg" },
    { name: "Google Cloud", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg" },
    { name: "AWS", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
    { name: "Docker", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
    { name: "Git", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
    { name: "SQL", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original-wordmark.svg" }, // Using MySQL as a common SQL icon
    { name: "HTML5", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
    { name: "CSS3", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
    { name: "JavaScript", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
    { name: "TailwindCSS", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
    { name: "C++", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" }
    // Add more skills as needed
];

function populateSkillsSlider() {
    const skillsSliderTrack = document.getElementById('skills-slider-track');
    if (skillsSliderTrack) {
        // Duplicate the skills to create a seamless loop
        const allSkills = [...skillsData, ...skillsData];

        allSkills.forEach(skill => {
            const img = document.createElement('img');
            img.src = skill.image;
            img.alt = skill.name;
            img.title = skill.name; // Add title for tooltip on hover
            img.className = 'skill-icon'; // Add a class for potential specific styling
            img.onerror = function() {
                this.onerror = null;
                this.src = `https://placehold.co/100x100/333/FFF?text=${encodeURIComponent(skill.name.split(' ')[0])}`;
            };
            skillsSliderTrack.appendChild(img);
        });
    }
}

// Call the function when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // ... (your existing DOMContentLoaded code) ...

    populateSkillsSlider(); // Call the skills population function
    // ... (other functions you call) ...
});

// ... (rest of your existing JavaScript code) ...