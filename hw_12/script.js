document.addEventListener("DOMContentLoaded", () => {
  const authStatusDiv = document.getElementById("auth-status");
  const loginButton = document.getElementById("login-button");
  const logoutButton = document.getElementById("logout-button");
  const networkStatusDiv = document.getElementById("network-status");

  function updateAuthStatus() {
    const token = localStorage.getItem("token");
    if (token) {
      const username =
        localStorage.getItem("email") || "Неизвестный пользователь";
      authStatusDiv.textContent = `Привет, ${username}!`;
      loginButton.style.display = "none";
      logoutButton.style.display = "block";
    } else {
      authStatusDiv.textContent = "";
      loginButton.style.display = "block";
      logoutButton.style.display = "none";
    }
  }

  function updateNetworkStatus() {
    if (navigator.onLine) {
      networkStatusDiv.textContent = "Соединение восстановлено";
      networkStatusDiv.classList.add("online");
      networkStatusDiv.style.display = "block";
      setTimeout(() => {
        networkStatusDiv.style.display = "none";
        networkStatusDiv.classList.remove("online");
      }, 3000);
    } else {
      networkStatusDiv.textContent = "Вы в офлайне";
      networkStatusDiv.classList.remove("online");
      networkStatusDiv.style.display = "block";
    }
  }

  loginButton.addEventListener("click", () => {
    window.location.href = "login.html";
  });

  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    updateAuthStatus();
    window.location.href = "login.html";
  });

  function checkToken() {
    const token = localStorage.getItem("token");

    if (!token) {
      //   localStorage.removeItem("email");
      //   localStorage.removeItem("token");

      localStorage.clear();

      window.location.href = "login.html";
    }
  }

  // Инициализация
  updateAuthStatus();
  updateNetworkStatus();
  window.addEventListener("online", updateNetworkStatus);
  window.addEventListener("offline", updateNetworkStatus);
  checkToken();
});
