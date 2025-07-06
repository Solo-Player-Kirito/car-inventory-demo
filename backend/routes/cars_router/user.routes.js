const express = require("express");
const { authMiddleware } = require("../../middleware/auth.middleware");
const { register, login, getMe } = require("../../controller/user.controller");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleware, getMe);
module.exports = router;
