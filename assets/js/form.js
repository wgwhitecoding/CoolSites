document.addEventListener("DOMContentLoaded", function () {
  /************************************************************
    1. Initialize EmailJS
  *************************************************************/
  emailjs.init("CEelE7ptG6eUWa_nE"); // Replace with your actual EmailJS public key.

  /************************************************************
    2. Progressive Form Logic
  *************************************************************/
  const form = document.getElementById("contactForm");
  const inputs = Array.from(form.querySelectorAll("input, textarea"));
  const progressBar = document.getElementById("formProgressBar");
  const submitButton = form.querySelector("button[type='submit']");
  let progress = 0;

  if (inputs.length > 0) {
    inputs[0].disabled = false; // Enable the first input
  }

  inputs.forEach((input, index) => {
    input.addEventListener("input", () => {
      if (input.checkValidity()) {
        if (index < inputs.length - 1) {
          inputs[index + 1].disabled = false; // Unlock the next field
        }

        progress = ((index + 1) / inputs.length) * 100;
        progressBar.style.width = `${progress}%`;
        progressBar.setAttribute("aria-valuenow", progress);

        if (index === inputs.length - 1 && input.checkValidity()) {
          submitButton.disabled = false; // Enable submit button
        }
      }
    });
  });

  /************************************************************
    3. Form Submission Logic
  *************************************************************/
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page refresh
    submitButton.disabled = true; // Disable the button

    const confirmationModal = new bootstrap.Modal(
      document.getElementById("confirmationModal")
    );
    const modalTitle = document.getElementById("confirmationModalLabel");
    const modalBody = document.querySelector("#confirmationModal .modal-body");

    // Show "Sending..." message
    modalTitle.innerHTML = "Processing...";
    modalBody.innerHTML = "<p>Sending your message, please wait...</p>";
    confirmationModal.show();

    emailjs
      .sendForm("service_aqrdzzp", "template_9c1ch2b", this)
      .then(
        () => {
          // On success: Update modal with success message
          modalTitle.innerHTML = "Message Sent!";
          modalBody.innerHTML = `
            <p class="mb-0">
              Thank you for your message! An auto-reply has been sent to your email. Please check your inbox.
            </p>
          `;

          // Reset form and progress bar
          form.reset();
          progressBar.style.width = "0%";
          progressBar.setAttribute("aria-valuenow", 0);
          submitButton.disabled = true;
          inputs.forEach((input, index) => {
            input.disabled = index !== 0;
          });
        },
        (error) => {
          // On error: Update modal with error message
          console.error("EmailJS Error:", error);
          modalTitle.innerHTML = "Error";
          modalBody.innerHTML = `
            <p class="text-danger mb-0">
              Oops, something went wrong. Please try again later or contact support.
            </p>
          `;
          submitButton.disabled = false; // Re-enable the button
        }
      );
  });
});


  

