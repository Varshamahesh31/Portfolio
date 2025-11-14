# Portfolio Website

A modern React.js portfolio website with backend functionality.

## Features

- Responsive design with chocolate/cream theme
- Photo upload functionality for profile, projects, and achievements
- Tabbed projects section (Projects, Certificates, Tech Stack)
- Contact form with backend integration
- Resume download functionality

## Setup Instructions

### Frontend Setup
```bash
npm install
npm start
```

### Backend Setup
```bash
cd server
npm install
npm run dev
```

### Run Both (Frontend + Backend)
```bash
npm run dev
```

## File Structure
```
portfolio/
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── Hero.js
│   │   ├── About.js
│   │   ├── Skills.js
│   │   ├── Projects.js
│   │   ├── Achievements.js
│   │   ├── Contact.js
│   │   └── Footer.js
│   ├── App.js
│   ├── App.css
│   └── index.js
├── server/
│   ├── server.js
│   ├── package.json
│   └── uploads/
└── public/
    └── index.html
```

## API Endpoints

- `POST /api/upload` - File upload
- `POST /api/contact` - Contact form submission

## Technologies Used

- **Frontend**: React.js, CSS3, HTML5
- **Backend**: Node.js, Express.js
- **File Upload**: Multer
- **Styling**: Custom CSS with CSS Variables