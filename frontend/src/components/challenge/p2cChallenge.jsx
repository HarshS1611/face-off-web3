import { useState , useEffect} from "react";
import { useParams } from "react-router-dom";

// import { generateCreateP2CChallengeTx, generateResolveP2CChallengeTx, sendRawTransaction } from "../../blockchain/main";

import { generateApproveTx, generateCreateP2CChallengeTx, generateResolveP2CChallengeTx, sendRawTransaction } from "../../blockchain/main";

export default function P2CChallenge() {
  const { id } = useParams(); // Get the dynamic id from the URL
  console.log("Challenge ID:", id); // Log the id to the console

  const authToken = localStorage.getItem("authToken"); // Get auth token from localStorage
  // console.log(authToken, "nepali auth");

  const [challengeData, setChallengeData] = useState({
    amount: 0,
    category: "",
    challengeName: "",
    target: "",
    targetType: "",
  });

  const handleJoin = async () => {
    console.log("Joining the challenge");
    const createP2CChallengeTx = generateCreateP2CChallengeTx(
      "0x51A41370827366087f7861d350781c790d937F16"
    );

    await sendRawTransaction(createP2CChallengeTx, authToken);
  };

  const handleDone = async () => {
    console.log("resolving the challenge");

    
      const resolveP2CChallengeTx = generateResolveP2CChallengeTx(
        "0x51A41370827366087f7861d350781c790d937F16",
        4
      );
  
      await sendRawTransaction(resolveP2CChallengeTx, authToken);
    
    
  };

  useEffect(() => {
    // Fetch challenge data from the API based on the ID
    fetch(`http://localhost:3001/p2c/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Challenge Data:", data); // Log the response
        setChallengeData({
          amount: data.amount,
          category: data.category,
          challengeName: data.challengeName,
          target: data.target,
          targetType: data.targetType,
        });
      })
      .catch((error) => {
        console.error("Error fetching challenge data:", error);
      });
  }, [id]); // The effect will run when the `id` changes

  useEffect(() => {
    console.log("Updated Challenge Data:", challengeData);
  }, [challengeData]);

  return (
    <div className="scroll-auto h-[74vh] overflow-y-auto scrollbar-hide">
      <div className="flex flex-col gap-4 px-4">
        {/* Challenge Info */}
        <div className="relative bg-[#4d4d4d] border-2 border-[#3E3E3E] w-full h-full rounded-lg">
          <img
            src="/running.png"
            alt={challengeData.category || "Challenge"}
            className="w-full h-52 object-cover"
          />
          <p className="text-xl font-bold my-1 mx-5">{challengeData.challengeName || "Challenge Name"}</p>
          <div>
            <p className="p-6 text-lg font-bold text-white">About the challenge</p>
            <p className="px-6 text-base font-normal text-white">
              This challenge is a{" "}
              <span className="font-semibold">{challengeData.category || "general"}</span> challenge, where participants
              aim to achieve the target of <span className="font-semibold">{challengeData.target || "N/A"} {challengeData.targetType || ""}</span>.
              Compete and test your skills to earn the reward!
            </p>
          </div>
          <div className="flex justify-between px-2">
            <div className="flex flex-col gap-2 my-10 px-4">
              <p className="text-lg font-bold">Target:</p>
              <p className="text-sm font-medium">
                {challengeData.target || "0"} {challengeData.targetType || ""}
              </p>
            </div>
            <div className="flex flex-col gap-2 my-10 px-4">
              <p className="text-lg font-bold">Reward:</p>
              <p className="text-sm font-medium">{challengeData.amount || "0"} ETH</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <button
          onClick={handleJoin}
          className="bg-white text-black rounded-full p-3 text-lg"
        >
          Join Now
        </button>
      </div>
    </div>
  );
}
