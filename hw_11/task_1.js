// Синхронный стек вызовов — выполняется сразу
console.log("Синхронный код 1");

setTimeout(() => {
  // Помещается в очередь macrotask,
  // выполнится после всех microtask-ов текущего тика
  console.log("setTimeout 1");
}, 0);

Promise.resolve().then(() => {
  // then-callback — microtask,
  // попадает в очередь microtask текущего тика
  console.log("Promise 1");
});

console.log("Синхронный код 2");

/*
  Порядок вывода:

  1. "Синхронный код 1"      ← стек вызовов (call stack)
  2. "Синхронный код 2"      ← стек вызовов
  3. "Promise 1"             ← очередь microtask'ов
  4. "setTimeout 1"          ← очередь macrotask'ов (callback queue)

  Причина: после выполнения всего синхронного кода
  Event Loop сначала опустошает microtask-очередь,
  и только потом берёт первую macrotask (setTimeout).
*/
