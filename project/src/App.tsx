import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ArtStudio from "./pages/ArtStudio";
import ArtStudioIntro from "./pages/ArtStudioIntro"; 
import ShapeHunterInfo from "./pages/ShapeHunterInfo";
import SignMasterInfo from "./pages/SignMasterInfo";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/games/drawing-challenge" element={<ArtStudioIntro />} />  
      {/* 2. Add this route to match your URL */}
      <Route path="/games/drawing-challenge/play" element={<ArtStudio />} />
      <Route path="/games/shapes-info" element={<ShapeHunterInfo />} />
      <Route path="/games/road-signs-info" element={<SignMasterInfo />} />
      
      {/* You can add your other games here later */}
      {/* <Route path="/games/math-quiz" element={<MathQuiz />} /> */}
    </Routes>
  );
}

export default App;