import { useState, useEffect } from 'react';

export default function ProposalCard({ proposal, onVote, account, checkIfVoted }) {
    const [isVoting, setIsVoting] = useState(false);
    const [hasVoted, setHasVoted] = useState(false);

    useEffect(() => {
        const checkVoteStatus = async () => {
            if (account && proposal.id) {
                const voted = await checkIfVoted(proposal.id, account);
                setHasVoted(voted);
            }
        };

        checkVoteStatus();
    }, [account, proposal.id, checkIfVoted]);

    const handleVote = async (vote) => {
        try {
            setIsVoting(true);
            await onVote(proposal.id, vote);
            setHasVoted(true);
            alert(`Vote ${vote ? 'YES' : 'NO'} submitted successfully!`);
        } catch (err) {
            alert(`Error: ${err.message}`);
        } finally {
            setIsVoting(false);
        }
    };

    const totalVotes = proposal.yesVotes + proposal.noVotes;
    const yesPercentage = totalVotes > 0 ? (proposal.yesVotes / totalVotes) * 100 : 0;
    const noPercentage = totalVotes > 0 ? (proposal.noVotes / totalVotes) * 100 : 0;

    const formatDate = (timestamp) => {
        return new Date(timestamp * 1000).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="card">
            <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                        <span className="text-xs font-mono px-2 py-1 bg-dark-bg rounded border border-dark-border">
                            #{proposal.id}
                        </span>
                        {proposal.active && (
                            <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded border border-green-500/30">
                                Active
                            </span>
                        )}
                        {hasVoted && (
                            <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded border border-blue-500/30">
                                Voted
                            </span>
                        )}
                    </div>
                    <p className="text-lg font-medium text-light-fg mb-2">
                        {proposal.description}
                    </p>
                    <p className="text-xs text-light-secondary">
                        Created: {formatDate(proposal.createdAt)}
                    </p>
                </div>
            </div>

            <div className="space-y-3 mb-4">
                <div>
                    <div className="flex justify-between text-sm mb-1">
                        <span className="text-green-400 font-medium">YES</span>
                        <span className="text-light-secondary">
                            {proposal.yesVotes} votes ({yesPercentage.toFixed(1)}%)
                        </span>
                    </div>
                    <div className="w-full bg-dark-bg rounded-full h-2 overflow-hidden">
                        <div
                            className="bg-gradient-to-r from-green-500 to-green-400 h-full transition-all duration-500"
                            style={{ width: `${yesPercentage}%` }}
                        ></div>
                    </div>
                </div>

                <div>
                    <div className="flex justify-between text-sm mb-1">
                        <span className="text-red-400 font-medium">NO</span>
                        <span className="text-light-secondary">
                            {proposal.noVotes} votes ({noPercentage.toFixed(1)}%)
                        </span>
                    </div>
                    <div className="w-full bg-dark-bg rounded-full h-2 overflow-hidden">
                        <div
                            className="bg-gradient-to-r from-red-500 to-red-400 h-full transition-all duration-500"
                            style={{ width: `${noPercentage}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            {proposal.active && !hasVoted && account && (
                <div className="flex space-x-3">
                    <button
                        onClick={() => handleVote(true)}
                        disabled={isVoting}
                        className="flex-1 px-4 py-3 bg-green-500/20 text-green-400 font-semibold rounded-lg border border-green-500/30 hover:bg-green-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isVoting ? 'Voting...' : 'Vote YES'}
                    </button>
                    <button
                        onClick={() => handleVote(false)}
                        disabled={isVoting}
                        className="flex-1 px-4 py-3 bg-red-500/20 text-red-400 font-semibold rounded-lg border border-red-500/30 hover:bg-red-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isVoting ? 'Voting...' : 'Vote NO'}
                    </button>
                </div>
            )}

            {!account && (
                <div className="text-center py-3 bg-dark-bg rounded-lg border border-dark-border">
                    <p className="text-sm text-light-secondary">
                        Connect your wallet to vote
                    </p>
                </div>
            )}
        </div>
    );
}
