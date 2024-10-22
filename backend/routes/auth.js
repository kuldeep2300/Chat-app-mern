const express = require("express");
const {
  handleSignup,
  handleLogin,
  handleLogout,
} = require("../controllers/auth");
const router = express.Router();

router.post("/signup", handleSignup);

router.post("/login", handleLogin);

router.post("/logout", handleLogout);

module.exports = router;
