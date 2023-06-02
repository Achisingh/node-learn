const p = new Promise((res, rej) => {
  setTimeout(() => {
    rej(new Error("something has gone wrong"));
  }, 2000);
});

p.then((result) => console.log("Result", result)).catch((err) =>
  console.log(err.message)
);
