import { useState } from "react";
export default function Challenge() {
  return (
    <div className="scroll-auto h-[74vh] overflow-y-auto scrollbar-hide">
      <div className="flex flex-col gap-2 px-4">
        <div
          href={"/"}
          className="relative bg-[#4d4d4d] border-2 border-[#3E3E3E] w- h-full rounded-lg"
        >
          <img
            src="/running.png"
            alt="running"
            className="w-full h-52 object-cover"
          />
          <p className="text-xl font-bold my-1 mx-5">5km run</p>
          <p className="text-sm font-medium my-1 mx-5">from 2 Dec</p>

          <div>
            <p className="p-6 text-lg font-thunder font-bold text-white gap-5">
              About the challenge
            </p>
            <p className="px-6 text-base font-thunder font-normal text-white gap-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              tincidunt, nisl non pellentesque tincidunt, nunc turpis ultrices
              dolor, ac dictum odio tortor id sapien. Donec nec nunc
            </p>
          </div>
          <div className="flex justify-between px-2">
            <div className="flex flex-col gap-2 my-10 px-4">
              <p className="text-lg font-bold">Created by:</p>
              <p className="text-sm font-medium">John Doe</p>
            </div>
            <div className="flex flex-col gap-2 my-10 px-4">
              <p className="text-lg font-bold">Reward:</p>
              <p className="text-sm font-medium">0.0005ETH</p>
            </div>
          </div>
        </div>
        <button className="bg-white text-black rounded-full p-3 text-lg">
          Join Now
        </button>
      </div>
    </div>
  );
}
