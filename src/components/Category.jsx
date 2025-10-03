import React from 'react'
import WidgetCard from './WidgetCard'

export default function Category({category, onAddClick, onRemoveWidget}) {
  return (
    <div className="category">
      <div className="category-header">
        <h3>{category.name}</h3>
        <button onClick={() => onAddClick(category.id)}>+ Add Widget</button>
      </div>

      <div className="widgets-grid">
        {category.widgets.map(w => (
          <WidgetCard key={w.id} widget={w} onRemove={(wid) => onRemoveWidget(category.id, wid)} />
        ))}

        <div className="placeholder">+ Add Widget</div>
      </div>
    </div>
  )
}
