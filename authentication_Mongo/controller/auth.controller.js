const User = require("../model/user.models");
const bcrypt = require("bcryptjs");
const { sendVerificationEmail: sendVerificationEmailUtil, sendResetPasswordEmail: sendResetPasswordEmailUtil, generateCode: generateCodeUtil } = require("../utils/mailer");
const { generateToken } = require("../middleware/auth.middleware");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const verificationCode = generateCodeUtil();

    const user = await User.create({
      name,
      email,
      password,
      verificationCode,
      isVerified: false,
    });

    try {
      await sendVerificationEmailUtil(email, verificationCode);
    } catch (emailError) {
      console.error("Email send error:", emailError?.message);

      // In dev, always print the code to console so you can still verify
      if (process.env.NODE_ENV !== "production") {
        console.log("\n" + "=".repeat(60));
        console.log("EMAIL NOT CONFIGURED: Verification code (use this to verify):");
        console.log(`  Email: ${email}`);
        console.log(`  Code:  ${verificationCode}`);
        console.log("=".repeat(60) + "\n");
      } else {
        // In production, roll back the user and return a clear error
        await User.findByIdAndDelete(user._id);
        return res.status(500).json({
          message: "We couldn't send the verification email. Please check your email address and try again.",
        });
      }
    }

    res.status(201).json({
      success: true,
      message: "Signup successful! Please verify your email with the code we sent you.",
      email: email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    if (user.isVerified)
      return res.status(400).json({ message: "Email already verified" });

    if (user.verificationCode !== code)
      return res.status(400).json({ message: "Invalid verification code" });

    user.isVerified = true;
    user.verificationCode = null;
    await user.save();

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const email = req.body.email.trim().toLowerCase();
    const password = req.body.password.trim();

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    if (!user.isVerified)
      return res.status(403).json({ message: "Please verify your email before logging in" });

    const token = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const code = generateCodeUtil();
    user.resetPasswordCode = code;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
    await user.save();

    try {
      await sendResetPasswordEmailUtil(email, code);
    } catch (emailError) {
      const isDev = process.env.NODE_ENV !== "production";
      const isAuthError =
        emailError?.message?.includes("535") ||
        emailError?.message?.toLowerCase().includes("credentials");
      if (isDev && isAuthError) {
        console.log("\n" + "=".repeat(60));
        console.log("EMAIL NOT CONFIGURED: Password reset code:");
        console.log(`  Email: ${email} | Code: ${code}`);
        console.log("=".repeat(60) + "\n");
      } else {
        user.resetPasswordCode = null;
        user.resetPasswordExpires = null;
        await user.save();
        return res
          .status(500)
          .json({ message: "Could not send email. Please try again later." });
      }
    }

    res.json({
      success: true,
      message: "Password reset code sent to your email.",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, code, new_password: newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    if (user.resetPasswordCode !== code)
      return res.status(400).json({ message: "Invalid reset code" });

    if (Date.now() > user.resetPasswordExpires)
      return res.status(400).json({ message: "Reset code expired" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordCode = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.json({
      success: true,
      message: "Password has been reset successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const tokenBlacklist = require("../utils/tokenBlacklist");

const logout = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    tokenBlacklist.add(token);

    res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
const testEmail = async (req, res) => {
  if (process.env.NODE_ENV === "production") {
    return res.status(404).json({ message: "Not found" });
  }
  const toEmail = req.body?.email || process.env.EMAIL_USER;
  if (!toEmail) {
    return res
      .status(400)
      .json({
        message:
          'Add email in body: { "email": "your@email.com" } or set EMAIL_USER in .env',
      });
  }
  const testCode = "123456";
  try {
    await sendVerificationEmailUtil(toEmail, testCode);
    res.json({
      success: true,
      message:
        "Test email sent! Check your inbox (and spam). Code in email: " +
        testCode,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message?.includes("535")
        ? "Gmail rejected credentials. Use App Password in .env (see .env.example)"
        : err.message,
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password -verificationCode -resetPasswordCode");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, email, notifications, newPassword } = req.body;
    const user = await User.findById(req.user.id);
    
    if (!user) return res.status(404).json({ message: "User not found" });

    if (firstName !== undefined) user.firstName = firstName;
    if (lastName !== undefined) user.lastName = lastName;
    // Provide a generic fallback for 'name' assuming original code heavily relies on it
    if (firstName || lastName) user.name = `${firstName || user.firstName || ''} ${lastName || user.lastName || ''}`.trim();
    if (email) user.email = email;
    if (notifications) user.notifications = notifications;

    if (newPassword && newPassword.trim().length > 0) {
      user.password = await bcrypt.hash(newPassword, 12);
    }

    await user.save();
    
    // Return updated sans passwords
    user.password = undefined;
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password -verificationCode -resetPasswordCode");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
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
};
