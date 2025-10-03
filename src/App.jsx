import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import "./index.css";

export default function App() {
  const [activeCat, setActiveCat] = useState(null);

  return (
    <div className="app-shell">
      <Sidebar activeCat={activeCat} setActiveCat={setActiveCat} />

      <div className="main-area">
        <header className="main-header">
          <div className="logo">CNAPP</div>

          <div className="header-actions">
            <input
              className="header-search"
              placeholder="Search widgets..."
              onFocus={() => {}}
            />
            <button
              className="btn-primary"
              onClick={() =>
                window.dispatchEvent(new CustomEvent("open-add-widget"))
              }
            >
              + Add Widget
            </button>
          </div>
        </header>

        <main className="container">
          <Dashboard activeCat={activeCat} />
        </main>
      </div>
    </div>
  );
}
