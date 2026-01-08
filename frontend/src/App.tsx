import React from "react";
import Navbar from "./components/Navbar";
import AnalyticsMockup from "./components/AnalyticsMockup";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="app">
      <Navbar />
      <AnalyticsMockup />
      <main>
        {/* Landing page content */}
      </main>
    </div>
  );
};

export default App;
