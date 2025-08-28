// User types
export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: "user" | "admin";
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  profileImage?: string;
  isVerified: boolean;
  rentalHistory?: Rental[];
  favorites?: string[];
  createdAt: string;
  updatedAt: string;
}

// Instrument types
export interface Instrument {
  _id: string;
  name: string;
  category:
    | "String"
    | "Wind"
    | "Percussion"
    | "Keyboard"
    | "Electronic"
    | "Accessories";
  subcategory: string;
  brand: string;
  model: string;
  description: string;
  images: string[];
  dailyRate: number;
  weeklyRate: number;
  monthlyRate: number;
  condition: "Excellent" | "Very Good" | "Good" | "Fair" | "Poor";
  serialNumber?: string;
  specifications?: Record<string, string>;
  isAvailable: boolean;
  isActive: boolean;
  location: string;
  tags: string[];
  rentalCount: number;
  lastMaintenance?: string;
  nextMaintenance?: string;
  notes?: string;
  createdBy: User;
  createdAt: string;
  updatedAt: string;
}

// Rental types
export interface Rental {
  _id: string;
  user: User;
  instrument: Instrument;
  startDate: string;
  endDate: string;
  duration: number;
  durationType: "daily" | "weekly" | "monthly";
  totalAmount: number;
  deposit: number;
  status:
    | "pending"
    | "confirmed"
    | "active"
    | "completed"
    | "cancelled"
    | "overdue";
  paymentStatus: "pending" | "paid" | "partial" | "refunded";
  paymentMethod: "paystack" | "flutterwave" | "cash" | "bank_transfer";
  paymentReference?: string;
  pickupLocation: string;
  returnLocation: string;
  pickupInstructions?: string;
  returnInstructions?: string;
  actualReturnDate?: string;
  lateFees: number;
  damageFees: number;
  notes?: string;
  adminNotes?: string;
  cancellationReason?: string;
  refundAmount: number;
  createdBy: User;
  createdAt: string;
  updatedAt: string;
}

// Payment types
export interface PaymentInitiation {
  rentalId: string;
  email: string;
  amount: number;
  callbackUrl?: string;
}

export interface PaymentResponse {
  authorization_url?: string;
  payment_url?: string;
  reference: string;
  access_code?: string;
  status: string;
}

export interface PaymentVerification {
  success: boolean;
  message: string;
  rental: {
    id: string;
    status: string;
    paymentStatus: string;
    totalAmount: number;
    instrument: string;
  };
}

// API Response types
export interface ApiResponse<T> {
  success?: boolean;
  data?: T;
  message?: string;
  error?: string;
  status?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pages: number;
  total: number;
}

// Filter types
export interface InstrumentFilters {
  keyword?: string;
  category?: string;
  condition?: string;
  available?: boolean;
  page?: number;
}

export interface RentalFilters {
  status?: string;
  userId?: string;
  page?: number;
}

// Dashboard types
export interface DashboardStats {
  users: {
    total: number;
    newThisMonth: number;
  };
  instruments: {
    total: number;
    available: number;
    rented: number;
  };
  rentals: {
    total: number;
    active: number;
    completed: number;
    pending: number;
  };
  revenue: {
    total: number;
    monthly: number;
  };
  recentActivities: {
    rentals: Rental[];
    users: User[];
  };
  categoryStats: Array<{
    _id: string;
    count: number;
  }>;
  monthlyTrends: Array<{
    _id: {
      year: number;
      month: number;
    };
    count: number;
    revenue: number;
  }>;
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

export interface RentalForm {
  instrumentId: string;
  startDate: string;
  endDate: string;
  duration: number;
  durationType: "daily" | "weekly" | "monthly";
  pickupLocation: string;
  returnLocation: string;
  pickupInstructions?: string;
  returnInstructions?: string;
  paymentMethod: "paystack" | "flutterwave" | "cash" | "bank_transfer";
  notes?: string;
}

// Auth context types
export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterForm) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}
