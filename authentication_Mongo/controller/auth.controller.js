const User = require("../model/user.models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendVerificationEmail: sendVerificationEmailUtil, sendResetPasswordEmail: sendResetPasswordEmailUtil, generateCode: generateCodeUtil } = require("../utils/mailer");
const { generateToken } = require("../middleware/auth.middleware");

async function sendVerificationEmail(toEmail, code) {
  // Temporary debug logs to verify environment configuration for Gmail
  console.log("EMAIL DEBUG -> EMAIL_USER:", process.env.EMAIL_USER);
  if (process.env.EMAIL_PASS) {
    console.log(
      "EMAIL DEBUG -> EMAIL_PASS length:",
      process.env.EMAIL_PASS.length,
    );
  } else {
    console.log("EMAIL DEBUG -> EMAIL_PASS is NOT set");
  }
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const htmlContent = `
  <div style="margin:0;padding:0;background-color:#FAFAFA;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#FAFAFA;">
      <tr>
        <td align="center" style="padding:24px 16px;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background-color:#E0E7FF;border-radius:20px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
            <tr>
              <td style="background-color:#EBE8FC;padding:20px 24px;text-align:center;">
                <!-- Inline SVG logo so it always renders in email clients that support SVG -->
                <div style="display:inline-block;width:150px;max-width:60%;">
                  <svg viewBox="0 0 360 80" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="La Prima logo" style="width:100%;height:auto;display:block;">
                    <rect x="0" y="8" width="360" height="64" rx="32" fill="#FAFAFA"/>
                    <circle cx="56" cy="40" r="24" fill="#7A3AED"/>
                    <rect x="49" y="30" width="14" height="18" rx="3" fill="#FAFAFA"/>
                    <rect x="56" y="30" width="7" height="18" rx="3" fill="#FF6584"/>
                    <circle cx="53" cy="39" r="1.4" fill="#6C63F0"/>
                    <text x="92" y="38" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                          font-size="28" font-weight="700" fill="#111827">
                      La Prima
                    </text>
                    <text x="92" y="54" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                          font-size="12" font-weight="500" fill="#6B7280">
                      La Prima
                    </text>
                  </svg>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 24px 8px 24px;text-align:left;color:#111827;">
                <h2 style="margin:0 0 12px 0;font-size:22px;line-height:1.3;font-weight:700;color:#111827;">
                  Your La Prima verification code
                </h2>
                <p style="margin:0 0 12px 0;font-size:14px;line-height:1.6;color:#374151;">
                  Hey there, thank you for being part of the La Prima community. Use the code below to continue signing in or resetting your password.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 24px 24px 24px;text-align:center;">
                <div style="display:inline-block;padding:16px 28px;border-radius:16px;background-color:#FFFFFF;border:2px dashed #6C63F0;">
                  <span style="display:inline-block;font-size:32px;font-weight:800;letter-spacing:6px;color:#FF6584;font-family:'SF Mono',Menlo,Monaco,Consolas,'Liberation Mono','Courier New',monospace;">
                    ${code}
                  </span>
                </div>
                <p style="margin:16px 0 4px 0;font-size:13px;line-height:1.5;color:#4B5563;">
                  This code will expire in <strong>15 minutes</strong>.
                </p>
                <p style="margin:0;font-size:12px;line-height:1.5;color:#6B7280;">
                  If you did not request this, you can safely ignore this email.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:0 24px 24px 24px;">
                <div style="border-radius:16px;background-color:#EBE8FC;padding:14px 16px;display:flex;align-items:flex-start;gap:10px;">
                  <div style="width:24px;height:24px;border-radius:999px;background-color:#6C63F0;display:flex;align-items:center;justify-content:center;color:#FFFFFF;font-size:14px;font-weight:700;flex-shrink:0;">
                    !
                  </div>
                  <p style="margin:0;font-size:12px;line-height:1.5;color:#4B5563;">
                    For your security, never share this code with anyone. La Prima staff will never ask you for it.
                  </p>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:0 24px 24px 24px;text-align:center;">
                <p style="margin:0 0 4px 0;font-size:11px;color:#9CA3AF;">
                  &copy; ${new Date().getFullYear()} La Prima. All rights reserved.
                </p>
                <p style="margin:0;font-size:11px;color:#9CA3AF;">
                  You are receiving this email because you attempted to sign up, log in, or reset your password on La Prima.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
  `;

  await transporter.sendMail({
    from: `La Prima <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Your Verification Code",
    html: htmlContent,
  });
}

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendVerificationEmail(toEmail, code) {
  console.log("EMAIL DEBUG -> EMAIL_USER:", process.env.EMAIL_USER);
  if (process.env.EMAIL_PASS) {
    console.log(
      "EMAIL DEBUG -> EMAIL_PASS length:",
      process.env.EMAIL_PASS.length,
    );
  } else {
    console.log("EMAIL DEBUG -> EMAIL_PASS is NOT set");
  }
  
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const htmlContent = `
  <div style="margin:0;padding:0;background-color:#FAFAFA;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#FAFAFA;">
      <tr>
        <td align="center" style="padding:24px 16px;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background-color:#E0E7FF;border-radius:20px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
            <tr>
              <td style="background-color:#EBE8FC;padding:20px 24px;text-align:center;">
                <h1 style="margin:0;font-size:24px;color:#111827;">La Prima</h1>
                <p style="margin:4px 0 0 0;font-size:12px;color:#6B7280;">Your Verification Code</p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 24px 8px 24px;text-align:left;color:#111827;">
                <h2 style="margin:0 0 12px 0;font-size:22px;line-height:1.3;font-weight:700;color:#111827;">
                  Verify your La Prima account
                </h2>
                <p style="margin:0 0 12px 0;font-size:14px;line-height:1.6;color:#374151;">
                  Welcome to La Prima! Use the code below to verify your email address.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 24px 24px 24px;text-align:center;">
                <div style="display:inline-block;padding:16px 28px;border-radius:16px;background-color:#FFFFFF;border:2px dashed #6C63F0;">
                  <span style="display:inline-block;font-size:32px;font-weight:800;letter-spacing:6px;color:#FF6584;font-family:'SF Mono',Menlo,Monaco,Consolas,'Liberation Mono','Courier New',monospace;">
                    ${code}
                  </span>
                </div>
                <p style="margin:16px 0 4px 0;font-size:13px;line-height:1.5;color:#4B5563;">
                  This code will expire in <strong>15 minutes</strong>.
                </p>
                <p style="margin:0;font-size:12px;line-height:1.5;color:#6B7280;">
                  If you did not request this, you can safely ignore this email.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:0 24px 24px 24px;">
                <div style="border-radius:16px;background-color:#EBE8FC;padding:14px 16px;display:flex;align-items:flex-start;gap:10px;">
                  <div style="width:24px;height:24px;border-radius:999px;background-color:#6C63F0;display:flex;align-items:center;justify-content:center;color:#FFFFFF;font-size:14px;font-weight:700;flex-shrink:0;">
                    !
                  </div>
                  <p style="margin:0;font-size:12px;line-height:1.5;color:#4B5563;">
                    For your security, never share this code with anyone. La Prima staff will never ask you for it.
                  </p>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:0 24px 24px 24px;text-align:center;">
                <p style="margin:0 0 4px 0;font-size:11px;color:#9CA3AF;">
                  &copy; ${new Date().getFullYear()} La Prima. All rights reserved.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
  `;

  await transporter.sendMail({
    from: `La Prima <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Your Verification Code",
    html: htmlContent,
  });
}

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
      const isDev = process.env.NODE_ENV !== "production";
      const isAuthError =
        emailError?.message?.includes("535") ||
        emailError?.message?.toLowerCase().includes("credentials");

      if (isDev && isAuthError) {
        console.log("\n" + "=".repeat(60));
        console.log(
          "EMAIL NOT CONFIGURED: Verification code (use this to verify):",
        );
        console.log(`  Email: ${email}`);
        console.log(`  Code:  ${verificationCode}`);
        console.log("=".repeat(60) + "\n");
      } else {
        await User.findByIdAndDelete(user._id);
        return res.status(500).json({
          message: isAuthError
            ? "Email service is misconfigured. Please contact support."
            : "We couldn't send the verification email. Please try again later.",
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
