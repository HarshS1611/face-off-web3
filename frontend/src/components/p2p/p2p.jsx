
import { useState } from "react";
export default function P2P() {

    const [status, setStatus] = useState("registration");
    return (
        <div>
            <p className="text-2xl p-4">P2P</p>
            <div className="flex justify-center">
                <button
                    className="text-center bg-[#282828] border-2 border-[#3E3E3E] w-80 h-full rounded-lg inline-flex items-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50  border-[--border] bg-[--background] text-[--muted-foreground] px-4 py-4 justify-start text-sm font-normal shadow-none"
                    type="button"
                >
                    <input placeholder="Enter Invite Code" className="text-white outline-none bg-transparent"></input>

                    <div className="flex w-full justify-end">
                    <button className="text-black bg-white  rounded-full px-4  p-1 text-xs">Join</button>
                    </div>
                </button>

            </div>

            <div className="flex gap-2 my-10 px-2">
            <a
                    href={'/'}
                    className="relative bg-[#282828] border-2 border-[#3E3E3E] w-full h-full   rounded-lg"
                >
                       
                                <div className="flex w-full py-6 text-xl font-thunder tracking-widest font-bold text-white items-center justify-center gap-5">
                                  
                                        My Sidebets

                                </div>



                </a>
                <a
                    href={'/'}
                    className="relative bg-[#282828] border-2 border-[#3E3E3E] w-full h-full   rounded-lg"
                >
                       
                                <div className="flex w-full py-6 text-xl font-thunder tracking-widest font-bold text-white items-center justify-center gap-5">
                                  
                                        My Challenges

                                </div>



                </a>
            </div>
        </div>
    )
}