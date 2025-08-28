# MusicRent - Musical Instrument Rental Platform

A comprehensive full-stack web application for renting musical instruments, built with modern technologies and best practices.

## 🎵 Features

### User Features

- **User Authentication**: Secure login/register with JWT tokens
- **Instrument Browsing**: Search and filter instruments by category, condition, and availability
- **Rental Management**: Create, track, and manage instrument rentals
- **Payment Integration**: Secure payments via Paystack and Flutterwave
- **Favorites System**: Save and manage favorite instruments
- **Profile Management**: Update personal information and view rental history

### Admin Features

- **Dashboard Analytics**: Comprehensive statistics and insights
- **Instrument Management**: CRUD operations for musical instruments
- **Rental Management**: Monitor and manage all rentals
- **User Management**: Administer user accounts and permissions
- **Payment Tracking**: Monitor payment status and history
- **System Health**: Monitor application performance and status

### Technical Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Real-time Updates**: Live status updates and notifications
- **Image Upload**: Cloudinary integration for instrument images
- **Search & Filtering**: Advanced search with multiple criteria
- **Pagination**: Efficient data loading and navigation
- **Security**: Rate limiting, input validation, and secure authentication

## 🛠 Tech Stack

### Frontend

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with bcrypt password hashing
- **File Upload**: Multer with Cloudinary
- **Payments**: Paystack & Flutterwave integration
- **Security**: Helmet, CORS, Rate Limiting
- **Validation**: Input sanitization and validation

### Deployment

- **Frontend**: Vercel
- **Backend**: Vercel
- **Database**: MongoDB Atlas
- **File Storage**: Cloudinary

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd musical-rental-app
   ```

2. **Install dependencies**

   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Setup**

   **Backend (.env)**

   ```env
   NODE_ENV=development
   PORT=5000
   FRONTEND_URL=http://localhost:3000
   MONGODB_URI=mongodb://localhost:27017/musical-rental
   JWT_SECRET=your_jwt_secret_key_here
   PAYSTACK_SECRET_KEY=your_paystack_secret_key
   PAYSTACK_PUBLIC_KEY=your_paystack_public_key
   FLUTTERWAVE_SECRET_KEY=your_flutterwave_secret_key
   FLUTTERWAVE_PUBLIC_KEY=your_flutterwave_public_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

   **Frontend (.env.local)**

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. **Start the development servers**

   ```bash
   # Start backend (from backend directory)
   npm run dev

   # Start frontend (from frontend directory)
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
musical-rental-app/
├── backend/                 # Express.js API server
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API route handlers
│   ├── middleware/         # Custom middleware
│   ├── config/             # Configuration files
│   ├── utils/              # Utility functions
│   └── server.js           # Main server file
├── frontend/               # Next.js application
│   ├── src/
│   │   ├── app/            # Next.js app router pages
│   │   ├── components/     # React components
│   │   ├── lib/            # Utilities and API client
│   │   ├── hooks/          # Custom React hooks
│   │   ├── types/          # TypeScript type definitions
│   │   └── utils/          # Helper functions
│   └── public/             # Static assets
└── README.md
```

## 🔧 API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Instruments

- `GET /api/instruments` - Get all instruments (with filtering)
- `GET /api/instruments/:id` - Get instrument by ID
- `POST /api/instruments` - Create instrument (Admin)
- `PUT /api/instruments/:id` - Update instrument (Admin)
- `DELETE /api/instruments/:id` - Delete instrument (Admin)

### Rentals

- `POST /api/rentals` - Create new rental
- `GET /api/rentals/my-rentals` - Get user's rentals
- `GET /api/rentals` - Get all rentals (Admin)
- `PUT /api/rentals/:id/status` - Update rental status (Admin)

### Payments

- `POST /api/payments/paystack/initialize` - Initialize Paystack payment
- `GET /api/payments/paystack/verify/:reference` - Verify Paystack payment
- `POST /api/payments/flutterwave/initialize` - Initialize Flutterwave payment
- `GET /api/payments/flutterwave/verify/:transactionId` - Verify Flutterwave payment

### Admin

- `GET /api/admin/dashboard` - Get dashboard statistics
- `GET /api/admin/analytics` - Get analytics data
- `GET /api/admin/health` - Get system health

## 🎨 UI Components

The application includes a comprehensive set of reusable components:

- **Layout Components**: Header, Footer, Navigation
- **Form Components**: Input fields, buttons, validation
- **Card Components**: Instrument cards, rental cards
- **Modal Components**: Confirmation dialogs, forms
- **UI Components**: Loading states, notifications, pagination

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for password security
- **Input Validation**: Comprehensive form validation
- **Rate Limiting**: API rate limiting to prevent abuse
- **CORS Protection**: Cross-origin resource sharing security
- **Helmet**: Security headers for Express.js
- **Input Sanitization**: Protection against XSS attacks

## 💳 Payment Integration

### Paystack

- Payment initialization
- Transaction verification
- Webhook handling

### Flutterwave

- Payment processing
- Transaction verification
- Redirect handling

## 📊 Database Models

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

## 🚀 Deployment

### Vercel Deployment

1. **Connect Repository**

   - Connect your GitHub repository to Vercel
   - Configure build settings for both frontend and backend

2. **Environment Variables**

   - Set all required environment variables in Vercel dashboard
   - Configure production MongoDB URI
   - Set production payment keys

3. **Build Configuration**
   - Frontend: `npm run build`
   - Backend: `npm start`

### Environment Variables for Production

```env
NODE_ENV=production
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
PAYSTACK_SECRET_KEY=your_production_paystack_key
FLUTTERWAVE_SECRET_KEY=your_production_flutterwave_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@musicrent.com or create an issue in the repository.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [MongoDB](https://www.mongodb.com/) for the database
- [Express.js](https://expressjs.com/) for the backend framework
- [Paystack](https://paystack.com/) and [Flutterwave](https://flutterwave.com/) for payment processing
- [Cloudinary](https://cloudinary.com/) for image management

---

**MusicRent** - Making musical instrument rentals accessible to everyone! 🎵
