import React, { useState } from "react";
import "./FullVersionModal.css";

interface Props {
  onClose: () => void;
}

const FullVersionModal: React.FC<Props> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [startedTrial, setStartedTrial] = useState(false);
  const [trialClicks, setTrialClicks] = useState<number>(
    Number(localStorage.getItem("trialClicks") || 0)
  );

  const handleStartTrial = (e: React.FormEvent) => {
    e.preventDefault();

    const newCount = trialClicks + 1;
    localStorage.setItem("trialClicks", String(newCount));
    setTrialClicks(trialClicks);

    console.log("User clicked Start Free Trial", email);

    setStartedTrial(true);
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
            <p style={{ fontSize: "12px", color: "#ffffff", marginTop: "12px", marginBottom:"0px" }}>
              “Start free trial” was clicked {trialClicks} times
            </p>
          </>
        }
      </div>
    </div>
  );
};

export default FullVersionModal;
