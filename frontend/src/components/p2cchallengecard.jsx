import React from "react";
export default function P2CChallengeCard() {
  return (
    <div className="my-4">
      <div
        onClick={() => (window.location.href = "/p2cchallenge")}
        className="relative cursor-pointer hover:bg-gray-900 bg-[#282828] border-2 border-[#3E3E3E] w-full h-full rounded-lg px-5"
      >
        <div>
          <div className="flex justify-center items-center">
            <h3 className="flex w-full pt-4 pb-2 text-xl font-thunder tracking-wide font-bold text-white">
              test activity
            </h3>
            <p className="bg-[#E9C500] dm-mono-regular bg-opacity-40 text-xs mt-2 font-medium text-[#F0CA00] px-3 py-1 rounded-md">
              Upcoming
            </p>
          </div>
          <p className="text-white text-sm py-1">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt,
            minus?
          </p>
        </div>
        <div className="bg-slate-400 w-full h-[0.5px] my-2"></div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-y-3">
            <h5 className="text-base text-white/90">Min. amt</h5>
            <p className="text-white text-sm">0.005 ETH</p>
          </div>
          <div className="flex flex-col gap-y-3">
            <h5 className="text-base text-white/90">Created by:</h5>
            <p className="text-white text-sm">User 10</p>
          </div>
          <div className="flex flex-col mb-2 gap-y-3">
            <h5 className="text-base text-white/90">Prize</h5>
            <p className="text-white text-sm">0.05 ETH</p>
          </div>
        </div>
      </div>
    </div>
  );
}