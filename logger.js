// getUser(1)
//   .then((e) => getRepo(e))
//   .then((e) => repo(e));

async function getResult() {
  try {
    const user = await getUser(1);
    const reposit = await getRepo(user);
    await repo(reposit);
  } catch (err) {
    console.log(err.message);
  }
}
getResult();

function user(user) {
  console.log(user);
  getRepo(user, repo);
}
function repo(repos) {
  repos.map((e) => {
    console.log(e);
  });
}

function getUser(id) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      console.log("Reading a user from the database ....");
      res({ id: id, user: "AchiSingh" });
    }, 2000);
  });
}

function getRepo(user) {
  return new Promise((res, rej) => {
    console.log("repos of ", user.user);
    setTimeout(() => {
      // res(["repo1", "repo2", "repo3"]);
      rej(new Error("some repo error"));
    }, 2000);
  });
}
