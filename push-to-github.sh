#!/bin/bash

# Script to push Marapone Contracting site to GitHub Pages
# Make sure you've created the repository at: https://github.com/gasperoo/marapone-contracting

echo "Setting up GitHub repository for gasperoo..."
cd "$(dirname "$0")"

# Check if remote already exists
if git remote get-url origin &>/dev/null; then
    echo "Remote 'origin' already exists. Updating..."
    git remote set-url origin https://github.com/gasperoo/marapone-contracting.git
else
    echo "Adding remote 'origin'..."
    git remote add origin https://github.com/gasperoo/marapone-contracting.git
fi

# Ensure we're on main branch
git branch -M main

echo ""
echo "Pushing code to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Success! Your code has been pushed to GitHub."
    echo ""
    echo "Next steps:"
    echo "1. Go to: https://github.com/gasperoo/marapone-contracting/settings/pages"
    echo "2. Under 'Source', select branch 'main' and folder '/ (root)'"
    echo "3. Click 'Save'"
    echo "4. Under 'Custom domain', enter: marapone.com"
    echo "5. Click 'Save'"
    echo ""
    echo "Your site will be live once DNS propagates (24-48 hours)!"
else
    echo ""
    echo "❌ Error pushing to GitHub."
    echo "Make sure you've created the repository at: https://github.com/gasperoo/marapone-contracting"
    echo "And that you're logged into GitHub in your browser."
fi

