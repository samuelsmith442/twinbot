'use client';

import { useState, useEffect } from 'react';
import { RainbowKitProvider as RKProvider, darkTheme, lightTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { wagmiConfig } from '@/config/wagmi';
import { useTheme } from 'next-themes';

// Create a client for React Query
const queryClient = new QueryClient();

export function RainbowKitProvider({ children }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);
  
  if (!mounted) {
    // Return a placeholder during SSR
    return (
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <RKProvider theme={lightTheme()} modalSize="compact">
            {children}
          </RKProvider>
        </QueryClientProvider>
      </WagmiProvider>
    );
  }
  
  const isDarkMode = resolvedTheme === 'dark';

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RKProvider
          theme={isDarkMode ? darkTheme() : lightTheme()}
          modalSize="compact"
        >
          {children}
        </RKProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
