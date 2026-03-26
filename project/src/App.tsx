import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ArtStudio from "./pages/ArtStudio";
import ArtStudioIntro from "./pages/ArtStudioIntro"; // 1. Import your new file

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/games/drawing-challenge" element={<ArtStudioIntro />} />  
      {/* 2. Add this route to match your URL */}
      <Route path="/games/drawing-challenge/play" element={<ArtStudio />} />
      
      {/* You can add your other games here later */}
      {/* <Route path="/games/math-quiz" element={<MathQuiz />} /> */}
    </Routes>
  );
}

export default App;