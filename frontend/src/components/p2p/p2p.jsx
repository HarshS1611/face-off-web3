import { useState, useEffect } from "react";
import ModalChallenge from "./ModalChallenge";
import ChallengeCard from "../challengecard";
import axios from "axios";

export default function P2P() {
  const authToken = localStorage.getItem("authToken"); // Get auth token from localStorage
  console.log(authToken, "nepali auth");
  const [status, setStatus] = useState("registration");
  const [openModal, setOpenModal] = useState(false);
  const [challenges, setChallenges] = useState([]); // State to store fetched challenges
  const [loading, setLoading] = useState(true); // Loading state

  // Handle opening and closing modal
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  // Fetch challenges from the backend
  const fetchChallenges = async () => {
    try {
      const response = await axios.get("http://localhost:3001/challenges", {
        headers: {
          Authorization: `Bearer ${authToken}`, // Include auth token if required
        },
      });
      setChallenges(response.data); // Assume API returns an array of challenges
      setLoading(false);
    } catch (error) {
      console.error("Error fetching challenges:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChallenges(); // Fetch challenges when the component mounts
  }, []);

  return (
    <div className="scroll-auto h-[74vh] overflow-y-auto scrollbar-hide">
      <p className="text-2xl font-bold p-4">P2P</p>

      {/* Input for Invite Code */}
      <div className="flex justify-center">
        <div
          className="text-center bg-[#282828] border-2 border-[#3E3E3E] w-full mx-5 h-full rounded-lg inline-flex items-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-[--background] text-[--muted-foreground] px-4 py-4 justify-start text-sm font-normal shadow-none"
          type="button"
        >
          <input
            placeholder="Enter Invite Code"
            className="text-white outline-none w-full bg-transparent"
          ></input>
          <div className="flex w-full justify-end">
            <button className="text-black bg-white  rounded-full px-4  p-1 text-xs">
              Join
            </button>
          </div>
        </div>
      </div>

      {/* Links for My Sidebets and Challenges */}
      <div className="flex gap-5 my-10 px-4">
        <a
          href={"/"}
          className="relative bg-[#282828] border-2 border-[#3E3E3E] w-full h-full rounded-lg"
        >
          <div className="flex w-full py-6 text-lg font-thunder tracking-widest font-bold text-white items-center justify-center gap-5">
            My Sidebets
          </div>
        </a>
        <a
          href={"/"}
          className="relative bg-[#282828] border-2 border-[#3E3E3E] w-full h-full rounded-lg"
        >
          <div className="flex w-full py-6 text-lg font-thunder tracking-widest font-bold text-white items-center justify-center gap-5">
            My Challenges
          </div>
        </a>
      </div>

      {/* Display Challenges */}
      <div className="flex flex-col gap-2 my-10 px-4">
        <p className="text-2xl font-bold">Trending Now</p>
        {loading ? (
          <p className="text-center text-white">Loading challenges...</p>
        ) : challenges.length > 0 ? (
          challenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))
        ) : (
          <p className="text-center text-white">No challenges available.</p>
        )}
      </div>

      {/* Create Button to open Modal */}
      <div className="absolute bottom-20 right-[36%]">
        <button
          onClick={handleOpen}
          className="bg-black rounded-full p-4 text-xl font-bold px-6"
        >
          Create
        </button>
      </div>

      {/* Modal for Creating a Challenge */}
      <ModalChallenge open={openModal} handleClose={handleClose} />
    </div>
  );
}
