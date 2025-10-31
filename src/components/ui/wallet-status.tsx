'use client'

import { useState, useEffect } from 'react'
import { Button, Badge, Card, CardContent } from '@/components/ui'
import { Wallet, Copy, ExternalLink, LogOut } from 'lucide-react'

export function WalletStatus(): JSX.Element {
  const [walletAddress, setWalletAddress] = useState<string>('')
  const [walletBalance, setWalletBalance] = useState<string>('0')
  const [isConnected, setIsConnected] = useState<boolean>(false)

  useEffect(() => {
    const checkWalletStatus = (): void => {
      const connected = localStorage.getItem('wallet_connected') === 'true'
      const address = localStorage.getItem('wallet_address') || ''
      const balance = localStorage.getItem('wallet_balance') || '0'
      
      setIsConnected(connected)
      setWalletAddress(address)
      setWalletBalance(balance)
    }

    checkWalletStatus()
  }, [])

  const handleDisconnect = (): void => {
    localStorage.removeItem('wallet_connected')
    localStorage.removeItem('wallet_address')
    localStorage.removeItem('wallet_balance')
    setIsConnected(false)
  // fall back to simple redirect to root
  window.location.href = '/'
  }

  const handleCopyAddress = (): void => {
    navigator.clipboard.writeText(walletAddress)
  }

  const formatAddress = (address: string): string => {
    if (!address) return ''
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  if (!isConnected) {
    return (
      <Card className="bg-red-50 border-red-200">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Wallet className="h-5 w-5 text-red-500" />
            <span className="text-red-700 font-medium">Wallet Not Connected</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-green-50 border-green-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Wallet className="h-5 w-5 text-green-600" />
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                Connected
              </Badge>
            </div>
            <div className="text-sm">
              <div className="font-medium text-gray-900">{formatAddress(walletAddress)}</div>
              <div className="text-gray-600">{walletBalance} OWATCH</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopyAddress}
              className="h-8 w-8 p-0"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDisconnect}
              className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}