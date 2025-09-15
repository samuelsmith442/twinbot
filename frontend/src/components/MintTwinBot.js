'use client';

import { useState, useEffect } from 'react';
import { useAccount, useContractRead, useWriteContract, useWaitForTransactionReceipt, useChainId } from 'wagmi';
import { parseEther, decodeEventLog } from 'viem';
import { twinBotNFTConfig } from '@/utils/contractConfig';
import { CgSpinner } from 'react-icons/cg';

export default function MintTwinBot() {
  const { address, isConnected } = useAccount();
  const [name, setName] = useState('My Digital Twin');
  const [description, setDescription] = useState('A digital twin that represents me on the blockchain.');
  const [personality, setPersonality] = useState(0); // 0: FRIENDLY, 1: PROFESSIONAL, 2: CREATIVE, 3: ANALYTICAL
  
  const chainId = useChainId();

  // Read mint price from contract
  const { data: mintPrice } = useContractRead({
    ...twinBotNFTConfig,
    functionName: 'mintPrice',
  });

  // Read total supply from contract
  const { data: totalSupply, refetch: refetchTotalSupply } = useContractRead({
    ...twinBotNFTConfig,
    functionName: 'totalSupply',
  });

  // Write function to mint a new TwinBot using the newer wagmi hooks
  const { 
    data: mintHash, 
    isPending: isMintPending,
    error: mintError,
    writeContractAsync 
  } = useWriteContract();

  // State for storing the minted token ID and contract address
  const [mintedTokenId, setMintedTokenId] = useState(null);
  const [contractAddress] = useState(twinBotNFTConfig.address);

  // Wait for transaction to complete
  const { 
    isLoading: isWaitingForTx,
    isSuccess: mintSuccess,
    isError: isMintError,
    data: txReceipt
  } = useWaitForTransactionReceipt({
    hash: mintHash,
    onSuccess: (data) => {
      refetchTotalSupply();
      // Extract token ID from transaction logs
      try {
        if (data && data.logs && data.logs.length > 0) {
          // Look for Transfer event (ERC721 standard)
          const transferLog = data.logs.find(log => 
            log.topics && log.topics.length > 3 && 
            log.topics[0] === '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
          );
          
          if (transferLog) {
            // The tokenId is in the third topic (index 3)
            const tokenIdHex = transferLog.topics[3];
            const tokenId = parseInt(tokenIdHex, 16);
            setMintedTokenId(tokenId);
            console.log('Minted token ID:', tokenId);
          }
        }
      } catch (error) {
        console.error('Error extracting token ID:', error);
      }
    }
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isConnected || !writeContractAsync) return;
    
    try {
      // Get the mint price value (default to 0.01 ETH if not available)
      const mintValue = mintPrice || parseEther('0.01');
      
      console.log('Minting with value:', mintValue.toString());
      
      // Use the writeContractAsync function with proper parameters
      await writeContractAsync({
        abi: twinBotNFTConfig.abi,
        address: twinBotNFTConfig.address,
        functionName: 'createTwinOnChain',
        args: [address, name, description, personality],
        value: mintValue,
      });
    } catch (error) {
      console.error('Error minting TwinBot:', error);
    }
  };

  // Personality options
  const personalityOptions = [
    { value: 0, label: 'Friendly', description: 'Warm, approachable, and sociable' },
    { value: 1, label: 'Professional', description: 'Formal, business-oriented, and precise' },
    { value: 2, label: 'Creative', description: 'Imaginative, artistic, and innovative' },
    { value: 3, label: 'Analytical', description: 'Logical, detail-oriented, and methodical' },
  ];

  // Helper function to get button content
  function getMintButtonContent() {
    if (isMintPending) {
      return (
        <div className="flex items-center justify-center gap-2 w-full">
          <CgSpinner className="animate-spin" size={20} />
          <span>Confirming in wallet...</span>
        </div>
      );
    }
    
    if (isWaitingForTx) {
      return (
        <div className="flex items-center justify-center gap-2 w-full">
          <CgSpinner className="animate-spin" size={20} />
          <span>Minting your TwinBot...</span>
        </div>
      );
    }
    
    if (mintError || isMintError) {
      return (
        <div className="flex items-center justify-center gap-2 w-full">
          <span>Error minting, see console.</span>
        </div>
      );
    }
    
    if (mintSuccess) {
      return "TwinBot NFT minted successfully!";
    }
    
    return `Mint for ${mintPrice ? (Number(mintPrice) / 10**18).toFixed(3) + ' ETH' : '0.01 ETH'}`;
  }

  if (!isConnected) {
    return (
      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg text-center">
        <p className="text-yellow-800 dark:text-yellow-200">
          Please connect your wallet to mint a TwinBot NFT
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl w-full p-6 flex flex-col gap-6 bg-white dark:bg-dark-600 rounded-xl ring-[4px] border-2 border-primary-500 ring-primary-500/25 shadow-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-primary-700 dark:text-primary-400">
          Mint Your Digital Twin
        </h3>
      </div>
      
      {mintSuccess ? (
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mb-4">
          <p className="text-green-800 dark:text-green-200 font-medium">
            Success! Your TwinBot NFT has been minted.
          </p>
          <p className="text-sm text-green-700 dark:text-green-300 mt-2">
            Transaction hash: 
            <span className="break-all overflow-wrap-anywhere">{mintHash}</span>
          </p>
          
          {mintedTokenId !== null && (
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-blue-800 dark:text-blue-200 font-medium">
                NFT Import Information:
              </p>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <span className="font-medium">Contract Address:</span> {contractAddress}
                </p>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <span className="font-medium">Token ID:</span> {mintedTokenId}
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Twin Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-light-100 dark:bg-dark-700 text-gray-800 dark:text-gray-200 placeholder-gray-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-light-100 dark:bg-dark-700 text-gray-800 dark:text-gray-200 placeholder-gray-500"
              rows={3}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Personality
            </label>
            <select
              value={personality}
              onChange={(e) => setPersonality(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-400 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-light-100 dark:bg-dark-700 text-gray-800 dark:text-gray-200"
            >
              {personalityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label} - {option.description}
                </option>
              ))}
            </select>
          </div>
          
          <div className="pt-2">
            <button
              type="submit"
              disabled={isMintPending || isWaitingForTx}
              className="cursor-pointer flex items-center justify-center w-full py-3 rounded-[9px] text-white transition-all font-semibold relative border bg-gradient-primary border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
            >
              {/* Gradient */}
              <div className="absolute w-full inset-0 bg-gradient-to-b from-white/25 via-80% to-transparent mix-blend-overlay z-10 rounded-lg" />
              {/* Inner shadow */}
              <div className="absolute w-full inset-0 mix-blend-overlay z-10 inner-shadow rounded-lg" />
              {/* White inner border */}
              <div className="absolute w-full inset-0 mix-blend-overlay z-10 border-[1.5px] border-white/20 rounded-lg" />
              {getMintButtonContent()}
            </button>
          </div>
        </form>
      )}
      
      {totalSupply && (
        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Total TwinBots minted: {totalSupply.toString()}
        </div>
      )}
    </div>
  );
}
