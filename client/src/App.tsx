import { useEffect, useState } from "react";
import Navbar from "./components/util/Navbar";
import Home from "./components/pages/Home";
import { Route, Routes } from "react-router-dom";
import JoinRoom from "./components/pages/Join";
import LoginRedirect from "./components/pages/LoginRedirect";

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
            </>
          }
        />

        <Route path="/join" element={<JoinRoom />} />
        <Route path="/redirect" element={<LoginRedirect />} />
      </Routes>
    </>
  );
}

export default App;
