import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Stats from "./pages/Stats";
import Header from "./components/Header";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="p-6 max-w-4xl mx-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/code/:shortcode" element={<Stats />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
