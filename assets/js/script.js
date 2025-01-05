// Initialize EmailJS
(function() {
    emailjs.init("your_user_id"); // Replace with your EmailJS User ID
  })();
  
  // Form Submission Handler
  document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const statusMessage = document.getElementById("statusMessage");
    statusMessage.textContent = "Sending your message...";
  
    emailjs.sendForm("your_service_id", "your_template_id", this)
      .then(() => {
        statusMessage.textContent = "Message sent successfully!";
        statusMessage.style.color = "green";
        this.reset();
      })
      .catch(() => {
        statusMessage.textContent = "Failed to send your message. Please try again later.";
        statusMessage.style.color = "red";
      });
  });
  