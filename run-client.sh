#!/bin/bash
cd client

echo "Installing dependencies if needed..."
npm install --no-fund --no-audit

echo "Starting client..."
NODE_ENV=development npm run dev -- --host 0.0.0.0 --port 5001