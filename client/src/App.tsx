import { useEffect, useState } from "react";
import Navbar from "./components/util/Navbar";
import Home from "./components/pages/Home";
import { Route, Routes } from "react-router-dom";
import JoinRoom from "./components/pages/join_page/Join";
import LoginRedirect from "./components/pages/LoginRedirect";
import RoomNotFound from "./components/pages/RoomNotFound";
import Room from "./components/pages/game_pages/Room";

function App() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.body.className = theme;
    document.body.style.backgroundColor = "rgba(var(--dark-background))";
    // document.body.style.backgroundColor = "rgba(var(--text))"; // for debug
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
        <Route path="/room-not-found" element={<RoomNotFound />} />

        <Route path="/room" element={<Room />} />
      </Routes>
    </>
  );
}

export default App;
