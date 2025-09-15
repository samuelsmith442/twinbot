'use client';

import { anvilChain } from '@/config/wagmi';

/**
 * Helper function to add the Anvil chain to MetaMask
 * @returns {Promise<boolean>} True if the chain was added successfully, false otherwise
 */
export const addAnvilToMetaMask = async () => {
  // Check if window is defined (browser environment)
  if (typeof window === 'undefined' || !window.ethereum) {
    console.error('MetaMask not detected');
    return false;
  }

  try {
    // Request to add the Anvil chain to MetaMask
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: `0x${anvilChain.id.toString(16)}`, // Convert chain ID to hex
          chainName: "Anvil", // Explicitly set to "Anvil" with correct capitalization
          nativeCurrency: {
            name: "Ethereum",
            symbol: "ETH",
            decimals: 18
          },
          rpcUrls: ["http://127.0.0.1:8545"], // Use explicit array format with IP address instead of localhost
          blockExplorerUrls: [], // Empty array for local chain
        },
      ],
    });
    
    console.log('Anvil chain added to MetaMask successfully');
    return true;
  } catch (error) {
    console.error('Failed to add Anvil chain to MetaMask:', error);
    return false;
  }
};

/**
 * Helper function to switch to the Anvil chain in MetaMask
 * @returns {Promise<boolean>} True if the chain was switched successfully, false otherwise
 */
export const switchToAnvilChain = async () => {
  // Check if window is defined (browser environment)
  if (typeof window === 'undefined' || !window.ethereum) {
    console.error('MetaMask not detected');
    return false;
  }

  try {
    // Request to switch to the Anvil chain
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${anvilChain.id.toString(16)}` }],
    });
    
    console.log('Switched to Anvil chain successfully');
    return true;
  } catch (error) {
    // If the error code is 4902, the chain hasn't been added yet
    if (error.code === 4902) {
      return await addAnvilToMetaMask();
    }
    
    console.error('Failed to switch to Anvil chain:', error);
    return false;
  }
};
