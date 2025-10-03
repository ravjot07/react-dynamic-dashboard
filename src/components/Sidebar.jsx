import React, { useState } from "react";
import { useDashboardStore } from "../store/useDashboard";

export default function Sidebar({ activeCat, setActiveCat }) {
  const categories = useDashboardStore((s) => s.categories);
  const addCategory = useDashboardStore((s) => s.addCategory);
  const removeCategory = useDashboardStore((s) => s.removeCategory);
  const renameCategory = useDashboardStore((s) => s.renameCategory);

  const [newName, setNewName] = useState("");
  const [editing, setEditing] = useState(null);
  const [editValue, setEditValue] = useState("");

  function handleAdd() {
    const name = (newName || "").trim();
    if (!name) return alert("Enter category name");
    addCategory(name);
    setNewName("");
  }

  function startRename(cat) {
    setEditing(cat.id);
    setEditValue(cat.name);
  }

  function confirmRename(catId) {
    const name = (editValue || "").trim();
    if (!name) return alert("Name cannot be empty");
    renameCategory(catId, name);
    setEditing(null);
    setEditValue("");
  }

  function handleDelete(cat) {
    const ok = window.confirm(
      `Delete category "${cat.name}" and its ${cat.widgets.length} widget(s)?`
    );
    if (!ok) return;
    removeCategory(cat.id);
    if (activeCat === cat.id) setActiveCat(null);
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="sidebar-title">Categories</div>

        <div className="sidebar-add">
          <input
            className="sidebar-input"
            placeholder="New category"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
          <button className="btn-primary small" onClick={handleAdd}>
            Add
          </button>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Categories">
        <ul>
          <li
            key="all"
            className={activeCat === null ? "cat-item active" : "cat-item"}
            onClick={() => setActiveCat(null)}
          >
            <span className="cat-name">All Categories</span>
            <span className="cat-count">
              {categories.reduce((s, c) => s + c.widgets.length, 0)}
            </span>
          </li>

          {categories.map((cat) => (
            <li
              key={cat.id}
              className={activeCat === cat.id ? "cat-item active" : "cat-item"}
            >
              <div className="cat-main" onClick={() => setActiveCat(cat.id)}>
                <span className="cat-name">{cat.name}</span>
                <span className="cat-count">{cat.widgets.length}</span>
              </div>

              <div className="cat-actions">
                {editing === cat.id ? (
                  <>
                    <input
                      className="rename-input"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && confirmRename(cat.id)
                      }
                    />
                    <button
                      className="btn-ghost"
                      onClick={() => confirmRename(cat.id)}
                    >
                      Save
                    </button>
                    <button
                      className="btn-ghost"
                      onClick={() => {
                        setEditing(null);
                        setEditValue("");
                      }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="icon-btn"
                      title="Rename"
                      onClick={() => startRename(cat)}
                    >
                      ✎
                    </button>
                    <button
                      className="icon-btn"
                      title="Delete"
                      onClick={() => handleDelete(cat)}
                    >
                      🗑️
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-bottom">
        <small style={{ color: "#6b7280" }}>
          Tip: Click a category to filter dashboard
        </small>
      </div>
    </aside>
  );
}
