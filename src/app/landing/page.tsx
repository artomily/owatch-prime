'use client'

import { LandingPage } from "@/components/landing/LandingPage";

export default function LandingPageRoute() {
  // Handler khusus untuk halaman /landing
  const handleWalletConnect = () => {
    // ...aksi yang diinginkan, misal redirect ke dashboard
  };

  return <LandingPage onWalletConnect={handleWalletConnect} />;
}
