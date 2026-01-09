import React, { useState } from "react";
import "./Navbar.css";
import FullVersionModal from "./FullVersionModal";

const Navbar: React.FC = () => {
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
