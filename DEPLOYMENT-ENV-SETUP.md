# 🚀 **Environment Variables Setup for Vercel Deployment**

## 📋 **Overview**
This guide will help you set up all the necessary environment variables in Vercel to ensure your backend and frontend work perfectly in production.

## 🔐 **Backend Environment Variables (Vercel Backend)**

### **Required Variables:**
```bash
# MongoDB Configuration
MONGODB_URI=mongodb+srv://2gdikachi:iySohvkTJhEZZsxT@mylabphase.1tu4msx.mongodb.net/?retryWrites=true&w=majority&appName=mylabphase&ssl=true&tls=true&tlsAllowInvalidCertificates=true

# JWT Security
JWT_SECRET=0a4724d88d9e2d2b0740fffe6026435db57c61ed6e96274be9267f69671124aa

# Paystack Payment Gateway
PAYSTACK_PUBLIC_KEY=pk_test_631784212399b0abba3f88d79465e49a3093237e
PAYSTACK_SECRET_KEY=sk_test_369b5408e0202d5588761540dbd86d3db85fa9df

# Server Configuration
NODE_ENV=production
PORT=5001
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

### **How to Set in Vercel Backend:**
1. Go to your Vercel dashboard
2. Select your backend project
3. Go to **Settings** → **Environment Variables**
4. Add each variable above
5. Set **Environment** to **Production**
6. Click **Save**

---

## 🌐 **Frontend Environment Variables (Vercel Frontend)**

### **Required Variables:**
```bash
# API Configuration
NEXT_PUBLIC_API_URL=https://your-backend-domain.vercel.app/api

# Paystack Configuration (Public Key Only)
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_631784212399b0abba3f88d79465e49a3093237e

# Environment
NODE_ENV=production
```

### **How to Set in Vercel Frontend:**
1. Go to your Vercel dashboard
2. Select your frontend project
3. Go to **Settings** → **Environment Variables**
4. Add each variable above
5. Set **Environment** to **Production**
6. Click **Save**

---

## 🔄 **Step-by-Step Deployment Process**

### **Phase 1: Deploy Backend First**
1. **Push backend code to GitHub**
2. **Deploy backend to Vercel**
3. **Set backend environment variables**
4. **Test backend endpoints**
5. **Note the backend URL** (e.g., `https://your-backend.vercel.app`)

### **Phase 2: Deploy Frontend**
1. **Update frontend environment variables** with actual backend URL
2. **Push frontend code to GitHub**
3. **Deploy frontend to Vercel**
4. **Set frontend environment variables**
5. **Test the complete application**

---

## 🧪 **Testing Your Deployment**

### **Backend Health Check:**
```bash
curl https://your-backend-domain.vercel.app/api/health
```

### **User Registration Test:**
```bash
curl -X POST https://your-backend-domain.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123","phone":"1234567890"}'
```

### **Frontend Test:**
1. Visit your frontend URL
2. Try to register a new user
3. Test login functionality
4. Test Paystack payment flow

---

## ⚠️ **Important Security Notes**

### **Never Commit These Files:**
- `.env`
- `.env.local`
- `.env.production`
- Any file containing real API keys

### **Use Test Keys for Development:**
- Paystack test keys are safe to use in development
- For production, you'll need live Paystack keys
- JWT_SECRET should be different in production

---

## 🆘 **Troubleshooting Common Issues**

### **"Registration Failed" Error:**
- Check MongoDB connection string
- Verify JWT_SECRET is set
- Check backend logs in Vercel

### **"Route Not Found" Error:**
- Verify API_URL is correct
- Check backend deployment status
- Ensure CORS is properly configured

### **Paystack Payment Issues:**
- Verify Paystack keys are correct
- Check webhook configuration
- Test with Paystack test cards

---

## 📱 **Paystack Test Cards for Development**

```bash
# Test Card Numbers:
Card Number: 4084 0840 8408 4081
Expiry: Any future date
CVV: Any 3 digits
PIN: Any 4 digits
OTP: Any 6 digits
```

---

## 🎯 **Final Checklist Before Deployment**

- [ ] Backend environment variables set in Vercel
- [ ] Frontend environment variables set in Vercel
- [ ] MongoDB connection string updated with SSL
- [ ] Paystack keys configured
- [ ] JWT_SECRET set
- [ ] CORS configured for production domains
- [ ] Backend deployed and tested
- [ ] Frontend deployed and tested
- [ ] Complete user flow tested (register → login → payment)

---

## 📞 **Need Help?**

If you encounter any issues:
1. Check Vercel deployment logs
2. Verify environment variables are set correctly
3. Test backend endpoints individually
4. Check MongoDB connection status
5. Verify Paystack webhook configuration

**Your app is now ready for production deployment! 🚀🎸**
