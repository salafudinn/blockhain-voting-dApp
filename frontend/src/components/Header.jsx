import { useState } from 'react';

export default function Header({ account, onConnect, loading }) {
    const formatAddress = (addr) => {
        if (!addr) return '';
        return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
    };

    return (
        <header className="bg-gradient-card border-b border-dark-border shadow-elegant">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                            DVS
                        </h1>
                        <p className="text-sm text-light-secondary mt-1">
                            Decentralized Voting System
                        </p>
                    </div>

                    <div>
                        {account ? (
                            <div className="flex items-center space-x-3">
                                <div className="flex items-center space-x-2 px-4 py-2 bg-dark-bg rounded-lg border border-dark-border">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="text-sm font-mono">{formatAddress(account)}</span>
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={onConnect}
                                disabled={loading}
                                className="btn-primary"
                            >
                                {loading ? 'Connecting...' : 'Connect Wallet'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
