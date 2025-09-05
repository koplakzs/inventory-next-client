import { LucideIcon } from "lucide-react";

export interface PaginatedInterface {
  currentPage: number;
  from: number;
  lastPage: number;
  path: string;
  perPage: number;
  to: number;
  total: number;
}

export interface CardItem {
  name: string;
  count: number;
  icon: LucideIcon;
}

export interface ApiInterface<T = unknown> {
  success: boolean;
  message: string;
  data: T;
}
export interface CategoryInterface {
  id: number;
  name: string;
}
export interface ProductInterface {
  id: number;
  name: string;
  category: CategoryInterface;
  stock: number;
  code: string;
  images: string[];
}

export interface MonthlyProductInterface {
  month: string;
  countProduct: number;
}

export interface LoginInterface {
  user: {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
  };
  token: string;
}

export interface CategoryInterfacePaginated {
  data: CategoryInterface[];
  meta: PaginatedInterface;
}

export interface DashboardInterface {
  countCategories: number;
  countProducts: number;
  countStocks: number;
  products: ProductInterface[];
  monthlyProduct: MonthlyProductInterface[];
}
