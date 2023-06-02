const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World this is new try it");
});

module.exports = router;


