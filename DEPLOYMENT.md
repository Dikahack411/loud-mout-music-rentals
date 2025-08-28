# LOUD-MOUT Music Rentals - Vercel Deployment Guide

## Overview
This project is a monorepo with separate frontend (Next.js) and backend (Node.js) that need to be deployed as separate Vercel projects.

## Prerequisites
- [Vercel CLI](https://vercel.com/cli) installed
- [GitHub](https://github.com) account with your repository
- [Vercel](https://vercel.com) account

## Step 1: Deploy Backend (API)

### 1.1 Navigate to Backend Directory
```bash
cd backend
```

### 1.2 Deploy to Vercel
```bash
vercel --prod
```

### 1.3 Configure Environment Variables
In your Vercel dashboard, add these environment variables for the backend:

```env
# Database
MONGODB_URI=your_mongodb_atlas_connection_string

# JWT Secret
JWT_SECRET=your_jwt_secret_key

# Cloudinary (if using image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Payment Gateways
PAYSTACK_SECRET_KEY=your_paystack_secret_key
FLUTTERWAVE_SECRET_KEY=your_flutterwave_secret_key

# Server Configuration
NODE_ENV=production
PORT=3000
```

### 1.4 Get Backend URL
Note the deployment URL (e.g., `https://your-backend.vercel.app`)

## Step 2: Deploy Frontend

### 2.1 Navigate to Frontend Directory
```bash
cd frontend
```

### 2.2 Update API Base URL
Create/update `.env.local` with your backend URL:

```env
NEXT_PUBLIC_API_URL=https://your-backend.vercel.app/api
```

### 2.3 Deploy to Vercel
```bash
vercel --prod
```

### 2.4 Configure Environment Variables
In your Vercel dashboard, add these environment variables for the frontend:

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://your-backend.vercel.app/api

# Build Configuration
NODE_ENV=production
```

## Step 3: Configure Domains (Optional)

### 3.1 Custom Domain Setup
1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Configure DNS records as instructed

### 3.2 Subdomain Setup
- Frontend: `app.yourdomain.com` or `www.yourdomain.com`
- Backend: `api.yourdomain.com`

## Step 4: Post-Deployment Verification

### 4.1 Test Backend API
```bash
curl https://your-backend.vercel.app/api/health
```

### 4.2 Test Frontend
- Visit your frontend URL
- Test user registration/login
- Test instrument browsing
- Test payment flow

### 4.3 Check Logs
- Monitor Vercel function logs
- Check for any runtime errors
- Verify API responses

## Step 5: Environment-Specific Configurations

### 5.1 Development
```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

### 5.2 Staging
```env
NEXT_PUBLIC_API_URL=https://staging-backend.vercel.app/api
```

### 5.3 Production
```env
NEXT_PUBLIC_API_URL=https://production-backend.vercel.app/api
```

## Troubleshooting

### Common Issues

#### Build Failures
- Check Node.js version compatibility
- Verify all dependencies are installed
- Check for TypeScript/ESLint errors

#### API Connection Issues
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check CORS configuration in backend
- Verify backend is deployed and running

#### Environment Variables
- Ensure all required variables are set
- Check variable names match exactly
- Restart deployment after adding variables

### Performance Optimization

#### Frontend
- Enable Vercel's Edge Network
- Configure image optimization
- Enable caching strategies

#### Backend
- Set appropriate function timeouts
- Configure database connection pooling
- Enable response caching

## Monitoring and Maintenance

### 1. Performance Monitoring
- Use Vercel Analytics
- Monitor Core Web Vitals
- Track API response times

### 2. Error Tracking
- Set up error logging
- Monitor function failures
- Track user experience issues

### 3. Regular Updates
- Keep dependencies updated
- Monitor security advisories
- Regular performance reviews

## Support

For deployment issues:
1. Check Vercel documentation
2. Review deployment logs
3. Contact Vercel support
4. Check GitHub issues

---

**Note**: This deployment guide assumes you're using Vercel's free tier. For production applications, consider upgrading to a paid plan for better performance and features.
