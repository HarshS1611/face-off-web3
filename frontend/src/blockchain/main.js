import { Web3 } from "web3";
import axios from "axios";

const web3 = new Web3("https://rpc-amoy.polygon.technology/"); // Replace with your RPC URL

// Load the escrow ABI from the JSON file
const escrowAbi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_platformToken",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "challengeId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "creator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "stake",
        "type": "uint256"
      }
    ],
    "name": "ChallengeCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "creator",
        "type": "address"
      }
    ],
    "name": "ChallengeInitiated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "challengeId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "participant",
        "type": "address"
      }
    ],
    "name": "ChallengeJoined",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "challengeId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "winner",
        "type": "address"
      }
    ],
    "name": "ChallengeResolved",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "challenges",
    "outputs": [
      {
        "internalType": "address",
        "name": "creator",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "participant",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "stake",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "completed",
        "type": "bool"
      },
      {
        "internalType": "address",
        "name": "winner",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "createP2CChallenge",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "createP2PChallenge",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_challengeId",
        "type": "uint256"
      }
    ],
    "name": "joinP2PChallenge",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "nextChallengeId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "platformToken",
    "outputs": [
      {
        "internalType": "contract IERC20",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_challengeId",
        "type": "uint256"
      }
    ],
    "name": "resolveP2CChallenge",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_challengeId",
        "type": "uint256"
      }
    ],
    "name": "resolveP2PChallenge",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const xfitAbi =  [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "allowance",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "needed",
        "type": "uint256"
      }
    ],
    "name": "ERC20InsufficientAllowance",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "balance",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "needed",
        "type": "uint256"
      }
    ],
    "name": "ERC20InsufficientBalance",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "approver",
        "type": "address"
      }
    ],
    "name": "ERC20InvalidApprover",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      }
    ],
    "name": "ERC20InvalidReceiver",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "ERC20InvalidSender",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "ERC20InvalidSpender",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "approveCustom",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const escrowAddress = "0xd3Ec5f72711FF370093f029511CA0beeAcE888f4";
const escrow = new web3.eth.Contract(escrowAbi, escrowAddress);

const xfitAddress = "0x184c5a0f24f68059Dd33F770928c7Fc73c789664";
const xfit = new web3.eth.Contract(xfitAbi, xfitAddress);

export const generateCreateP2PChallengeTx = (from, value) => {
  const data = escrow.methods.createP2PChallenge().encodeABI();
  console.log(data, "data");
  return {
    from: from,
    to: escrowAddress,
    value: `0x${(parseFloat(value) * 1e18).toString(16)}`,
    data: data,
  };
};

export const generateJoinP2PChallengeTx = (from, challengeId, stake) => {
  // console.log("nepal join p2p", from, challengeId, stake)
  const data = escrow.methods.joinP2PChallenge(challengeId).encodeABI();
  return {
    from: from,
    to: escrowAddress,
    value: `0x${(parseFloat(stake) * 1e18).toString(16)}`,
    data: data,
  };
};

export const resolveP2PChallenge = (from, Id) => {
  const id = Number(Id)
  const data = escrow.methods.resolveP2PChallenge(id).encodeABI();
  return {
    from: from,
    to: escrowAddress,
    data: data,
  };
}

export const getNextChallengeId = async () => {
  try {
    const nextChallengeId = await escrow.methods.nextChallengeId().call();
    const nextChallengeIdInt = Number(nextChallengeId);
    console.log("Next Challenge ID:", nextChallengeIdInt);
    return nextChallengeIdInt;
  } catch (error) {
    console.error("Failed to get next challenge ID:", error);
    throw error;
  }
}
export const generateCreateP2CChallengeTx = (to) => {
  const data = escrow.methods.createP2CChallenge().encodeABI();
  return {
    from: to,
    to: escrowAddress,
    data: data,
  };
};

export const generateResolveP2CChallengeTx = (from, challengeId) => {
  const data = escrow.methods.resolveP2CChallenge(challengeId).encodeABI();
  return {
    from: from,
    to: escrowAddress,
    data: data,
  };
};
export const generateApproveTx = (from) => {
  const amount = `0x${(parseFloat(0.0001) * 1e18).toString(16)}`;
  const data = xfit.methods.approveCustom(xfitAddress,escrowAddress, amount).encodeABI();
  return {
    from: from,
    to: xfitAddress,
    data: data,
  };
}

export const sendRawTransaction = async (rawTx, auth) => {
  const options = {
    method: "POST",
    url: "https://sandbox-api.okto.tech/api/v1/rawtransaction/execute",
    headers: {
      Authorization: `Bearer ${auth}`,
      "Content-Type": "application/json",
    },
    data: {
      network_name: "POLYGON_TESTNET_AMOY",
      transaction: rawTx,
    },
  };

  try {
    const { data } = await axios.request(options);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

// // Example usage
// const fromAddress = "0xYourAddress";
// const stake = 1; // 1 ether
// const challengeId = 1; // Replace with your challenge ID

// const createP2PChallengeTx = generateCreateP2PChallengeTx(fromAddress, stake);
// const joinP2PChallengeTx = generateJoinP2PChallengeTx(
//   fromAddress,
//   challengeId,
//   stake
// );

// // Send the raw transaction
// sendRawTransaction(createP2PChallengeTx);
// sendRawTransaction(joinP2PChallengeTx);
