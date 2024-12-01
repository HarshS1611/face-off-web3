import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Explore from './components/home/explore';
import Feed from './components/feed/feed';
import Profile from './components/profile/profile';
import Footer from './components/footer';

function App() {
  return (
    <div className='flex w-full justify-center'>
      <div className='border h-screen w-full md:w-96 shadow-xl'>
        <Navbar/>
        <Router>
          <Routes>
            <Route path='/' element={<Explore/>}/>
            <Route path='/feed' element={<Feed/>}/>
            <Route path='/profile' element={<Profile/>}/>
          </Routes>
        </Router>
        <Footer/>
      </div>
    </div>
  );
}

export default App;
