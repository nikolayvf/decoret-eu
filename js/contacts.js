document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contact-form");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Collect form data
    const formData = new FormData(contactForm);
    const formValues = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    // Send email using EmailJS
    emailjs.send("service_x7otrcu", "template_3cgll9l", formValues).then(
      function (response) {
        alert("Съобщението беше изпратено успешно!"); // Success message
        contactForm.reset(); // Reset form after successful email
      },
      function (error) {
        alert("Грешка при изпращане на съобщението: " + error.text); // Error message
      }
    );
  });
});
