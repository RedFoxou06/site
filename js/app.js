// Attendre que le DOM soit entièrement chargé
document.addEventListener('DOMContentLoaded', function() {

    // Gestion du thème sombre/clair
    function initThemeToggle() {
        // Créer le bouton de toggle
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '🌙';
        themeToggle.setAttribute('aria-label', 'Basculer le thème');
        document.body.appendChild(themeToggle);

        // Vérifier si un thème est déjà sauvegardé
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggle.innerHTML = '☀️';
        }

        // Gérer le clic sur le bouton
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');

            // Mettre à jour l'icône
            if (document.body.classList.contains('dark-mode')) {
                themeToggle.innerHTML = '☀️';
                localStorage.setItem('theme', 'dark');
            } else {
                themeToggle.innerHTML = '🌙';
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // Animation de fadeIn pour la présentation
    function animatePresentationOnLoad() {
        const presentation = document.querySelector('.presentation');
        if (presentation) {
            presentation.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
            presentation.style.opacity = '1';
            presentation.style.transform = 'translateY(0)';
        }
    }

    // Animation au survol des cartes de projets
    function setupProjectCardsAnimations() {
        const projectCards = document.querySelectorAll('.languages, .outils, .valoapp, .homepage, .bowling, .musique, .jeux_video');

        projectCards.forEach(card => {
            const img = card.querySelector('img');

            card.addEventListener('mouseenter', function() {
                // Animation de la carte
                this.style.transition = 'all 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease';
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = 'var(--hover-shadow)';
                this.style.borderColor = 'var(--primary)';

                // Animation de l'image
                if (img) {
                    img.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                    img.style.transform = 'scale(1.08) translateY(-5px)';
                    img.style.boxShadow = '0 20px 40px rgba(140, 215, 255, 0.25)';
                    img.style.filter = 'brightness(1.05) contrast(1.1) saturate(1.2)';
                }

                // Animation de l'overlay (::after)
                if (img && img.querySelector('::after')) {
                    img.style.setProperty('--after-opacity', '1');
                }
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'var(--shadow)';
                this.style.borderColor = 'var(--border-color)';

                if (img) {
                    img.style.transform = 'scale(1) translateY(0)';
                    img.style.boxShadow = '0 8px 25px rgba(140, 215, 255, 0.15)';
                    img.style.filter = 'brightness(0.95) contrast(1.05) saturate(1.1)';
                    img.style.setProperty('--after-opacity', '0');
                }
            });

            // Ajouter la transition CSS pour l'overlay
            const style = document.createElement('style');
            style.textContent = `
                .valoapp img::after, .homepage img::after {
                    transition: opacity 0.3s ease;
                    opacity: var(--after-opacity, 0);
                }
            `;
            document.head.appendChild(style);
        });
    }

    // Animation au survol des boutons (sauf le theme toggle)
    function setupButtonAnimations() {
        const buttons = document.querySelectorAll('button:not(.theme-toggle)');

        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transition = 'all 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease';
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 8px 25px rgba(140, 215, 255, 0.4)';

                // Animation de l'effet de brillance (::before)
                this.style.setProperty('--shine-left', '100%');
            });

            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
                this.style.setProperty('--shine-left', '-100%');
            });

            // Ajouter la transition CSS pour l'effet de brillance
            const style = document.createElement('style');
            style.textContent = `
                button::before {
                    transition: left 0.5s ease;
                    left: var(--shine-left, -100%);
                }
            `;
            document.head.appendChild(style);
        });
    }

    // Animation au survol des éléments de contact
    function setupContactAnimations() {
        const contactItems = document.querySelectorAll('#contact li');
        const contactLinks = document.querySelectorAll('#contact a');

        contactItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transition = 'all 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease';
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 10px 25px rgba(140, 215, 255, 0.3)';
            });

            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 5px 15px rgba(140, 215, 255, 0.2)';
            });
        });

        contactLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transition = 'color 0.3s ease';
            });
        });
    }

    // Animation au focus des champs de formulaire
    function setupFormAnimations() {
        const formInputs = document.querySelectorAll('form input, form textarea');

        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.style.transition = 'all 0.3s ease, border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease';
                this.style.borderColor = 'var(--primary)';
                this.style.boxShadow = '0 0 10px rgba(140, 215, 255, 0.3)';
            });

            input.addEventListener('blur', function() {
                this.style.borderColor = 'var(--border-color)';
                this.style.boxShadow = 'none';
            });
        });
    }

    // Animation du header au scroll
    function setupHeaderScrollAnimation() {
        const header = document.querySelector('header');
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', function() {
            const currentScrollY = window.scrollY;

            if (header) {
                header.style.transition = 'all 0.3s ease';

                // Masquer/afficher le header
                if (currentScrollY > lastScrollY && currentScrollY > 100) {
                    header.classList.add('hidden');
                } else {
                    header.classList.remove('hidden');
                }

                // Optionnel : changer l'apparence du header selon le scroll
                if (currentScrollY > 100) {
                    header.style.backdropFilter = 'blur(15px)';
                } else {
                    header.style.backdropFilter = 'blur(10px)';
                }
            }

            lastScrollY = currentScrollY;
        });
    }

    // Animation d'apparition au scroll (Intersection Observer)
    function setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observer les sections
        const sectionsToAnimate = document.querySelectorAll('#competences, #projects, #contact, #passion');
        sectionsToAnimate.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            observer.observe(section);
        });
    }

    // Initialiser toutes les animations
    function initializeAnimations() {
        initThemeToggle();
        animatePresentationOnLoad();
        setupProjectCardsAnimations();
        setupButtonAnimations();
        setupContactAnimations();
        setupFormAnimations();
        setupHeaderScrollAnimation();
        setupScrollAnimations();
    }

    // Lancer les animations
    initializeAnimations();

    // Animation de la présentation après un court délai pour s'assurer que tout est prêt
    setTimeout(() => {
        animatePresentationOnLoad();
    }, 100);
});