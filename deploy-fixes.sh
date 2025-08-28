#!/bin/bash

echo "🚀 Starting deployment fixes for LOUD-MOUT-MUSIC-RENTALS..."

# Navigate to frontend directory
cd frontend

echo "📦 Installing dependencies..."
npm install

echo "🔧 Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🎯 Next steps for deployment:"
    echo "1. Push these changes to GitHub"
    echo "2. In your Vercel dashboard, ensure these environment variables are set:"
    echo "   - NEXT_PUBLIC_API_URL=https://your-backend-domain.vercel.app/api"
    echo "   - NODE_ENV=production"
    echo "3. Redeploy the project in Vercel"
    echo ""
    echo "🔍 Issues that were fixed:"
    echo "   ✓ Missing Tailwind CSS configuration"
    echo "   ✓ Incorrect PostCSS configuration"
    echo "   ✓ Missing dependencies (autoprefixer, postcss)"
    echo "   ✓ Incorrect CSS import syntax"
    echo "   ✓ Vercel configuration issues"
    echo "   ✓ Next.js configuration issues"
    echo "   ✓ TypeScript errors in register page"
    echo ""
    echo "📚 See DEPLOYMENT-FIXES.md for detailed information"
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi
