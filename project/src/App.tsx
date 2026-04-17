import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
//import ArtStudio from "./pages/ArtStudio";
//import ArtStudioIntro from "./pages/ArtStudioPlay"; 

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
// import ArtStudioInfo from "./pages/ArtStudioInfo";


// Playing Phase
import AlphabetPlay from "./pages/AlphabetPlay";
import NumberCountingPlay from "./pages/NumberCountingPlay";
import ColorMatchPlay from "./pages/ColorMatchPlay";

// import ArtStudioPlay from "./pages/ArtStudioPlay";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/games/art-info" element={<ArtStudioInfo />} />  
      <Route path="/games/art/learning-info" element={<ArtLearningPhase />} />
      <Route path="/games/art/drawing-info" element={<ArtStudioPlay />} /> */}
      
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
       
      {/* Playing Phase pages*/}
      <Route path="/games/alphabet/play" element={<AlphabetPlay />} />
      <Route path="/games/numbercounting/play" element={<NumberCountingPlay />} />
      <Route path="/games/colors/play" element={<ColorMatchPlay />} />
      
      {/* <Route path="/games/math-quiz" element={<MathQuiz />} /> */}
    </Routes>
  );
}

export default App;