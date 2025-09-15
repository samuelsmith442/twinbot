# Guide: Importing TwinBot NFTs to MetaMask

This guide will walk you through the process of importing your TwinBot NFTs into MetaMask so you can view and manage them.

## Prerequisites

- MetaMask browser extension installed
- Successfully minted TwinBot NFT(s)
- Contract address and token ID of your NFT

## Steps to Import NFTs to MetaMask

### 1. Open MetaMask

Click on the MetaMask extension icon in your browser to open the wallet.

### 2. Connect to the Correct Network

Make sure you're connected to the network where your NFT was minted:

- For local development: Connect to the Anvil network (Chain ID: 31337)
- For testnet: Connect to the appropriate testnet (Sepolia, Goerli, etc.)
- For mainnet: Connect to Ethereum Mainnet

### 3. Navigate to the NFTs Tab

1. In MetaMask, click on the "NFTs" tab at the bottom of the interface
2. If you don't see the NFTs tab, you may need to enable it in Settings:
   - Click on the account icon in the top-right corner
   - Select "Settings"
   - Go to "Advanced"
   - Toggle on "Show NFTs in your wallet"

### 4. Import NFT

1. In the NFTs tab, click on "Import NFTs" button
2. Enter the following information:
   - **NFT Contract Address**: `0x8A791620dd6260079BF849Dc5567aDC3F2FdC318` (or the address shown after successful minting)
   - **Token ID**: The ID of your NFT (typically `0` for your first NFT, `1` for your second, etc.)
   - **Collection Name**: (Optional) "TwinBot"

3. Click "Import"

### 5. View Your NFT

After importing, your TwinBot NFT should appear in the NFTs tab of your MetaMask wallet.

## Troubleshooting

### NFT Not Showing Up

If your NFT doesn't appear after importing:

1. **Verify the contract address**: Make sure you're using the correct contract address
2. **Check the token ID**: Confirm you have the correct token ID
3. **Confirm ownership**: Verify that your wallet address is the owner of the NFT
4. **Network issues**: Ensure you're connected to the correct network
5. **Refresh MetaMask**: Try refreshing your MetaMask by clicking on the account icon and selecting "Settings" > "Advanced" > "Reset Account"

### Ownership Verification Error

If you receive an error like "NFT can't be added as the ownership details do not match":

1. **Check token ID**: You might be using an incorrect token ID
2. **Verify contract deployment**: Make sure the contract is deployed on the network you're connected to
3. **Check wallet address**: Ensure you're using the same wallet address that minted or received the NFT

## Getting Help

If you continue to experience issues importing your NFT, please:

1. Check the transaction hash of your minting transaction to verify it was successful
2. Verify the contract address and token ID displayed after successful minting
3. Contact support with details about your issue

## Additional Resources

- [MetaMask NFT Support Documentation](https://support.metamask.io/hc/en-us/articles/360058238591-NFT-tokens-in-your-MetaMask-wallet)
- [TwinBot Documentation](https://github.com/yourusername/twinbot-landing)
