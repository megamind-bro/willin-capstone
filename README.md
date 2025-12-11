# Capstone Project Portfolio

A premium, responsive landing page showcasing academic achievements, innovations, cultural heritage, and professional development.

## Features

- **Dynamic Background**: Interactive particle network with mouse effects
- **File Preview System**: In-app PDF and video viewing with download options
- **Glassmorphism Design**: Premium dark theme with gold accents
- **Responsive Layout**: Works seamlessly on mobile and desktop
- **Social Integration**: Styled links to professional platforms

## Project Structure

```
CAPSTONE/
├── index.html          # Main landing page
├── style.css           # Premium styling
├── script.js           # Interactive features
├── assets/             # Your content files
│   ├── resume_en.pdf
│   ├── resume_sw.pdf
│   ├── autobiography.pdf
│   └── ...
└── README.md
```

## Setup Instructions

### Local Development

1. **Add Your Content**
   - Place your files in the `assets/` folder
   - Update file paths in `index.html` to match your filenames

2. **Test Locally**
   - Open `index.html` in a modern browser
   - Or use a local server: `python -m http.server 8000`

### GitHub Pages Deployment

1. **Create GitHub Repository**
   - Go to [GitHub](https://github.com/new)
   - Name it `USERNAME.github.io` (replace USERNAME with your GitHub username)
   - Make it public

2. **Push Your Code**
   ```bash
   cd /home/willin/Documents/PROJECTS/CAPSTONE
   git init
   git add .
   git commit -m "Initial commit: Capstone Project Portfolio"
   git branch -M main
   git remote add origin https://github.com/USERNAME/USERNAME.github.io.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: Deploy from branch `main` / root folder
   - Save

4. **Access Your Site**
   - Your site will be live at: `https://USERNAME.github.io/`
   - Wait 1-2 minutes for initial deployment

## Customization

### Update Social Links
Edit the `href` attributes in the Online Presence section of `index.html`:
```html
<a href="https://github.com/yourusername" class="card social-card github">
```

### Adjust Visual Effects
In `script.js`, modify:
- `particleCount`: Number of background particles (default: 100)
- `connectionDist`: Distance for particle connections (default: 150)
- `mouseDist`: Mouse interaction radius (default: 200)

## Technologies Used

- HTML5, CSS3, JavaScript (ES6+)
- PDF.js for document rendering
- Canvas API for dynamic background
- Intersection Observer API for scroll animations

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

This project is for educational purposes as part of a Capstone Project submission.
