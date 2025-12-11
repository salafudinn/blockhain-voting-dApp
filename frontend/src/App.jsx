import { useState, useEffect } from 'react';
import Header from './components/Header';
import CreateProposal from './components/CreateProposal';
import ProposalList from './components/ProposalList';
import { useVoting } from './hooks/useVoting';

function App() {
    const {
        account,
        loading,
        error,
        connectWallet,
        createProposal,
        submitVote,
        fetchProposals,
        checkIfVoted
    } = useVoting();

    const [proposals, setProposals] = useState([]);
    const [isLoadingProposals, setIsLoadingProposals] = useState(false);

    const loadProposals = async () => {
        try {
            setIsLoadingProposals(true);
            const data = await fetchProposals();
            setProposals(data);
        } catch (err) {
            console.error('Error loading proposals:', err);
        } finally {
            setIsLoadingProposals(false);
        }
    };

    useEffect(() => {
        loadProposals();
    }, []);

    const handleConnect = async () => {
        try {
            await connectWallet();
        } catch (err) {
            console.error('Connection error:', err);
        }
    };

    const handleCreateProposal = async (description) => {
        await createProposal(description);
        await loadProposals();
    };

    const handleVote = async (proposalId, vote) => {
        await submitVote(proposalId, vote);
        await loadProposals();
    };

    return (
        <div className="min-h-screen bg-gradient-elegant">
            <Header
                account={account}
                onConnect={handleConnect}
                loading={loading}
            />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {error && (
                    <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                        <p className="text-red-400 text-sm">{error}</p>
                    </div>
                )}

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <CreateProposal
                            onCreateProposal={handleCreateProposal}
                            loading={loading}
                        />
                    </div>

                    <div className="lg:col-span-2">
                        <ProposalList
                            proposals={proposals}
                            onVote={handleVote}
                            account={account}
                            checkIfVoted={checkIfVoted}
                            loading={isLoadingProposals}
                        />
                    </div>
                </div>
            </main>

            <footer className="border-t border-dark-border mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <p className="text-center text-sm text-light-secondary">
                        Decentralized Voting System - Built with Solidity, Hardhat & React
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default App;
