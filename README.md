# TwinBot Project

A modern web application for minting TwinBot NFTs on the Ethereum blockchain. This project combines Next.js, React, TailwindCSS, and wagmi/RainbowKit for a seamless NFT minting experience.

## Overview

TwinBot is a platform that enables users to create digital twins that represent them 24/7, generate personal stories, and build their online brand. Each digital twin is minted as an NFT on the blockchain, giving users full ownership of their data.

## Features

- **Modern UI/UX**: Clean, responsive design with smooth scrolling and intuitive navigation
- **Wallet Integration**: Connect to MetaMask and other wallets via RainbowKit
- **Local Blockchain Support**: Special support for Anvil local blockchain development
- **NFT Minting**: Create personalized digital twins as NFTs with on-chain metadata
- **Transaction Tracking**: Real-time feedback on transaction status and NFT minting
- **Dark/Light Mode**: Theme toggle for user preference

## Tech Stack

- **Frontend**: Next.js 13+, React 19+
- **Styling**: TailwindCSS with custom utility classes
- **Blockchain Interaction**: wagmi, RainbowKit, viem
- **Smart Contracts**: Solidity (Foundry for development and testing)
- **Local Blockchain**: Anvil (Foundry)

## Project Structure

```
├── src/                # Next.js app router pages and components
│   ├── app/           # Next.js app router pages
│   ├── components/    # React components
│   ├── config/        # Configuration files (wagmi)
│   └── utils/         # Utility functions
├── contracts/         # Smart contract development
│   ├── src/           # Solidity contract source files
│   ├── test/          # Contract test files
│   └── script/        # Deployment scripts
└── public/            # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Foundry (for smart contract development)
- MetaMask or another Ethereum wallet

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/twinbot-landing.git
cd twinbot-landing
```

2. Install dependencies

```bash
npm install
```

3. Start the local blockchain (in a separate terminal)

```bash
cd contracts
anvil
```

4. Deploy the smart contract (in a separate terminal)

```bash
cd contracts
forge script script/DeployTwinBotNFT.s.sol --rpc-url http://localhost:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 --broadcast
```

5. Start the development server

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) with your browser

## Using the Application

1. Connect your wallet using the Connect button
2. Connect to the Anvil chain using the Manual Anvil Connect button
3. Fill in the details for your digital twin (name, description, personality)
4. Click the Mint button to create your NFT
5. After successful minting, you can import your NFT into MetaMask using the provided contract address and token ID

## Smart Contracts

The TwinBot NFT smart contracts are located in the `contracts` directory. See the README.md in that directory for more details on the smart contract implementation.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
