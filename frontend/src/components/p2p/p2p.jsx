import { useState } from "react";
export default function P2P() {
  const [status, setStatus] = useState("registration");
  return (
    <div>
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

      <div className="flex gap-2 my-10 px-4">
        <a
          href={"/"}
          className="relative bg-[#282828] border-2 border-[#3E3E3E] w-full h-full   rounded-lg"
        >
          <div className="flex w-full py-6 text-xl font-thunder tracking-widest font-bold text-white items-center justify-center gap-5">
            My Sidebets
          </div>
        </a>
        <a
          href={"/"}
          className="relative bg-[#282828] border-2 border-[#3E3E3E] w-full h-full   rounded-lg"
        >
          <div className="flex w-full py-6 text-xl font-thunder tracking-widest font-bold text-white items-center justify-center gap-5">
            My Challenges
          </div>
        </a>
      </div>

      <div className="flex flex-col gap-2 my-10 px-4">
        <p className="text-2xl font-bold">Trending Now</p>
        <div>
          <div
            href={"/"}
            className="relative bg-[#282828] border-2 border-[#3E3E3E] w- h-full   rounded-lg"
          >
            <div>
              <span className="m-4 bg-[#E9C500] dm-mono-regular bg-opacity-40 text-xs mt-2 font-medium text-[#F0CA00] px-3 py-1 rounded-md">
                Ongoing
              </span>
              <div className="flex w-full py-6 text-xl font-thunder tracking-widest font-bold text-white items-center justify-center gap-5">
                test activity
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-20 right-2 md:right-[36%]">
        <button className="bg-black rounded-full p-4 text-md md:text-xl font-bold px-6">
          Create
        </button>
      </div>
    </div>
  );
}
