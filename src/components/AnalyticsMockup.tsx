import React, { useState, useEffect, useRef } from "react";
import "./AnalyticsMockup.css";

const cannedResponsesMap: { [key: string]: string } = {
  "What should I produce more next week?": `Here are the products to increase production:
🍫 Chocolate Cake 📈 High demand
🧁 Muffins 🔥 Trending
🥐 Croissants 📈 Slight increase expected`,
  
  "What should I reduce production for?": `You might want to reduce production for:
🍋 Lemon Tart ⚠️ Risk of overproduction
🍏 Apple Pie 📉 Low demand
🥧 Carrot Cake ⚠️ Risk of spoilage`,
  
  "Weekend vs weekday comparison?": `Here's the comparison:
📅 Weekdays: 🥐 Croissants & 🍩 Donuts sell more
🌙 Weekend: 🍫 Chocolate Cake & 🧁 Muffins are popular`
};


interface Recommendation {
  product: string;
  trend?: string;
  risk?: string;
}

const AnalyticsMockup: React.FC = () => {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fileName, setFileName] = useState("");
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [businessData, setBusinessData] = useState<{ type: string; location: string } | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];

    setFileName(file.name);
    setMessages([{ role: "assistant", text: "Analyzing your data..." }]);

    setTimeout(() => {
      setFileUploaded(true);
      setBusinessData({ type: "Bakery", location: "Bucharest" });

      setRecommendations([
        { product: "🍫 Chocolate Cake", trend: "📈 +18%" },
        { product: "🍋 Lemon Tart", risk: "Overproduction" },
        { product: "🍏 Apple Pie", trend: "📉 -12%" },
      ]);

      setMessages([{ role: "assistant", text: "✅ Your data is ready! Ask me anything." }]);
    }, 1200);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const randomResponse = cannedResponses[Math.floor(Math.random() * cannedResponses.length)];

    setMessages((prev) => [
      ...prev,
      { role: "user", text: input },
      { role: "assistant", text: randomResponse },
    ]);

    setInput("");
  };

  const handleQuickAction = (text: string) => {
  const response = cannedResponsesMap[text] || "Here's what I found:";
  setMessages((prev) => [
    ...prev,
    { role: "user", text },
    { role: "assistant", text: response },
  ]);
};

  return (
    <div className="mockup-wrapper">

      {/* LEFT – Upload + Recommendations */}
      <div className="mockup-left">
        <div className={`upload-section ${fileUploaded ? "small" : ""}`}>
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
              <p className="file-success">✅ {fileName} uploaded</p>
            )}
          </div>

          {/* Recommendations Panel */}
          {fileUploaded && (
            <div className="recommendations-panel-left">
              <h4>Next Week Predictions</h4>
              {recommendations.map((rec, idx) => (
                <div key={idx} className="rec-item">
                  <span>{rec.product}</span>
                  {rec.trend && <span>Trend {rec.trend}</span>}
                  {rec.risk && <span>⚠️ {rec.risk}</span>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT – Chat + Quick Actions */}
      <div className="mockup-right">

        {/* Business Context */}
        {businessData && (
          <div className="business-banner">
            <strong>Business type:</strong> {businessData.type} | <strong>Location:</strong> {businessData.location}
          </div>
        )}

        {/* Quick Actions */}
        {fileUploaded && (
          <div className="quick-actions">
            <button onClick={() => handleQuickAction("What should I produce more next week?")}>What to produce more?</button>
            <button onClick={() => handleQuickAction("What should I reduce production for?")}>What to reduce?</button>
            <button onClick={() => handleQuickAction("Weekend vs weekday comparison?")}>Weekend vs weekday?</button>
          </div>
        )}

        {/* Chat Window */}
        <div className="chat-window">
          {messages.length === 0 && (
            <div className="chat-message system">
              👋 Upload your data to start asking questions.
            </div>
          )}

          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`chat-message ${msg.role === "user" ? "user" : msg.role === "assistant" ? "assistant" : "system"}`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={chatEndRef} />

          <div className="chat-input">
            <input
              type="text"
              placeholder={fileUploaded ? "Ask a question about your data..." : "Upload data to enable chat"}
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
