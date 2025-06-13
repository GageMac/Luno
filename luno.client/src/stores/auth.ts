import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";

// Types for our authentication data
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  lastLoginAt?: string;
  isEmailVerified: boolean;
  fullName: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  token: string;
  expiresAt: string;
  user: User;
}

// Configure axios base URL
const API_BASE_URL = "https://localhost:7096/api";
axios.defaults.baseURL = API_BASE_URL;

export const useAuthStore = defineStore("auth", () => {
  // State
  const user = ref<User | null>(null);
  const token = ref<string | null>(localStorage.getItem("auth_token"));
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Getters
  const isAuthenticated = computed(() => !!token.value && !!user.value);
  const userFullName = computed(() => user.value?.fullName || "");

  // Configure axios interceptors
  const setupAxiosInterceptors = () => {
    // Request interceptor to add auth token
    axios.interceptors.request.use(
      (config) => {
        if (token.value) {
          config.headers.Authorization = `Bearer ${token.value}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor to handle auth errors
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Token expired or invalid, logout user
          logout();
        }
        return Promise.reject(error);
      }
    );
  };

  // Actions
  const login = async (credentials: LoginRequest): Promise<void> => {
    try {
      isLoading.value = true;
      error.value = null;

      const response = await axios.post<AuthResponse>("/auth/login", credentials);
      const authData = response.data;

      // Store token and user data
      token.value = authData.token;
      user.value = authData.user;
      localStorage.setItem("auth_token", authData.token);
      localStorage.setItem("user_data", JSON.stringify(authData.user));

      // Setup axios interceptors with new token
      setupAxiosInterceptors();
    } catch (err: any) {
      error.value = err.response?.data?.message || "Login failed";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const register = async (userData: RegisterRequest): Promise<void> => {
    try {
      isLoading.value = true;
      error.value = null;

      const response = await axios.post<AuthResponse>("/auth/register", userData);
      const authData = response.data;

      // Store token and user data
      token.value = authData.token;
      user.value = authData.user;
      localStorage.setItem("auth_token", authData.token);
      localStorage.setItem("user_data", JSON.stringify(authData.user));

      // Setup axios interceptors with new token
      setupAxiosInterceptors();
    } catch (err: any) {
      error.value = err.response?.data?.message || "Registration failed";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const logout = (): void => {
    // Clear state
    token.value = null;
    user.value = null;
    error.value = null;

    // Clear localStorage
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");

    // Call backend logout endpoint (optional)
    if (token.value) {
      axios.post("/auth/logout").catch(() => {
        // Ignore errors on logout
      });
    }
  };

  const getCurrentUser = async (): Promise<void> => {
    try {
      if (!token.value) return;

      const response = await axios.get<User>("/auth/me");
      user.value = response.data;
      localStorage.setItem("user_data", JSON.stringify(response.data));
    } catch (err) {
      // If getting current user fails, logout
      logout();
    }
  };

  const updateProfile = async (profileData: {
    firstName: string;
    lastName: string;
  }): Promise<void> => {
    try {
      isLoading.value = true;
      error.value = null;

      const response = await axios.put<User>("/auth/profile", profileData);
      user.value = response.data;
      localStorage.setItem("user_data", JSON.stringify(response.data));
    } catch (err: any) {
      error.value = err.response?.data?.message || "Profile update failed";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const changePassword = async (passwordData: {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }): Promise<void> => {
    try {
      isLoading.value = true;
      error.value = null;

      await axios.post("/auth/change-password", passwordData);
    } catch (err: any) {
      error.value = err.response?.data?.message || "Password change failed";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const initializeAuth = (): void => {
    // Check if user data exists in localStorage
    const storedUserData = localStorage.getItem("user_data");
    if (storedUserData && token.value) {
      try {
        user.value = JSON.parse(storedUserData);
        setupAxiosInterceptors();
        // Optionally refresh user data from server
        getCurrentUser();
      } catch (err) {
        // If stored data is invalid, logout
        logout();
      }
    }
  };

  const clearError = (): void => {
    error.value = null;
  };

  // Initialize axios interceptors on store creation
  setupAxiosInterceptors();

  return {
    // State
    user,
    token,
    isLoading,
    error,
    // Getters
    isAuthenticated,
    userFullName,
    // Actions
    login,
    register,
    logout,
    getCurrentUser,
    updateProfile,
    changePassword,
    initializeAuth,
    clearError,
  };
});
