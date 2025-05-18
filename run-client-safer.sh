#!/bin/bash
cd client

echo "Installing dependencies if needed..."
npm install --no-fund --no-audit

echo "Starting client with reduced memory usage..."
NODE_OPTIONS="--max-old-space-size=512" npm run dev -- --host 0.0.0.0 --port 5001