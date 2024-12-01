import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Profile from './components/profile/profile';
import Footer from './components/footer';
import P2P from './components/p2p/p2p';
import P2C from './components/p2c/p2c';
import Home from './components/home/home';

function App() {
  return (
    <div className='flex w-full justify-center'>
      <div className='border h-screen w-full md:w-96 shadow-xl'>
        <Navbar/>
        <Router>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/p2p' element={<P2P/>}/>
            <Route path='/p2c' element={<P2C/>}/>
            <Route path='/profile' element={<Profile/>}/>
          </Routes>
        </Router>
        <Footer/>
      </div>
    </div>
  );
}

export default App;
