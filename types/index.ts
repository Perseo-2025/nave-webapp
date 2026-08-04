export interface User {
  id: string;
  fullName: string;
  username: string;
  role: "super_admin" | "worker";
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp: string;
}

export interface CarouselImage {
  id: string;
  title: string;
  subtitle: string | null;
  imageUrl: string;
  storagePath: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  isActive: boolean;
  sortOrder: number;
  categoryId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description: string | null;
  isActive: boolean;
  sortOrder: number;
}
