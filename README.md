# Full Stack Portfolio Website

A modern React.js portfolio website with Node.js backend functionality.

## 🚀 Features

- **Frontend**: React.js with enhanced animations and responsive design
- **Backend**: Node.js/Express with email functionality
- **Cool Home Page**: Interactive particles, floating elements, and smooth animations
- **Photo Management**: Static image integration
- **Contact Form**: Real-time email sending with nodemailer
- **Responsive Design**: Mobile-first approach for all devices

## 📁 Project Structure

```
portfolio/
├── frontend/           # React.js application
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   └── App.css
│   ├── public/
│   └── package.json
├── backend/            # Node.js/Express server
│   ├── server.js
│   ├── package.json
│   └── .env
└── package.json       # Root package manager
```

## 🛠️ Setup Instructions

### Quick Start (Recommended)
```bash
# Install all dependencies
npm run install-all

# Start both frontend and backend
npm run dev
```

### Manual Setup
```bash
# Install root dependencies
npm install

# Install frontend dependencies
npm run install-frontend

# Install backend dependencies
npm run install-backend

# Start development servers
npm run dev
```

### Individual Commands
```bash
# Frontend only (http://localhost:3000)
npm run start-frontend

# Backend only (http://localhost:5001)
npm run start-backend

# Build for production
npm run build
```

## 🔧 Configuration

### Email Setup
1. Update `backend/.env` with your Gmail credentials:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
PORT=5001
```

2. Enable 2FA and generate App Password in Gmail settings

### Image Setup
Place your images in `frontend/public/`:
- `profile.jpg` - Your profile photo
- `project1.jpg`, `project2.jpg`, `project3.jpg` - Project screenshots
- `achievement1.jpg`, `achievement2.jpg`, `achievement3.jpg` - Achievement photos
- `VarshaCV.pdf` - Your resume

## 🎨 Cool Features

### Enhanced Home Page
- **Interactive Particles**: Mouse-responsive background effects
- **Floating Elements**: Animated circles and squares
- **Typing Effect**: Animated name with cursor
- **Glowing Text**: Pulsing glow effect on title
- **Smooth Animations**: Fade-in effects and hover interactions
- **Responsive Design**: Optimized for all screen sizes

### Backend Features
- **Port Management**: Automatic port conflict resolution
- **Email Integration**: Real-time contact form processing
- **Error Handling**: Comprehensive error management
- **CORS Support**: Cross-origin request handling

## 🌐 API Endpoints

- `GET /api/health` - Server health check
- `POST /api/contact` - Contact form submission

## 📱 Responsive Breakpoints

- **Desktop**: 1024px+
- **Tablet**: 768px - 1023px
- **Mobile**: 480px - 767px
- **Small Mobile**: < 480px

## 🚀 Deployment

### Frontend (Netlify/Vercel)
```bash
npm run build
# Deploy the frontend/build folder
```

### Backend (Heroku/Railway)
```bash
# Deploy the backend folder
# Set environment variables in hosting platform
```

## 📄 License

MIT License - feel free to use this project for your own portfolio!

---

**Portfolio by Varsha Mahesh** - Full Stack Developer