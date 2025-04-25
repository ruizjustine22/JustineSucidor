document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login-form");
    const message = document.getElementById("login-message");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const username = formData.get("username");
      const password = formData.get("password");

      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        const result = await response.json();

        if (response.ok) {
          message.classList.remove("hidden");
          message.style.color = "green";
          message.textContent = result.message || "Login successful!";
        } else {
          message.classList.remove("hidden");
          message.style.color = "red";
          message.textContent = result.message || "Invalid credentials, try again.";
        }
    } catch (error) {
        message.classList.remove("hidden");
        message.style.color = "red";
        message.textContent = "Something went wrong, please try again.";
      }
    });
  });