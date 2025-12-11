// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Voting {
    struct Proposal {
        uint256 id;
        string description;
        uint256 yesVotes;
        uint256 noVotes;
        bool active;
        uint256 createdAt;
    }

    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => mapping(address => bool)) public hasVoted;
    
    uint256 public proposalCount;
    
    event ProposalCreated(uint256 indexed proposalId, string description, uint256 timestamp);
    event VoteCast(uint256 indexed proposalId, address indexed voter, bool vote, uint256 timestamp);
    
    function createProposal(string memory _description) public {
        require(bytes(_description).length > 0, "Description cannot be empty");
        
        proposalCount++;
        
        proposals[proposalCount] = Proposal({
            id: proposalCount,
            description: _description,
            yesVotes: 0,
            noVotes: 0,
            active: true,
            createdAt: block.timestamp
        });
        
        emit ProposalCreated(proposalCount, _description, block.timestamp);
    }
    
    function vote(uint256 _proposalId, bool _vote) public {
        require(_proposalId > 0 && _proposalId <= proposalCount, "Invalid proposal ID");
        require(proposals[_proposalId].active, "Proposal is not active");
        require(!hasVoted[_proposalId][msg.sender], "Already voted on this proposal");
        
        hasVoted[_proposalId][msg.sender] = true;
        
        if (_vote) {
            proposals[_proposalId].yesVotes++;
        } else {
            proposals[_proposalId].noVotes++;
        }
        
        emit VoteCast(_proposalId, msg.sender, _vote, block.timestamp);
    }
    
    function getProposal(uint256 _proposalId) public view returns (
        uint256 id,
        string memory description,
        uint256 yesVotes,
        uint256 noVotes,
        bool active,
        uint256 createdAt
    ) {
        require(_proposalId > 0 && _proposalId <= proposalCount, "Invalid proposal ID");
        Proposal memory p = proposals[_proposalId];
        return (p.id, p.description, p.yesVotes, p.noVotes, p.active, p.createdAt);
    }
    
    function getAllProposals() public view returns (Proposal[] memory) {
        Proposal[] memory allProposals = new Proposal[](proposalCount);
        
        for (uint256 i = 1; i <= proposalCount; i++) {
            allProposals[i - 1] = proposals[i];
        }
        
        return allProposals;
    }
    
    function hasUserVoted(uint256 _proposalId, address _voter) public view returns (bool) {
        return hasVoted[_proposalId][_voter];
    }
}
