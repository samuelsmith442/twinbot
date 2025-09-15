// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {TwinBotNFT} from "../src/TwinBotNFT.sol";

contract DeployTwinBotNFT is Script {
    uint256 public DEFAULT_ANVIL_PRIVATE_KEY = 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;
    
    // Default image URI
    string public constant DEFAULT_IMAGE_URI = "ipfs://QmTgqnhFBMkfT9s8PHKcdXBn1f5bG3Q5hmBaR4U6hoTvb1";

    function run() external returns (TwinBotNFT) {
        // Use the default Anvil private key for deployment
        vm.startBroadcast(DEFAULT_ANVIL_PRIVATE_KEY);

        // Deploy the TwinBotNFT contract with default image URI
        TwinBotNFT twinBotNFT = new TwinBotNFT(
            DEFAULT_IMAGE_URI
        );
        
        // Optional: Set a custom mint price if needed
        // twinBotNFT.setMintPrice(0.02 ether);
        
        // Stop broadcasting transactions
        vm.stopBroadcast();
        
        // Log deployment information
        console.log("TwinBotNFT deployed at:", address(twinBotNFT));
        console.log("Owner:", twinBotNFT.owner());
        console.log("Mint price:", twinBotNFT.mintPrice());
        
        return twinBotNFT;
    }
}
