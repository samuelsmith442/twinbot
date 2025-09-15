'use client';

import { anvilChain } from '@/config/wagmi';

/**
 * Helper function to manually connect MetaMask to Anvil
 * This can be used if the automatic connection through RainbowKit isn't working
 */
export const connectToAnvil = async () => {
  if (typeof window === 'undefined' || !window.ethereum) {
    console.error('MetaMask not detected');
    return { success: false, message: 'MetaMask not detected' };
  }

  try {
    // Request account access
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    if (!accounts || accounts.length === 0) {
      return { success: false, message: 'No accounts found' };
    }

    // Check current chain
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    
    // If already on Anvil chain, we're done
    if (chainId === `0x${anvilChain.id.toString(16)}`) {
      return { 
        success: true, 
        message: 'Already connected to Anvil', 
        account: accounts[0] 
      };
    }

    // Try to switch to Anvil chain
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${anvilChain.id.toString(16)}` }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: `0x${anvilChain.id.toString(16)}`,
                chainName: "Anvil", // Explicitly set to "Anvil" with correct capitalization
                nativeCurrency: anvilChain.nativeCurrency,
                rpcUrls: anvilChain.rpcUrls.default.http,
              },
            ],
          });
        } catch (addError) {
          return { success: false, message: `Error adding chain: ${addError.message}` };
        }
      } else {
        return { success: false, message: `Error switching chain: ${switchError.message}` };
      }
    }

    // Get updated accounts after chain switch
    const updatedAccounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    return { 
      success: true, 
      message: 'Successfully connected to Anvil', 
      account: updatedAccounts[0] 
    };
  } catch (error) {
    console.error('Error connecting to Anvil:', error);
    return { success: false, message: `Error: ${error.message}` };
  }
};

/**
 * Helper function to check if MetaMask is connected to Anvil
 */
export const isConnectedToAnvil = async () => {
  if (typeof window === 'undefined' || !window.ethereum) {
    return false;
  }

  try {
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    return chainId === `0x${anvilChain.id.toString(16)}`;
  } catch (error) {
    console.error('Error checking chain:', error);
    return false;
  }
};
