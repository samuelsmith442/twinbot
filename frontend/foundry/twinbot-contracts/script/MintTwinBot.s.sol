// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {TwinBotNFT} from "../src/TwinBotNFT.sol";

/**
 * @title MintTwinBot
 * @dev Script to mint a TwinBot NFT
 */
contract MintTwinBot is Script {
    // Default Anvil private key for testing
    uint256 public DEFAULT_ANVIL_PRIVATE_KEY = 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;
    
    // Default image URI
    string public constant DEFAULT_IMAGE_URI = "ipfs://QmTgqnhFBMkfT9s8PHKcdXBn1f5bG3Q5hmBaR4U6hoTvb1";
    
    // Contract address from the deployment
    address public twinBotNFTAddress = 0x5FbDB2315678afecb367f032d93F642f64180aa3; // Updated with the latest deployment

    function run() external {
        // Check if contract address is set
        require(twinBotNFTAddress != address(0), "Contract address not set");
        
        // Start broadcasting transactions
        vm.startBroadcast(DEFAULT_ANVIL_PRIVATE_KEY);
        
        // Get the deployed contract
        TwinBotNFT twinBotNFT = TwinBotNFT(twinBotNFTAddress);
        
        // Mint a new TwinBot NFT with on-chain metadata
        uint256 mintPrice = twinBotNFT.mintPrice();
        uint256 tokenId = twinBotNFT.createTwinOnChain{value: mintPrice}(
            vm.addr(DEFAULT_ANVIL_PRIVATE_KEY),  // recipient
            "My Digital Twin",                   // name
            "A digital twin that represents me 24/7, generates personal stories, and builds my online brand.",  // description
            TwinBotNFT.TwinPersonality.GENERAL  // personality
        );
        
        // Stop broadcasting transactions
        vm.stopBroadcast();
        
        // Log information about the minted NFT
        console.log("TwinBot NFT minted with token ID:", tokenId);
        console.log("Owner:", vm.addr(DEFAULT_ANVIL_PRIVATE_KEY));
    }
    
    function setContractAddress(address _twinBotNFTAddress) public {
        twinBotNFTAddress = _twinBotNFTAddress;
    }
}
