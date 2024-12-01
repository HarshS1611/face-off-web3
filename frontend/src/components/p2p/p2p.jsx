import { useState } from "react";
import ModalChallenge from "./ModalChallenge";
import ChallengeCard from "../challengecard";
export default function P2P() {
  const [status, setStatus] = useState("registration");

  const [openModal, setOpenModal] = useState(false);

  // Handle opening and closing modal
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <div className="scroll-auto h-[78vh] overflow-y-auto scrollbar-hide">
      <p className="text-2xl font-bold p-4">P2P</p>
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

      <div className="flex gap-5 my-10 px-4">
        <a
          href={"/"}
          className="relative bg-[#282828] border-2 border-[#3E3E3E] w-full h-full   rounded-lg"
        >
          <div className="flex w-full py-6 text-lg font-thunder tracking-widest font-bold text-white items-center justify-center gap-5">
            My Sidebets
          </div>
        </a>
        <a
          href={"/"}
          className="relative bg-[#282828] border-2 border-[#3E3E3E] w-full h-full   rounded-lg"
        >
          <div className="flex w-full py-6 text-lg font-thunder tracking-widest font-bold text-white items-center justify-center gap-5">
            My Challenges
          </div>
        </a>
      </div>

      <div className="flex flex-col gap-2 my-10 px-4">
        <p className="text-2xl font-bold">Trending Now</p>
        <ChallengeCard />
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
      <ModalChallenge open={openModal} handleClose={handleClose} />
    </div>
  );
}
