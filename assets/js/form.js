/************************************************************
  Progressive Form + EmailJS Integration + Modal Trigger
*************************************************************/
document.addEventListener("DOMContentLoaded", function () {
    /************************************************************
      1. Initialize EmailJS
    *************************************************************/
    emailjs.init("CEelE7ptG6eUWa_nE"); 
    // Replace above with your actual PUBLIC KEY if different.
  
    /************************************************************
      2. Progressive Form Logic
    *************************************************************/
    const form = document.getElementById("contactForm");
    const inputs = Array.from(form.querySelectorAll("input, textarea"));
    const progressBar = document.getElementById("formProgressBar");
    const submitButton = form.querySelector("button[type='submit']");
    let progress = 0;
  
    // Enable only the first input at start
    if (inputs.length > 0) {
      inputs[0].disabled = false;
    }
  
    inputs.forEach((input, index) => {
      input.addEventListener("input", () => {
        // Check if current field is valid
        if (input.checkValidity()) {
          // Unlock the next field
          if (index < inputs.length - 1) {
            inputs[index + 1].disabled = false;
          }
  
          // Update progress bar
          progress = ((index + 1) / inputs.length) * 100;
          progressBar.style.width = `${progress}%`;
          progressBar.setAttribute("aria-valuenow", progress);
  
          // If this is the last field and it's valid, enable the submit button
          if (index === inputs.length - 1 && input.checkValidity()) {
            submitButton.disabled = false;
          }
        }
      });
    });
  
    /************************************************************
      3. Form Submission - Send Email via EmailJS
    *************************************************************/
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent page refresh on submit
  
      // Optionally show some "loading" text or spinner here, if desired
  
      // Use EmailJS to send the form
      emailjs
        .sendForm("service_aqrdzzp", "template_9c1ch2b", this)
        .then(
          // Success callback
          () => {
            // Show the confirmation modal
            const confirmationModal = new bootstrap.Modal(
              document.getElementById("confirmationModal")
            );
            confirmationModal.show();
  
            // Reset the form
            form.reset();
  
            // Reset progress bar and disable fields again
            progressBar.style.width = "0%";
            progressBar.setAttribute("aria-valuenow", 0);
            submitButton.disabled = true;
            inputs.forEach((input, index) => {
              // Disable except the first one
              if (index === 0) {
                input.disabled = false;
              } else {
                input.disabled = true;
              }
            });
          },
          // Error callback
          (error) => {
            console.error("EmailJS Error:", error);
            alert(
              "Oops, something went wrong. Please try again later or contact support."
            );
          }
        );
    });
  });
  

