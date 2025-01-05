// Initialise AOS (Animate on Scroll)
document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
      duration: 800, // Animation duration in milliseconds
      easing: "ease-in-out", // Animation easing
      once: true, // Whether animation should happen only once
  });

  // Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function (e) {
          e.preventDefault();

          const target = document.querySelector(this.getAttribute("href"));
          if (target) {
              target.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
              });
          }
      });
  });

  // Add Hover Effects for Social Icons
  const socialIcons = document.querySelectorAll(".fab, .fas.fa-info-circle");
  socialIcons.forEach(icon => {
      icon.addEventListener("mouseenter", () => {
          icon.style.color = "#007bff"; // Change colour on hover
      });
      icon.addEventListener("mouseleave", () => {
          icon.style.color = ""; // Reset to original
      });
  });

  // Initialise EmailJS
  (function () {
      emailjs.init("your_user_id"); // Replace "your_user_id" with your actual EmailJS User ID
  })();

  // Form Submission Handler
  const contactForm = document.getElementById("contactForm");
  const statusMessage = document.getElementById("statusMessage");

  if (contactForm) {
      contactForm.addEventListener("submit", function (event) {
          event.preventDefault(); // Prevent default form submission behavior

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

  