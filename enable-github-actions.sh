#!/bin/bash

# Script to enable GitHub Actions via GitHub API
# Requires: GITHUB_TOKEN environment variable or GitHub CLI (gh)

REPO="gasperoo/marapone-contracting"

echo "Enabling GitHub Actions for $REPO..."

# Check if GitHub CLI is available
if command -v gh &> /dev/null; then
    echo "Using GitHub CLI..."
    
    # Enable Actions
    gh api repos/$REPO/actions/permissions \
        -X PUT \
        -f enabled=true \
        -f allowed_actions=all
    
    # Set workflow permissions
    gh api repos/$REPO/actions/permissions/workflow \
        -X PUT \
        -f default_workflow_permissions=write \
        -f can_approve_pull_request_reviews=true
    
    # Configure Pages to use gh-pages branch
    gh api repos/$REPO/pages \
        -X PUT \
        -f source[branch]=gh-pages \
        -f source[path]=/ \
        -f cname=marapone.com
    
    echo "✅ GitHub Actions enabled!"
    echo "✅ Workflow permissions configured!"
    echo "✅ GitHub Pages configured!"
    
elif [ -n "$GITHUB_TOKEN" ]; then
    echo "Using GitHub API with token..."
    
    # Enable Actions
    curl -X PUT \
        -H "Authorization: token $GITHUB_TOKEN" \
        -H "Accept: application/vnd.github.v3+json" \
        "https://api.github.com/repos/$REPO/actions/permissions" \
        -d '{"enabled":true,"allowed_actions":"all"}'
    
    # Set workflow permissions
    curl -X PUT \
        -H "Authorization: token $GITHUB_TOKEN" \
        -H "Accept: application/vnd.github.v3+json" \
        "https://api.github.com/repos/$REPO/actions/permissions/workflow" \
        -d '{"default_workflow_permissions":"write","can_approve_pull_request_reviews":true}'
    
    # Configure Pages
    curl -X PUT \
        -H "Authorization: token $GITHUB_TOKEN" \
        -H "Accept: application/vnd.github.v3+json" \
        "https://api.github.com/repos/$REPO/pages" \
        -d '{"source":{"branch":"gh-pages","path":"/"},"cname":"marapone.com"}'
    
    echo "✅ GitHub Actions enabled!"
    echo "✅ Workflow permissions configured!"
    echo "✅ GitHub Pages configured!"
    
else
    echo "❌ Error: Need either GitHub CLI (gh) or GITHUB_TOKEN environment variable"
    echo ""
    echo "Option 1: Install GitHub CLI"
    echo "  brew install gh"
    echo "  gh auth login"
    echo ""
    echo "Option 2: Use GitHub API with token"
    echo "  export GITHUB_TOKEN=your_token_here"
    echo "  ./enable-github-actions.sh"
    echo ""
    echo "Option 3: Enable manually via GitHub web interface"
    echo "  See GITHUB_ACTIONS_SETUP.md for instructions"
    exit 1
fi
