const express = require("express");
const protectRoute = require("../middlewares/protectRoute");
const { handleGetUsersForSidebar } = require("../controllers/user");

const router = express.Router();

router.get("/", protectRoute("jwt"), handleGetUsersForSidebar);

module.exports = router;
