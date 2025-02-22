import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home/index'
import Detail from "./pages/detail";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={`/detail/:id`} element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;