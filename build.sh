#!/bin/bash
set -e

# Display build info
echo "=== Building RiseKlix Agency Website ==="
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"

# Clean up
echo "=== Cleaning up previous builds ==="
rm -rf .next
rm -rf node_modules/.cache

# Install dependencies
echo "=== Installing dependencies ==="
npm ci

# Build the project
echo "=== Building Next.js project ==="
npm run build

# Post-build logs
echo "=== Build completed successfully ==="
echo "The site is ready for Netlify deployment!" 