document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const loginError = document.getElementById("login-error");

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    if (!isValidEmail(email)) {
      loginError.textContent = "Некорректный формат email";
      return;
    }

    if (password.length < 6) {
      loginError.textContent = "Пароль должен содержать не менее 6 символов";
      return;
    }

    fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка авторизации");
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", email);
        window.location.href = "index.html";
      })
      .catch((error) => {
        loginError.textContent = "Неверный email или пароль";
        console.error("Ошибка авторизации:", error);
      });
  });
});
