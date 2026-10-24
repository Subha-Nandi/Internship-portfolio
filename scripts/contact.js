
const contactForm = document.getElementById("contact-form");
const msg = document.getElementById("msg");
const submitBtn = document.getElementById("submit-btn");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    const name = contactForm.querySelector('[name="name"]').value;
    const email = contactForm.querySelector('[name="email"]').value;
    const message = contactForm.querySelector('[name="message"]').value;

    msg.textContent = `Thank you, ${name}! Your form has been submitted.`;

    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);

    contactForm.reset();

    submitBtn.disabled = true;

    setTimeout(() => {
        msg.textContent = "";
        submitBtn.disabled = false;
    }, 3000);
});
