import { useEffect, useState } from "react";
import Navbar from "./components/util/Navbar";
import Home from "./components/pages/Home";
import Footer from "./components/util/Footer";
import { Route, Routes } from "react-router-dom";
import JoinRoom from "./components/pages/Join";

function App() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.body.className = theme;
    document.body.style.backgroundColor = "rgba(var(--dark-background))";
  }, [theme]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar theme={theme} setTheme={setTheme} />
              <Home />
              <Footer />
            </>
          }
        />

        <Route path="/join" element={<JoinRoom />} />
      </Routes>
    </>
  );
}

export default App;
