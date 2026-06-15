import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.tsx";
import Footer from "./components/footer/Footer.tsx";
import HomePage from "./pages/HomePage.tsx";

export default function App() {
  return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        <Footer />
      </div>
  );
}
