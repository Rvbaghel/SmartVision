import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
//import ArtStudio from "./pages/ArtStudio";
//import ArtStudioIntro from "./pages/ArtStudioPlay"; 
import ScreenTimeManager from "./components/ScreenTimeManager";
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
// import ArtStudioInfo from "./pages/ArtStudioInfo";


// Playing Phase
import AlphabetPlay from "./pages/AlphabetPlay";
import NumberCountingPlay from "./pages/NumberCountingPlay";
import ColorMatchPlay from "./pages/ColorMatchPlay";
import MemoryMatchPlay from "./pages/MemoryMatchPlay";
import AnimalSoundPlay from "./pages/AnimalSoundPlay";
// import ArtStudioPlay from "./pages/ArtStudioPlay";

function App() {
  return (
    <ScreenTimeManager>
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
      <Route path="/games/memory/learning" element={<MemoryMatchLearn/>} />
      <Route path="/games/animal/learning" element={<AnimalSoundLearn/>} />
       
      {/* Playing Phase pages*/}
      <Route path="/games/alphabet/play" element={<AlphabetPlay />} />
      <Route path="/games/numbercounting/play" element={<NumberCountingPlay />} />
      <Route path="/games/colors/play" element={<ColorMatchPlay />} />
      <Route path="/games/memory/play" element={<MemoryMatchPlay />} />
      <Route path="/games/animal/play" element={<AnimalSoundPlay />} />
      
      {/* <Route path="/games/math-quiz" element={<MathQuiz />} /> */}
    </Routes>
    </ScreenTimeManager>
  );
}

export default App;