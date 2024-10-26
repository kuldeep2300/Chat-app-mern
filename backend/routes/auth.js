const express = require("express");
const {
  handleSignup,
  handleLogin,
  handleLogout,
} = require("../controllers/auth");
const router = express.Router();

// router.get("/signup", (req, res) => {
//   res.render("signup");
// });

// router.get("/login", (req, res) => {
//   res.render("login");
// });

router.post("/signup", handleSignup);

router.post("/login", handleLogin);

router.get("/logout", handleLogout);

module.exports = router;
