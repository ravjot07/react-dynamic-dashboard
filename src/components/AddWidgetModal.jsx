import React, { useState, useEffect } from "react";

export default function AddWidgetModal({ open, onClose, onAdd, category }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    if (open) {
      setTitle("");
      setText("");
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Add widget to {category?.name}</h3>

        <label>Widget Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />

        <label>Widget Text</label>
        <textarea
          rows={5}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="modal-actions">
          <button onClick={onClose} className="cancel">
            Cancel
          </button>
          <button
            onClick={() => {
              onAdd(title || "Untitled", text || "Sample text");
            }}
            className="confirm"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
