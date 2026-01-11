import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import AnalyticsMockup from "./components/AnalyticsMockup";
import Home from "./components/Home"; // landing simplu
import "./App.css";
import { PostHogProvider, usePostHog } from "./contexts/PostHogContext";

const AppContent: React.FC = () => {
  const [page, setPage] = useState<"home" | "demo">("home");
  const posthog = usePostHog();

  // Track page views for funnels
  useEffect(() => {
    if (page === "home") {
      posthog.capture("$pageview", {
        page: "homepage",
      });
    } else if (page === "demo") {
      posthog.capture("$pageview", {
        page: "demo",
      });
    }
  }, [page, posthog]);

  return (
    <div className="app">
      <Navbar onNavigate={setPage} />

      {page === "home" && <Home />}
      {page === "demo" && <AnalyticsMockup />}
    </div>
  );
};

const App: React.FC = () => {
  const apiKey = import.meta.env.VITE_POSTHOG_KEY || "phc_KFn9NxtStsiJ72KG53oNqWd9riHT5ebEibLAAftf9I3";
  const host = import.meta.env.VITE_POSTHOG_HOST || "https://eu.i.posthog.com";

  return (
    <PostHogProvider apiKey={apiKey} options={{ host }}>
      <AppContent />
    </PostHogProvider>
  );
};

export default App;
