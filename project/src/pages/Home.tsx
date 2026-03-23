import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-4xl font-bold text-primary">
          Welcome to Learn & Play 🎮
        </h2>
      </div>

      <Footer />
    </>
  );
};

export default Home;