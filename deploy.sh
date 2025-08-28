#!/bin/bash

# LOUD-MOUT Music Rentals - Deployment Script
# This script deploys both frontend and backend to Vercel

set -e

echo "🎵 LOUD-MOUT Music Rentals - Deployment Script"
echo "================================================"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if user is logged in to Vercel
if ! vercel whoami &> /dev/null; then
    echo "❌ Not logged in to Vercel. Please login first:"
    echo "   vercel login"
    exit 1
fi

echo "✅ Vercel CLI ready"

# Deploy Backend
echo ""
echo "🚀 Deploying Backend..."
cd backend

echo "📦 Installing dependencies..."
npm install

echo "🌐 Deploying to Vercel..."
vercel --prod --yes

# Get the backend URL
BACKEND_URL=$(vercel ls | grep "backend" | head -1 | awk '{print $2}')
echo "✅ Backend deployed at: $BACKEND_URL"

cd ..

# Deploy Frontend
echo ""
echo "🚀 Deploying Frontend..."
cd frontend

echo "📦 Installing dependencies..."
npm install

echo "🔧 Updating API URL..."
# Update the .env.local file with the backend URL
echo "NEXT_PUBLIC_API_URL=$BACKEND_URL/api" > .env.local

echo "🌐 Deploying to Vercel..."
vercel --prod --yes

# Get the frontend URL
FRONTEND_URL=$(vercel ls | grep "frontend" | head -1 | awk '{print $2}')
echo "✅ Frontend deployed at: $FRONTEND_URL"

cd ..

echo ""
echo "🎉 Deployment Complete!"
echo "======================"
echo "Frontend: $FRONTEND_URL"
echo "Backend:  $BACKEND_URL"
echo ""
echo "📋 Next Steps:"
echo "1. Configure environment variables in Vercel dashboard"
echo "2. Set up your database (MongoDB Atlas)"
echo "3. Configure payment gateways"
echo "4. Test the application"
echo ""
echo "📖 See DEPLOYMENT.md for detailed configuration instructions"
