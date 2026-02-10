const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

// Email configuration
const createTransporter = async () => {
  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'varshamahesh3101@gmail.com',
      pass: process.env.EMAIL_PASS || 'your-app-password'
    }
  });
  return transporter;
};

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-vercel-app.vercel.app'] 
    : ['http://localhost:3000']
}));
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

// Contact form endpoint with email sending
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  
  // Validate input
  if (!name || !email || !message) {
    return res.status(400).json({ 
      error: 'All fields are required',
      message: 'Please fill in all fields'
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      error: 'Invalid email format',
      message: 'Please enter a valid email address'
    });
  }

  try {
    // Create transporter
    const transporter = await createTransporter();

    // Email to you (portfolio owner)
    const mailOptionsToOwner = {
      from: process.env.EMAIL_USER || 'varshamahesh3101@gmail.com',
      to: process.env.EMAIL_USER || 'varshamahesh3101@gmail.com',
      subject: `Portfolio Contact: Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3C2415;">New Contact Form Submission</h2>
          <div style="background: #F5E6D3; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p style="background: white; padding: 15px; border-radius: 5px; margin-top: 10px;">${message}</p>
          </div>
          <p style="color: #666; font-size: 12px;">Sent from your portfolio website</p>
        </div>
      `
    };

    // Auto-response email to the sender
    const mailOptionsToSender = {
      from: process.env.EMAIL_USER || 'varshamahesh3101@gmail.com',
      to: email,
      subject: 'Thank you for contacting Varsha Mahesh',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3C2415;">Thank You for Reaching Out!</h2>
          <p>Hi ${name},</p>
          <p>I've received your message and will get back to you as soon as possible.</p>
          <div style="background: #F5E6D3; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <p><strong>Your Message:</strong></p>
            <p style="background: white; padding: 15px; border-radius: 5px; margin-top: 10px;">${message}</p>
          </div>
          <p>Best regards,<br><strong>Varsha Mahesh</strong></p>
          <hr style="border: 1px solid #D4AF37; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">Full Stack Developer | varshamahesh3101@gmail.com</p>
        </div>
      `
    };

    // Send both emails
    await transporter.sendMail(mailOptionsToOwner);
    await transporter.sendMail(mailOptionsToSender);

    console.log('✅ Contact form emails sent successfully!');
    console.log('From:', name, '| Email:', email);

    res.json({ 
      success: true, 
      message: 'Message sent successfully! You will receive a confirmation email shortly.'
    });

  } catch (error) {
    console.error('❌ Error sending email:', error);
    
    // Even if email fails, log the message
    console.log('Contact Form Submission (logged despite email failure):');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);
    console.log('---');

    res.status(500).json({ 
      error: 'Failed to send message',
      message: 'Message received but email sending failed. I will still get back to you soon.',
      logged: true
    });
  }
});

// Newsletter subscription endpoint
app.post('/api/newsletter', async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  console.log('Newsletter subscription:', email);
  
  res.json({ success: true, message: 'Subscribed to newsletter successfully!' });
});

// For Vercel serverless functions
module.exports = app;

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('📧 Email configuration ready');
  });
}

