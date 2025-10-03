import { create } from "zustand";
import initial from "../../widgets.json";
import { nanoid } from "nanoid";

// Helper: save categories to localStorage
function save(categories) {
  localStorage.setItem("dashboard", JSON.stringify(categories));
}

// Helper: load from localStorage
function load() {
  try {
    const saved = JSON.parse(localStorage.getItem("dashboard"));
    if (Array.isArray(saved)) return saved;
    return initial.categories;
  } catch {
    return initial.categories;
  }
}

export const useDashboardStore = create((set, get) => ({
  categories: load(),

  // CATEGORY MANAGEMENT
  addCategory: (name) => {
    const newCat = { id: nanoid(6), name, widgets: [] };
    const updated = [...get().categories, newCat];
    save(updated);
    set({ categories: updated });
  },

  removeCategory: (catId) => {
    const updated = get().categories.filter((c) => c.id !== catId);
    save(updated);
    set({ categories: updated });
  },

  renameCategory: (catId, newName) => {
    const updated = get().categories.map((c) =>
      c.id === catId ? { ...c, name: newName } : c
    );
    save(updated);
    set({ categories: updated });
  },

  // WIDGET MANAGEMENT
  addWidget: (categoryId, title, text) => {
    const updated = get().categories.map((cat) =>
      cat.id === categoryId
        ? {
            ...cat,
            widgets: [
              ...cat.widgets,
              { id: nanoid(8), title, text, created: Date.now() },
            ],
          }
        : cat
    );
    save(updated);
    set({ categories: updated });
  },

  removeWidget: (categoryId, widgetId) => {
    const updated = get().categories.map((cat) =>
      cat.id === categoryId
        ? { ...cat, widgets: cat.widgets.filter((w) => w.id !== widgetId) }
        : cat
    );
    save(updated);
    set({ categories: updated });
  },

  // SEARCH
  searchWidgets: (query) => {
    const q = (query || "").toLowerCase();
    return get()
      .categories.flatMap((cat) =>
        cat.widgets.map((w) => ({
          ...w,
          categoryId: cat.id,
          categoryName: cat.name,
        }))
      )
      .filter(
        (w) =>
          w.title.toLowerCase().includes(q) ||
          (w.text || "").toLowerCase().includes(q)
      );
  },
}));

export default useDashboardStore;
