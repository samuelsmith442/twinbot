'use client';

import { useState, useEffect } from 'react';
import { connectToAnvil, isConnectedToAnvil } from '@/utils/connectToAnvil';

export default function ManualAnvilConnect() {
  const [connectionStatus, setConnectionStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  // Check connection status on mount
  useEffect(() => {
    const checkConnection = async () => {
      const connected = await isConnectedToAnvil();
      setIsConnected(connected);
    };
    
    checkConnection();
    
    // Set up event listener for chain changes
    if (window.ethereum) {
      window.ethereum.on('chainChanged', checkConnection);
      
      // Cleanup
      return () => {
        window.ethereum.removeListener('chainChanged', checkConnection);
      };
    }
  }, []);

  const handleConnect = async () => {
    setIsLoading(true);
    setConnectionStatus('');
    
    try {
      const result = await connectToAnvil();
      setConnectionStatus(result.message);
      setIsConnected(result.success);
    } catch (error) {
      setConnectionStatus(`Error: ${error.message}`);
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (isConnected) {
    return (
      <div className="flex flex-col items-center mt-4">
        <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-4 py-2 rounded-lg flex items-center">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          <span>Connected to Anvil</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-4">
      <button
        onClick={handleConnect}
        disabled={isLoading}
        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors"
      >
        {isLoading ? 'Connecting...' : 'Manual Connect to Anvil'}
      </button>
      
      {connectionStatus && (
        <p className={`mt-2 text-sm ${connectionStatus.includes('Error') ? 'text-red-500' : 'text-gray-600 dark:text-gray-300'}`}>
          {connectionStatus}
        </p>
      )}
    </div>
  );
}
