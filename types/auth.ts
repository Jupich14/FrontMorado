export interface LoginForm {
  username: string;
  password: string;
}

export interface RegisterForm {
  username: string;
  password: string;
}

export interface ReportForm {
  problem: string;
}

export interface User {
  id: number;
  email: string;
  created_at: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

export interface ApiError {
  response?: {
    data?: {
      error?: string;
    };
  };
  message: string;
}

export type ApiErrorType = ApiError; 