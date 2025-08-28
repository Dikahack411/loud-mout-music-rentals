# Environment Configuration for Frontend

## Required Environment Variables

Create a `.env.local` file in your frontend directory with the following variables:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Paystack Configuration (REQUIRED for payments)
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_your_paystack_public_key_here

# Build Configuration
NODE_ENV=development
```

## Paystack Setup Instructions

1. **Get Your Paystack Keys:**
   - Go to [Paystack Dashboard](https://dashboard.paystack.com/)
   - Sign up or login to your account
   - Go to Settings → API Keys & Webhooks
   - Copy your Public Key (starts with `pk_test_` for test mode)

2. **Test Mode vs Live Mode:**
   - **Test Mode**: Use keys starting with `pk_test_` and `sk_test_`
   - **Live Mode**: Use keys starting with `pk_live_` and `sk_live_`

3. **Webhook Configuration:**
   - Set webhook URL to: `https://your-domain.com/api/payments/paystack/webhook`
   - Events to listen for: `charge.success`, `transfer.success`

## Backend Environment Variables

Make sure your backend `.env` file has:

```bash
# Payment Gateways
PAYSTACK_SECRET_KEY=sk_test_your_paystack_secret_key
PAYSTACK_PUBLIC_KEY=pk_test_your_paystack_public_key

# Server Configuration
FRONTEND_URL=http://localhost:3000
```

## Testing Payments

1. **Test Cards (Test Mode):**
   - **Visa**: 4084 0840 8408 4081
   - **Mastercard**: 5105 1051 0510 5100
   - **Expiry**: Any future date
   - **CVV**: Any 3 digits
   - **PIN**: Any 4 digits

2. **Test OTP:**
   - Use `123456` for any OTP request

## Production Deployment

1. **Update Environment Variables:**
   - Change to live Paystack keys
   - Update API URLs to production domains
   - Set NODE_ENV=production

2. **Vercel Configuration:**
   - Add all environment variables in Vercel dashboard
   - Ensure NEXT_PUBLIC_* variables are public
   - Keep secret keys only in backend
