// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Escrow {
    struct Challenge {
        address creator;
        address participant;
        uint256 stake;
        bool completed;
        address winner;
    }
    

    IERC20 public platformToken;
    mapping(uint256 => Challenge) public challenges;
    uint256 public nextChallengeId;

    event ChallengeCreated(uint256 indexed challengeId, address indexed creator, uint256 stake);
    event ChallengeJoined(uint256 indexed challengeId, address indexed participant);
    event ChallengeResolved(uint256 indexed challengeId, address indexed winner);

    constructor(address _platformToken) {
        platformToken = IERC20(_platformToken);
    }

    // P2P Challenge
    function createP2PChallenge(uint256 _stake) external payable {
        require(msg.value == _stake, "Stake must match the sent amount");
        challenges[nextChallengeId] = Challenge({
            creator: msg.sender,
            participant: address(0),
            stake: _stake,
            completed: false,
            winner: address(0)
        });

        emit ChallengeCreated(nextChallengeId, msg.sender, _stake);
        nextChallengeId++;
    }

    function joinP2PChallenge(uint256 _challengeId) external payable {
        Challenge storage challenge = challenges[_challengeId];
        require(challenge.creator != address(0), "Challenge does not exist");
        require(challenge.participant == address(0), "Challenge already has a participant");
        require(msg.value == challenge.stake, "Stake must match the creator's stake");

        challenge.participant = msg.sender;
        emit ChallengeJoined(_challengeId, msg.sender);
    }

    function resolveP2PChallenge(uint256 _challengeId, address _winner) external {
        Challenge storage challenge = challenges[_challengeId];
        require(!challenge.completed, "Challenge already resolved");
        require(_winner == challenge.creator || _winner == challenge.participant, "Invalid winner");

        challenge.completed = true;
        challenge.winner = _winner;
        payable(_winner).transfer(challenge.stake * 2);

        emit ChallengeResolved(_challengeId, _winner);
    }

    // P2C Challenge
    function createP2CChallenge() external {
         challenges[nextChallengeId] = Challenge({
            creator: address(platformToken),
            participant: msg.sender,
            stake: 0.000000000000001 ether,
            completed: false,
            winner: address(0)
        });

        emit ChallengeCreated(nextChallengeId, msg.sender, 0.000000000000001 ether);
        nextChallengeId++;

    }

    function resolveP2CChallenge(uint256 _challengeId) external {
        Challenge storage challenge = challenges[_challengeId];
        require(!challenge.completed, "Challenge already resolved");
        require(msg.sender == challenge.creator || msg.sender == challenge.participant, "Invalid winner");

        challenge.completed = true;
        challenge.winner = msg.sender;
        platformToken.transferFrom(challenge.creator,challenge.participant, challenge.stake);

        emit ChallengeResolved(_challengeId, challenge.participant);
    }

}