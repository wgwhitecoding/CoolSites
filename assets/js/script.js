/* =========================================================================
   SECTION: Initialise AOS (Animate on Scroll)
   ========================================================================= */
   document.addEventListener("DOMContentLoaded", function () {
    AOS.init({
        duration: 800, // Animation duration in milliseconds
        easing: "ease-in-out", // Animation easing
        once: true, // Whether animation should happen only once
    });
});

/* =========================================================================
   SECTION: Adjust Scroll Position for Cross-Page Navigation
   ========================================================================= */

function adjustScrollPosition() {
    const navbar = document.querySelector(".navbar");

    if (window.location.hash) {
        const targetId = window.location.hash.substring(1); // Remove the '#'
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const navbarHeight = navbar ? navbar.offsetHeight : 0;
            const targetPosition = targetElement.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth",
            });
        }
    }
}


window.addEventListener("load", function () {
    setTimeout(adjustScrollPosition, 100);
});


document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".navbar");

    document.querySelectorAll('a[href^="#"], a[href^="index.html#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const href = this.getAttribute("href") || "";
            if (href.includes("#")) {
                e.preventDefault();

                const parts = href.split("#");
                const targetId = parts[1];

                const onIndexPage = window.location.pathname.endsWith("index.html")
                                     || window.location.pathname.endsWith("/"); 

                if (onIndexPage && href.startsWith("index.html")) {
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        const navbarHeight = navbar ? navbar.offsetHeight : 0;
                        const targetPosition = targetElement.offsetTop - navbarHeight;
                        window.scrollTo({
                            top: targetPosition,
                            behavior: "smooth",
                        });
                    }
                }
                else if (onIndexPage && href.startsWith("#")) {
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        const navbarHeight = navbar ? navbar.offsetHeight : 0;
                        const targetPosition = targetElement.offsetTop - navbarHeight;
                        window.scrollTo({
                            top: targetPosition,
                            behavior: "smooth",
                        });
                    }
                }
                else {
                    window.location.href = href;
                }
            }
        });
    });
});

/* =========================================================================
   SECTION: Sticky Navbar Scroll Effect (Always Active)
   ========================================================================= */
document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".navbar");

    // Toggle .scrolled class based on scrollY
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    handleScroll();

    document.addEventListener("scroll", handleScroll);
});

/* =========================================================================
   SECTION: Highlight Active Navbar Link Based on Scroll Position
   ========================================================================= */
   document.addEventListener("DOMContentLoaded", function () {
    const navbarLinks = document.querySelectorAll(".nav-link");
    const navbar = document.querySelector(".navbar");
    const sections = document.querySelectorAll("section, header[id], div[id]");
    const navbarHeight = navbar ? navbar.offsetHeight : 0;

    function highlightActiveLink() {
        let currentSection = null;

        // Check for scroll position and active section
        sections.forEach((section) => {
            const sectionTop = section.offsetTop - (navbarHeight + 50);
            const sectionBottom = sectionTop + section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                currentSection = section.getAttribute("id");
            }
        });

        navbarLinks.forEach((link) => {
            const href = link.getAttribute("href") || "";
            const linkTarget = href.includes("#") ? href.split("#")[1] : null;

            if (linkTarget === currentSection) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }

    // Check for specific pages like "contact.html"
    function highlightForStaticPage() {
        const currentPath = window.location.pathname;

        navbarLinks.forEach((link) => {
            const href = link.getAttribute("href") || "";

            if (href.includes("contact.html") && currentPath.includes("contact.html")) {
                link.classList.add("active");
            } else if (href.includes("index.html") && currentPath.includes("index.html")) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }

    // Initial check on load
    if (window.location.pathname.includes("contact.html")) {
        highlightForStaticPage(); // Highlight for contact page
    } else {
        highlightActiveLink(); // Highlight based on scroll
    }

    // Reapply scroll-based highlighting for scrollable pages
    document.addEventListener("scroll", function () {
        if (!window.location.pathname.includes("contact.html")) {
            highlightActiveLink();
        }
    });
});


/* =========================================================================
   SECTION: Initialise EmailJS
   ========================================================================= */
document.addEventListener("DOMContentLoaded", function () {
    (function () {
        emailjs.init("your_user_id");
    })();
});

/* =========================================================================
   SECTION: Form Submission Handler
   ========================================================================= */
document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");
    const statusMessage = document.getElementById("statusMessage");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (statusMessage) {
                statusMessage.textContent = "Sending your message...";
                statusMessage.style.color = "#007bff";
            }

            emailjs.sendForm("your_service_id", "your_template_id", this)
                .then(() => {
                    if (statusMessage) {
                        statusMessage.textContent = "Message sent successfully!";
                        statusMessage.style.color = "green";
                    }
                    this.reset();
                })
                .catch((error) => {
                    if (statusMessage) {
                        statusMessage.textContent = "Failed to send your message. Please try again later.";
                        statusMessage.style.color = "red";
                    }
                    console.error("EmailJS Error:", error);
                });
        });
    }
});

/* =========================================================================
   SECTION: Dynamic Year for Footer
   ========================================================================= */
document.addEventListener("DOMContentLoaded", function () {
    const yearSpan = document.getElementById("currentYear");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

/* =========================================================================
   SECTION: Ensure Fade-in Animations Play
   ========================================================================= */
document.addEventListener("DOMContentLoaded", function () {
    const fadeElements = document.querySelectorAll(".fade-in");
    fadeElements.forEach((element) => {
        element.style.animationPlayState = "running";
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("progressiveForm");
    const inputs = Array.from(form.querySelectorAll("input, textarea"));
    const progressBar = document.getElementById("formProgressBar");
    const submitButton = form.querySelector("button[type='submit']");
    let progress = 0;

    // Enable the first input field
    inputs[0].disabled = false;

    inputs.forEach((input, index) => {
        input.addEventListener("input", () => {
            if (input.checkValidity()) {
                // Move to the next input field
                if (index < inputs.length - 1) {
                    inputs[index + 1].disabled = false;
                }
                // Update progress bar
                progress = ((index + 1) / inputs.length) * 100;
                progressBar.style.width = `${progress}%`;
                progressBar.setAttribute("aria-valuenow", progress);

                // Enable submit button if all fields are valid
                if (index === inputs.length - 1 && input.checkValidity()) {
                    submitButton.disabled = false;
                }
            }
        });
    });
});

