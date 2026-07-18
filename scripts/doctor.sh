#!/data/data/com.termux/files/usr/bin/bash

echo
echo "=============================="
echo " SandboxCodeX Doctor"
echo "=============================="
echo

echo "Node:"
node -v

echo

echo "pnpm:"
pnpm -v

echo

echo "Git:"
git --version

echo

echo "Workspace"

test -f package.json && echo "✓ package.json"

test -f pnpm-workspace.yaml && echo "✓ pnpm-workspace.yaml"

test -d apps && echo "✓ apps"

test -d packages && echo "✓ packages"

test -d scripts && echo "✓ scripts"

echo
echo "Doctor completed."
