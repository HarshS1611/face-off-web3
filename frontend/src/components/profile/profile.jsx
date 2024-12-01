
import ProfileImg from "../../assets/profile.webp";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useOkto } from "okto-sdk-react";

export default function Profile () {
  const authToken = localStorage.getItem("authToken"); // Get auth token from localStorage
  console.log(authToken, "nepali auth");

  const [userDetails, setUserDetails] = useState(null);
  const [portfolioData, setPortfolioData] = useState(null);
  const [wallets, setWallets] = useState(null);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState(null);

  const fetchUserDetails = async () => {
    const options = {
      method: "GET",
      url: "https://sandbox-api.okto.tech/api/v1/user_from_token",
      headers: { Authorization: `Bearer ${authToken}` },
    };

    try {
      const { data } = await axios.request(options);
      setUserDetails(data.data);
      setActiveSection("userDetails");
    } catch (error) {
      setError(`Failed to fetch user details: ${error.message}`);
    }
  };
 const fetchPortfolio = async () => {
   const options = {
     method: "GET",
     url: "https://sandbox-api.okto.tech/api/v1/portfolio",
     headers: { Authorization: `Bearer ${authToken}` },
   };

   try {
     const { data } = await axios.request(options);
     setPortfolioData(data.data);
     console.log(data.data, "portfolio")
     setActiveSection("portfolio");
   } catch (error) {
     setError(`Failed to fetch portfolio: ${error.message}`);
   }
 };

 const fetchWallets = async () => {
   const options = {
     method: "GET",
     url: "https://sandbox-api.okto.tech/api/v1/wallet",
     headers: { Authorization: `Bearer ${authToken}` },
   };

   try {
     const { data } = await axios.request(options);
     console.log(data.data.wallets, "nepali wallets");
     setWallets(data.data.wallets);
     setActiveSection("wallets");
   } catch (error) {
     setError(`Failed to fetch wallets: ${error.message}`);
   }
 };
 const { showWidgetModal } = useOkto();
 const open = async () => {
   try {
     await showWidgetModal();
   } catch (error) {
     setError(`Failed to fetch user details: ${error.message}`);
   }
 };

 useEffect(() => {
   fetchUserDetails();
   fetchPortfolio();
   fetchWallets();
 }, []);
  const polygonWallet = wallets?.find(
    (wallet) => wallet.network_name === "POLYGON_TESTNET_AMOY"
  );

    return (
      <div className="px-4 scroll-auto h-[80vh] overflow-y-auto scrollbar-hide">
        <p className="text-2xl font-bold">Profile</p>

        <div className="flex my-3 justify-center">
          <img
            src={ProfileImg}
            alt="profile"
            className="rounded-full w-40 h-40"
          />
        </div>
        <div className="flex my-3 text-lg justify-center">
          Wallet Address:{" "}
          {polygonWallet ? polygonWallet.address : "No POLYGON wallet found"}
        </div>
        <div className="flex my-3 justify-center">
          Username:{userDetails?.email}
        </div>
        <div className="flex my-3 justify-center">
          Token Balance: {portfolioData?.tokens[0]?.quantity}
        </div>
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
            <div className="relative bg-[#282828] border-2 border-[#3E3E3E] w- h-full   rounded-lg">
              <div>
                <div className="flex w-full py-6 text-xl font-thunder tracking-widest font-bold text-white items-center justify-center gap-5">
                  test activity
                </div>
              </div>
            </div>
            <div>
              <div className="flex w-full py-6 text-xl font-thunder tracking-widest font-bold text-white items-center justify-center gap-5">
                wallet details
                <button
                  className="m-1 p-2.5 text-base cursor-pointer bg-blue-500 text-white rounded hover:bg-blue-700"
                  onClick={open}
                >
                  Okto Widget
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}