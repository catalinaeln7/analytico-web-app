import React from "react";
import "./FullVersionModal.css";
import { usePostHog } from "../contexts/PostHogContext";

interface Props {
  onClose: () => void;
}

const FullVersionModal: React.FC<Props> = ({ onClose }) => {
  const posthog = usePostHog();

  const handleStartTrial = (e: React.FormEvent) => {
    e.preventDefault();

    // Track analytics event
    posthog.capture("start_free_trial_button_clicked");

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
