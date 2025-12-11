import { useState } from 'react';

export default function CreateProposal({ onCreateProposal, loading }) {
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!description.trim()) {
            alert('Please enter a proposal description');
            return;
        }

        try {
            setIsSubmitting(true);
            await onCreateProposal(description);
            setDescription('');
            alert('Proposal created successfully!');
        } catch (err) {
            alert(`Error: ${err.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="card">
            <h2 className="text-2xl font-bold mb-4">Create New Proposal</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-light-secondary mb-2">
                        Proposal Description
                    </label>
                    <textarea
                        id="description"
                        rows="4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter your proposal description..."
                        className="input-field resize-none"
                        disabled={isSubmitting || loading}
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting || loading || !description.trim()}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Creating Proposal...' : 'Create Proposal'}
                </button>
            </form>
        </div>
    );
}
