"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useWalletContext } from "../context/WalletContext";
import { Modal } from "./ui/modal";
import { AlertCircle, Wallet as WalletIcon } from "lucide-react";

export function WalletButton() {
  const router = useRouter();
  const {
    isConnected,
    address,
    balance,
    isConnecting,
    error,
    hashpackAvailable,
    showDummyOption,
    connect,
    connectDummy,
    disconnect,
    clearDummyOption,
  } = useWalletContext();
  const [localBalance, setLocalBalance] = useState<number>(0);
  const [showHashPackModal, setShowHashPackModal] = useState<boolean>(false);

  useEffect(() => {
    // Mirror context balance to local UI state (or load from localStorage)
    setLocalBalance(balance || 0);
  }, [balance]);

  // Show modal when HashPack is not detected and there's an error
  useEffect(() => {
    if (
      showDummyOption &&
      error &&
      !isConnected &&
      !isConnecting &&
      !showHashPackModal
    ) {
      setShowHashPackModal(true);
    }
  }, [showDummyOption, error, isConnected, isConnecting, showHashPackModal]);

  const formatWalletAddress = (addr: string) => {
    if (!addr) return "";
    if (addr.length > 10) return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
    return addr;
  };

  const handleDisconnect = () => {
    disconnect();
    router.push("/");
  };

  const handleConnect = async () => {
    // Always try to connect first
    await connect();
    // Modal will show automatically via useEffect if HashPack is not detected
  };

  const handleUseDummyWallet = () => {
    setShowHashPackModal(false);
    clearDummyOption();
    connectDummy();
  };

  const handleInstallHashPack = () => {
    window.open("https://hashpack.app/", "_blank");
    setShowHashPackModal(false);
    clearDummyOption();
  };

  const handleCloseModal = () => {
    setShowHashPackModal(false);
    clearDummyOption();
  };

  if (isConnected) {
    return (
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 bg-gray-800 px-3 py-2 rounded-lg">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span className="text-white font-semibold text-sm">
            {localBalance} OWATCH
          </span>
        </div>

        <div className="flex items-center space-x-2 bg-gray-800 px-3 py-2 rounded-lg">
          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
          <span className="text-white text-sm">
            {formatWalletAddress(address)}
          </span>
        </div>

        <button
          onClick={handleDisconnect}
          className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-3 py-2 text-sm font-medium"
        >
          Disconnect
        </button>
      </div>
    );
  }

  // Not connected UI
  return (
    <>
      <div className="flex items-center space-x-3">
        {isConnecting ? (
          <div className="px-4 py-2 bg-gray-700 text-white rounded">
            Connecting...
          </div>
        ) : (
          <button
            onClick={handleConnect}
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-4 py-2 font-medium transition-colors"
          >
            {hashpackAvailable ? "Connect with HashPack" : "Connect Wallet"}
          </button>
        )}

        {error && !showHashPackModal ? (
          <div className="text-red-400 text-sm">{error}</div>
        ) : null}
      </div>

      {/* HashPack Not Detected Modal */}
      <Modal
        isOpen={showHashPackModal}
        onClose={handleCloseModal}
        title="HashPack Not Detected"
      >
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                HashPack wallet extension is not detected in your browser. You
                can either:
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleInstallHashPack}
              className="w-full flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-4 py-3 font-medium transition-colors"
            >
              <WalletIcon className="w-5 h-5" />
              <span>Install HashPack Extension</span>
            </button>

            <button
              onClick={handleUseDummyWallet}
              className="w-full flex items-center justify-center space-x-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg px-4 py-3 font-medium transition-colors"
            >
              <span>Continue with Dummy Wallet</span>
            </button>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Dummy wallet is for testing purposes only and doesn't connect to
            real blockchain.
          </p>
        </div>
      </Modal>
    </>
  );
}
