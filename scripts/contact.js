
const contactForm = document.getElementById("contact-form");
const msg = document.getElementById("msg");
const submitBtn = document.getElementById("submit-btn");

contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());

    submitBtn.disabled = true;
    msg.textContent = "Sending your message...";

    try {
        const response = await fetch(
            "http://127.0.0.1:5000/api/contact",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }
        );

        const responseText = await response.text();

        let result;

        try {
            result = JSON.parse(responseText);
        } catch {
            throw new Error(
                "Invalid server response. Check your backend."
            );
        }

        if (!response.ok || !result.success) {
            throw new Error(
                result.message || "Submission failed."
            );
        }

        msg.textContent = result.message;
        contactForm.reset();

    } catch (error) {
        console.error("Contact form error:", error);
        msg.textContent =
            error.message || "Something went wrong.";

    } finally {
        submitBtn.disabled = false;
    }

    setTimeout(() => {
        msg.textContent = "";
    }, 3000);
});
