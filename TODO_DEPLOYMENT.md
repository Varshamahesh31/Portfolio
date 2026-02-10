# Vercel Deployment Plan

## Current Project Status

- ✅ Frontend: React.js application ready
- ✅ Backend: Node.js/Express server ready
- ✅ Vercel config: `vercel.json` configured
- ✅ Email system: nodemailer configured

## Deployment Steps

### Step 1: Install Vercel CLI

- Check if Vercel CLI is installed
- If not, install it globally

### Step 2: Login to Vercel

- Authenticate with Vercel account

### Step 3: Initial Deployment

- Deploy to Vercel (preview)
- Get the production URL

### Step 4: Update Configuration

- Update backend CORS with actual Vercel URL
- Create frontend environment files with API URL

### Step 5: Configure Environment Variables

- Set in Vercel Dashboard:
  - EMAIL_USER
  - EMAIL_PASS
  - CONTACT_RECEIVER
  - NODE_ENV=production

### Step 6: Production Deployment

- Deploy to production
- Verify deployment

## Key Files

- `/vercel.json` - Vercel build configuration
- `/backend/server.js` - Backend API server
- `/frontend/src/components/Contact.js` - Contact form with API calls

## Commands to Run

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

## Environment Variables Required

| Variable          | Value                       | Environment |
| ----------------- | --------------------------- | ----------- |
| EMAIL_USER        | your-email@gmail.com        | Production  |
| EMAIL_PASS        | your-app-password           | Production  |
| CONTACT_RECEIVER  | varshamahesh3101@gmail.com  | Production  |
| NODE_ENV          | production                  | Production  |
| REACT_APP_API_URL | https://your-app.vercel.app | Production  |
