import axios, { AxiosInstance, AxiosResponse } from "axios";
import {
  User,
  Instrument,
  Rental,
  PaymentInitiation,
  PaymentResponse,
  PaymentVerification,
  PaginatedResponse,
  InstrumentFilters,
  RentalFilters,
  DashboardStats,
  LoginForm,
  RegisterForm,
  RentalForm,
} from "@/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      (config) => {
        if (typeof window !== "undefined") {
          const token = localStorage.getItem("token");
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle errors
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          if (typeof window !== "undefined") {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login";
          }
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async login(data: LoginForm): Promise<{ user: User; token: string }> {
    const response: AxiosResponse<{ user: User; token: string }> =
      await this.client.post("/auth/login", data);
    return response.data;
  }

  async register(data: RegisterForm): Promise<{ user: User; token: string }> {
    const response: AxiosResponse<{ user: User; token: string }> =
      await this.client.post("/auth/register", data);
    return response.data;
  }

  async getProfile(): Promise<User> {
    const response: AxiosResponse<User> = await this.client.get(
      "/auth/profile"
    );
    return response.data;
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    const response: AxiosResponse<User> = await this.client.put(
      "/auth/profile",
      data
    );
    return response.data;
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    const response: AxiosResponse<{ message: string }> = await this.client.post(
      "/auth/forgot-password",
      { email }
    );
    return response.data;
  }

  async resetPassword(
    resetToken: string,
    newPassword: string
  ): Promise<{ message: string }> {
    const response: AxiosResponse<{ message: string }> = await this.client.post(
      "/auth/reset-password",
      { resetToken, newPassword }
    );
    return response.data;
  }

  // Instrument endpoints
  async getInstruments(
    filters?: InstrumentFilters
  ): Promise<PaginatedResponse<Instrument>> {
    const params = new URLSearchParams();
    if (filters?.keyword) params.append("keyword", filters.keyword);
    if (filters?.category) params.append("category", filters.category);
    if (filters?.condition) params.append("condition", filters.condition);
    if (filters?.available !== undefined)
      params.append("available", filters.available.toString());
    if (filters?.page) params.append("pageNumber", filters.page.toString());

    const response: AxiosResponse<PaginatedResponse<Instrument>> =
      await this.client.get(`/instruments?${params}`);
    return response.data;
  }

  async getInstrument(id: string): Promise<Instrument> {
    const response: AxiosResponse<Instrument> = await this.client.get(
      `/instruments/${id}`
    );
    return response.data;
  }

  async createInstrument(data: Partial<Instrument>): Promise<Instrument> {
    const response: AxiosResponse<Instrument> = await this.client.post(
      "/instruments",
      data
    );
    return response.data;
  }

  async updateInstrument(
    id: string,
    data: Partial<Instrument>
  ): Promise<Instrument> {
    const response: AxiosResponse<Instrument> = await this.client.put(
      `/instruments/${id}`,
      data
    );
    return response.data;
  }

  async deleteInstrument(id: string): Promise<{ message: string }> {
    const response: AxiosResponse<{ message: string }> =
      await this.client.delete(`/instruments/${id}`);
    return response.data;
  }

  async getCategories(): Promise<string[]> {
    const response: AxiosResponse<string[]> = await this.client.get(
      "/instruments/categories"
    );
    return response.data;
  }

  async getSubcategories(category: string): Promise<string[]> {
    const response: AxiosResponse<string[]> = await this.client.get(
      `/instruments/subcategories/${category}`
    );
    return response.data;
  }

  async toggleFavorite(
    instrumentId: string
  ): Promise<{ message: string; favorites: string[] }> {
    const response: AxiosResponse<{ message: string; favorites: string[] }> =
      await this.client.post(`/instruments/${instrumentId}/favorite`);
    return response.data;
  }

  // Rental endpoints
  async createRental(data: RentalForm): Promise<Rental> {
    const response: AxiosResponse<Rental> = await this.client.post(
      "/rentals",
      data
    );
    return response.data;
  }

  async getMyRentals(): Promise<Rental[]> {
    const response: AxiosResponse<Rental[]> = await this.client.get(
      "/rentals/my-rentals"
    );
    return response.data;
  }

  async getAllRentals(
    filters?: RentalFilters
  ): Promise<PaginatedResponse<Rental>> {
    const params = new URLSearchParams();
    if (filters?.status) params.append("status", filters.status);
    if (filters?.userId) params.append("userId", filters.userId);
    if (filters?.page) params.append("pageNumber", filters.page.toString());

    const response: AxiosResponse<PaginatedResponse<Rental>> =
      await this.client.get(`/rentals?${params}`);
    return response.data;
  }

  async getRental(id: string): Promise<Rental> {
    const response: AxiosResponse<Rental> = await this.client.get(
      `/rentals/${id}`
    );
    return response.data;
  }

  async updateRentalStatus(
    id: string,
    status: string,
    adminNotes?: string
  ): Promise<Rental> {
    const response: AxiosResponse<Rental> = await this.client.put(
      `/rentals/${id}/status`,
      { status, adminNotes }
    );
    return response.data;
  }

  async markAsReturned(
    id: string,
    actualReturnDate?: string,
    damageFees?: number,
    adminNotes?: string
  ): Promise<Rental> {
    const response: AxiosResponse<Rental> = await this.client.put(
      `/rentals/${id}/return`,
      { actualReturnDate, damageFees, adminNotes }
    );
    return response.data;
  }

  async cancelRental(id: string, cancellationReason?: string): Promise<Rental> {
    const response: AxiosResponse<Rental> = await this.client.put(
      `/rentals/${id}/cancel`,
      { cancellationReason }
    );
    return response.data;
  }

  async getRentalStats(): Promise<DashboardStats> {
    const response: AxiosResponse<DashboardStats> = await this.client.get(
      "/rentals/stats"
    );
    return response.data;
  }

  // Payment endpoints
  async initializePaystackPayment(
    data: PaymentInitiation
  ): Promise<PaymentResponse> {
    const response: AxiosResponse<PaymentResponse> = await this.client.post(
      "/payments/paystack/initialize",
      data
    );
    return response.data;
  }

  async verifyPaystackPayment(reference: string): Promise<PaymentVerification> {
    const response: AxiosResponse<PaymentVerification> = await this.client.get(
      `/payments/paystack/verify/${reference}`
    );
    return response.data;
  }

  async initializeFlutterwavePayment(
    data: PaymentInitiation
  ): Promise<PaymentResponse> {
    const response: AxiosResponse<PaymentResponse> = await this.client.post(
      "/payments/flutterwave/initialize",
      data
    );
    return response.data;
  }

  async verifyFlutterwavePayment(
    transactionId: string
  ): Promise<PaymentVerification> {
    const response: AxiosResponse<PaymentVerification> = await this.client.get(
      `/payments/flutterwave/verify/${transactionId}`
    );
    return response.data;
  }

  async getPaymentHistory(): Promise<Rental[]> {
    const response: AxiosResponse<Rental[]> = await this.client.get(
      "/payments/history"
    );
    return response.data;
  }

  // Admin endpoints
  async getDashboardStats(): Promise<DashboardStats> {
    const response: AxiosResponse<DashboardStats> = await this.client.get(
      "/admin/dashboard"
    );
    return response.data;
  }

  async getAnalytics(
    period?: string
  ): Promise<{ data: unknown; total: number }> {
    const params = period ? `?period=${period}` : "";
    const response: AxiosResponse<{ data: unknown; total: number }> =
      await this.client.get(`/admin/analytics${params}`);
    return response.data;
  }

  async getSystemHealth(): Promise<{ status: string; uptime: number }> {
    const response: AxiosResponse<{ status: string; uptime: number }> =
      await this.client.get("/admin/health");
    return response.data;
  }

  async sendNotification(
    type: string,
    message: string,
    recipients?: string[],
    data?: Record<string, unknown>
  ): Promise<{ success: boolean; message: string }> {
    const response: AxiosResponse<{ success: boolean; message: string }> =
      await this.client.post("/admin/notifications", {
        type,
        message,
        recipients,
        data,
      });
    return response.data;
  }

  async exportData(
    type: string,
    format?: string
  ): Promise<{ url: string; filename: string }> {
    const params = format ? `?format=${format}` : "";
    const response: AxiosResponse<{ url: string; filename: string }> =
      await this.client.get(`/admin/export/${type}${params}`);
    return response.data;
  }

  // User management (admin)
  async getUsers(filters?: {
    keyword?: string;
    role?: string;
    page?: number;
  }): Promise<PaginatedResponse<User>> {
    const params = new URLSearchParams();
    if (filters?.keyword) params.append("keyword", filters.keyword);
    if (filters?.role) params.append("role", filters.role);
    if (filters?.page) params.append("pageNumber", filters.page.toString());

    const response: AxiosResponse<PaginatedResponse<User>> =
      await this.client.get(`/users?${params}`);
    return response.data;
  }

  async getUser(id: string): Promise<User> {
    const response: AxiosResponse<User> = await this.client.get(`/users/${id}`);
    return response.data;
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    const response: AxiosResponse<User> = await this.client.put(
      `/users/${id}`,
      data
    );
    return response.data;
  }

  async deleteUser(id: string): Promise<{ message: string }> {
    const response: AxiosResponse<{ message: string }> =
      await this.client.delete(`/users/${id}`);
    return response.data;
  }

  async getUserStats(): Promise<{
    totalUsers: number;
    activeUsers: number;
    newUsers: number;
  }> {
    const response: AxiosResponse<{
      totalUsers: number;
      activeUsers: number;
      newUsers: number;
    }> = await this.client.get("/users/stats");
    return response.data;
  }
}

export const apiClient = new ApiClient();
export default apiClient;
