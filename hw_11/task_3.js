function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url.endsWith("/users")) {
        resolve([
          { id: 1, name: "Alice" },
          { id: 2, name: "Bob" },
        ]);
      } else if (url.match(/\/users\/\d+$/)) {
        resolve({ id: 1, name: "Alice", age: 30 });
      } else {
        reject(new Error("404 Not Found"));
      }
    }, 2000);
  });
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function loadUsers() {
  try {
    const users = await fetchData("https://api.example.com/users");
    console.log("Список пользователей:", users);

    await delay(1000);

    const firstUser = await fetchData(
      `https://api.example.com/users/${users[0].id}`
    );
    console.log("Информация о первом пользователе:", firstUser);
  } catch (err) {
    console.error("Ошибка при загрузке данных:", err.message);
  }
}

loadUsers();
