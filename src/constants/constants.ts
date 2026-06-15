// API endpoints
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3000";

// Types
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
  status: number;
}