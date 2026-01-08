import React, { useState } from "react";
import "./Navbar.css";
import JoinWaitlistModal from "./JoinWaitlistModal"; // import the modal

const Navbar: React.FC = () => {
  const [showModal, setShowModal] = useState(false); // modal state

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <img
            src={`${import.meta.env.BASE_URL}analytico_logo.png`}
            alt="Analytico logo"
            className="navbar-logo"
          />
        </div>

        <div className="navbar-right">
          <button
            className="navbar-cta"
            onClick={() => setShowModal(true)} // open modal
          >
            Join waitlist
          </button>
        </div>
      </nav>

      {/* Modal rendered inside Navbar */}
      {showModal && <JoinWaitlistModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default Navbar;
