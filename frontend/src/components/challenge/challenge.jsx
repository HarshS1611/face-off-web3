import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { generateJoinP2PChallengeTx, resolveP2PChallenge, sendRawTransaction } from "../../blockchain/main";
import axios from "axios";

export default function Challenge() {

  const { id } = useParams(); // Get the dynamic id from the URL
  console.log("Challenge ID:", id); // Log the id to the console

   const authToken = localStorage.getItem("authToken"); // Get auth token from localStorage
  // console.log(authToken, "nepali auth");
  
  const [wallets, setWallets] = useState(null);

  const [hasJoined, setHasJoined] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [activityIds, setActivityIds] = useState({});
  const [distances, setDistances] = useState({ activity1: 0, activity2: 0 });
  const [pollInterval, setPollInterval] = useState(null); // To store the poll interval ID

  const [challengeData , setChallengeData] = useState({
    amount: 0,
    category: "",
    challengeName: "",
    target: "",
    targetType: "",
    idd:"",
  });
  const fetchWallets = async () => {
    const options = {
      method: "GET",
      url: "https://sandbox-api.okto.tech/api/v1/wallet",
      headers: { Authorization: `Bearer ${authToken}` },
    };

    try {
      const { data } = await axios.request(options);
      console.log(data.data.wallets, "nepali wallets");
      setWallets(data.data.wallets);
    } catch (error) {
      console.log(`Failed to fetch wallets: ${error.message}`);
    }
  };
  const polygonWallet = wallets?.find(
    (wallet) => wallet.network_name === "POLYGON_TESTNET_AMOY"
  );
  useEffect(() => {
    fetchWallets();
    // Fetch challenge data from the API based on the ID
    fetch(`http://localhost:3001/challenges/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Challenge Data:", data); // Log the response
        setChallengeData({
          amount: data.amount,
          category: data.category,
          challengeName: data.challengeName,
          target: data.target,
          targetType: data.targetType,
          idd: data.id
        });
      })
      .catch((error) => {
        console.error("Error fetching challenge data:", error);
      });
  }, []); // The effect will run when the `id` changes

  useEffect(() => {
    console.log("Updated Challenge Data:", challengeData);
  }, [challengeData]);

  const handleJoinChallenge = async () => {
    const generateTxn  = await generateJoinP2PChallengeTx(polygonWallet.address, challengeData.idd, challengeData.amount);
    await sendRawTransaction(generateTxn, authToken)
    setIsActive(true);
    const postActivity1 = fetch(
      "http://localhost:3001/activities1",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Temp request1",
          startTime: "2024-12-01T06:00:00Z",
          endTime: "2024-12-01T07:00:00Z",
          startDistance: 0,
          endDistance: 0,
        }),
      }
    ).then((response) => response.json());

    const postActivity2 = fetch(
      "http://localhost:3001/activities2",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Temp request2",
          startTime: "2024-12-01T06:00:00Z",
          endTime: "2024-12-01T07:00:00Z",
          startDistance: 0,
          endDistance: 0,
        }),
      }
    ).then((response) => response.json());

    Promise.all([postActivity1, postActivity2])
      .then(([activity1Data, activity2Data]) => {
        console.log("Activity 1:", activity1Data);
        console.log("Activity 2:", activity2Data);
        setActivityIds({
          activity1Id: activity1Data._id,
          activity2Id: activity2Data._id,
        });
        setHasJoined(true);
        startPolling(activity1Data._id, activity2Data._id);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const startPolling = (activity1Id, activity2Id) => {
    const pollIntervalId = setInterval(async() => {
      const randomNum1 = Math.floor(Math.random() * 5) + 1;
      const randomNum2 = Math.floor(Math.random() * 5) + 1;

      Promise.all([
        fetch(`http://localhost:3001/activities1/${activity1Id}`)
          .then((response) => response.json())
          .then((data) => {
            const updatedDistance = data.endDistance + randomNum1;
            setDistances((prev) => ({ ...prev, activity1: updatedDistance }));
            return fetch(
              `http://localhost:3001/activities1/${activity1Id}`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ endDistance: updatedDistance }),
              }
            ).then((response) => response.json());
          }),
        fetch(`http://localhost:3001/activities2/${activity2Id}`)
          .then((response) => response.json())
          .then((data) => {
            const updatedDistance = data.endDistance + randomNum2;
            setDistances((prev) => ({ ...prev, activity2: updatedDistance }));
            return fetch(
              `http://localhost:3001/activities2/${activity2Id}`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ endDistance: updatedDistance }),
              }
            ).then((response) => response.json());
          }),
      ])
        .then(async([activity1Update, activity2Update]) => {
          console.log("Updated Activity 1:", activity1Update);
          console.log("Updated Activity 2:", activity2Update);

if (activity1Update.endDistance >= 30) {
            console.log("Activity 1 Wins!");
            clearInterval(pollIntervalId); // Stop polling
  setPollInterval(null); // Clear polling state
   const rawTxn = await  resolveP2PChallenge(polygonWallet.address, challengeData.idd)
   await sendRawTransaction(rawTxn, authToken)
            alert("Athlete 1 Wins!"); // Alert when Athlete 1 wins
          } else if (activity2Update.endDistance >= 30) {
            console.log("Activity 2 Wins!");
            clearInterval(pollIntervalId); // Stop polling
            setPollInterval(null); // Clear polling state
            const rawTxn = await resolveP2PChallenge(polygonWallet.address, challengeData.idd)
            await sendRawTransaction(rawTxn, authToken)
            alert("Athlete 2 Wins!"); // Alert when Athlete 2 wins
          }
        })
        .catch((error) => {
          console.error("Polling Error:", error);
        });
    }, 2000);

    setPollInterval(pollIntervalId); // Store polling interval ID
  };

  const handleStop = () => {
    if (pollInterval) {
      clearInterval(pollInterval); // Stop polling if it's active
      setPollInterval(null); // Clear polling state
      alert("Athlete 1 Wins!"); // Display alert when stopping
    }
    setIsActive(false); // Disable the challenge
  };

  return (
    <div className="scroll-auto h-[74vh] overflow-y-auto scrollbar-hide">
      <div className="flex flex-col gap-4 px-4">
        {/* Challenge Info */}
        <div className="relative bg-[#4d4d4d] border-2 border-[#3E3E3E] w-full h-full rounded-lg">
          <img
            src="/running.png"
            alt="running"
            className="w-full h-52 object-cover"
          />
          <p className="text-xl font-bold my-1 mx-5">{challengeData.challengeName}</p>
          {/* <p className="text-sm font-medium my-1 mx-5">from 2 Dec</p> */}
          <div>
            <p className="p-6 text-lg font-bold text-white">
              About the challenge
            </p>
            <p className="px-6 text-base font-normal text-white">
  This challenge is a <span className="font-semibold">{challengeData.category}</span> challenge, where participants compete to achieve the specified goal. The challenge is designed to test your endurance, skill, and commitment. Take on the challenge to push your limits and earn rewards based on your performance!
</p>

          </div>
          <div className="flex justify-between px-2">
            <div className="flex flex-col gap-2 my-10 px-4">
              <p className="text-lg font-bold">Target:</p>
              <p className="text-sm font-medium">{challengeData.target} {challengeData.targetType}</p>
            </div>
            <div className="flex flex-col gap-2 my-10 px-4">
              <p className="text-lg font-bold">Reward:</p>
              <p className="text-sm font-medium">{challengeData.amount*2}</p>
            </div>
          </div>
        </div>
        {hasJoined && (
          <div className="flex justify-center gap-4">
            <div className="bg-[#4d44445e] text-white p-4 rounded-lg w-full shadow-md">
              <h3 className="text-lg font-bold">Athlete 1</h3>
              <p>End Distance: {distances.activity1} m</p>
            </div>
            <div className="bg-[#5e5e5e5e] text-white p-4 rounded-lg w-full shadow-md">
              <h3 className="text-lg font-bold">Athlete 2</h3>
              <p>End Distance: {distances.activity2} m</p>
            </div>
          </div>
        )}

        {/* Buttons */}
        {!hasJoined ? (
          <button
            onClick={handleJoinChallenge}
            className="bg-white text-black rounded-full p-3 text-lg"
          >
            Start Now
          </button>
        ) : (
          <button
            onClick={handleStop}
            className={`flex-1 rounded-full p-3 w-full text-lg ${
              !isActive
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            }`}
            disabled={!isActive}
          >
            Give up !
          </button>
        )}
      </div>
    </div>
  );
}