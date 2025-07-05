const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();
//app.use(cors());  
app.use(cors({
  origin: ['https://shubham-tech.onrender.com', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));


app.use(express.json());

const { GMAIL_USER, GMAIL_PASS, RECEIVER_EMAIL } = process.env;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS,
  },
});






app.post('/api/inbox', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  // Email to owner
  const mailToOwner = {
    from: GMAIL_USER,
    to: RECEIVER_EMAIL,
    subject: `Portfolio Contact: ${name}`,
    html: `<h2>New Message from Portfolio</h2>
           <p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Message:</strong><br/>${message}</p>`
  };

  // Confirmation email to user
  const mailToUser = {
    from: GMAIL_USER,
    to: email,
    subject: 'Thank you for contacting Shubham Kumar!',
    html: `
      <div style="background:#f4f8fb;padding:0;margin:0;font-family:'Segoe UI',Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f8fb;padding:0;margin:0;">
          <tr>
            <td align="center">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:520px;margin:40px auto;background:#fff;border-radius:16px;box-shadow:0 4px 24px rgba(80,120,200,0.10);overflow:hidden;">
                <tr>
                  <td style="background:#4F8A8B;padding:32px 0;text-align:center;">
                    <h1 style="color:#fff;font-size:2.2rem;margin:0;letter-spacing:2px;">Thank You!</h1>
                    <p style="color:#e0f7fa;font-size:1.1rem;margin:8px 0 0 0;">Your message has been received</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:32px 32px 16px 32px;">
                    <h2 style="color:#4F8A8B;margin:0 0 12px 0;font-size:1.3rem;">Hi ${name},</h2>
                    <p style="color:#333;font-size:1.08rem;margin:0 0 18px 0;">Thank you for reaching out! I appreciate your interest and will get back to you as soon as possible.</p>
                    <div style="background:#f4f8fb;border-left:4px solid #4F8A8B;padding:18px 20px;margin:18px 0 24px 0;border-radius:8px;">
                      <p style="margin:0 0 8px 0;color:#222;font-weight:500;">Here's what you sent:</p>
                      <blockquote style="margin:0;color:#555;font-style:italic;">${message}</blockquote>
                    </div>
                    <p style="color:#888;font-size:0.98rem;margin:0 0 18px 0;">This is an automated confirmation. If you have any urgent queries, feel free to reply to this email.</p>
                    <p style="margin:0 0 8px 0;color:#4F8A8B;font-weight:600;">Best regards,<br/>Shubham Kumar</p>
                  </td>
                </tr>
                <tr>
                  <td style="background:#f4f8fb;padding:18px 32px;text-align:center;color:#aaa;font-size:0.95rem;">
                    <div style="margin-bottom:8px;">
                      <a href="https://github.com/Shubham-hmh" style="color:#4F8A8B;text-decoration:none;margin:0 8px;">GitHub</a> |
                      <a href="https://www.linkedin.com/in/shubham-kumar-487a34202/" style="color:#4F8A8B;text-decoration:none;margin:0 8px;">LinkedIn</a>
                    </div>
                    &copy; 2024 Shubham Kumar. All rights reserved.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailToOwner);
    await transporter.sendMail(mailToUser);
    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to send message.', error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`)); 
