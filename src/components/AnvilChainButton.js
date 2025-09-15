'use client';

import { useState } from 'react';
import { useAccount, useChainId } from 'wagmi';
import { anvilChain } from '@/config/wagmi';
import { addAnvilToMetaMask, switchToAnvilChain } from '@/utils/addAnvilToMetaMask';

export default function AnvilChainButton() {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const [isLoading, setIsLoading] = useState(false);

  const isAnvilChain = chainId === anvilChain.id;

  const handleAddOrSwitchToAnvil = async () => {
    setIsLoading(true);
    try {
      await switchToAnvilChain();
    } catch (error) {
      console.error('Error switching to Anvil chain:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isConnected) {
    return null; // Don't show the button if wallet is not connected
  }

  if (isAnvilChain) {
    return (
      <button 
        className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-green-600 transition-colors"
        disabled
      >
        <span className="w-2 h-2 rounded-full bg-green-300"></span>
        Connected to Anvil
      </button>
    );
  }

  return (
    <button 
      className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-600 transition-colors"
      onClick={handleAddOrSwitchToAnvil}
      disabled={isLoading}
    >
      {isLoading ? 'Switching...' : 'Switch to Anvil Chain'}
    </button>
  );
}
