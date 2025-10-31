"use client";

// This component used to provide a Solana wallet adapter provider.
// The project now uses HashConnect / HashPack (Hedera) instead. To keep the
// rest of the app working unchanged (it dynamically imports this file),
// re-export the application WalletProvider from the context implementation.

import { WalletProvider as WalletContextProvider } from '../context/WalletContext';

export { WalletContextProvider };

