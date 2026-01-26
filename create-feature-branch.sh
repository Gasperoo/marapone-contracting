#!/bin/bash

# Script to create feature branch and push
# Run this from your local terminal with proper permissions

set -e

echo "🌿 Creating feature branch for mobile optimizations..."
echo ""

cd /Users/gasper/marapone-contracting

# Check current branch
CURRENT_BRANCH=$(git branch --show-current)
echo "Current branch: $CURRENT_BRANCH"
echo ""

# Create feature branch
BRANCH_NAME="feature/mobile-optimizations"
echo "Creating branch: $BRANCH_NAME"

if git checkout -b "$BRANCH_NAME" 2>&1; then
    echo "✅ Branch created successfully"
else
    echo "⚠️  Branch may already exist or permission issue"
    echo "Checking if branch exists..."
    if git show-ref --verify --quiet refs/heads/"$BRANCH_NAME"; then
        echo "Branch exists, switching to it..."
        git checkout "$BRANCH_NAME"
    else
        echo "❌ Could not create branch. Please run manually:"
        echo "   git checkout -b $BRANCH_NAME"
        exit 1
    fi
fi

echo ""
echo "📊 Current status:"
git status --short | head -10

echo ""
echo "📋 Commits to push:"
git log origin/main..HEAD --oneline | head -10

echo ""
echo "🚀 Pushing to origin..."
if git push -u origin "$BRANCH_NAME" 2>&1; then
    echo ""
    echo "✅ Success! Branch pushed to GitHub"
    echo ""
    echo "📋 Next steps:"
    echo "   1. Go to: https://github.com/gasperoo/marapone-contracting"
    echo "   2. You should see a banner: 'feature/mobile-optimizations had recent pushes'"
    echo "   3. Click 'Compare & pull request'"
    echo ""
    echo "   Or create PR manually:"
    echo "   https://github.com/gasperoo/marapone-contracting/compare/main...$BRANCH_NAME"
    echo ""
else
    echo ""
    echo "❌ Push failed. Possible issues:"
    echo "   - Network connectivity (check internet)"
    echo "   - Repository permissions"
    echo "   - Branch protection rules"
    echo ""
    echo "Try manually:"
    echo "   git push -u origin $BRANCH_NAME"
fi
