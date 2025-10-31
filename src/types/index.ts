// Global type definitions for the O'Watch application

export interface User {
  id: string;
  walletAddress: string;
  username: string;
  email?: string;
  totalEarnings: number;
  watchTime: number;
  joinedAt: Date;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  duration: number;
  category: VideoCategory;
  rewardRate: number; // OWATCH tokens per minute
  creatorId: string;
  views: number;
  uploadedAt: Date;
}

export interface VideoCategory {
  id: string;
  name: string;
  slug: string;
}

export interface WatchSession {
  id: string;
  userId: string;
  videoId: string;
  startTime: Date;
  endTime?: Date;
  watchDuration: number; // in seconds
  tokensEarned: number;
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'earning' | 'withdrawal' | 'deposit';
  amount: number;
  tokenType: 'OWATCH';
  status: 'pending' | 'completed' | 'failed';
  txHash?: string;
  createdAt: Date;
}

export interface DashboardStats {
  totalEarnings: number;
  todayEarnings: number;
  totalWatchTime: number;
  todayWatchTime: number;
  totalVideos: number;
  rank: number;
}

// Component Props
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Wallet types
export interface WalletConnection {
  address: string;
  balance: number;
  chainId: number;
  isConnected: boolean;
}

export type WalletProvider = 'hashpack' | 'hashconnect' | 'dummy';

// Theme types
export type Theme = 'light' | 'dark';

export interface ThemeConfig {
  mode: Theme;
  primaryColor: string;
  secondaryColor: string;
}
