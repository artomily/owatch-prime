"use client";

import { useState, useEffect, useRef } from "react";
import { useWalletContext } from "../context/WalletContext";
import { MoreVertical, LogOut, Copy } from "lucide-react";

export function SidebarWalletInfo() {
  const {
    address: publicKey,
    isConnected: connected,
    disconnect,
  } = useWalletContext();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    }

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showMenu]);

  const formatWalletAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const copyToClipboard = async () => {
    if (publicKey) {
      await navigator.clipboard.writeText(publicKey);
      setShowMenu(false);
      // You could add a toast notification here
    }
  };

  const handleDisconnect = () => {
    disconnect();
    setShowMenu(false);
  };

  if (!connected) {
    return (
      <button
        onClick={() => {
          // trigger connect via context (let UI decide which connector to use)
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          (async () => {
            const ctx = await import("../context/WalletContext");
            // call connect from the live context via DOM-driven event is not straightforward here;
            // instead, the top-level WalletButton handles connection flows. Keep placeholder button.
          })();
        }}
        className="!w-full !bg-gradient-to-r !from-purple-500 !to-pink-500 hover:!from-purple-600 hover:!to-pink-600 !text-white !rounded-lg !px-4 !py-3 !font-medium !transition-all !duration-300 !border-0"
        style={{
          background: "linear-gradient(to right, #8b5cf6, #ec4899)",
          border: "none",
          borderRadius: "8px",
          padding: "12px 16px",
          fontSize: "14px",
          fontWeight: "500",
          width: "100%",
        }}
      >
        Connect Wallet
      </button>
    );
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between px-4 py-3 dark:bg-white/5 dark:backdrop-blur-md bg-white border dark:border-white/20 border-gray-200 rounded-lg">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <div>
            <p className="text-xs dark:text-gray-400 text-gray-500">Wallet</p>
            <p className="text-sm font-medium dark:text-white text-gray-900">
              {publicKey ? formatWalletAddress(publicKey) : "Connected"}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowMenu(!showMenu)}
          className="p-1 rounded-lg dark:hover:bg-white/10 hover:bg-gray-100 transition-colors"
        >
          <MoreVertical className="w-4 h-4 dark:text-gray-400 text-gray-500" />
        </button>
      </div>

      {/* Dropdown Menu */}
      {showMenu && (
        <div
          ref={menuRef}
          className="absolute right-0 top-full mt-2 w-48 dark:bg-gray-800 bg-white rounded-lg border dark:border-gray-700 border-gray-200 shadow-lg z-50"
        >
          <div className="py-2">
            <button
              onClick={copyToClipboard}
              className="w-full flex items-center space-x-3 px-4 py-2 text-sm dark:text-gray-300 text-gray-700 dark:hover:bg-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Copy className="w-4 h-4" />
              <span>Copy Address</span>
            </button>
            <button
              onClick={handleDisconnect}
              className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 dark:hover:bg-red-900/20 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Disconnect</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
