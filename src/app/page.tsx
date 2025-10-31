'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { LandingPage } from '@/components/landing/LandingPage'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // If the wallet was connected previously, redirect immediately
    if (typeof window !== 'undefined') {
      const v = localStorage.getItem('wallet_connected') === 'true'
      if (v) router.push('/landing')
    }
  }, [router])

  const handleConnect = () => {
    localStorage.setItem('wallet_connected', 'true')
    router.push('/dashboard')
  }

  return <LandingPage onWalletConnect={handleConnect} />
}
