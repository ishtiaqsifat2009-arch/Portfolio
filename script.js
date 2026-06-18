// --- 1. MOBILE HAMBURGER MENU ---
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.nav-links');

if (menu && menuLinks) {
    // Toggle the menu open/closed
    menu.addEventListener('click', function() {
        menu.classList.toggle('is-active');
        menuLinks.classList.toggle('active');
    });

    // Close the menu automatically when a link is clicked
    menuLinks.addEventListener('click', function() {
        menu.classList.remove('is-active');
        menuLinks.classList.remove('active');
    });
}

// --- 2. PROJECT FILTERING ---
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active styling from all buttons, add to the clicked one
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                // Slight delay so the fade-in transition works smoothly
                setTimeout(() => { card.style.opacity = '1'; }, 50);
            } else {
                card.style.opacity = '0';
                // Wait for the fade-out to finish before hiding from layout
                setTimeout(() => { card.style.display = 'none'; }, 300);
            }
        });
    });
});

// --- 3. SCROLL ANIMATIONS ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            // Optional: stop observing once it has animated in once
            observer.unobserve(entry.target); 
        }
    });
}, {
    threshold: 0.1 // Triggers when 10% of the section is visible
});

const hiddenElements = document.querySelectorAll('.hidden-on-scroll');
hiddenElements.forEach((el) => observer.observe(el));

// --- 4. TERMINAL HACKER TEXT EFFECT ---
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
const heroText = document.querySelector(".hero-content h1");

if (heroText) {
    heroText.onmouseover = event => {
        let iterations = 0;
        
        const interval = setInterval(() => {
            event.target.innerText = event.target.innerText.split("")
                .map((letter, index) => {
                    // Reveal the correct letter once iterations pass the index
                    if(index < iterations) {
                        return event.target.dataset.value[index];
                    }
                    // Otherwise, show a random character
                    return letters[Math.floor(Math.random() * letters.length)];
                })
                .join("");
            
            // Stop the effect when the word is complete
            if(iterations >= event.target.dataset.value.length){ 
                clearInterval(interval);
            }
            
            iterations += 1 / 3; // Controls the speed of the reveal
        }, 30);
    }
}
