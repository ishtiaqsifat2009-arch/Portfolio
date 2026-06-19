const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.nav-links');

if (menu && menuLinks) {
    menu.addEventListener('click', function() {
        menu.classList.toggle('is-active');
        menuLinks.classList.toggle('active');
    });

    menuLinks.addEventListener('click', function() {
        menu.classList.remove('is-active');
        menuLinks.classList.remove('active');
    });
}

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                setTimeout(() => { card.style.opacity = '1'; }, 50);
            } else {
                card.style.opacity = '0';
                setTimeout(() => { card.style.display = 'none'; }, 300);
            }
        });
    });
});


const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target); 
        }
    });
}, {
    threshold: 0,
    rootMargin: "0px 0px -50px 0px" 
});

const hiddenElements = document.querySelectorAll('.hidden-on-scroll');
hiddenElements.forEach((el) => observer.observe(el));
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
const heroText = document.querySelector(".hero-content h1");

if (heroText) {
    heroText.onmouseover = event => {
        let iterations = 0;
        
        const interval = setInterval(() => {
            event.target.innerText = event.target.innerText.split("")
                .map((letter, index) => {
                    if(index < iterations) {
                        return event.target.dataset.value[index];
                    } 
                  
                    return letters[Math.floor(Math.random() * letters.length)];
                })
                .join("");
            
            if(iterations >= event.target.dataset.value.length){ 
                clearInterval(interval);
            }
            
            iterations += 1 / 3;
        }, 30);
    }
}
