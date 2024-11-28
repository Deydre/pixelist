import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from './Home';
import SignUp from './SignUp';
import Login from './Login';
import Profile from './Profile';
import Category from './Category';
import Game from './Game';


const Main = () => {
  return <main>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/login' element={<Login />} />
      <Route path='/profile/:username' element={<Profile />} />
      <Route path='/categories/:category' element={<Category />} />
      <Route path='/games/:game' element={<Game />} />
      <Route path='/*' element={<Home />} />
    </Routes>
  </main>;
};

export default Main;
