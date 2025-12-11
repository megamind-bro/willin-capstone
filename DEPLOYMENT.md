# GitHub Pages Deployment Guide

## Prerequisites
- GitHub account
- Git installed on your system ✓ (Already initialized)

## Current Status
✓ Git repository initialized
✓ Files committed to local repository
✓ Main branch created

## Next Steps

### 1. Create GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Choose repository name:
   - **Option A (User Site)**: `USERNAME.github.io` 
     - Your site will be at: `https://USERNAME.github.io/`
   - **Option B (Project Site)**: `capstone-project`
     - Your site will be at: `https://USERNAME.github.io/capstone-project/`
3. Make it **Public**
4. **Do NOT** initialize with README (we already have one)
5. Click "Create repository"

### 2. Connect and Push

After creating the repository, run these commands:

```bash
cd /home/willin/Documents/PROJECTS/CAPSTONE

# Replace USERNAME with your GitHub username
git remote add origin https://github.com/USERNAME/REPOSITORY-NAME.git

# Push your code
git push -u origin main
```

**Example for user site:**
```bash
git remote add origin https://github.com/johndoe/johndoe.github.io.git
git push -u origin main
```

**Example for project site:**
```bash
git remote add origin https://github.com/johndoe/capstone-project.git
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under "Source":
   - Select branch: `main`
   - Select folder: `/ (root)`
5. Click **Save**

### 4. Wait for Deployment

- GitHub will build and deploy your site
- This takes 1-2 minutes
- You'll see a green checkmark when ready
- Visit your site at the URL shown

## Troubleshooting

### PDFs Not Loading?
- Make sure your PDF files are in the `assets/` folder
- Check that file paths in `index.html` match actual filenames
- PDFs work online but may not work when viewing `file://` locally

### Site Not Updating?
- Wait a few minutes after pushing changes
- Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)
- Check the Actions tab in your repository for build status

### Need to Update Your Site?

```bash
# Make your changes, then:
git add .
git commit -m "Description of changes"
git push
```

## Your Repository is Ready!

All files are committed and ready to push. Just create the GitHub repository and follow steps 2-4 above.
