import React, { useState } from 'react';
// import BitcoinImage from "../../assets/bitcoin3.jpg";
// import SmartwatchImage from "../../assets/smartwatch.jpg";
import BitcoinImage from "../../assets/dollar.svg";
import SmartwatchImage from "../../assets/smartw.svg";

const Home = () => {
  // Example total tokens earned
  const [totalTokens, setTotalTokens] = useState(200);

  // Determine the color and progress based on totalTokens
  const getLevelDetails = (tokens) => {
    if (tokens < 500) {
      return { color: 'bg-gradient-to-r from-yellow-700 to-amber-800', progress: (tokens / 500) * 100 };
    } else if (tokens < 1000) {
      return { color: 'bg-gradient-to-r from-gray-500 to-gray-300', progress: ((tokens - 500) / 500) * 100 };
    } else if (tokens < 1500) {
      return { color: 'bg-gradient-to-r from-yellow-600 to-yellow-500', progress: ((tokens - 1000) / 500) * 100 };
    } else {
      return { color: 'bg-gradient-to-r from-purple-600 to-blue-700', progress: 100 };
    }
  };

  const { color, progress } = getLevelDetails(totalTokens);

  return (
    <div className="space-y-6 p-6">
      {/* Total Tokens Earned Component */}
      <div className={`p-6 rounded-lg ${color} text-white flex items-center space-x-6`}>
        <div className="flex-shrink-0">
          <img src={BitcoinImage} alt="Bitcoin" className="w-12 h-12" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold">Total Tokens Earned</h3>
          <p className="mt-2">{totalTokens} Tokens</p>
          <div className="mt-4">
            <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
              <div
                style={{ width: `${progress}%` }}
                className={`bg-gradient-to-r from-green-400 to-blue-500 h-full`}
              ></div>
            </div>
            <p className="mt-2 text-sm">{Math.round(progress)}% to next level</p>
          </div>
        </div>
      </div>

      {/* Connect with a Wearable Component */}
      <div className="flex flex-col justify-between bg-gray-100 p-6 rounded-lg text-black">
        {/* First row: "Coming Soon" aligned to the right */}
        <div className='flex justify-end'>
            <div className=" bg-[#297FFF26] text-black font-semibold px-4 py-2 rounded-lg w-max text-sm">
                Coming Soon
            </div>
        </div>

        {/* Second row: Smartwatch on the left, text on the right */}
        <div className="flex items-center space-x-6 mt-4 justify-center w-full">
          <div className="flex-shrink-0">
            <img
              src={SmartwatchImage}
              alt="Smartwatch"
              className="w-24 h-24 object-cover rounded-lg"
            />
          </div>
          <div className="flex-grow">
            <h6 className="text-lg font-semibold">Connect with a Smartwatch or any other wearable</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
