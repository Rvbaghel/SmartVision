import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
//import ArtStudio from "./pages/ArtStudio";
//import ArtStudioIntro from "./pages/ArtStudioPlay"; 
import ShapeHunterInfo from "./pages/ShapeHunterInfo";
import SignMasterInfo from "./pages/SignMasterInfo";
import AlphabetAdventureInfo from "./pages/AlphabetAdventureInfo";
import ColorMatchInfo from "./pages/ColorMatchInfo";
import AnimalSoundInfo from "./pages/AnimalSoundInfo";
import MemoryMatchInfo from "./pages/MemoryMatchInfo";
import NumberCountingInfo from "./pages/NumberCountingInfo";
// import ArtStudioInfo from "./pages/ArtStudioInfo";
// import ArtLearningPhase from "./pages/ArtLearningPhase";
// import ArtStudioPlay from "./pages/ArtStudioPlay";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/games/art-info" element={<ArtStudioInfo />} />  
      <Route path="/games/art/learning-info" element={<ArtLearningPhase />} />
      <Route path="/games/art/drawing-info" element={<ArtStudioPlay />} /> */}
      
      {/* 2. Add this route to match your URL */}
      <Route path="/games/shape/info" element={<ShapeHunterInfo />} />
      <Route path="/games/numbercounting/info" element={<NumberCountingInfo />} />
      <Route path="/games/animal/info" element={<AnimalSoundInfo />} />
      <Route path="/games/memory/info" element={<MemoryMatchInfo />} />
      <Route path="/games/alphabet/info" element={<AlphabetAdventureInfo />} />
      
      <Route path="/games/road-signs-info" element={<SignMasterInfo />} />
      <Route path="/games/colors/info" element={<ColorMatchInfo />} />
      
      {/* You can add your other games here later */}
      {/* <Route path="/games/math-quiz" element={<MathQuiz />} /> */}
    </Routes>
  );
}

export default App;