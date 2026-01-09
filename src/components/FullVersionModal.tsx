import React, { useState } from "react";
import "./FullVersionModal.css";

interface Props {
  onClose: () => void;
}

const FullVersionModal: React.FC<Props> = ({ onClose }) => {

  const handleStartTrial = (e: React.FormEvent) => {
    e.preventDefault();

    // 🔴 FAKE PAYMENT INTENT / VALIDATION SIGNAL
    console.log("User clicked Start Free Trial");
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {
          <>
            <h2>🚀 Try Analytico – Full Version</h2>

            <ul style={{ margin: "16px 0", textAlign: "left" }}>
              <li>✅ Free trial: upload up to <b>3 files</b></li>
              <li>💵 Then <b>$0.50 per uploaded file</b></li>
            </ul>

            <form onSubmit={handleStartTrial}>
              <button type="submit">
                Start free trial
              </button>
            </form>
          </>
        }
      </div>
    </div>
  );
};

export default FullVersionModal;
