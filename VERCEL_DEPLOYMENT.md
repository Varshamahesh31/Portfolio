# Vercel Deployment Guide

## 🚀 Quick Deployment Steps

### 1. Install Vercel CLI
```bash
npm i -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy from Root Directory
```bash
cd /Users/varsha/Desktop/projects/portfolio
vercel
```

### 4. Configure Environment Variables
In Vercel Dashboard → Settings → Environment Variables:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
NODE_ENV=production
```

### 5. Update Domain in Configuration
After deployment, update these files with your actual Vercel URL:

**frontend/.env.production:**
```
REACT_APP_API_URL=https://your-actual-vercel-url.vercel.app
```

**backend/server.js:** (line 8)
```javascript
origin: process.env.NODE_ENV === 'production' 
  ? ['https://your-actual-vercel-url.vercel.app'] 
  : ['http://localhost:3000']
```

### 6. Redeploy
```bash
vercel --prod
```

## 📁 Files Created for Deployment

- `vercel.json` - Vercel configuration
- `frontend/.env.production` - Production environment variables
- `frontend/.env.local` - Local development variables
- Updated `backend/server.js` - Serverless compatibility
- Updated `frontend/src/components/Contact.js` - Dynamic API URL

## ✅ Deployment Checklist

- [ ] Vercel CLI installed
- [ ] Logged into Vercel
- [ ] Environment variables set in Vercel dashboard
- [ ] Domain URLs updated in configuration files
- [ ] Production deployment completed

## 🔧 Local Development

Development commands remain the same:
```bash
npm run dev
```

The environment files ensure the correct API URLs are used in each environment.