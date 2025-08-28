# Musical Instruments Rental API

A comprehensive REST API for managing musical instrument rentals, built with Node.js, Express, and MongoDB.

## Features

- **User Authentication**: JWT-based authentication with role-based access control
- **Instrument Management**: CRUD operations for musical instruments
- **Rental System**: Complete rental lifecycle management
- **Payment Integration**: Paystack and Flutterwave payment gateways
- **Admin Dashboard**: Comprehensive admin panel with analytics
- **Image Upload**: Cloudinary integration for instrument images
- **Security**: Rate limiting, input validation, and security headers

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Payment**: Paystack & Flutterwave
- **File Upload**: Cloudinary
- **Security**: Helmet, CORS, Rate Limiting

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/forgot-password` - Forgot password
- `POST /api/auth/reset-password` - Reset password

### Instruments

- `GET /api/instruments` - Get all instruments (with filtering)
- `GET /api/instruments/:id` - Get instrument by ID
- `POST /api/instruments` - Create instrument (Admin)
- `PUT /api/instruments/:id` - Update instrument (Admin)
- `DELETE /api/instruments/:id` - Delete instrument (Admin)
- `GET /api/instruments/categories` - Get instrument categories
- `GET /api/instruments/subcategories/:category` - Get subcategories
- `POST /api/instruments/:id/favorite` - Toggle favorite

### Rentals

- `POST /api/rentals` - Create new rental
- `GET /api/rentals/my-rentals` - Get user's rentals
- `GET /api/rentals` - Get all rentals (Admin)
- `GET /api/rentals/:id` - Get rental by ID
- `PUT /api/rentals/:id/status` - Update rental status (Admin)
- `PUT /api/rentals/:id/return` - Mark as returned (Admin)
- `PUT /api/rentals/:id/cancel` - Cancel rental
- `GET /api/rentals/stats` - Get rental statistics (Admin)

### Payments

- `POST /api/payments/paystack/initialize` - Initialize Paystack payment
- `GET /api/payments/paystack/verify/:reference` - Verify Paystack payment
- `POST /api/payments/flutterwave/initialize` - Initialize Flutterwave payment
- `GET /api/payments/flutterwave/verify/:transactionId` - Verify Flutterwave payment
- `GET /api/payments/history` - Get payment history

### Users (Admin)

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `GET /api/users/stats` - Get user statistics

### Admin Dashboard

- `GET /api/admin/dashboard` - Get dashboard statistics
- `GET /api/admin/analytics` - Get analytics data
- `GET /api/admin/health` - Get system health
- `POST /api/admin/notifications` - Send notifications
- `GET /api/admin/export/:type` - Export data

## Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create environment file:

   ```bash
   cp env.example .env
   ```

4. Configure environment variables in `.env`

5. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

```env
# Server Configuration
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# Database
MONGODB_URI=mongodb://localhost:27017/musical-rental

# JWT
JWT_SECRET=your_jwt_secret_key_here

# Payment Gateways
PAYSTACK_SECRET_KEY=your_paystack_secret_key
PAYSTACK_PUBLIC_KEY=your_paystack_public_key
FLUTTERWAVE_SECRET_KEY=your_flutterwave_secret_key
FLUTTERWAVE_PUBLIC_KEY=your_flutterwave_public_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_email_password
```

## Database Models

### User

- Basic user information
- Role-based access (user/admin)
- Email verification
- Password reset functionality
- Rental history and favorites

### Instrument

- Musical instrument details
- Pricing (daily, weekly, monthly rates)
- Availability status
- Condition tracking
- Maintenance scheduling
- Image gallery

### Rental

- Complete rental lifecycle
- Payment tracking
- Status management
- Late fees calculation
- Damage assessment

## Security Features

- JWT authentication
- Password hashing with bcrypt
- Rate limiting
- Input validation
- CORS protection
- Security headers with Helmet
- Role-based access control

## Payment Integration

### Paystack

- Initialize payment
- Payment verification
- Webhook handling

### Flutterwave

- Payment initialization
- Transaction verification
- Redirect handling

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Environment Variables for Production

- Set `NODE_ENV=production`
- Use production MongoDB URI
- Configure production payment keys
- Set up proper CORS origins

## API Documentation

The API follows RESTful conventions and returns JSON responses. All endpoints require proper authentication headers except for public routes.

### Authentication Header

```
Authorization: Bearer <jwt_token>
```

### Response Format

```json
{
  "success": true,
  "data": {},
  "message": "Operation successful"
}
```

### Error Format

```json
{
  "error": "Error message",
  "status": 400
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
