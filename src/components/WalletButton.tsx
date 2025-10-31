"use client";

import { useEffect, useState } from 'react';
import { useWalletContext } from '../context/WalletContext';

export function WalletButton() {
  const { isConnected, address, balance, isConnecting, error, hashpackAvailable, showDummyOption, connect, connectDummy, disconnect } = useWalletContext();
  const [localBalance, setLocalBalance] = useState<number>(0);

  useEffect(() => {
    // Mirror context balance to local UI state (or load from localStorage)
    setLocalBalance(balance || 0);
  }, [balance]);

  const formatWalletAddress = (addr: string) => {
    if (!addr) return '';
    if (addr.length > 10) return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
    return addr;
  };

  if (isConnected) {
    return (
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 bg-gray-800 px-3 py-2 rounded-lg">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span className="text-white font-semibold text-sm">{localBalance} OWATCH</span>
        </div>

        <div className="flex items-center space-x-2 bg-gray-800 px-3 py-2 rounded-lg">
          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
          <span className="text-white text-sm">{formatWalletAddress(address)}</span>
        </div>

        <button
          onClick={() => disconnect()}
          className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-3 py-2 text-sm font-medium"
        >
          Disconnect
        </button>
      </div>
    );
  }

  // Not connected UI
  return (
    <div className="flex items-center space-x-3">
      {isConnecting ? (
        <div className="px-4 py-2 bg-gray-700 text-white rounded">Connecting...</div>
      ) : (
        <>
          {/* If HashPack detected in production, prefer that. In dev, prefer HashConnect flow. */}
          {hashpackAvailable ? (
            <button
              onClick={() => connect()}
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-4 py-2 font-medium"
            >
              Connect with HashPack
            </button>
          ) : showDummyOption ? (
            <div className="flex space-x-2">
              <button
                onClick={() => connectDummy()}
                className="bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg px-4 py-2 font-medium"
              >
                Continue with dummy wallet
              </button>
              <a
                href="https://hashpack.app/"
                target="_blank"
                rel="noreferrer"
                className="bg-gray-700 hover:bg-gray-800 text-white rounded-lg px-4 py-2 font-medium"
              >
                Install HashPack
              </a>
            </div>
          ) : (
            <button
              onClick={() => connect()}
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-4 py-2 font-medium"
            >
              Connect Wallet
            </button>
          )}
        </>
      )}

      {error ? <div className="text-red-400 text-sm">{error}</div> : null}
    </div>
  );
}
