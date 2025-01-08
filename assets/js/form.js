/* =========================================================================
   SECTION: Initialise EmailJS
   ========================================================================= */
   document.addEventListener("DOMContentLoaded", function () {
    (function () {
        // Replace "your_user_id" with your EmailJS user ID
        emailjs.init("CEelE7ptG6eUWa_nE");
    })();
});

/* =========================================================================
   SECTION: Form Submission Handler
   ========================================================================= */
document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("progressiveForm");
    const statusMessage = document.getElementById("statusMessage");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (statusMessage) {
                statusMessage.textContent = "Sending your message...";
                statusMessage.style.color = "#007bff"; // Blue
            }

            // Replace "your_service_id" and "your_template_id" with your EmailJS service and template IDs
            emailjs.sendForm("service_aqrdzzp", "template_9c1ch2b", this)
                .then(() => {
                    if (statusMessage) {
                        statusMessage.textContent = "Message sent successfully!";
                        statusMessage.style.color = "green"; // Green
                    }
                    this.reset(); // Reset the form after successful submission
                })
                .catch((error) => {
                    if (statusMessage) {
                        statusMessage.textContent = "Failed to send your message. Please try again later.";
                        statusMessage.style.color = "red"; // Red
                    }
                    console.error("EmailJS Error:", error);
                });
        });
    }
});

/* =========================================================================
   SECTION: form
   ========================================================================= */
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
