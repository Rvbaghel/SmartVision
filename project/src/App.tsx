import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
//import ArtStudio from "./pages/ArtStudio";
//import ArtStudioIntro from "./pages/ArtStudioPlay"; 
import ShapeHunterInfo from "./pages/ShapeHunterInfo";
import SignMasterInfo from "./pages/SignMasterInfo";
import ShapeLearningPhase from "./pages/ShapeLearningPhase";
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
      <Route path="/games/shapes-info" element={<ShapeHunterInfo />} />
      <Route path="/games/shapes/learning-info" element={<ShapeLearningPhase />} />
      
      <Route path="/games/road-signs-info" element={<SignMasterInfo />} />
      
      {/* You can add your other games here later */}
      {/* <Route path="/games/math-quiz" element={<MathQuiz />} /> */}
    </Routes>
  );
}

export default App;