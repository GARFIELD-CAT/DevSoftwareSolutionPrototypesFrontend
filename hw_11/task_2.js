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

fetchData("https://api.example.com/users")
  .then((users) => {
    console.log("Список пользователей:", users);

    const firstUserId = users[0].id;
    return fetchData(`https://api.example.com/users/${firstUserId}`);
  })
  .then((firstUserInfo) => {
    console.log("Информация о первом пользователе:", firstUserInfo);
  })
  .catch((err) => {
    console.error("Ошибка при загрузке данных:", err.message);
  });
