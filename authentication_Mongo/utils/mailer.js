const nodemailer = require("nodemailer");

// Using Brevo (formerly Sendinblue) SMTP — free tier, 300 emails/day,
// works on Render (no IPv6 issues), sends to any email address.
const createTransporter = () => {
  return nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.BREVO_USER,   // your Brevo account email
      pass: process.env.BREVO_SMTP_KEY, // SMTP key from Brevo dashboard
    },
  });
};

const generateCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendVerificationEmail = async (toEmail, code) => {
  const transporter = createTransporter();
  await transporter.sendMail({
    from: `La Prima <${process.env.BREVO_USER}>`,
    to: toEmail,
    subject: "Your Verification Code",
    html: `
  <div style="margin:0;padding:0;background-color:#f5f1e8;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f5f1e8;">
      <tr>
        <td align="center" style="padding:24px 16px;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background-color:#ffffff;border:1px solid #c9a961;border-radius:12px;overflow:hidden;font-family:'Georgia',serif;">
            <tr>
              <td style="background-color:#c9a961;padding:20px 24px;text-align:center;">
                <h1 style="margin:0;font-size:24px;color:#ffffff;">La Prima</h1>
                <p style="margin:4px 0 0 0;font-size:12px;color:#ffffff;">Your Verification Code</p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 24px 8px 24px;text-align:left;color:#2b2b2b;">
                <h2 style="margin:0 0 12px 0;font-size:22px;font-weight:700;color:#2b2b2b;">Verify your La Prima account</h2>
                <p style="margin:0 0 12px 0;font-size:14px;line-height:1.6;color:#4a4a4a;">Welcome to La Prima! Use the code below to verify your email address.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 24px 24px 24px;text-align:center;">
                <div style="display:inline-block;padding:16px 28px;border-radius:8px;background-color:#f5f1e8;border:2px solid #c9a961;">
                  <span style="font-size:36px;font-weight:800;letter-spacing:8px;color:#c9a961;font-family:monospace;">${code}</span>
                </div>
                <p style="margin:16px 0 4px 0;font-size:13px;color:#4a4a4a;">This code expires in <strong>15 minutes</strong>.</p>
                <p style="margin:0;font-size:12px;color:#6b7280;">If you didn't request this, ignore this email.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:0 24px 24px 24px;text-align:center;">
                <p style="margin:0;font-size:11px;color:#999;">&copy; ${new Date().getFullYear()} La Prima. All rights reserved.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>`,
  });
};

const sendResetPasswordEmail = async (toEmail, code) => {
  const transporter = createTransporter();
  await transporter.sendMail({
    from: `La Prima <${process.env.BREVO_USER}>`,
    to: toEmail,
    subject: "Your Password Reset Code",
    html: `
  <div style="margin:0;padding:0;background-color:#f5f1e8;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f5f1e8;">
      <tr>
        <td align="center" style="padding:24px 16px;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background-color:#ffffff;border:1px solid #c9a961;border-radius:12px;overflow:hidden;font-family:'Georgia',serif;">
            <tr>
              <td style="background-color:#c9a961;padding:20px 24px;text-align:center;">
                <h1 style="margin:0;font-size:24px;color:#ffffff;">La Prima</h1>
                <p style="margin:4px 0 0 0;font-size:12px;color:#ffffff;">Password Reset</p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 24px 8px 24px;text-align:left;color:#2b2b2b;">
                <h2 style="margin:0 0 12px 0;font-size:22px;font-weight:700;color:#2b2b2b;">Reset your La Prima password</h2>
                <p style="margin:0 0 12px 0;font-size:14px;line-height:1.6;color:#4a4a4a;">Use the code below to reset your password.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 24px 24px 24px;text-align:center;">
                <div style="display:inline-block;padding:16px 28px;border-radius:8px;background-color:#f5f1e8;border:2px solid #c9a961;">
                  <span style="font-size:36px;font-weight:800;letter-spacing:8px;color:#c9a961;font-family:monospace;">${code}</span>
                </div>
                <p style="margin:16px 0 4px 0;font-size:13px;color:#4a4a4a;">This code expires in <strong>15 minutes</strong>.</p>
                <p style="margin:0;font-size:12px;color:#6b7280;">If you didn't request this, ignore this email.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:0 24px 24px 24px;text-align:center;">
                <p style="margin:0;font-size:11px;color:#999;">&copy; ${new Date().getFullYear()} La Prima. All rights reserved.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>`,
  });
};

module.exports = {
  sendVerificationEmail,
  sendResetPasswordEmail,
  generateCode,
};
