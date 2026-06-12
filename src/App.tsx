import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import Navbar from "./components/navbar/Navbar.tsx";
import { Context } from "./hooks/Context.tsx";
import { useEffect, useState } from "react";
import Footer from "./components/footer/Footer.tsx";
export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 550) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="">
      <Context.Provider value={{scrolled, setScrolled}}>
        <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
        <Footer />
      </Context.Provider>
    </div>
  );
}
