# Contributing to TwinBot Landing Page

Thank you for considering contributing to the TwinBot Landing Page project! This document provides guidelines and instructions for contributing.

## Code of Conduct

Please be respectful and considerate of others when contributing to this project. We aim to foster an inclusive and welcoming community.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with the following information:

1. A clear, descriptive title
2. Steps to reproduce the bug
3. Expected behavior
4. Actual behavior
5. Screenshots (if applicable)
6. Environment information (browser, OS, etc.)

### Suggesting Features

Feature suggestions are welcome! Please create an issue with:

1. A clear, descriptive title
2. A detailed description of the proposed feature
3. Any relevant mockups or examples
4. Why this feature would be useful to most users

### Pull Requests

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Make your changes
4. Run tests to ensure your changes don't break existing functionality
5. Commit your changes (`git commit -m 'Add some feature'`)
6. Push to the branch (`git push origin feature/your-feature-name`)
7. Open a Pull Request

## Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Foundry (for smart contract development)
- MetaMask or another Ethereum wallet

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/twinbot-landing.git
cd twinbot-landing
```

2. Install dependencies
```bash
npm install
```

3. Start the local blockchain (in a separate terminal)
```bash
cd foundry/twinbot-contracts
anvil
```

4. Deploy the smart contract (in a separate terminal)
```bash
cd foundry/twinbot-contracts
forge script script/DeployTwinBotNFT.s.sol --rpc-url http://localhost:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 --broadcast
```

5. Start the development server
```bash
npm run dev
```

## Project Structure

- `src/app`: Next.js app router pages
- `src/components`: React components
- `src/config`: Configuration files (wagmi)
- `src/utils`: Utility functions
- `foundry/twinbot-contracts`: Smart contract development
- `public`: Static assets

## Coding Standards

- Use ESLint and Prettier for code formatting
- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Write tests for new features

## License

By contributing to this project, you agree that your contributions will be licensed under the project's MIT License.
