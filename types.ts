
export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  password?: string;
  phoneNumber?: string;
  registeredAt: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  quantity: number;
}

export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled';

export interface Order {
  id: string;
  userId: string;
  items: { productId: string; quantity: number; price: number; name: string }[];
  total: number;
  status: OrderStatus;
  paymentMethod: 'EasyPaisa' | 'Bank Transfer';
  paymentReference?: string;
  createdAt: number;
}

export type AppView = 'store' | 'admin' | 'cart' | 'profile' | 'contact' | 'shop' | 'live' | 'services' | 'other';
