# Decentralized Voting System (DVS)

A blockchain-based voting platform built with Solidity, Hardhat, React, and Tailwind CSS. This application features a secure and transparent voting mechanism with a responsive user interface.

![2025-12-11 18-17-54](https://github.com/user-attachments/assets/2b3b75b9-5149-4646-a5ff-976dd18987a8)


## Features

- Create proposals on-chain
- Vote on active proposals (YES/NO)
- Real-time vote counting and percentage display
- MetaMask wallet integration
- Responsive UI with modern design
- Vote tracking to prevent double voting

## Tech Stack

**Backend**
- Solidity ^0.8.19
- Hardhat
- Ethers.js v6

**Frontend**
- React 18
- Vite
- Tailwind CSS
- Ethers.js v6

## Prerequisites

- Node.js (v16 or higher)
- MetaMask browser extension
- Git

## Quick Start

### 1. Install Dependencies

**Backend**
```bash
npm install
```

**Frontend**
```bash
cd frontend
npm install
cd ..
```

### 2. Compile Smart Contracts

```bash
npx hardhat compile
```

### 3. Start Hardhat Local Blockchain

Open a terminal and run:

```bash
npx hardhat node
```

**Note:** Keep this terminal running. It will generate 20 test accounts with private keys.

### 4. Deploy Smart Contract

Open a second terminal and run:

```bash
npx hardhat run scripts/deploy-and-update.js --network localhost
```

This script deploys the Voting contract and automatically updates `frontend/src/utils/Constants.js` with the new contract address.

### 5. Configure MetaMask

**Add Hardhat Network**
1. Open MetaMask.
2. Navigate to Settings > Networks > Add Network > Add a network manually.
3. Enter the following details:
   - **Network Name:** Hardhat Localhost
   - **RPC URL:** http://127.0.0.1:8545
   - **Chain ID:** 31337
   - **Currency Symbol:** ETH
4. Save the network.

**Import Test Account**
1. In MetaMask, select "Import Account".
2. Copy a private key from the Hardhat node terminal (Terminal 1).
3. Paste the private key and import.

### 6. Start Frontend

Open a third terminal and run:

```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:3000`.

## Usage

### Connect Wallet
1. Navigate to `http://localhost:3000`.
2. Click the "Connect Wallet" button.
3. Approve the connection in MetaMask.

### Create Proposal
1. Locate the "Create New Proposal" section.
2. Enter a proposal description.
3. Click "Create Proposal" and confirm the transaction in MetaMask.

### Vote on Proposal
1. Select a proposal from the list.
2. Click "Vote YES" or "Vote NO".
3. Confirm the transaction in MetaMask.

## Project Structure

```
dvs-voting-dapp/
├── contracts/
│   └── Voting.sol                    # Smart contract
├── scripts/
│   ├── deploy.js                     # Basic deployment
│   ├── deploy-and-update.js          # Auto-deploy + update Constants.js
│   └── create-demo-proposals.js      # Demo script
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── hardhat.config.js
├── package.json
├── SETUP_GUIDE.md
├── DEMO_GUIDE.md
└── README.md
```

## Smart Contract Functions

- `createProposal(string description)`: Create a new proposal.
- `vote(uint256 proposalId, bool vote)`: Vote on a proposal.
- `getAllProposals()`: Retrieve all proposals.
- `getProposal(uint256 proposalId)`: Retrieve specific proposal details.
- `hasUserVoted(uint256 proposalId, address voter)`: Check if a user has voted.
- `proposalCount()`: Get the total number of proposals.

## Troubleshooting

### "Could not decode result data" Error
**Solution:** The contract address in the frontend does not match the deployed contract. Re-deploy the contract using the deployment script:
```bash
npx hardhat run scripts/deploy-and-update.js --network localhost
```

### MetaMask Shows Wrong Network
Ensure you are connected to the "Hardhat Localhost" network with Chain ID 31337.

### Transaction Fails
- Verify the Hardhat node is running.
- Ensure the MetaMask account has sufficient test ETH.
- Reset MetaMask activity data if necessary (Settings > Advanced > Clear activity tab data).

### Port Already in Use (8545)
Stop the existing Hardhat node process or terminate the process using port 8545.

## Additional Guides

- [Setup Guide](SETUP_GUIDE.md)
- [Demo Guide](DEMO_GUIDE.md)
- [Quick Fix Guide](QUICK_FIX.md)

## Terminal Summary

Ensure three terminals are running:

| Terminal | Command | Status |
|----------|---------|--------|
| Terminal 1 | `npx hardhat node` | Keep running |
| Terminal 2 | `npx hardhat run scripts/deploy-and-update.js --network localhost` | Run once |
| Terminal 3 | `cd frontend , then -> npm run dev` | Keep running |

## Important Notes

- **Private Keys:** The test account private keys provided by Hardhat are public. Do not use them on mainnet.
- **Local Development:** This setup is intended for local development only.
- **Contract Redeployment:** Restarting the Hardhat node requires redeploying the contract.

## License

MIT
