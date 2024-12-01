import { useState } from "react";
import ChallengeCard from "../challengecard";
export default function P2P() {
  const [status, setStatus] = useState("registration");

  return (
    <div className="scroll-auto h-[78vh] overflow-y-auto scrollbar-hide">
      <p className="text-2xl font-bold p-4">P2C</p>

      <div className="flex flex-col gap-2 my-10 px-4">
        <p className="text-2xl font-bold">All Challenges</p>
        <ChallengeCard />
        <ChallengeCard />
      </div>
    </div>
  );
}
