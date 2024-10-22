const express = require('express');
const protectRoute = require('../middlewares/protectRoute');
const { handleGetUsersForSidebar } = require('../controllers/user');

const router = express.Router();

router.get('/', protectRoute ,handleGetUsersForSidebar)

module.exports = router;