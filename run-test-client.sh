#!/bin/bash
cd test-client

echo "Installing dependencies..."
npm install --no-fund --no-audit

echo "Starting test client..."
NODE_OPTIONS="--max-old-space-size=256" npm run dev -- --host 0.0.0.0 --port 5001