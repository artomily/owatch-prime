# HashConnect / HashPack Wallet Setup

This project now uses **HashPack** (Hedera wallet) instead of Solana. The wallet integration supports:

## 🔧 Development Mode
- Uses **@hashgraph/hashconnect** library for programmatic wallet pairing
- Falls back to a mock dev wallet if HashConnect is not installed
- Mock wallets generate random test addresses for development

## 🚀 Production Mode
- Looks for **HashPack browser extension** (Hedera's MetaMask equivalent)
- If HashPack is not found, shows a "Continue with dummy wallet" button
- Users can install HashPack from: https://hashpack.app/

## 📦 Optional: Install HashConnect for Development

If you want to test the full HashConnect integration flow in development:

```bash
npm install @hashgraph/hashconnect
```

**Note:** This is optional. The app works without it using mock wallets in dev mode.

## 🎯 How It Works

### WalletContext (`src/context/WalletContext.tsx`)
- Detects HashPack extension on mount
- In development: attempts HashConnect pairing, falls back to mock
- In production: uses HashPack if available, otherwise shows dummy option

### WalletButton (`src/components/WalletButton.tsx`)
- Shows "Connect with HashPack" if extension is detected
- Shows "Continue with dummy wallet" + "Install HashPack" link if not found
- Handles connecting, disconnecting, and displaying wallet info

## 🗑️ Removed Dependencies

The following Solana dependencies can be removed from `package.json`:

```json
"@solana/wallet-adapter-base": "^0.9.27",
"@solana/wallet-adapter-phantom": "^0.9.28",
"@solana/wallet-adapter-react": "^0.15.39",
"@solana/wallet-adapter-react-ui": "^0.9.39",
"@solana/web3.js": "^1.98.4"
```

Run `npm uninstall` for each or manually edit `package.json` and run `npm install`.

## 🧪 Testing

1. **Development with HashConnect:**
   - Install `@hashgraph/hashconnect`
   - Run `npm run dev`
   - Click "Connect Wallet" — it will attempt HashConnect pairing

2. **Development without HashConnect:**
   - Don't install the library
   - Run `npm run dev`
   - Click "Connect Wallet" — it will use a mock dev wallet

3. **Production (HashPack installed):**
   - Build and deploy
   - Users with HashPack extension can connect normally

4. **Production (HashPack NOT installed):**
   - Build and deploy
   - Users see "Continue with dummy wallet" option
   - Can also click "Install HashPack" to get the extension

---

**Need Help?**
- HashPack docs: https://docs.hashpack.app/
- HashConnect docs: https://docs.hashconnect.hashpack.app/
