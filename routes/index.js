/* GET home page. */
const express = require("express");

const router = express.Router();
router.get("/", function (req, res, next) {
  res.send("Hello Pradeep Bhaiya");
});

module.exports = router;
