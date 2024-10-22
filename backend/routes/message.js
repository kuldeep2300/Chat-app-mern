const express = require("express");
const { handleSendMessage, handleGetMessage } = require("../controllers/message");
const protectRoute = require("../middlewares/protectRoute");

const router = express.Router();

router.get("/:id", protectRoute, handleGetMessage);
router.post("/send/:id", protectRoute, handleSendMessage);

module.exports = router;
