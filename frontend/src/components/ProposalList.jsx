import ProposalCard from './ProposalCard';

export default function ProposalList({ proposals, onVote, account, checkIfVoted, loading }) {
    if (loading) {
        return (
            <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                <p className="mt-4 text-light-secondary">Loading proposals...</p>
            </div>
        );
    }

    if (!proposals || proposals.length === 0) {
        return (
            <div className="card text-center py-12">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-xl font-semibold mb-2">No Proposals Yet</h3>
                <p className="text-light-secondary">
                    Be the first to create a proposal!
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">
                All Proposals ({proposals.length})
            </h2>

            <div className="grid gap-6">
                {proposals.map((proposal) => (
                    <ProposalCard
                        key={proposal.id}
                        proposal={proposal}
                        onVote={onVote}
                        account={account}
                        checkIfVoted={checkIfVoted}
                    />
                ))}
            </div>
        </div>
    );
}
