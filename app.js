const express = require("express");

const app = express();
const courses = require("./routes/courses");
const home = require("./routes/home");

app.listen(3000, () => console.log("Listening to 3000 ... "));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api/courses", courses);
app.use("/", home);
