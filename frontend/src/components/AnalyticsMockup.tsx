import React, { useState, useRef, useEffect } from "react";
import "./AnalyticsMockup.css";

const cannedResponses = [
  `📅 Monday
🍫 Chocolate Cakes: 6
🥕 Carrot Cakes: 4
🍏 Apple Pies: 2

📅 Tuesday
🍫 Chocolate Cakes: 5
🍋 Lemon Tarts: 5
🥧 Apple Pies: 3

📅 Wednesday
🍫 Chocolate Éclairs: 7
🥕 Carrot Cakes: 3
🍰 Cheesecakes: 2`,

  `📅 Monday
🥐 Croissants: 4
🧁 Muffins: 6
🍫 Chocolate Cakes: 3

📅 Tuesday
🧁 Muffins: 5
🍰 Cheesecakes: 5
🍋 Lemon Tarts: 2

📅 Wednesday
🥐 Croissants: 6
🍫 Chocolate Éclairs: 4
🍫 Chocolate Brownies: 3`,

  `📅 Monday
🍰 Cheesecakes: 5
🍫 Chocolate Brownies: 4
🍋 Lemon Tarts: 3

📅 Tuesday
🍫 Chocolate Cakes: 6
🥕 Carrot Cakes: 4
🧁 Muffins: 2

📅 Wednesday
🥐 Croissants: 7
🍫 Chocolate Éclairs: 3
🍏 Apple Pies: 2`,

  `📅 Monday
🍩 Cinnamon Rolls: 6
🧁 Chocolate Muffins: 4
🍋 Lemon Tarts: 3

📅 Tuesday
🍫 Chocolate Brownies: 5
🍫 Chocolate Éclairs: 5
🥕 Carrot Cakes: 2

📅 Wednesday
🥐 Croissants: 8
🍰 Cheesecakes: 3
🍫 Chocolate Cakes: 2`,

  `📅 Monday
🧁 Chocolate Muffins: 4
🥕 Carrot Cakes: 5
🍏 Apple Pies: 3

📅 Tuesday
🍫 Chocolate Cakes: 6
🍋 Lemon Tarts: 4
🍫 Brownies: 2

📅 Wednesday
🥐 Croissants: 5
🍫 Chocolate Éclairs: 4
🍰 Cheesecakes: 3`
];

const AnalyticsMockup: React.FC = () => {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fileName, setFileName] = useState("");
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  // ref for auto-scroll
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
      setMessages([{ role: "assistant", text: "Analyzing your data..." }]);

      setTimeout(() => {
        setFileUploaded(true);
        setMessages([{ role: "assistant", text: "✅ Your data is ready! Ask me anything." }]);
      }, 1200);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const randomResponse =
      cannedResponses[Math.floor(Math.random() * cannedResponses.length)];

    setMessages(prev => [
      ...prev,
      { role: "user", text: input },
      { role: "assistant", text: randomResponse },
    ]);
    setInput("");
  };

  return (
    <div className="mockup-wrapper">

      {/* LEFT – Upload */}
      <div className="mockup-left">        
        <div className="upload-card">
          <h3>📊 Upload your sales data</h3>

          {!fileUploaded ? (
            <>
              <input
                type="file"
                accept=".csv,.xlsx"
                id="file-upload"
                hidden
                onChange={handleFileUpload}
              />
              <label htmlFor="file-upload" className="upload-button">
                Upload file
              </label>
              <span className="upload-hint">.xlsx, .csv supported</span>
            </>
          ) : (
            <>
              <p className="file-success">✅ {fileName} uploaded</p>
            </>
          )}
        </div>
      </div>

      {/* RIGHT – Chat */}
      <div className="mockup-right">
        <div className="chat-window">
          {messages.length === 0 && (
            <div className="chat-message system">
              👋 Upload your data to start asking questions.
            </div>
          )}

          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`chat-message ${
                msg.role === "user"
                  ? "user"
                  : msg.role === "assistant"
                  ? "assistant"
                  : "system"
              }`}
            >
              {msg.text}
            </div>
          ))}

          {/* auto-scroll anchor */}
          <div ref={messagesEndRef} />

          <div className="chat-input">
            <input
              type="text"
              placeholder={
                fileUploaded
                  ? "Ask a question about your data..."
                  : "Upload data to enable chat"
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={!fileUploaded}
            />
          </div>
        </div>
      </div>

    </div>
  );
};

export default AnalyticsMockup;
