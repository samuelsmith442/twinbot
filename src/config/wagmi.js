import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'viem';
import { mainnet, sepolia } from 'viem/chains';
import { defineChain } from 'viem';

// Define custom Anvil chain
export const anvilChain = defineChain({
  id: 31337,
  name: 'Anvil', // Capitalized as "Anvil"
  network: 'anvil',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['http://127.0.0.1:8545'],
    },
    public: {
      http: ['http://127.0.0.1:8545'],
    },
  },
  // Simplified block explorer configuration
  blockExplorers: null,
  // Multicall3 contract is commonly deployed on Anvil chains
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 0,
    },
  },
  testnet: true,
});

export const wagmiConfig = getDefaultConfig({
  appName: 'TwinBot',
  projectId: 'bdfbf8144395b970b941245f90f9a089', // Get one at https://cloud.walletconnect.com
  chains: [anvilChain, mainnet, sepolia],
  transports: {
    [anvilChain.id]: http('http://127.0.0.1:8545'),
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
  ssr: true, // For Next.js SSR support
});
