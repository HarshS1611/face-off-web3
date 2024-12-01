
import ProfileImg from '../../assets/profile.webp';
export default function Profile() {
    return (
        <div className="px-4 scroll-auto h-[80vh] overflow-y-auto scrollbar-hide">
            <p className="text-2xl font-bold">Profile</p>

            <div className='flex my-3 justify-center'>
                <img src={ProfileImg} alt="profile" className="rounded-full w-40 h-40" />
            </div>
            <div className='flex my-3 text-lg justify-center'>Wallet Address: 0x23...232</div>
            <div className='flex my-3 justify-center'>Username: John Doe</div>
            <div className='flex my-3 justify-center'>Token Balance: 120</div>
            <div className="flex gap-5 my-10 px-4">
                <a
                    href={"/"}
                    className="relative bg-[#282828] border-2 border-[#3E3E3E] w-full h-full   rounded-lg"
                >
                    <div className="flex w-full py-6 text-lg font-thunder tracking-widest font-bold text-white items-center justify-center gap-5">
                    Challenges Joined
                    </div>
                </a>
                <a
                    href={"/"}
                    className="relative bg-[#282828] border-2 border-[#3E3E3E] w-full h-full   rounded-lg"
                >
                    <div className="flex w-full py-6 text-lg font-thunder tracking-widest font-bold text-white items-center justify-center gap-5">
                    Challenges Hosted
                    </div>
                </a>
            </div>
            <div className="flex flex-col gap-2 my-10 px-4">
                <p className="text-2xl font-bold">General Settings</p>
                <div>
                    <div
                   
                        className="relative bg-[#282828] border-2 border-[#3E3E3E] w- h-full   rounded-lg"
                    >
                        <div>
                            
                            <div className="flex w-full py-6 text-xl font-thunder tracking-widest font-bold text-white items-center justify-center gap-5">
                                test activity
                            </div>
                        </div>
                    </div>
                </div>
                </div>
        </div>
    )
}