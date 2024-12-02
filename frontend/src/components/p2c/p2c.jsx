// import { useState } from "react";
// import P2CChallengeCard from "../p2cchallengecard";
// export default function P2C() {
//   const [status, setStatus] = useState("registration");

//   return (
//     <div className="scroll-auto h-[78vh] overflow-y-auto scrollbar-hide">
//       <p className="text-2xl font-bold p-4">P2C</p>

//       <div className="flex flex-col gap-2 my-10 px-4">
//         <p className="text-2xl font-bold">All Challenges</p>
//         <P2CChallengeCard />
//         <P2CChallengeCard />
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import axios from "axios";
import P2CChallengeCard from "../p2cchallengecard";

export default function P2C() {
  const [challenges, setChallenges] = useState([]); // State to store challenges
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  // Fetch challenges from the API
  const fetchChallenges = async () => {
    try {
      const response = await axios.get("http://localhost:3001/p2cchallenges");
      setChallenges(response.data); // Assume API returns an array of challenges
    } catch (err) {
      console.error("Error fetching challenges:", err);
      setError("Failed to load challenges.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChallenges(); // Fetch challenges on component mount
  }, []);

  console.log(challenges);

  return (
    <div className="scroll-auto h-[78vh] overflow-y-auto scrollbar-hide">
      <p className="text-2xl font-bold p-4">P2C</p>

      <div className="flex flex-col gap-2 my-10 px-4">
        <p className="text-2xl font-bold">All Challenges</p>

        {/* Show loading, error, or challenge cards */}
        {loading ? (
          <p className="text-white">Loading challenges...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : challenges.length > 0 ? (
          challenges.map((challenge) => (
            <P2CChallengeCard key={challenge._id} challenge={challenge} />
          ))
        ) : (
          <p className="text-white">No challenges available.</p>
        )}
      </div>
    </div>
  );
}
