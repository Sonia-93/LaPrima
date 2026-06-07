const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  logout,
  testEmail,
  verifyEmail,
  forgotPassword,
  resetPassword,
  getProfile,
  updateProfile,
  getUsers,
} = require("../controller/auth.controller");

const { signupValidation, loginValidation, authenticate } = require("../middleware/auth.middleware");

router.post("/test-email", testEmail);
router.post("/signup", signupValidation, signup);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/login", loginValidation, login);
router.post("/logout", logout);

router.get("/profile", authenticate, getProfile);
router.put("/profile", authenticate, updateProfile);

router.get("/users", getUsers);
module.exports = router;