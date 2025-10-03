
# 📊 React Dynamic Dashboard

A **dynamic dashboard** built with **React (Vite)** and **plain CSS**.  
Users can manage categories, add/remove widgets, search across widgets, and persist their dashboard layout with **localStorage**.

----------

##  Features

-   **Categories**
    
    -   Add new categories
        
    -   Rename or delete categories
        
    -   Sidebar lists all categories with widget counts
        
-   **Widgets**
    
    -   Add new widgets to any category
        
    -   Remove widgets
        
    -   Search widgets by title or text
        
-   **Persistence**
    
    -   All categories and widgets are saved in `localStorage`
        
    -   Changes survive page reloads
        
-   **UI/UX**
    
    -   Sidebar with category management
        
    -   Header with search and global “+ Add Widget” button
        
    -   Responsive grid for widgets (1–4 columns depending on screen size)
        
    -   Clean, modern card styling with hover effects
        
    -   Right-side modal for adding widgets
        


## Installation & Setup

1.  Clone the repo or download the zip:
    
    ```
    git clone https://github.com/ravjot07/react-dynamic-dashboard.git 
    cd react-dynamic-dashboard
    ``` 
    
2.  Install dependencies:
    
    `npm install` 
    
3.  Start the dev server:
    
    `npm run dev` 
    
4.  Open the app at the URL Vite prints (default: `http://localhost:5173`).
    

----------

##  Usage

-   Use the **Sidebar** to add, rename, or delete categories.
    
-   Click **+ Add Widget** in the header or category section to create new widgets.
    
-   Use the **search bar** to filter widgets across all categories.
    
-   Changes are stored in `localStorage`. Refresh the page and your dashboard remains intact.
    

----------

##  Tech Stack

-   React 18 (Vite)
    
-   Plain **CSS**
    
-   [Zustand](https://github.com/pmndrs/zustand) for state management
    
-   LocalStorage persistence
    

