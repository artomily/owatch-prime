# O'Watch Prime

> Watch Videos, Earn Crypto - Transform your viewing time into cryptocurrency rewards

O'Watch Prime is a Web3 video streaming platform built on Hedera blockchain where users earn OWATCH tokens by watching premium content. Connect your HashPack wallet and start earning rewards instantly.

![Next.js](https://img.shields.io/badge/Next.js-14.0-black)
![React](https://img.shields.io/badge/React-18.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)
![Hedera](https://img.shields.io/badge/Hedera-Hashgraph-purple)

## ✨ Features

- 🎥 **Watch to Earn** - Earn OWATCH tokens by watching engaging video content
- 💰 **Real Rewards** - Convert viewing time into real cryptocurrency
- 📊 **Track Progress** - Monitor earnings and watch time with detailed analytics
- 🔐 **Secure Wallet Integration** - HashPack wallet support with HashConnect for development
- 👥 **Community Driven** - Join thousands of users earning rewards
- ⚡ **Instant Rewards** - Real-time token earnings as you watch
- 🌙 **Dark Mode** - Beautiful dark theme optimized for extended viewing
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

## 🚀 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: Custom components with [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Blockchain**: [Hedera Hashgraph](https://hedera.com/)
- **Wallet**: [HashPack](https://www.hashpack.app/) / [HashConnect](https://docs.hashpack.app/hashconnect)

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** 18.x or higher
- **npm** or **yarn** package manager
- **HashPack Wallet** (for production) - [Install here](https://www.hashpack.app/)
- **@hashgraph/hashconnect** (optional, for development) - See setup below

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/artomily/owatch-prime.git
   cd owatch-prime
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Optional: Install HashConnect for development**

   ```bash
   npm install @hashgraph/hashconnect
   ```

4. **Run development server**

   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🎮 Usage

### For Users

1. **Visit the landing page** at `http://localhost:3000`
2. **Click "Connect Wallet"** in the hero section
3. **Choose your option**:
   - **Install HashPack** - Install the browser extension for real blockchain connectivity
   - **Use Dummy Wallet** - Test the app without installing HashPack (development/testing only)
4. **Start watching videos** and earning OWATCH tokens!

### Wallet Connection Flow

#### Production Mode

- Detects HashPack browser extension
- If not found, shows modal with option to install or use dummy wallet

#### Development Mode

- Tries to use HashConnect library for pairing
- Falls back to modal if HashConnect not installed
- Allows dummy wallet for quick testing

## 📁 Project Structure

```
owatch-prime/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── dashboard/           # Dashboard pages (videos, profile, settings)
│   │   ├── landing/             # Landing page
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Home page
│   ├── components/              # React components
│   │   ├── dashboard/           # Dashboard-specific components
│   │   ├── landing/             # Landing page components
│   │   ├── layout/              # Layout components
│   │   ├── ui/                  # UI components (Button, Card, Modal, etc.)
│   │   ├── WalletButton.tsx     # Main wallet connection component
│   │   └── WalletProvider.tsx   # Wallet context provider
│   ├── context/                 # React Context providers
│   │   ├── WalletContext.tsx    # Wallet state management
│   │   ├── ThemeContext.tsx     # Theme management
│   │   └── SidebarContext.tsx   # Sidebar state
│   ├── hooks/                   # Custom React hooks
│   ├── lib/                     # Utility functions
│   ├── types/                   # TypeScript type definitions
│   └── utils/                   # Helper utilities
├── public/                      # Static assets
├── HASHCONNECT_SETUP.md        # HashConnect setup guide
├── MIGRATION_SUMMARY.md        # Solana to HashPack migration notes
└── README_MIGRATION.md         # Quick migration reference
```

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🌐 Environment Modes

The app automatically detects the environment and adjusts wallet connection:

- **Development** (`NODE_ENV=development`): Prefers HashConnect, shows modal if unavailable
- **Production** (`NODE_ENV=production`): Requires HashPack extension, shows modal if not detected

## 🎨 Key Components

### WalletContext

Central wallet state management with:

- HashPack extension detection
- HashConnect library integration
- Dummy wallet for testing
- Connection state management

### WalletButton

Main wallet UI component featuring:

- Connect/Disconnect functionality
- Balance display
- Address display with formatting
- Modal integration for HashPack installation

### Modal

Reusable modal component with:

- Full-screen backdrop blur
- Click-outside to close
- Dark mode support
- Centered positioning

### Dashboard

Protected routes with:

- Video content streaming
- User profile management
- Settings and preferences
- Responsive sidebar navigation

## 🔐 Security

- Wallet integration uses official HashPack/HashConnect SDKs
- No private keys stored in application
- All transactions require wallet approval
- Dummy wallet mode is clearly labeled for testing only

## 🚧 Development Notes

### Wallet Integration

- HashPack extension is detected via `window.hashpack`
- HashConnect uses dynamic imports to handle optional dependency
- Modal system prevents auto-connect, giving users choice

### Migration History

This project was migrated from Solana to Hedera/HashPack. See:

- `MIGRATION_SUMMARY.md` - Complete migration details
- `HASHCONNECT_SETUP.md` - HashConnect setup guide
- `README_MIGRATION.md` - Quick start guide

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 👥 Authors

- **artomily** - [GitHub](https://github.com/artomily)

## 🙏 Acknowledgments

- [HashPack](https://www.hashpack.app/) - Hedera wallet solution
- [Hedera](https://hedera.com/) - Blockchain platform
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework
- [Radix UI](https://www.radix-ui.com/) - UI primitives

## 📞 Support

For support, please open an issue in the GitHub repository or contact the maintainers.

---

**Made with ❤️ using Next.js and Hedera Hashgraph**
