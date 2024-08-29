import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CatchGame from "./pages/CatchGame";
import SoundGame from "./pages/SoundGame";

const Providers = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catchgame" element={<CatchGame />} />
          <Route path="/soundgame" element={<SoundGame />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Providers;
