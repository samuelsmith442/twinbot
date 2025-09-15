// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721} from "../lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "../lib/openzeppelin-contracts/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Ownable} from "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";
import {Base64} from "../lib/openzeppelin-contracts/contracts/utils/Base64.sol";

/**
 * @title TwinBotNFT
 * @dev ERC721 token representing a digital twin on the blockchain
 * @notice This contract allows users to create and manage digital twins as NFTs
 * @author TwinBot Team
 * @custom:security-contact security@twinbot.example.com
 */
contract TwinBotNFT is ERC721URIStorage, Ownable {
    // Errors
    error TwinBotNFT__InsufficientPayment(uint256 provided, uint256 required);
    error TwinBotNFT__WithdrawalFailed(address recipient, uint256 amount);
    error TwinBotNFT__NoBalanceToWithdraw(uint256 balance);
    error TwinBotNFT__NotTwinOwner(uint256 tokenId, address caller);
    error TwinBotNFT__TokenDoesNotExist(uint256 tokenId);
    error TwinBotNFT__ZeroAddress(string parameter);
    error TwinBotNFT__EmptyString(string parameter);
    
    // Token ID counter
    uint256 private _nextTokenId;
    
    // Price to mint a TwinBot NFT
    uint256 public mintPrice = 0.01 ether;
    
    // Twin personality type (simplified for testing)
    enum TwinPersonality {
        GENERAL
    }
    
    // Structure to store twin metadata
    struct TwinMetadata {
        string name;
        string description;
        string imageURI;
        TwinPersonality personality;
        uint256 creationTime;
        address creator;
        bool useOnChainMetadata;
    }
    
    // Mapping from token ID to twin metadata
    mapping(uint256 => TwinMetadata) public twinData;
    
    // Default image URI (could be SVG or IPFS URI)
    string private s_defaultImageURI;
    
    // Events
    event TwinBotCreated(uint256 indexed tokenId, address indexed creator, address indexed recipient, string name, bool useOnChainMetadata);
    event TwinPersonalityUpdated(uint256 indexed tokenId, TwinPersonality personality, address indexed updater);
    event MintPriceUpdated(uint256 oldPrice, uint256 newPrice, address indexed updater);
    event DefaultImageURIUpdated(string oldURI, string newURI, address indexed updater);
    
    /**
     * @dev Constructor initializes the ERC721 token with name and symbol
     * @param defaultImageURI The default image URI to use for on-chain metadata
     * @notice Sets up the TwinBot NFT with initial configuration
     */
    constructor(
        string memory defaultImageURI
    ) ERC721("TwinBot", "TWIN") Ownable(msg.sender) {
        s_defaultImageURI = defaultImageURI;
    }
    
    /**
     * @dev Creates a new TwinBot NFT with off-chain metadata
     * @param recipient The address that will own the minted NFT
     * @param _tokenURI The token URI for the NFT metadata
     * @param name The name of the twin
     * @param description The description of the twin
     * @param personality The personality type of the twin
     * @return uint256 The ID of the newly minted NFT
     * @notice This function creates a twin with metadata stored off-chain
     * @custom:requires Payment of at least mintPrice
     */
    function createTwinWithTokenURI(
        address recipient,
        string memory _tokenURI,
        string memory name,
        string memory description,
        TwinPersonality personality
    ) public payable returns (uint256) {
        // Create twin with off-chain metadata
        return _createTwin(
            recipient,
            name,
            description,
            personality,
            false, // useOnChainMetadata
            _tokenURI,
            "" // imageURI not used for off-chain metadata
        );
    }

    /**
     * @dev Creates a new TwinBot NFT with on-chain metadata
     * @param recipient The address that will own the minted NFT
     * @param name The name of the twin
     * @param description The description of the twin
     * @param personality The personality type of the twin
     * @return uint256 The ID of the newly minted NFT
     * @notice This function creates a twin with metadata stored on-chain
     * @custom:requires Payment of at least mintPrice
     */
    function createTwinOnChain(
        address recipient,
        string memory name,
        string memory description,
        TwinPersonality personality
    ) public payable returns (uint256) {
        // Get image URI for the personality
        string memory imageURI = getImageURIForPersonality(personality);
        
        // Create twin with on-chain metadata
        return _createTwin(
            recipient,
            name,
            description,
            personality,
            true, // useOnChainMetadata
            "", // tokenURI not used for on-chain metadata
            imageURI
        );
    }
    
    /**
     * @dev Internal function to create a new TwinBot NFT
     * @param recipient The address that will own the minted NFT
     * @param name The name of the twin
     * @param description The description of the twin
     * @param personality The personality type of the twin
     * @param useOnChainMetadata Whether to use on-chain metadata
     * @param _tokenURI The token URI for off-chain metadata
     * @param imageURI The image URI for on-chain metadata
     * @return uint256 The ID of the newly minted NFT
     * @notice This internal function handles the common logic for both on-chain and off-chain metadata creation
     * @custom:security Non-reentrant by design as it follows checks-effects-interactions pattern
     */
    function _createTwin(
        address recipient,
        string memory name,
        string memory description,
        TwinPersonality personality,
        bool useOnChainMetadata,
        string memory _tokenURI,
        string memory imageURI
    ) internal returns (uint256) {
        // Check for sufficient payment
        if (msg.value < mintPrice) {
            revert TwinBotNFT__InsufficientPayment(msg.value, mintPrice);
        }
        
        // Validate recipient address
        if (recipient == address(0)) {
            revert TwinBotNFT__ZeroAddress("recipient");
        }
        
        // Mint new token
        uint256 newTokenId = _nextTokenId++;
        _mint(recipient, newTokenId);
        
        // Set token URI for off-chain metadata
        if (!useOnChainMetadata && bytes(_tokenURI).length > 0) {
            _setTokenURI(newTokenId, _tokenURI);
        }
        
        // Store twin metadata
        twinData[newTokenId] = TwinMetadata({
            name: name,
            description: description,
            imageURI: imageURI,
            personality: personality,
            creationTime: block.timestamp,
            creator: msg.sender,
            useOnChainMetadata: useOnChainMetadata
        });
        
        // Emit event with additional indexed parameters
        emit TwinBotCreated(newTokenId, msg.sender, recipient, name, useOnChainMetadata);
        
        return newTokenId;
    }
    
    /**
     * @dev Updates the personality of a twin
     * @param tokenId The ID of the twin to update
     * @param newPersonality The new personality type
     * @notice Allows the owner or approved address to update a twin's personality
     * @custom:requires Caller must be the owner or approved for the token
     */
    function updateTwinPersonality(uint256 tokenId, TwinPersonality newPersonality) public {
        if (_ownerOf(tokenId) != msg.sender && getApproved(tokenId) != msg.sender) {
            revert TwinBotNFT__NotTwinOwner(tokenId, msg.sender);
        }
        
        TwinMetadata storage metadata = twinData[tokenId];
        metadata.personality = newPersonality;
        
        if (metadata.useOnChainMetadata) {
            metadata.imageURI = getImageURIForPersonality(newPersonality);
        }
        
        emit TwinPersonalityUpdated(tokenId, newPersonality, msg.sender);
    }
    
    /**
     * @dev Returns the base URI for token metadata
     * @return string The base URI for token metadata
     * @notice This is used as a prefix for on-chain metadata
     */
    function _baseURI() internal pure override returns (string memory) {
        return "data:application/json;base64,";
    }
    
    /**
     * @dev Returns the token URI for a given token ID
     * @param tokenId The ID of the token to get the URI for
     * @return string The complete URI for the token metadata
     * @notice Returns either the off-chain URI or generates on-chain metadata based on the token's configuration
     * @custom:requires Token must exist
     */
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        if (_ownerOf(tokenId) == address(0)) {
            revert TwinBotNFT__TokenDoesNotExist(tokenId);
        }
        
        TwinMetadata memory metadata = twinData[tokenId];
        
        // If using off-chain metadata, use the parent implementation
        if (!metadata.useOnChainMetadata) {
            return super.tokenURI(tokenId);
        }
        
        // Otherwise, generate on-chain metadata
        return string(
            abi.encodePacked(
                _baseURI(),
                Base64.encode(
                    bytes(
                        abi.encodePacked(
                            '{"name":"', metadata.name, '", ',
                            '"description":"', metadata.description, '", ',
                            '"attributes": [',
                                '{"trait_type": "Personality", "value": "', getPersonalityString(metadata.personality), '"},',
                                '{"trait_type": "Creation Time", "value": ', _toString(metadata.creationTime), '}',
                            '], ',
                            '"image":"', metadata.imageURI, '"'
                            '}'
                        )
                    )
                )
            )
        );
    }
    
    /**
     * @dev Returns the image URI for a given personality type
     * @return string The image URI for the default personality
     * @notice Currently returns the default image URI regardless of personality
     */
    function getImageURIForPersonality(TwinPersonality /* _personality */) public view returns (string memory) {
        return s_defaultImageURI;
    }
    
    /**
     * @dev Returns a string representation of a personality type
     * @return string The string representation of the general personality type
     * @notice Currently returns "General" regardless of personality
     */
    function getPersonalityString(TwinPersonality /* _personality */) public pure returns (string memory) {
        return "General";
    }
    
    /**
     * @dev Updates the mint price
     * @param newPrice The new mint price
     * @notice Allows the contract owner to change the price for minting new twins
     * @custom:requires Caller must be the contract owner
     */
    function setMintPrice(uint256 newPrice) public onlyOwner {
        uint256 oldPrice = mintPrice;
        mintPrice = newPrice;
        emit MintPriceUpdated(oldPrice, newPrice, msg.sender);
    }
    
    /**
     * @dev Withdraws the contract balance to the owner
     * @notice Allows the contract owner to withdraw accumulated funds
     * @custom:requires Caller must be the contract owner
     * @custom:requires Contract must have a non-zero balance
     */
    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        if (balance == 0) {
            revert TwinBotNFT__NoBalanceToWithdraw(balance);
        }
        
        address ownerAddress = owner();
        (bool success, ) = payable(ownerAddress).call{value: balance}("");
        if (!success) {
            revert TwinBotNFT__WithdrawalFailed(ownerAddress, balance);
        }
    }
    
    /**
     * @dev Returns the total number of tokens minted
     * @return uint256 The total number of tokens minted
     * @notice This represents the total supply of TwinBot NFTs
     */
    function totalSupply() public view returns (uint256) {
        return _nextTokenId;
    }
    
    /**
     * @dev Updates the default image URI used for on-chain metadata
     * @param newDefaultImageURI The new default image URI
     * @notice Allows the contract owner to change the default image used for twins
     * @custom:requires Caller must be the contract owner
     * @custom:requires New URI cannot be empty
     */
    function setDefaultImageURI(string memory newDefaultImageURI) public onlyOwner {
        // Validate the new URI is not empty
        if (bytes(newDefaultImageURI).length == 0) {
            revert TwinBotNFT__EmptyString("newDefaultImageURI");
        }
        
        string memory oldURI = s_defaultImageURI;
        s_defaultImageURI = newDefaultImageURI;
        
        emit DefaultImageURIUpdated(oldURI, newDefaultImageURI, msg.sender);
    }
    
    /**
     * @dev Returns the current default image URI
     * @return string The default image URI
     * @notice This URI is used for all twins with on-chain metadata
     */
    function getDefaultImageURI() public view returns (string memory) {
        return s_defaultImageURI;
    }
    
    /**
     * @dev Converts a uint256 to a string
     * @param value The uint256 to convert
     * @return string The string representation of the uint256 value
     * @notice Used for generating on-chain metadata
     */
    function _toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        
        uint256 temp = value;
        uint256 digits;
        
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        
        bytes memory buffer = new bytes(digits);
        
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        
        return string(buffer);
    }
}
