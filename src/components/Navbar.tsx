import React, { useState } from "react";
import "./Navbar.css";
import FullVersionModal from "./FullVersionModal";

interface NavbarProps {
  onNavigate: (page: "home" | "demo") => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <img
            src="analytico_logo.png"
            alt="Analytico logo"
            className="navbar-logo"
          />
        </div>

        <div className="navbar-right">
          <button
            className="navbar-link"
            onClick={() => onNavigate("home")}
          >
            Home
          </button>

          <button
            className="navbar-link"
            onClick={() => onNavigate("demo")}
          >
            Demo
          </button>

          <button
            className="navbar-cta"
            onClick={() => setShowModal(true)}
          >
            Try full version
          </button>
        </div>
      </nav>

      {showModal && (
        <FullVersionModal onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

export default Navbar;
