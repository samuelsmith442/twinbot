# TwinBot NFT Contracts

This repository contains the smart contracts for the TwinBot NFT project, which allows users to create digital twins as NFTs on the blockchain.

## Overview

TwinBot is a platform that enables users to create digital twins that represent them 24/7, generate personal stories, and build their online brand. Each digital twin is minted as an NFT on the blockchain, giving users full ownership of their data.

## Smart Contracts

### TwinBotNFT.sol

The main contract that implements the ERC721 standard for NFTs with the following features:

- **Digital Twin Creation**: Mint NFTs representing digital twins with customizable metadata
- **Personality Types**: Choose from four personality types (Friendly, Professional, Creative, Analytical)
- **On-chain Metadata**: Store metadata directly on the blockchain for better permanence
- **Off-chain Metadata**: Support for IPFS or other external metadata storage
- **Personality Updates**: Change your twin's personality after minting
- **Mint Price**: Configurable mint price with owner withdrawal functionality
- **Ownership Control**: Standard Ownable implementation for administrative functions

## Foundry

**Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.**

Foundry consists of:

-   **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools).
-   **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
-   **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
-   **Chisel**: Fast, utilitarian, and verbose solidity REPL.

## Documentation

https://book.getfoundry.sh/

## Contract Deployment and Usage

### Deployment

To deploy the TwinBot NFT contract to a local Anvil blockchain:

```shell
# Start a local Anvil blockchain
anvil

# Deploy the contract
forge script script/DeployTwinBotNFT.s.sol --rpc-url http://localhost:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 --broadcast
```

After deployment, the contract address will be displayed in the console output. This address should be updated in the frontend configuration at `/src/utils/contractConfig.js`.

### Minting a Digital Twin

You can mint a new digital twin in two ways:

1. **Using the frontend**: Connect your wallet to the frontend application and use the minting interface.

2. **Using the command line**:

```shell
# Mint directly using Cast
cast send <CONTRACT_ADDRESS> "createTwinOnChain(address,string,string,uint8)" <RECIPIENT_ADDRESS> "Twin Name" "Twin Description" 0 --value 0.01ether --private-key <PRIVATE_KEY> --rpc-url http://localhost:8545

# Or use the MintTwinBot script (after updating the contract address in the script)
forge script script/MintTwinBot.s.sol --rpc-url http://localhost:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 --broadcast
```

### Contract Functions

The TwinBot NFT contract provides the following main functions:

1. **createTwinWithTokenURI(address recipient, string memory tokenURI)**: Create a twin with off-chain metadata (e.g., IPFS)
   - Parameters: recipient address, tokenURI string
   - Returns: tokenId
   - Requires: payment of mintPrice

2. **createTwinOnChain(address recipient, string memory name, string memory description, uint8 personality)**: Create a twin with on-chain metadata
   - Parameters: recipient address, name string, description string, personality uint8
   - Returns: tokenId
   - Requires: payment of mintPrice

3. **updateTwinPersonality(uint256 tokenId, uint8 newPersonality)**: Change your twin's personality type
   - Parameters: tokenId, newPersonality uint8
   - Requires: caller must be the token owner

4. **tokenURI(uint256 tokenId)**: Get the metadata URI for a specific token
   - Parameters: tokenId
   - Returns: URI string

5. **withdraw()**: Withdraw contract funds (owner only)
   - Requires: caller must be the contract owner

### Personality Types

TwinBot supports four personality types for digital twins:

- **FRIENDLY** (0): Warm, approachable, and sociable
- **PROFESSIONAL** (1): Formal, business-oriented, and precise
- **CREATIVE** (2): Imaginative, artistic, and innovative
- **ANALYTICAL** (3): Logical, detail-oriented, and methodical

### Viewing Your NFTs

After minting, you can view your NFTs in MetaMask by importing them with the contract address and token ID. The token ID is typically returned in the transaction receipt or can be queried using the `balanceOf` and `tokenOfOwnerByIndex` functions.

## Usage

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy

```shell
$ forge script script/DeployTwinBotNFT.s.sol --rpc-url <your_rpc_url> --private-key <your_private_key> --broadcast
```

### Cast

```shell
$ cast <subcommand>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```
