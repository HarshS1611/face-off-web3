import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/navbar";
import { useState } from "react";
import { OktoProvider, BuildType } from "okto-sdk-react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Profile from "./components/profile/profile";
import Footer from "./components/footer";
import P2P from "./components/p2p/p2p";
import P2C from "./components/p2c/p2c";
import Home from "./components/home/home";
import Challenge from "./components/challenge/challenge";
import LoginPage from "./components/login/login";
import P2CChallenge from "./components/challenge/p2cChallenge";
const OKTO_CLIENT_API_KEY = "19b94bbc-afd1-45c7-98d1-08fe9eed550f";

function App() {
  const [authToken, setAuthToken] = useState(null);
  const handleLogout = () => {
    console.log("setting auth token to null");
    setAuthToken(null); // Clear the authToken
  };
  return (
    <div className="flex w-full  bg-black  justify-center">
      <div className=" h-screen w-full bg-[#282828] text-white md:w-[550px] shadow-xl">
        <Navbar />
        <Router>
          <OktoProvider
            apiKey={OKTO_CLIENT_API_KEY}
            buildType={BuildType.SANDBOX}
          >
            <Routes>
              <Route
                path="/login"
                element={
                  <LoginPage
                    setAuthToken={setAuthToken}
                    authToken={authToken}
                  />
                }
              />
              <Route path="/" element={<Home />} />
              <Route path="/p2p" element={<P2P />} />
              <Route path="/p2c" element={<P2C />} />
              <Route
                path="/profile"
                element={<Profile />}
              />
              {/* <Route path="/challenge" element={<Challenge />} /> */}
              <Route path="/challenge/:id" element={<Challenge />} />
              <Route path="/p2cchallenge" element={<P2CChallenge />} />
            </Routes>
          </OktoProvider>
        </Router>
        <Footer />
      </div>
    </div>
  );
}

export default App;
