import React, { useState } from "react";
import "./JoinWaitlistModal.css";

interface Props {
  onClose: () => void;
}

const JoinWaitlistModal: React.FC<Props> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        {!submitted ? (
          <>
            <h2>Join the Waitlist</h2>
            <p>Enter your email to be notified when Analytico launches.</p>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">Submit</button>
            </form>
          </>
        ) : (
          <>
            <h2>Thank you! 🎉</h2>
            <p>We'll notify you when Analytico is ready.</p>
            <button onClick={onClose}>Close</button>
          </>
        )}
      </div>
    </div>
  );
};

export default JoinWaitlistModal;
