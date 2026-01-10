import React, { useState } from "react";
import Navbar from "./components/Navbar";
import AnalyticsMockup from "./components/AnalyticsMockup";
import Home from "./components/Home"; // landing simplu
import "./App.css";

const App: React.FC = () => {
  const [page, setPage] = useState<"home" | "demo">("home");

  return (
    <div className="app">
      <Navbar onNavigate={setPage} />

      {page === "home" && <Home />}
      {page === "demo" && <AnalyticsMockup />}
    </div>
  );
};

export default App;
