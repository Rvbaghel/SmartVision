import React, { useState, useEffect } from 'react'; // Added useState and useEffect
import { Routes, Route } from "react-router-dom";
import { getAuth } from "firebase/auth"; // Import auth to get the user email

// ... your existing imports ...



// Import all other pages...

import Home from "./pages/Home";
  
//import ArtStudio from "./pages/ArtStudio";

//import ArtStudioIntro from "./pages/ArtStudioPlay";

import ScreenTimeManager from "./Components/ScreenTimeManager";

// info pages

import ShapeHunterInfo from "./pages/ShapeHunterInfo";

import AlphabetAdventureInfo from "./pages/AlphabetAdventureInfo";

import ColorMatchInfo from "./pages/ColorMatchInfo";

import AnimalSoundInfo from "./pages/AnimalSoundInfo";

import MemoryMatchInfo from "./pages/MemoryMatchInfo";

import NumberCountingInfo from "./pages/NumberCountingInfo";



//learning pages

import AlphabetLearn from "./pages/AlphabetLearn";

import NumberCountingLearn from "./pages/NumberCountingLearn";

import ColorMatchLearn from "./pages/ColorMatchLearn";

import MemoryMatchLearn from "./pages/MemoryMatchLearn";

import AnimalSoundLearn from "./pages/AnimalSoundLearn";

import ShapeLearning from './pages/ShapeLearning';
// import ArtStudioInfo from "./pages/ArtStudioInfo";



import AdminDashboard from './Components/AdminDashboard';



// Playing Phase

import AlphabetPlay from "./pages/AlphabetPlay";

import NumberCountingPlay from "./pages/NumberCountingPlay";

import ColorMatchPlay from "./pages/ColorMatchPlay";

import MemoryMatchPlay from "./pages/MemoryMatchPlay";

import AnimalSoundPlay from "./pages/AnimalSoundPlay";

import ShapeHunterPlay from './pages/ShapeHunterPlay';

// import ArtStudioPlay from "./pages/ArtStudioPlay";

import ChildProgress from './pages/ChildProgress';

function App() {
  const [showRating, setShowRating] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;

  // 2. The Heartbeat Timer Logic
  // useEffect(() => {
  //   if (!user?.email) return;

  //   const heartbeat = setInterval(async () => {
  //     console.log("Sending heartbeat for:", user.email);
  //     try {
  //       const res = await fetch(`http://localhost:8000/api/update-usage?email=${user.email}`, {
  //         method: 'POST'
  //       });
  //       const data = await res.json();

  //       // If backend says it's time to show the popup
  //       if (data.show_rating_popup) {
  //         setShowRating(true);
  //       }
  //     } catch (err) {
  //       console.error("Heartbeat failed: Server might be down");
  //     }
  //   }, 10000); // Check every 60 seconds (1 minute)

  //   return () => clearInterval(heartbeat);
  // }, [user?.email]);

  return (
    <ScreenTimeManager>
      {/* 3. Add the Modal here - it will appear on top of any route */}
      

      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Info pages*/}
        <Route path="/games/shape/info" element={<ShapeHunterInfo />} />
        <Route path="/games/numbercounting/info" element={<NumberCountingInfo />} />
        <Route path="/games/animal/info" element={<AnimalSoundInfo />} />
        <Route path="/games/memory/info" element={<MemoryMatchInfo />} />
        <Route path="/games/alphabet/info" element={<AlphabetAdventureInfo />} />
        <Route path="/games/colors/info" element={<ColorMatchInfo />} />
        
         {/* Learning Phase Pages*/}
        <Route path="/games/alphabet/learning" element={<AlphabetLearn />} />
        <Route path="/games/numbercounting/learning" element={<NumberCountingLearn/>} />
        <Route path="/games/color/learning" element={<ColorMatchLearn/>} />
        <Route path="/games/memory/learning" element={<MemoryMatchLearn/>} />
        <Route path="/games/animal/learning" element={<AnimalSoundLearn/>} />
        <Route path="/game/shapes/learn" element={<ShapeLearning/>} />
         
        {/* Playing Phase pages*/}
        <Route path="/games/alphabet/play" element={<AlphabetPlay />} />
        <Route path="/games/shapehunter/play" element={<ShapeHunterPlay />} />
        
        <Route path="/games/numbercounting/play" element={<NumberCountingPlay />} />
        <Route path="/games/colors/play" element={<ColorMatchPlay />} />
        <Route path="/games/memory/play" element={<MemoryMatchPlay />} />
        <Route path="/games/animal/play" element={<AnimalSoundPlay />} />
        <Route path="/child-progress" element={<ChildProgress />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </ScreenTimeManager>
  );
}

export default App;