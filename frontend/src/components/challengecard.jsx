import React from "react";

export default function ChallengeCard({ challenge }) {
  return (
    <div className="my-4">
      <div
        onClick={() => (window.location.href = `/challenge/${challenge._id}`)} // Redirect with challenge ID
        className="relative cursor-pointer hover:bg-gray-900 bg-[#282828] border-2 border-[#3E3E3E] w-full h-full rounded-lg px-5"
      >
        <div>
          <div className="flex justify-center items-center">
            <h3 className="flex w-full pt-4 pb-2 text-xl font-thunder tracking-wide font-bold text-white">
              {challenge.challengeName}
            </h3>
            <p className="bg-[#E9C500] dm-mono-regular bg-opacity-40 text-xs mt-2 font-medium text-[#F0CA00] px-3 py-1 rounded-md">
              {challenge.status || "Active"}
            </p>
          </div>
          <p className="text-white text-sm py-1">{challenge.category}</p>
        </div>
        <div className="bg-slate-400 w-full h-[0.5px] my-2"></div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-y-3">
            <h5 className="text-base text-white/90">Target</h5>
            <p className="text-white text-sm">
              {challenge.target} {challenge.targetType}
            </p>
          </div>
          <div className="flex flex-col gap-y-3">
            <h5 className="text-base text-white/90">Min. Amount</h5>
            <p className="text-white text-sm">{challenge.amount} SOL</p>
          </div>
        </div>
      </div>
    </div>
  );
}
