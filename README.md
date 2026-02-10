# Full Stack Portfolio Website

A modern React.js portfolio website with Node.js backend functionality.

## 🚀 Features

- **Frontend**: React.js with enhanced animations and responsive design
- **Backend**: Node.js/Express with email functionality
- **Contact Form**: Real-time email sending with nodemailer
- **Responsive Design**: Mobile-first approach for all devices

## 📁 Project Structure

```
portfolio/
├── frontend/           # React.js application
│   ├── public/
│   │   ├── index.html
│   │   ├── varsha.jpeg
│   │   ├── Amazon.jpg
│   │   ├── Corizo.jpg
│   │   ├── IBM.jpg
│   │   └── VarshaCV.pdf
│   ├── src/
│   │   ├── components/
│   │   │   ├── About.js
│   │   │   ├── Achievements.js
│   │   │   ├── BackToTop.js
│   │   │   ├── Contact.js
│   │   │   ├── Footer.js
│   │   │   ├── Hero.js
│   │   │   ├── Navbar.js
│   │   │   ├── Projects.js
│   │   │   ├── ScrollProgress.js
│   │   │   ├── Skills.js
│   │   │   ├── Testimonials.js
│   │   │   ├── Timeline.js
│   │   │   ├── Toast.js
│   │   │   └── StatsCounter.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
├── backend/            # Node.js/Express server
│   ├── server.js
│   └── package.json
├── vercel.json        # Vercel deployment configuration
├── .gitignore
└── README.md
```

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Email Configuration (Gmail with App Password)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
CONTACT_RECEIVER=varshamahesh3101@gmail.com

# Server Configuration
PORT=5001

# SMTP Configuration (optional - for production email)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### 3. Run Locally

```bash
# Terminal 1 - Start backend
cd backend
npm start

# Terminal 2 - Start frontend
cd frontend
npm start
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:5001

## 🚀 Vercel Deployment

### Automatic Deployment

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "Add New Project"
4. Import your GitHub repository
5. Vercel will auto-detect the configuration from `vercel.json`
6. Click "Deploy"

### Manual Deployment

```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy to Vercel
vercel
```

### Environment Variables in Vercel

Add these in Vercel Dashboard → Project Settings → Environment Variables:

| Name             | Value                      | Environment |
| ---------------- | -------------------------- | ----------- |
| EMAIL_USER       | your-email@gmail.com       | Production  |
| EMAIL_PASS       | your-app-password          | Production  |
| CONTACT_RECEIVER | varshamahesh3101@gmail.com | Production  |
| SMTP_HOST        | smtp.gmail.com             | Production  |
| SMTP_PORT        | 587                        | Production  |
| SMTP_SECURE      | false                      | Production  |

## 🔧 Email Setup (Gmail)

1. Enable 2-Factor Authentication on your Gmail account
2. Go to Google Account → Security → App Passwords
3. Create a new app password
4. Use that password in `EMAIL_PASS` environment variable

## 📸 Image Setup

Place your images in `frontend/public/`:

- `varsha.jpeg` - Your profile photo
- `Amazon.jpg`, `Corizo.jpg`, `IBM.jpg` - Achievement/company logos
- `VarshaCV.pdf` - Your resume

## 🌐 API Endpoints

- `GET /api/health` - Server health check
- `POST /api/contact` - Contact form submission

## 📱 Responsive Breakpoints

- **Desktop**: 1024px+
- **Tablet**: 768px - 1023px
- **Mobile**: 480px - 767px
- **Small Mobile**: < 480px

## 📄 License

MIT License - feel free to use this project for your own portfolio!

---

**Portfolio by Varsha Mahesh**
