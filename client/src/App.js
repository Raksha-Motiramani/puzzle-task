// import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes , redirect  } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import Footer from './components/Footer';
import Mainpage from './pages/Mainpage'
import Game from './components/Game';
import Gamepage from './components/Gamepage';
import Leaderboard from './components/LeaderBoard';

function App() {

  return (
    <Router>
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/MainPage" element={<Mainpage /> }/>
        <Route path="/Game" element={<Game/>} />
        <Route path="/gameover" element={<Gamepage/>} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
      <Footer/>
    </div>
  </Router>
   
  );
}

export default App;
