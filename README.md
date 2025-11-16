# Marapone Contracting Inc. - Landing Page

A modern, professional landing page for Marapone Contracting Inc. featuring the company logo as the focal point, matching brand colors, and social media integration.

## Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Brand Colors**: Dark blue-black background with white/grey text and light blue accents matching the logo
- **Logo Focal Point**: Prominent SVG logo with subtle animations
- **Social Media Icons**: Ready-to-use social media links (Facebook, Instagram, LinkedIn, Twitter, YouTube)
- **Contact Buttons**: Functional call and email buttons
- **Modern UI**: Clean, professional design with smooth animations

## Setup

1. Open `index.html` in your web browser
2. No build process required - works directly with HTML, CSS, and JavaScript

## Customization

### Update Social Media Links

Edit the `socialLinks` object in `script.js`:

```javascript
const socialLinks = {
    facebook: 'https://www.facebook.com/yourpage',
    instagram: 'https://www.instagram.com/yourprofile',
    linkedin: 'https://www.linkedin.com/company/yourcompany',
    twitter: 'https://twitter.com/yourhandle',
    youtube: 'https://www.youtube.com/yourchannel'
};
```

### Update Contact Information

Edit the contact buttons in `index.html`:

- Phone: Update the `href` in the "Call Us" button (currently `tel:+1234567890`)
- Email: Update the `href` in the "Email Us" button (currently `mailto:info@maraponecontracting.com`)

### Colors

All colors are defined as CSS variables in `styles.css`:

```css
:root {
    --bg-dark: #0a0e1a;
    --bg-darker: #050810;
    --text-white: #ffffff;
    --text-grey: #e0e0e0;
    --accent-blue: #4da6ff;
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Files

- `index.html` - Main HTML structure
- `styles.css` - All styling and animations
- `script.js` - JavaScript functionality and social media link management
- `README.md` - This file

