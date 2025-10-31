"use client";

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

// Dynamically import wallet provider to avoid SSR issues
const WalletProvider = dynamic(
  () => import('./WalletProvider').then(mod => ({ default: mod.WalletContextProvider })),
  {
    ssr: false,
    loading: () => <div>Loading wallet...</div>
  }
);

interface ClientWalletProviderProps {
  children: ReactNode;
}

export function ClientWalletProvider({ children }: ClientWalletProviderProps) {
  return <WalletProvider>{children}</WalletProvider>;
}
