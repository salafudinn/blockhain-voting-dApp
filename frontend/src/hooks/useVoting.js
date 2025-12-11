import { useState, useEffect } from 'react';
import { BrowserProvider, Contract } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI, CHAIN_ID } from '../utils/Constants';

export const useVoting = () => {
    const [account, setAccount] = useState(null);
    const [contract, setContract] = useState(null);
    const [provider, setProvider] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (window.ethereum) {
            const initProvider = async () => {
                try {
                    const browserProvider = new BrowserProvider(window.ethereum);
                    setProvider(browserProvider);

                    const signer = await browserProvider.getSigner();
                    const votingContract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
                    setContract(votingContract);
                } catch (err) {
                    console.error("Failed to initialize provider:", err);
                    setError(err.message);
                }
            };

            initProvider();
        }
    }, []);

    const connectWallet = async () => {
        try {
            setLoading(true);
            setError(null);

            if (!window.ethereum) {
                throw new Error("MetaMask is not installed!");
            }

            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });

            const chainId = await window.ethereum.request({
                method: 'eth_chainId'
            });

            if (parseInt(chainId, 16) !== CHAIN_ID) {
                throw new Error(`Please switch to Hardhat Localhost network (Chain ID: ${CHAIN_ID})`);
            }

            setAccount(accounts[0]);
            return accounts[0];
        } catch (err) {
            console.error("Error connecting wallet:", err);
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const createProposal = async (description) => {
        try {
            setLoading(true);
            setError(null);

            if (!contract) {
                throw new Error("Contract not initialized");
            }

            if (!description || description.trim() === '') {
                throw new Error("Description cannot be empty");
            }

            const tx = await contract.createProposal(description);
            await tx.wait();

            return tx;
        } catch (err) {
            console.error("Error creating proposal:", err);
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const submitVote = async (proposalId, vote) => {
        try {
            setLoading(true);
            setError(null);

            if (!contract) {
                throw new Error("Contract not initialized");
            }

            const tx = await contract.vote(proposalId, vote);
            await tx.wait();

            return tx;
        } catch (err) {
            console.error("Error submitting vote:", err);
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const fetchProposals = async () => {
        try {
            setLoading(true);
            setError(null);

            if (!contract) {
                throw new Error("Contract not initialized");
            }

            const proposals = await contract.getAllProposals();

            return proposals.map(p => ({
                id: Number(p.id),
                description: p.description,
                yesVotes: Number(p.yesVotes),
                noVotes: Number(p.noVotes),
                active: p.active,
                createdAt: Number(p.createdAt)
            }));
        } catch (err) {
            console.error("Error fetching proposals:", err);
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const checkIfVoted = async (proposalId, voterAddress) => {
        try {
            if (!contract) {
                throw new Error("Contract not initialized");
            }

            const hasVoted = await contract.hasUserVoted(proposalId, voterAddress);
            return hasVoted;
        } catch (err) {
            console.error("Error checking vote status:", err);
            return false;
        }
    };

    return {
        account,
        contract,
        provider,
        loading,
        error,
        connectWallet,
        createProposal,
        submitVote,
        fetchProposals,
        checkIfVoted
    };
};
