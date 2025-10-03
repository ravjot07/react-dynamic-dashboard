import React, { useState, useEffect } from "react";
import { useDashboardStore } from "../store/useDashboard";
import Category from "./Category";
import AddWidgetModal from "./AddWidgetModal";

/**
 * Dashboard:
 * - accepts activeCat prop (if provided shows only that category)
 * - still listens to header's "open-add-widget" event
 */

export default function Dashboard({ activeCat }) {
  const categories = useDashboardStore((s) => s.categories);
  const addWidget = useDashboardStore((s) => s.addWidget);
  const removeWidget = useDashboardStore((s) => s.removeWidget);
  const searchFn = useDashboardStore((s) => s.searchWidgets);

  const [modalOpen, setModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null); // used by modal
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // open header add-widget => open modal for selected activeCat or first category
  useEffect(() => {
    function onOpen(ev) {
      const catToOpen =
        (activeCat && categories.find((c) => c.id === activeCat)) ||
        categories[0] ||
        null;
      if (catToOpen) {
        setActiveCategory(catToOpen);
        setModalOpen(true);
      } else {
        alert("No categories available. Create a category first.");
      }
    }
    window.addEventListener("open-add-widget", onOpen);
    return () => window.removeEventListener("open-add-widget", onOpen);
  }, [activeCat, categories]);

  function openAdd(catId) {
    const cat = categories.find((c) => c.id === catId);
    setActiveCategory(cat);
    setModalOpen(true);
  }

  function onAdd(title, text) {
    if (!activeCategory) return alert("Select a category first.");
    addWidget(activeCategory.id, title, text);
    setModalOpen(false);
  }

  function onRemove(categoryId, widgetId) {
    removeWidget(categoryId, widgetId);
  }

  function doSearch(q) {
    setQuery(q);
    if (!q) return setSearchResults([]);
    const results = searchFn(q);
    setSearchResults(results);
  }

  // determine which categories to show: single if activeCat set, else all
  const toShow = activeCat
    ? categories.filter((c) => c.id === activeCat)
    : categories;

  return (
    <div className="dashboard">
      <div className="top-controls">
        <div className="title">CNAPP Dashboard</div>
        <div>
          <input
            placeholder="Search widgets..."
            value={query}
            onChange={(e) => doSearch(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {query && (
        <div className="search-results">
          <h4>Search results</h4>
          <div className="widgets-grid">
            {searchResults.length ? (
              searchResults.map((r) => (
                <div key={r.id} className="widget">
                  <div style={{ fontSize: 12, color: "#6b7280" }}>{r.categoryName}</div>
                  <h4>{r.title}</h4>
                  <p>{r.text}</p>
                </div>
              ))
            ) : (
              <div>No results</div>
            )}
          </div>
        </div>
      )}

      <div className="categories-list">
        {toShow.map((cat) => (
          <Category key={cat.id} category={cat} onAddClick={openAdd} onRemoveWidget={onRemove} />
        ))}
      </div>

      <AddWidgetModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={onAdd}
        category={activeCategory}
      />
    </div>
  );
}
