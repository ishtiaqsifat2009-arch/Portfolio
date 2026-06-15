document.addEventListener("DOMContentLoaded", () => {
    const welcomeTitle = document.getElementById("welcome-title");
    const currentHour = new Date().getHours();
    let greeting = "Welcome";

    // Dynamic monochrome greeting based on time
    if (currentHour < 12) {
        greeting = "Good Morning.";
    } else if (currentHour < 18) {
        greeting = "Good Afternoon.";
    } else {
        greeting = "Good Evening.";
    }

    // Apply the text with a quick fade-in effect via JS
    welcomeTitle.style.opacity = 0;
    welcomeTitle.innerText = greeting;
    
    setTimeout(() => {
        welcomeTitle.style.transition = "opacity 1s ease";
        welcomeTitle.style.opacity = 1;
    }, 100);
});
