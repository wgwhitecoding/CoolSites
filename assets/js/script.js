// SECTION: Initialise AOS (Animate on Scroll)
document.addEventListener("DOMContentLoaded", function () {
    AOS.init({
        duration: 800, // Animation duration in milliseconds
        easing: "ease-in-out", // Animation easing
        once: true, // Whether animation should happen only once
    });
});

// SECTION: Smooth Scroll for Anchor Links with Offset Adjustment and Navbar Collapse Handling
document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".navbar");
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbarCollapse = document.querySelector(".navbar-collapse");

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                // Close the navbar menu if it's open
                if (navbarCollapse && navbarCollapse.classList.contains("show")) {
                    navbarToggler.click(); // Trigger a click to close the navbar
                }

                // Wait for the navbar to fully close before scrolling
                setTimeout(() => {
                    const navbarHeight = navbar.offsetHeight; // Dynamically calculate navbar height
                    const scrollTargetPosition = target.offsetTop - navbarHeight; // Adjust for navbar height

                    // Smooth scroll to the target position
                    window.scrollTo({
                        top: scrollTargetPosition,
                        behavior: "smooth",
                    });
                }, 300); // Delay to ensure the navbar is collapsed
            }
        });
    });
});

// SECTION: Navbar Scroll Effect (Add 'scrolled' Class on Scroll)
document.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});


// SECTION: Highlight Active Navbar Link Based on Scroll Position
document.addEventListener("scroll", function () {
    const sections = document.querySelectorAll("section");
    const navbarLinks = document.querySelectorAll(".nav-link");
    const navbarHeight = document.querySelector(".navbar").offsetHeight;

    let currentSection = null;

    // Loop through sections to determine which one is in the viewport
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight; // Adjust for navbar height
        const sectionBottom = sectionTop + section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            currentSection = section.getAttribute("id"); // Get the section ID
        }
    });

    // Update navbar links
    navbarLinks.forEach(link => {
        const linkTarget = link.getAttribute("href").slice(1); // Remove '#' from href
        if (linkTarget === currentSection) {
            link.classList.add("active"); // Add active class
        } else {
            link.classList.remove("active"); // Remove active class
        }
    });
});



// SECTION: Initialise EmailJS
document.addEventListener("DOMContentLoaded", function () {
    (function () {
        emailjs.init("your_user_id"); // Replace "your_user_id" with your actual EmailJS User ID
    })();
});

// SECTION: Form Submission Handler
document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");
    const statusMessage = document.getElementById("statusMessage");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent default form submission behaviour

            // Update status message to indicate sending
            if (statusMessage) {
                statusMessage.textContent = "Sending your message...";
                statusMessage.style.color = "#007bff"; // Blue colour for progress
            }

            // Send the form data using EmailJS
            emailjs
                .sendForm("your_service_id", "your_template_id", this) // Replace with your Service ID and Template ID
                .then(() => {
                    // Success: Update the status message
                    if (statusMessage) {
                        statusMessage.textContent = "Message sent successfully!";
                        statusMessage.style.color = "green"; // Green colour for success
                    }
                    this.reset(); // Reset the form
                })
                .catch((error) => {
                    // Error: Update the status message with error feedback
                    if (statusMessage) {
                        statusMessage.textContent = "Failed to send your message. Please try again later.";
                        statusMessage.style.color = "red"; // Red colour for errors
                    }
                    console.error("EmailJS Error:", error); // Log the error for debugging
                });
        });
    }
});

// SECTION: Typewriter Effect for Headers with Specific Delay for "About Me"
document.addEventListener("DOMContentLoaded", function () {
    const headers = [
        "#features h2",
        "#pricing h2",
        "#contact h2"
    ]; // Exclude #about h2 from typing effect or any JS logic

    // Observer for the headers (excluding #about)
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const element = entry.target;

                    // Start typing effect for other sections
                    startTypingEffect(element);

                    observer.unobserve(element); // Stop observing after triggering
                }
            });
        },
        { threshold: 0.5 } // Trigger when 50% of the header is visible
    );

    // Observe each header except #about
    headers.forEach((selector) => {
        const element = document.querySelector(selector);
        if (element) {
            observer.observe(element);
        }
    });

    // Function to handle the typing effect
    function startTypingEffect(element) {
        element.style.visibility = "visible"; // Make text visible immediately
        const text = element.textContent.trim(); // Store the original text
        element.textContent = ""; // Clear the header text
        let index = 0;

        const interval = setInterval(() => {
            element.textContent += text[index]; // Add one character
            index++;

            if (index === text.length) {
                clearInterval(interval); // Stop typing
            }
        }, 200); // Typing speed in milliseconds (adjust as needed)
    }
});


