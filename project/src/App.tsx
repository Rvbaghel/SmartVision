import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ArtStudio from "./pages/ArtStudio"; // 1. Import your new file

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      
      {/* 2. Add this route to match your URL */}
      <Route path="/games/drawing-challenge" element={<ArtStudio />} />
      
      {/* You can add your other games here later */}
      {/* <Route path="/games/math-quiz" element={<MathQuiz />} /> */}
    </Routes>
  );
}

export default App;