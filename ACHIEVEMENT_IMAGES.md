# Achievement Images Setup

To add images to your achievements section, place the following files in the `frontend/public/` folder:

## Required Achievement Images:

### Achievement 1 - IBM Z Datathon 2025
- **File**: `public/achievement1.jpg`
- **Size**: 300x250px (recommended)
- **Description**: Certificate or photo from IBM Z Datathon event

### Achievement 2 - Hackathon Winner
- **File**: `public/achievement2.jpg`
- **Size**: 300x250px (recommended)
- **Description**: Trophy, certificate, or event photo from hackathon

### Achievement 3 - Open Source Contributor
- **File**: `public/achievement3.jpg`
- **Size**: 300x250px (recommended)
- **Description**: GitHub contributions screenshot or certificate

## File Structure:
```
frontend/public/
├── achievement1.jpg
├── achievement2.jpg
└── achievement3.jpg
```

## Image Guidelines:
- Use high-quality images (at least 300 DPI)
- Optimize file sizes (under 500KB each)
- Use JPG format for photos, PNG for certificates
- Ensure images are professional and relevant
- Maintain consistent aspect ratio (4:3 recommended)

## Code Implementation:
The images are automatically loaded using:
```javascript
image: "/achievement1.jpg"
image: "/achievement2.jpg" 
image: "/achievement3.jpg"
```

Simply place your images in the public folder with these exact names!