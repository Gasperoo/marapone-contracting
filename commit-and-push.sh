#!/bin/bash
# Run this script from your system Terminal (not Cursor) to commit and push
# without losing progress. Deploy runs when main is pushed.

set -e
cd "$(dirname "$0")"

echo "=== Commit and push from this worktree ==="

# Create branch if we're detached (worktrees often are)
if ! git symbolic-ref -q HEAD >/dev/null 2>&1; then
  echo "Creating branch vzk-deploy..."
  git checkout -b vzk-deploy
fi

# If we're on a branch other than main, ensure it's vzk-deploy for pushing
CURRENT=$(git branch --show-current 2>/dev/null || true)
if [ -z "$CURRENT" ]; then
  git checkout -b vzk-deploy
  CURRENT=vzk-deploy
fi

git add -A
git status

if git diff --cached --quiet; then
  echo "Nothing new to commit. Working tree matches last commit."
  echo "To push current branch: git push -u origin $CURRENT"
  exit 0
fi

git commit -m "chore: update package-lock.json and preserve progress"
git push -u origin "${CURRENT:-vzk-deploy}"

echo ""
echo "=== Branch pushed ==="

# Merge into main and push to trigger build/deploy (if main repo exists)
MAIN_REPO="/Users/gasper/marapone-contracting"
BRANCH="${CURRENT:-vzk-deploy}"
if [ -d "$MAIN_REPO/.git" ]; then
  echo "Merging into main and pushing to trigger deploy..."
  (cd "$MAIN_REPO" && git fetch origin && git checkout main && git merge "origin/$BRANCH" -m "Merge $BRANCH: preserve progress" && git push origin main) && echo "" && echo "Done. GitHub Actions will build and deploy from main." || {
    echo ""
    echo "Merge/push from main repo failed. Run manually:"
    echo "  cd $MAIN_REPO"
    echo "  git fetch origin && git checkout main && git merge origin/$BRANCH && git push origin main"
  }
else
  echo ""
  echo "To build and deploy, run from your main repo:"
  echo "  cd $MAIN_REPO"
  echo "  git fetch origin && git checkout main && git merge origin/$BRANCH && git push origin main"
fi
echo ""
