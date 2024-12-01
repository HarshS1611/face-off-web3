import { Web3 } from "web3";
import axios from "axios";

const web3 = new Web3("https://rpc-amoy.polygon.technology/"); // Replace with your RPC URL

// Load the escrow ABI from the JSON file
const escrowAbi = [
  {
    inputs: [
      { internalType: "address", name: "_platformToken", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "challengeId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "stake",
        type: "uint256",
      },
    ],
    name: "ChallengeCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "challengeId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "participant",
        type: "address",
      },
    ],
    name: "ChallengeJoined",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "challengeId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "winner",
        type: "address",
      },
    ],
    name: "ChallengeResolved",
    type: "event",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "challenges",
    outputs: [
      { internalType: "address", name: "creator", type: "address" },
      { internalType: "address", name: "participant", type: "address" },
      { internalType: "uint256", name: "stake", type: "uint256" },
      { internalType: "bool", name: "completed", type: "bool" },
      { internalType: "address", name: "winner", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "createP2CChallenge",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_stake", type: "uint256" }],
    name: "createP2PChallenge",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_challengeId", type: "uint256" },
    ],
    name: "joinP2PChallenge",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "nextChallengeId",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "platformToken",
    outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_challengeId", type: "uint256" },
    ],
    name: "resolveP2CChallenge",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_challengeId", type: "uint256" },
      { internalType: "address", name: "_winner", type: "address" },
    ],
    name: "resolveP2PChallenge",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const escrowAddress = "0xe09dfb2127813bfff2bda62781f78a4acbbcc007";
const escrow = new web3.eth.Contract(escrowAbi, escrowAddress);

export const generateCreateP2PChallengeTx = (from, stake) => {
  console.log(stake, "stakenormal");
  const data = escrow.methods.createP2PChallenge(stake).encodeABI();
  console.log(data, "data");
  return {
    from: from,
    to: escrowAddress,
    value: `0x${web3.utils.toWei("0.0001", "ether")}`,
    data: data,
  };
};

export const generateJoinP2PChallengeTx = (from, challengeId, stake) => {
  const data = escrow.methods.joinP2PChallenge(challengeId).encodeABI();
  return {
    from: from,
    to: escrowAddress,
    value: web3.utils.toWei(stake.toString(), "ether"),
    gas: 500000,
    data: data,
  };
};

export const getNextChallengeId = async () => {
  try {
    const nextChallengeId = await escrow.methods.nextChallengeId().call();
    const nextChallengeIdInt = Number(nextChallengeId) - 1;
    console.log("Next Challenge ID:", nextChallengeIdInt);
    return nextChallengeIdInt;
  } catch (error) {
    console.error("Failed to get next challenge ID:", error);
    throw error;
  }
};

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
