const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();
const { exec } = require('child_process');

const app = express();

// Safe kill: only kill if there are PIDs for the port.
// Works on macOS/Linux (POSIX shell). It's silent if nothing is running.
exec(
  `pids=$(lsof -ti:5001); if [ -n "$pids" ]; then kill -9 $pids; echo "Killed process(es) on port 5001: $pids"; fi`,
  (err, stdout, stderr) => {
    if (err) {
      // Ignore the "no such process" scenario because we handle via shell check.
      console.error('Port-check command error (non-fatal):', err.message);
      return;
    }
    if (stdout) console.log(stdout.trim());
    if (stderr) console.error('Port-check stderr:', stderr.trim());
  }
);

const PORT = parseInt(process.env.PORT || '5001', 10);

app.use(cors());
app.use(express.json());

/**
 * Create nodemailer transporter.
 * - If SMTP env vars exist, use them.
 * - Otherwise fall back to Ethereal for local testing (auto test account).
 */
async function createTransporter() {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    // Real SMTP from env
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true', // true for 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    try {
      await transporter.verify();
      console.log('Nodemailer transporter ready (real SMTP).');
    } catch (err) {
      console.error('Nodemailer verify failed (real SMTP):', err && err.stack ? err.stack : err);
    }

    return transporter;
  } else {
    // Fallback to Ethereal (dev testing) so server won't break when env is missing
    try {
      const testAccount = await nodemailer.createTestAccount();
      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      console.log('Using Ethereal test account for emails (dev).');
      console.log('Ethereal user:', testAccount.user);
      // don't console.log the password in a public place, but it's useful in local dev
      console.log('Ethereal pass:', testAccount.pass);
      return transporter;
    } catch (err) {
      console.error('Failed to create Ethereal test account:', err && err.stack ? err.stack : err);
      // As a last resort return a simple logger transport that just logs emails (won't actually send).
      return {
        sendMail: async (mailOptions) => {
          console.log('Mock sendMail called. Mail contents:', mailOptions);
          return Promise.resolve({ accepted: [], messageId: 'mock' });
        },
        verify: async () => true,
      };
    }
  }
}

// Initialize transporter once, then reuse
let transporterPromise = createTransporter();

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const mailOptions = {
    from: email,
    to: process.env.CONTACT_RECEIVER || 'varshamahesh3101@gmail.com',
    subject: `Portfolio Contact: Message from ${name}`,
    html: `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  };

  try {
    const transporter = await transporterPromise;
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info && info.messageId ? info.messageId : info);

    // If Ethereal, print preview URL
    if (nodemailer.getTestMessageUrl && info) {
      const preview = nodemailer.getTestMessageUrl(info);
      if (preview) console.log('Preview URL (Ethereal):', preview);
    }

    res.json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error && error.stack ? error.stack : error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

const server = app.listen(PORT, () => {
  console.log(`Server running safely on http://localhost:${PORT}`);
});

server.on('error', (err) => {
  if (err && err.code === 'EADDRINUSE') {
    console.warn(`Port ${PORT} in use. Trying ${PORT + 1}...`);
    server.listen(PORT + 1);
  } else {
    console.error('Server error:', err && err.stack ? err.stack : err);
  }
});