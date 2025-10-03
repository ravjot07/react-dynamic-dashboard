import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";

export default function App() {
  const [activeCat, setActiveCat] = useState(null);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar activeCat={activeCat} setActiveCat={setActiveCat} />

      <div style={{ flex: 1 }}>
        <header
          style={{
            background: "#fff",
            padding: "12px 20px",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h1 style={{ fontWeight: "bold" }}>CNAPP Dashboard</h1>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              style={{
                background: "#4f46e5",
                color: "#fff",
                padding: "6px 12px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
              }}
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
