import React from "react";

export default function WidgetCard({ widget, onRemove, onDragStart }) {
  return (
    <div
      className="widget"
      draggable
      onDragStart={(e) => onDragStart(e, widget.id)}
      style={{
        transition: "0.2s",
        cursor: "grab",
      }}
    >
      <button onClick={() => onRemove(widget.id)} className="remove">
        ✕
      </button>
      <h4>{widget.title}</h4>
      <p>{widget.text}</p>
    </div>
  );
}
