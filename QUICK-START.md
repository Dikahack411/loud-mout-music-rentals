# 🚀 Quick Start - Deploy to Vercel in 5 Minutes

## Prerequisites
- [Vercel Account](https://vercel.com/signup)
- [GitHub Repository](https://github.com/Dikahack411/loud-mout-music-rentals)

## Option 1: One-Click Deploy (Recommended)

### Frontend
1. Click [Deploy to Vercel](https://vercel.com/new/clone?repository-url=https://github.com/Dikahack411/loud-mout-music-rentals&root-directory=frontend)
2. Import your repository
3. Set root directory to `frontend`
4. Deploy!

### Backend
1. Click [Deploy to Vercel](https://vercel.com/new/clone?repository-url=https://github.com/Dikahack411/loud-mout-music-rentals&root-directory=backend)
2. Import your repository
3. Set root directory to `backend`
4. Deploy!

## Option 2: CLI Deploy

### 1. Install Vercel CLI
```bash
npm i -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy Backend
```bash
cd backend
vercel --prod
```

### 4. Deploy Frontend
```bash
cd frontend
vercel --prod
```

## Option 3: Use the Deployment Script

```bash
# Make script executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

## ⚡ What Happens Next?

1. **Vercel automatically detects your framework** (Next.js/Node.js)
2. **Builds your project** using optimized settings
3. **Deploys to global edge network**
4. **Provides you with URLs** for both projects

## 🔧 Post-Deployment Setup

### 1. Configure Environment Variables
- Go to your Vercel project dashboard
- Navigate to Settings > Environment Variables
- Add variables from `env.production.template` files

### 2. Connect Your Domain (Optional)
- Go to Settings > Domains
- Add your custom domain
- Configure DNS records

### 3. Test Your Application
- Visit your frontend URL
- Test user registration/login
- Verify API connectivity

## 🎯 Success Checklist

- [ ] Frontend deployed and accessible
- [ ] Backend deployed and API responding
- [ ] Environment variables configured
- [ ] Database connected (MongoDB Atlas)
- [ ] Payment gateways configured
- [ ] Application tested and working

## 🆘 Need Help?

- 📖 Read the full [DEPLOYMENT.md](DEPLOYMENT.md)
- 🐛 Check [Vercel Documentation](https://vercel.com/docs)
- 💬 Join [Vercel Community](https://github.com/vercel/vercel/discussions)

---

**Your LOUD-MOUT Music Rentals app will be live in minutes! 🎵**
