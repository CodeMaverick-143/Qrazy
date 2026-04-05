#!/bin/bash

echo "Initializing Qrazy Infrastructure..."

mkdir -p scripts
mkdir -p .github/workflows

echo "Establishing environment protocols..."
[ -f server/.env.example ] && cp -n server/.env.example server/.env || true
[ -f client/.env.example ] && cp -n client/.env.example client/.env || true

echo "Verifying Server dependencies..."
cd server
if [ ! -d "node_modules" ]; then
    npm install
fi
npx prisma generate
cd ..

echo "Verifying Client dependencies..."
cd client
if [ ! -d "node_modules" ]; then
    npm install
fi
cd ..

echo "Qrazy is ready to launch. Start with 'npm run dev' in both modules."
